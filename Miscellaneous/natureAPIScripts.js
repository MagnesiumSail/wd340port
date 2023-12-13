document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const placeName = document.getElementById('place').value;
    searchPlace(placeName);
});

async function searchPlace(placeName) {
    try {
        const response = await fetch(`https://api.inaturalist.org/v1/places/autocomplete?q=${placeName}`);
        const data = await response.json();
        const place = data.results[0];
        getIdentifications(place.id);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getIdentifications(placeId) {
    try {
        const response = await fetch(`https://api.inaturalist.org/v1/observations?place_id=${placeId}`);
        const data = await response.json();
        displayIdentifications(data.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayIdentifications(identifications) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    identifications.forEach(identification => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${identification.species_guess}</h3>
            <img src="${identification.photos[0].url}" alt="${identification.species_guess}">
        `;
        resultsDiv.appendChild(div);
    });
}
