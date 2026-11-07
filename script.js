const showSelect = document.getElementById("show-select");
const showDetails = document.getElementById("show- deatils")

async function loadShows() {
  const url = "https://api.tvmaze.com/shows?page=0";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const shows = await res.json();
    console.log(shows);
    const sorted = [...shows].sort((a,b) => {
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
async function loadShowDetails(id) {
  const url = `https://api.tvmaze.com/shows/${id}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const show = await res.json();
    console.log(show);
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

loadShows();

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