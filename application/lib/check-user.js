const { database } = require("#tools");

async function checkUser(req, resp) {
    let { id } = req.cookies;
    if (!id) {
        let users = await database.select_all("users");

        let randomNum = Math.floor(Math.random() * users.length);
        var user = users[randomNum];
        resp.cookie("id", user.id);
    }else {
        var user = await database.select({table: "users", id: id});
        user = user[0];
    }

    user.isRegister = 1;
    return user;
}

async function checkGrade(articl_id, user) {
    if (!user.isRegister) return
    let grades = await database.select({table: "grades", articl_id: articl_id});
    for (grade of grades) {
        if (grade.user_id != user.id) continue;  
        return grade.type;
    }
    return;
}

module.exports = {
    checkUser:  checkUser,
    checkGrade: checkGrade
}