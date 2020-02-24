const express = require('express');
const app = express();
const postRoutes = require('./routes/posts');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log(req.url);
	next();
})

app.get('/api/v0.1/status', (req, res) => {
	res.status(200).send({status: 'ok'});
})


app.use('/api/v0.1/posts', postRoutes);

app.listen(port, () => {
	console.log(`server ready on ${port} port`);
})