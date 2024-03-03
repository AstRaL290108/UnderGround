function setSlide(num) {
    let element = document.querySelector(".slides");
    element.style.transition = "all 0.5s";
    element.style.left = `-${100*num}%`;
}