const { checkUser } = require('../lib/check-user.js');
const { database, io } = require("#tools");

io.on("connection", socket => {
	socket.on("messages-ping", async data => {
		let articl = await database.select({table: "articls", url: data.url});
		socket.join(`articl-${articl[0].id}`);

		let messages = await database.select({table: "messages", articls_id: articl[0].id});
		for (message of messages) {
			let user = await database.select({table: "users", id: message.user_id});
			user = user[0];
			try {
				socket.emit("message-load", {
					id: user.id,
					name: user.name,
					text: message.text,
					avatar: user.avatar,
					public_time: message.public_time
				});
			} catch {}
		}
	});


	socket.on("message-send", async data => {
		data.id = Number(data.id);
		req = {cookies: {...data}}
		let user = await checkUser(req, 0);
		if (!user.isRegister) return;

		let articl = await database.select({table: "articls", url: data.url});
		await database.insert_into({
			table: "messages",
			articls_id: articl[0].id,
			user_id: user.id,
			text: data.text,

			public_time: data.date
		});

		await database.update({
			table: "articls",
			colamns: {comments: articl[0].comments + 1},
			where: {id: articl[0].id}
		});

		io.to(`articl-${articl[0].id}`).emit("message-load", {
			id: user.id,
			name: user.name,
			text: data.text,
			avatar: user.avatar,
			public_time: data.date
		});
	});
});