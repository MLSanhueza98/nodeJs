import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'movie',
  port: 3306,
  password: '1234',
  database: 'moviesdb'
}

const pool = mysql.createPool({
  ...config,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci'
})

export class MovieModel {
  static async getAll ({ genre }) {
    const connection = await pool.getConnection()
    try {
      if (genre) {
        const lowerCaseGenre = genre.toLowerCase()
        const [genres] = await connection.query(
          'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
        // la interrogante es un marcador de posicion y los valores en el arreglo [loweCaseGenre] iran siendo sustituidos en lugar del marcador de posicion
        // se utiliza para evitar inyecciones
        )
        // no genre found
        if (genres.length === 0) return []

        // get id from the first genre result
        const [{ id }] = genres

        // get all movies ids from database table
        const [movies] = await connection.query(
          'SELECT m.* FROM movie m ' +
          'JOIN movie_genre mg ON m.id = mg.movie_id ' +
          'WHERE mg.genre_id = ?;', [id]
        )
        return movies
      }
      // get all movies
      const [movies] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
      )
      console.log(movies)
      return movies
    } finally {
      connection.release() // Release the connection back to the pool
    }
  }

  static async getById ({ id }) {
    const connection = await pool.getConnection()
    try {
      const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
        FROM movie WHERE id = UUID_TO_BIN(?);`, [id]
      )
      if (movies.length === 0) return null
      return movies[0]
    } finally {
      connection.release()
    }
  }

  static async create ({ input }) {
    // Implementación de create
    const connection = await pool.getConnection()
    const {
      // genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    try {
      const [uuidResult] = await connection.query('SELECT UUID() uuid;')
      const [{ uuid }] = uuidResult

      try {
        await connection.query(
          `INSERT INTO movie (id, title, year, director, duration, poster, rate)
            VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
          [title, year, director, duration, poster, rate]
        )
      } catch (e) {
        // puede enviarle información sensible
        throw new Error('Error creating movie')
        // enviar la traza a un servicio interno
        // sendLog(e)
      }

      const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
          FROM movie WHERE id = UUID_TO_BIN(?);`,
        [uuid]
      )

      return movies[0]
    } finally {
      connection.release()
    }
  }

  static async delete ({ id }) {
    // Implementación de delete
    const connection = await pool.getConnection()
    try {
      const movieDeleted = await connection.query(
        'DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [id]
      )
      return movieDeleted
    } finally {
      connection.release()
    }
  }

  static async update ({ id, input }) {
    const connection = await pool.getConnection()

    try {
      const {
        title,
        year,
        duration,
        director,
        rate,
        poster
      } = input

      // Actualizar la película
      await connection.query(
        'UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?);',
        [title, year, director, duration, poster, rate, id]
      )

      // Obtener la película actualizada
      const [updatedMovies] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
        [id]
      )

      if (updatedMovies.length === 0) {
        // Manejar el caso en el que la película no se encuentra después de la actualización
        return null
      }

      return updatedMovies[0]
    } finally {
      connection.release()
    }
  }
}
