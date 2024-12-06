function loadImg(url) {
    let img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous';

    return img;
}

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function readFile(file, type = "dataurl") {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target.result);
        }

        if(type === "dataurl") {
            reader.readAsDataURL(file);
        } else if(type === "string") {
            reader.readAsText(file);
        }
    });
}

function connectInputs(inputs = [], oninput = (e, input) => {}) {
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.oninput = (e) => {
            for (let j = 0; j < inputs.length; j++) {
                if (j !== i) {
                    inputs[j].setAttribute("value", input.value);
                    inputs[j].value = input.value;
                }
            }

            oninput(e, input);
        };
    }
    return;
}

function escapeCSSSelector(selector) {
    // Escape all special characters except for spaces
    return selector
                   .replace(/\s/g, '').replace(/\(/g, '-').replace(/\)/g, '-'); // Remove all spaces after escaping
}
