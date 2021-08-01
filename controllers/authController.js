const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

/* POST: Create new user. */
router.post('/authenticate', async function(req, res, next) {
    User.authenticate(req.body, (err, r) => {

        if (!r) {return res.status(400).send({error: "User not found"})}

        if (!await bcrypt.compare(req.body.password, r.rows.password)) {
            return res.status(400).send({error: "Invalid password."})
        }

        return res.send(r.rows);
    });
  });
