const { database, app } = require("#tools");
const { checkUser, checkGrade } = require('../lib/check-user.js');

app.get("/server/add-view/:articlUrl", async (req, resp) => {
    let articlUrl = req.params.articlUrl;
    let articl = await database.select({table: "articls", url: articlUrl});
    let newViews = articl[0].views + 1;

    database.update({
        table: "articls",
        where: {url: articlUrl},
        colamns: {views: newViews}
    });
});

app.post("/server/add-grade", async (req, resp) => {
    let user = await checkUser(req, resp);
    if (!user.isRegister) return;

    let articl = await database.select({table: "articls", url: req.body.url});
    let grade = await checkGrade(articl[0].id, user);
    if(grade) resp.send(false);

    let newGrade = articl[0][req.body.type] + 1;
    let colamn = JSON.parse(`{"${req.body.type}": ${newGrade}}`);
                
    database.update({
        table:    "articls",
        colamns:  colamn,
        where:    {id: articl[0].id}
    });

    database.insert_into({
        table:      "grades",
        user_id:    user.id,
        articl_id:  articl[0].id,
        type:       req.body.type
    });

    resp.send(true);
});

app.post("/server/add-download", async (req, resp) => {
    let articl = await database.select({table: "articls", url: req.body.url});
    articl = articl[0];
    database.update({
        table: "articls",
        where: {id: articl.id},
        colamns: {downloads: articl.downloads + 1}
    });
});