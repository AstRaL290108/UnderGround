const { database, app } = require("#tools");
const { getCategory } = require('./lib/category.js');
const { checkUser } = require('./lib/check-user.js');

app.get("/", async (req, resp) => {
	let records = await database.select_all("articls");
	let user = await checkUser(req, resp);
	let category = await getCategory();
	
	records = records.slice(0, 11);
	records.sort((a, b) => {
		if (a.views < b.views) return 1;
		if (a.views > b.views) return -1;
		return 0;
	});
	records = records.slice(0, 11);

	resp.render("pattern.ejs", {
		page: "index", 
		category: category,
		user: user,
		forViews: records,
	});
});

app.get("/offer", async (req, resp) => {
	let category = await getCategory();
	let user     = await checkUser(req, resp);

	resp.render("pattern.ejs", {page: "offer", category: category, user: user});
});

app.get("/about", async (req, resp) => {
	let category = await getCategory();
	let user     = await checkUser(req, resp);

	resp.render("pattern.ejs", {page: "about", category: category, user: user});
});
app.get("/contacts", async (req, resp) => {
	let category = await getCategory();
	let user     = await checkUser(req, resp);

	resp.render("pattern.ejs", {page: "contacts", category: category, user: user});
});