const db = require('../db');

const users = {

    getAllUsers: (callback) => {
        const query = "SELECT * FROM USERS";

        return db.query(query, [], callback);
    },

    authenticate: (data, callback) => {
        const query = "SELECT NAME, EMAIL, PASSWORD FROM USERS WHERE NAME = $1 OR EMAIL = $2";

        const values = [
            data.name,
            data.email
        ]

        return db.query(query, values, callback)
    },

    createUser: (data, callback) => {
        const query = "INSERT INTO USERS (NAME, EMAIL, PASSWORD, CREATE_DATE) VALUES ($1, $2, $3, $4)";

        console.log(data)

        const values = [
            data.name,
            data.email,
            data.password,
            "NOW()"
        ];

        return db.query(query, values, callback);
    },

    userExists: (data, callback) => {
      const query = "SELECT EXISTS (SELECT 1 FROM USERS WHERE NAME = $1 OR EMAIL = $2)"

      const values = [
          data.name,
          data.email
      ]

      return db.query(query, values, callback)
    },

    login: (data, callback) => {
        const query = ""

        return db.query(query, [], callback)
    }

}

module.exports = users
