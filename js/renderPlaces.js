let mainTag = document.getElementById("main");

async function renderPlaces(lat = null, long = null) {
    mainTag.innerHTML = "";

    let places = await fetch("./js/heritage_data.json");

    let data = await places.json();

    if(lat || long) {
        data = data.filter(item => (item.latitude < (lat + 1) && item.latitude > (lat - 1)) && (item.longitude < (long + 1) && item.longitude > (long - 1)))
        console.log(data);
    }

    data.forEach(item => {
        let tag = new Place(item);

        mainTag.append(tag.tag);
    });
}

function renderHome() {
    
}