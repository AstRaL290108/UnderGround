const { database, app } = require("#tools");
const { getCategory } = require('./lib/category.js');
const { checkUser, checkGrade } = require('./lib/check-user.js');

app.get("/category/:category/:subCategory", async (req, resp) => {
	let user = await checkUser(req, resp);
	let articls = await database.select({table: "articls", category: req.params.subCategory});
	let subCategory = await database.select({table: "sub_category", url: req.params.subCategory});
	let category = await getCategory();

	resp.render("pattern.ejs", {
		page:           "articls", 
		category:       category, 
		articls:        articls, 
		categoryTitle:  subCategory[0].title,
		user: user
	});
});

app.get("/category/:category", async (req, resp) => {
	let user = await checkUser(req, resp);
	let mainCategory = await database.select({table: "category", url: req.params.category});
	let category = await getCategory();

	let category_id = mainCategory[0].sub_category_id.split("&");
	category_id = category_id.slice(1);
				
	let data = [];
	for (item of category_id) {
		let i = await database.select({table: "sub_category", id: item});
		data.push(i[0]);
	}

	resp.render("pattern.ejs", {
		page:         "category", 
		category:     category,
		data:         data,
		mainCategory: mainCategory[0],
		user: user
	});
});

app.get("/category", async (req, resp) => {
	let category = await getCategory();
	let allCategory = await database.select_all("category");
	let user = await checkUser(req, resp);

	resp.render("pattern.ejs", {
		page:         "allCategory", 
		category:     category,
		allCategory:  allCategory,
		user: user
	});
});