const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const postService = require('../services/postService');

router.get('/', async (req, res) => {
	let data;
	try {
		data = await postService.getAll();
	} catch (err) {
		res.status(500).send({
			message: err.message
		});
	}

	res.send(data)
})

router.get('/:id', async (req, res) => {
	let data;
	try {
		data = await postService.getById(Number(req.params.id));
	} catch (err) {
		res.status(err.status).send({
			message: err.message
		});
	}

	res.send(data)
})

router.post('/', async (req, res) => {
	let data;
	try {
		data = await postService.insert(req.body);
	} catch (err) {
		res.status(500).send({
			message: err.message
		});
	}

	res.send(data)
})

router.put('/', (req, res) => {
	let data;
	try {
		data = postService.update(req.body);
	} catch (err) {
		res.status(500).send({
			message: err.message
		});
	}

	res.send(data)
})

router.delete('/:id', (req, res) => {
	let data;
	try {
		data = postService.delete(Number(req.params.id));
	} catch (err) {
		res.status(500).send({
			message: err.message
		});
	}

	res.send(data)
})

module.exports = router;