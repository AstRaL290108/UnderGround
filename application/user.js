const { database, app } = require("#tools");
const { getCategory } = require('./lib/category.js');
const { checkUser } = require('./lib/check-user.js');

app.get("/users/:id", async (req, resp) => {
	let user = await checkUser(req, resp);
	let category = await getCategory();

	let mainUser = await database.select({table: "users", id: req.params.id});
	mainUser = mainUser[0];
	
	let grades = await database.select({table: "grades", user_id: mainUser.id});
	

	let likeArticls = [];
	for (grade of grades) {
		let articl = await database.select({table: "articls", id: grade.articl_id});
		if (grade.type == "likes") likeArticls.push(articl[0]);
	}
				
	resp.render("pattern.ejs", {
		page:         "profile", 
		category:     category,
		user:         user,
		data:         mainUser,

		likeArticls: likeArticls
	});
});