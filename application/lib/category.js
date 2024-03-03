const { database } = require("#tools");

async function getCategory() {
    let category = await database.select_all("category");
    var allCategory = [];

    for (item of category) {
        let sub_category_id = item.sub_category_id.split("&").slice(1);
        item.sub_category = [];

        let i = 0;
        for (element of sub_category_id) {
            if (i == 5) break;
            let sub_category = await database.select({table: "sub_category", id: element});
            
            item.sub_category.push(sub_category[0]);
            i += 1;
        }
        allCategory.push(item);
    }
    return allCategory;
}

module.exports = {
    getCategory: getCategory
}