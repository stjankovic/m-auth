const express = require('express');
const router = express.Router();
const parse = require('body-parser');
const User = require('../../_db/User/User');

router.use(parse.urlencoded({ extended:true }));
router.use(parse.json());

//Get all users//
router.get('/', (req, res) => {
	User.find({}, (err, users) => {
		if (err) return res.status(500).send(`ERROR`);

		res.status(200).send(users);
		console.log(`GET to /users`);
	});
});

//Get one user//
router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) return res.status(500).send(`ERROR`); 
		if (!user) return res.status(404).send(`User with ID ${req.params.id} doesn't exist`);

		res.status(200).send(user);
		console.log(`GET to /users/${req.params.id}`);
	});
});

//Create user//
router.post('/', (req, res) => {
	User.create({
		first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
	},
	(err, user) => {
		if (err) return res.status(500).send(`ERROR`);

		res.status(200).send(user);
		console.log(`POST to /users`);
	});
});

//Delete user//
router.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, user) => {
		if(err) return res.status(500).send(`ERROR`);

		res.status(200).send(`Deleting user ${user.first_name} with ID ${user._id}`);
		console.log(`DELETE to /users/${req.params.id}`);
	});
});

//Update user//
router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
		if(err) return res.status(500).send(`ERROR`);

		res.status(200).send(user);
		console.log(`PUT to /users/${req.params.id}`);
	});
});

module.exports = router;
