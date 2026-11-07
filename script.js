const showSelect = document.getElementById("show-select");
const showDetails = document.getElementById("show-details")

async function loadShows() {
    const url = "https://api.tvmaze.com/shows?page=0";

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

        const shows = await res.json();
        console.log(shows);
        const sorted = [...shows].sort((a, b) => {
            const ratingA = a.rating?.average ?? 0
            const ratingB = b.rating?.average ?? 0
            return ratingB - ratingA
        })


        const top25 = sorted.slice(0, 25)

        fillDropdown(top25)
    } catch (error) {
        console.error(error);
    }
}
loadShows();
async function loadShowDetails(id) {
    const url = `https://api.tvmaze.com/shows/${id}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

        const show = await res.json();
        
        displayDetails(show)
    } catch (error) {
        console.error(error);
    }
}

showSelect.addEventListener("change", function () {
    const id = showSelect.value;

    if (id === "") {
        return;
    }

    loadShowDetails(id);
});



function fillDropdown(shows) {
    showSelect.innerHTML = ""

    const placeholder = document.createElement("option")
    placeholder.textContent = "Select a show"
    placeholder.value = ""
    showSelect.appendChild(placeholder)

    for (const show of shows) {
        const option = document.createElement("option")
        option.textContent = show.name
        option.value = show.id
        showSelect.appendChild(option)
    }

}
function displayDetails(show) {

    showDetails.innerHTML = ""


    const heading = document.createElement('h2')
    heading.textContent = show.name
    showDetails.appendChild(heading)


    if (show.image !== null) {
        const img = document.createElement("img")
        img.src = show.image.medium
        img.alt = `poster of ${show.name}`
        showDetails.appendChild(img)
    } else {
        const noimg = document.createElement("p")
        noimg.textContent = "no poster available"
        showDetails.appendChild(noimg)
    }

    const summary = document.createElement('div')
    summary.innerHTML = show.summary

    showDetails.appendChild(summary)

    const genres = document.createElement('p')
    const genreList = show.genres.length > 0 ? show.genres.join(", ") : "not listed"
    genres.textContent = `genres: ${genreList}`
    showDetails.appendChild(genres)

    const premire = document.createElement('P')
    premire.textContent = `Premiered: ${show.premiered ?? "unknown"}`
    showDetails.appendChild(premire)

    const status = document.createElement("p")
    status.textContent = `status: ${show.status ?? "unknown"}`
    showDetails.appendChild(status)

    const rating = document.createElement("p")
    rating.textContent = `Rating: ${show.rating?.average ?? "Not rated"}`
    showDetails.appendChild(rating)

}