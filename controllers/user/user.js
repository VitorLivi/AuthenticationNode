const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../../models/user');
const UserHelpers = require('./userHelpers');

/* GET: Get all users */
router.get('/', function(req, res, next) {
  User.getAllUsers((err, r) => {
    const { rows } = r;

      if (rows) {
        res.send(rows);
      } else {
        res.json(err);
      }
  });
});

/* POST: Create new user. */
router.post('/', async function(req, res, next) {
  if (!UserHelpers.validateNewUserParams(req.body)) {
    return res.status(400).json({success: false, msg: "Dados inválidos."})
  }

  User.userExists(req.body, (err, r) => {
    if (err) {
      return res.status(500).json({success: false, msg: "Erro no servidor."})
    }

    if (r.rows[0].exists) {
      return res.status(422).json({success: false, msg: "Usuário já existe."})
    }

    bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), function(err2, hash) {
      if (err2) {
        return res.status(500).json({success: false, msg: "Falha ao criptografar os dados."})
      }

      const body = Object.assign(req.body, {
        password: hash
      })

      User.createUser(body, (err3, r) => {
        if (err3) {
          return res.json(err3);
        }

        return res.json({success: true, msg: "Usuário criado com sucesso!"});
      })
    })
  })
})

module.exports = router;
