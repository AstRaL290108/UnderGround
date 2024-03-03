function toggleMenu(tag) {
    let element = document.querySelector(`.link-list.${tag}`);
    let allElements = document.querySelectorAll(".link-list");

    for (let item of allElements) {
        if (item != element)
            item.classList.remove("active");
    }
    element.classList.toggle("active");
}