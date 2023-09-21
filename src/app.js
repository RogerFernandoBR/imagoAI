import "./styles.css"
const submitIcon = document.querySelector("#submit-button");
const inputElement = document.querySelector("input");
const bodyContainer = document.querySelector(".body-container");

const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": inputElement.value,
            "n": 4,
            "size": "1024x1024"
        })
    }

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", options)
        const data = await response.json()
        
        data?.data.forEach(imageObject => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            const imageElement = document.createElement("img");
            imageElement.setAttribute("src", imageObject.url);
            imageContainer.append(imageElement);
            bodyContainer.append(imageContainer);
        });
    } catch (error) {
        console.error(error)
    }
}

submitIcon.addEventListener("click", getImages);