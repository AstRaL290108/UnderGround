const { database, app } = require("#tools");
const { getCategory } = require('./lib/category.js');
const { checkUser, checkGrade } = require('./lib/check-user.js');

app.get("/articls/:url", async (req, resp) => {
	let user = await checkUser(req, resp);
	let category = await getCategory();
	let articl = await database.select({table: "articls", url: req.params.url});
	articl = articl[0];
	
	let grade = await checkGrade(articl.id, user);

	data = {
		text:      articl.text,
		title:     articl.title,
		likes:     articl.likes,
		dislikes:  articl.dislikes
	}

	resp.render("pattern.ejs", {
		page: "articl", 
		category: category, 
		...data, 
		user: user,
		grade: grade
	});
});