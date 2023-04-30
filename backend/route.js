const express = require('express');
const { share, create_user } = require('./controllers')

const router = express.Router()

router.route("/create-user").post(create_user);
router.route("/share").post(share);


module.exports = router;