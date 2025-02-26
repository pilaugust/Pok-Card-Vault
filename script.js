const apiKey = '54fd1e83-80e3-4fcf-8da8-e6d5585e7cfa'; // Replace with your API key
const apiUrl = 'https://api.pokemontcg.io/v2/sets';  // The endpoint for Pokémon TCG Sets API

const setsToDisplay = [
    "sv8pt5",  // Set code for Prismatic Evolutions
    "sv6pt5",        // Set code for Shrouded Fable
    "sv7",         // Set code for Stellar Crown
    "sv3pt5",                   // Set code for 151
    "sv5",       // Set code for Temporal Forces
    "sv8"         // Set code for Surging Sparks
];

const setsContainer = document.querySelector('.displayedSets');  // Container to display the sets

async function fetchSets() {
    try {
        const setPromises = setsToDisplay.map(setCode => {
            // Fetch details for each set by its code
            return fetch(`${apiUrl}/${setCode}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                }
            }).then(response => response.json());
        });

        // Wait for all the fetch requests to complete
        const setsData = await Promise.all(setPromises);

        // Render sets to the page
        setsContainer.innerHTML = setsData.map(set => `
            <div class="setCard">
                <div class="setImageWrapper">
                    <img src="${set.data.images.logo}" alt="${set.data.name}" class="setImage" />
                </div>
                <div class="setDetails">
                    <h3 class="setName">${set.data.name}</h3>
                    <p class="setReleaseDate">Release Date: ${set.data.releaseDate}</p>
                    <button class="viewCardsBtn" onclick="window.location.href='set.html?id=${set.data.id}'">View Cards</button>

                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching sets:', error);
        setsContainer.innerHTML = 'Failed to load sets. Please try again later.';
    }
}

// Call the function to fetch and display the sets
fetchSets();
