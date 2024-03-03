module.exports = {
    mainRender: [
        require("./main.js"),
        require("./articl.js"),
        require("./user.js"),
        require("./category.js"),
        require("./account.js")
    ],
    articls: [
        require("./articl/add-data.js"),
        require("./articl/comments.js")
    ]
}