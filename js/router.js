let url = new URLSearchParams(location.search);
let routecomp = document.getElementById("nav");

let page = "home";
if(url.has("page")) {
    page = url.get("page");
}

console.log(url.get("page"))

if(page === "home") {
    curLoc.parentElement.classList.add("hidden");
    renderHome();

    var textWrapper = document.querySelector('#title');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
    anime({
        targets: '#title .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 1000,
        delay: (el, i) => 150 * (i+1)
    });
}
else if(page === "places") {
    renderPlaces();
} else if(page === "create") {
    foodForm();
    routecomp.classList.add("hidden");
    curLoc.parentElement.classList.add("hidden");
}