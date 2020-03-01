const db = require('../models');
const fs = require('fs');

class PostService {
/*
	constructor() {
		let rawData = fs.readFileSync('database.txt');
		console.log('posts: ' + rawData + '---');
		if (rawData.length > 1) {
			db.posts = JSON.parse(rawData);
		};
	}
*/
	async getAll() {
		const posts = await db.Post.findAll()
		return posts 
	}

	async insert(data) {
		const post = await db.Post.create(data)
		return post;
	}

	async getById(id) {
		return await db.Post.findOne({
			where: {
				id
			}
		})
	}

	async update(data, id) {
		let post = await this.getById(id);
		post = { ...data}
		await db.Post.update(post, 
			{where: {id}});
		return post;
	}

	async delete(id) {
		const post = await this.getById(id);
		if (post) {
			await db.Post.destroy({where: {id}});
		}

		return;
	}
}

module.exports = new PostService();