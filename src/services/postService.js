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
		/*
		if (typeof id === 'undefined') {
			throw ({
				status: 400, 
				message: 'No id provided' 
			})
		}

		const post = db.posts.find(post => post.id === id);
		if (!post) {
			throw ({status: 404});
		}

		return post;
		*/
		return await db.Post.findOne({
			where: {
				id
			}
		})
	}

	update(data) {
		let post = this.getById(data.id);
		post = { ...data}
		db.posts = db.posts.map(p => 
			p.id === post.id
			? post
			: p
		);

		const rawPosts = JSON.stringify(db.posts, null, 2);
		fs.writeFileSync('database.txt', rawPosts);

		return post;
	}

	delete(id) {
		const post = this.getById(id);
		db.posts.splice(post.id - 1, 1);

		const rawPosts = JSON.stringify(db.posts, null, 2);
		fs.writeFileSync('database.txt', rawPosts);

		return;
	}
}

module.exports = new PostService();