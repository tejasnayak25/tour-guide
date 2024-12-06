class Place {
    constructor(data) {
        let tag = document.createElement("div");
        tag.className = "p-4 lg:w-1/3 md:w-1/2 w-full project relative z-10 md:opacity-100 opacity-50";

        tag.innerHTML = `
            <div class="h-fit border-2 bg-[#03071E] border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div class="lg:h-48 md:h-36 h-36 w-full object-cover object-center flex justify-center items-center relative" style="">
                    <img src="${data.image}" class = "absolute top-0 w-full h-full opacity-50">
                    <h1 class="title-font text-2xl text-center font-bold text-gray-200 drop-shadow-lg mb-3 uppercase">${data.name}</h1>
                </div>
                <div class="p-6">
                    <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">${data.location ?? "Other"}</h2>
                    <p class="leading-relaxed mb-3">${data.address ?? ""}</p>
                    <div class="flex items-center flex-wrap">
                        <a href="https://hk-22.vercel.app/places/${data.id}" target="_blank" class="text-[#F48C06] inline-flex items-center md:mb-2 lg:mb-0">Learn More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                        </a>
                        <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-xs pr-3 py-1">
                        Lat ${data.latitude}
                        </span>
                        <span class="text-gray-400 inline-flex items-center leading-none text-xs">
                        Long ${data.longitude}
                        </span>
                    </div>
                </div>
            </div>
        `;

        this.tag = tag;
    }
}
