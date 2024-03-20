const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params

    const [note_id] = await knex("notes").insert({
      title,
      description,
      rating,
      user_id
    }) 

    if(rating >= 1 && rating <= 5){
      console.log("Avaliação válida");
    } else {
      throw new AppError("Avaliação inválida. Insira um número de 1 a 5")
    }

    const tagsInsert = tags.map(genre => {
      return {
        note_id,
        genre,
        user_id
      }
    })

    await knex("tags").insert(tagsInsert)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const note = await knex("notes").where({ id }).first()
    const tags = await knex("tags").where({ note_id: id }).orderBy("genre")

    return response.json({
      ...note,
      tags
    })
  }  

  async delete(request, response) {
    const { id } = request.params

    await knex("notes").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query

    let notes

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

      notes = await knex("tags")
      .select([
        "notes.id",
        "notes.title",
        "notes.user_id",
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.title", `%${title}%`)
      .whereIn("genre", filterTags)
      .innerJoin("notes", "notes.id", "tags.note_id")
      .orderBy("notes.title")
    } else {
      notes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title")
    }

      const userTags = await knex("tags").where({ user_id })
      const notesWhithTags = notes.map(note => {
        const noteTags = userTags.filter(tag => tag.note_id === note.id)

        return {
          ...note,
          tags: noteTags
        }
      })

    return response.json(notesWhithTags)
  }
}

module.exports = NotesController