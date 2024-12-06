let curLoc = document.getElementById("curLoc");

curLoc.onclick = () => {
    if(curLoc.classList.contains("bg-slate-600")) {
        curLoc.classList.replace("bg-slate-600", "bg-blue-600");
        // renderPlaces();

        navigator.geolocation.getCurrentPosition((loc) => {
            renderPlaces(loc.coords.latitude, loc.coords.longitude);
        });
    } else {
        curLoc.classList.replace("bg-blue-600", "bg-slate-600");
        renderPlaces();
    }
}