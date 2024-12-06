function foodForm() {
    mainTag.innerHTML = "";

    mainTag.innerHTML = `
    
        <div class = "md:w-1/3 w-full">
            <div id="thank" class="fixed w-full h-full hidden flex-col justify-center items-center left-0 bg-slate-800 text-slate-100 top-0">
                <button id="close-thank" class="absolute top-5 right-5 btn-ghost">
                    <i class="fi fi-sr-cross text-xl text-white"></i>
                </button>
                <img src="./images/thank.gif" class="md:w-1/5 w-full" style="image-rendering: optimizeQuality;">
                <p>Thank your for updating the data</p>
            </div>
            <div class="mb-6">
                <label for="image" class="block mb-2 text-sm font-medium text-white">Photos</label>
                <div class = "flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" accept="image/*" multiple class="hidden" />
                    </label>
                </div>
            </div> 

            <div id="gallery" class="grid grid-cols-5 gap-4 mb-6 overflow-x-auto max-w-full">
            </div>

            <div class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium text-white">Place Name</label>
                <input type="text" id="name" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sanskriti Tiffins" required />
            </div> 
            <div class="mb-6">
                <label for="loc" class="block mb-2 text-sm font-medium text-white">Location</label>
                <input type="text" id="loc" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" value="Current Location" disabled />
            </div>
            <div class="mb-6">
                <label for="description" class="block mb-2 text-sm font-medium text-white">Your message</label>
                <textarea id="description" rows="4" class="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            </div>
            
            <div class="flex items-start justify-center mb-6">
                <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value="" class="w-4 h-4 border rounded focus:ring-3 focus:ring-blue-300 bg-gray-700 border-gray-600 dark:focus:ring-blue-600 ring-offset-gray-800" required />
                </div>
                <label for="remember" class="ms-2 text-sm font-medium text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
            </div>
            <div class = "flex justify-center p-2">
                <button id="submit-btn" type="submit" class="text-white rounded-full px-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </div>

    `;

    let fileinp = mainTag.querySelector("input[type='file']");
    let gallery = mainTag.querySelector("#gallery");
    fileinp.onchange = async () => {
        let files = fileinp.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let url = await readFile(file, "dataurl");
            let div = document.createElement("div");
            div.className = "relative";
            div.innerHTML = `
                <button class = "w-8 h-8 rounded-bl-md bg-slate-700 text-red-500 absolute top-0 right-0">
                    <i class="fi fi-sr-trash"></i>
                </button>
                <img class=" max-w-full rounded-lg h-20 w-auto object-cover" src="${url}" alt="">
            `;

            div.querySelector("button").onclick = () => {
                div.remove();
            }

            gallery.append(div);   
        }
    }

    let thank = document.getElementById("thank");
    let closethank = document.getElementById("close-thank");
    closethank.onclick = () => {
        thank.classList.replace("flex", "hidden");
    }

    mainTag.querySelector("#submit-btn").onclick = () => {
        navigator.geolocation.getCurrentPosition((loc) => {
            let name = document.getElementById("name").value;
            let description = document.getElementById("description").value;
            let imageNodes = gallery.querySelectorAll("img");
            let images = Array.from(imageNodes).map(img => img.src);
            let location = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };

            fetch("/add-data", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, description, images, location
                })
            }).then((data) => {
                thank.classList.replace("hidden", "flex");
            });
        });
    }
}