const showSelect = document.getElementById("show-select");

async function loadShows() {
  const url = "https://api.tvmaze.com/shows?page=0";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const shows = await res.json();
    console.log(shows);
  } catch (error) {
    console.error(error);
  }
}

loadShows();