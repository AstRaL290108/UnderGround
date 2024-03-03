const { database, app } = require("#tools");
const { checkUser, checkGrade } = require('./lib/check-user.js');

app.post("/server/reset-userdata", async (req, resp) => {
    let user = await checkUser(req, resp);
    if (!user.isRegister) return;
    
    let colamns = {};
    colamns[`${req.body.dataTitle}`] = req.body.newData;

    database.update({
        table: "users",
        colamns: colamns,
        where: {id: user.id}
    });
});

app.get("/account/server/exit", async (req, resp) => {
    let user = await checkUser(req, resp);
    if (!user.isRegister) return;

    for (item of Object.keys(req.cookies)) {
        resp.clearCookie(item);
    }	
    resp.send("123");
});

app.post("/server/add-offer", async (req, resp) => {
    database.insert_into({
        table: "offers",
        text: req.body.text,
        date: req.body.date
    });
});