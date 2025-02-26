const apiKey = '54fd1e83-80e3-4fcf-8da8-e6d5585e7cfa'; // Replace with your API key
const apiUrl = 'https://api.pokemontcg.io/v2/sets';

async function fetchAllSetsAndPopulate() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch sets');
        }

        const setGroups = {
            'sets1': [], // Scarlet & Violet
            'sets2': [], // Sword & Shield
            'sets3': [], // Sun & Moon
            'sets4': [], // XY
            'sets5': [], // Black & White
            'sets6': [], // Heartgold & Soulsilver
            'sets7': [], // Diamond & Pearl
            'sets8': [], // Platinum
            'sets9': [], // EX
            'sets10': [], // Base
            'sets11': []  // Other
        };

        // Loop through all sets and categorize based on their codes
        data.data.forEach(set => {
            const setCode = set.id.toLowerCase();

            if (setCode.startsWith('sv')) {
                setGroups['sets1'].push(set); // Scarlet & Violet
            } else if (setCode.startsWith('swsh') || setCode.startsWith('cel')){
                setGroups['sets2'].push(set); // Sword & Shield
            } else if (setCode.startsWith('sm')) {
                setGroups['sets3'].push(set); // Sun & Moon
            } else if (setCode.startsWith('xy') || setCode.startsWith('g1')) {
                setGroups['sets4'].push(set); // XY
            } else if (setCode.startsWith('bw')) {
                setGroups['sets5'].push(set); // Black & White
            } else if (setCode.startsWith('hgss') || setCode.startsWith('col1')) {
                setGroups['sets6'].push(set); // Heartgold & Soulsilver
            } else if (setCode.startsWith('dp')) {
                setGroups['sets7'].push(set); // Diamond & Pearl
            } else if (setCode.startsWith('pl')) {
                setGroups['sets8'].push(set); // Platinum
            } else if (setCode.startsWith('ex')) {
                setGroups['sets9'].push(set); // EX
            } else if (setCode.startsWith('base')) {
                setGroups['sets10'].push(set); // Base
            } else {
                setGroups['sets11'].push(set); // Other
            }
        });

        // Sort each set group by release date in descending order (newest first)
        Object.keys(setGroups).forEach(group => {
            setGroups[group].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        });

        // Now populate the HTML with sorted sets
        populateSetsInHTML(setGroups);

    } catch (error) {
        console.error('Error fetching sets:', error);
    }
}



function populateSetsInHTML(setGroups) {
    // Loop through each set group and insert into the corresponding container
    Object.keys(setGroups).forEach(group => {
        const container = document.querySelector(`.${group}`); // Find the container by class name
        setGroups[group].forEach(set => {
            const setDiv = document.createElement('div');
            setDiv.classList.add('setCard');  // Add a class for styling

            setDiv.innerHTML = `
                <div class="setImageWrapper">
                    <img src="${set.images.logo}" alt="${set.name}" class="setImage" />
                </div>
                <div class="setDetails">
                    <h3 class="setName">${set.name}</h3>
                    <p class="setReleaseDate">Release Date: ${set.releaseDate}</p>
                    <button class="viewCardsBtn" onclick="window.location.href='set.html?id=${set.id}'">View Cards</button>
                </div>
            `;

            container.appendChild(setDiv); // Append to the container
        });
    });
}


// Fetch and populate sets in HTML
fetchAllSetsAndPopulate();



// set.html - Fetch detailed set info
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const setId = urlParams.get("id"); // Get set ID from the URL

    if (setId) {
        fetchSetDetails(setId);
    }

    async function fetchSetDetails(setId) {
        try {
            // Fetch set details
            const response = await fetch(`https://api.pokemontcg.io/v2/sets/${setId}`, {
                headers: {
                    "X-Api-Key": '54fd1e83-80e3-4fcf-8da8-e6d5585e7cfa'
                }
            });
    
            if (!response.ok) {
                console.error("API Error:", response.status);
                return;
            }
    
            const data = await response.json();
            console.log("Set Details:", data);
    
            // Display set data
            document.getElementById('set-name').textContent = data.data.name;
            document.getElementById('set-logo').src = data.data.images.symbol;
            document.getElementById('set-release').textContent = data.data.releaseDate;
            document.getElementById('total-cards').textContent = `Total cards in this set: ${data.data.cardCount || 0}`;
            
    
            // Fetch cards for this set
            fetchCardsForSet(setId);
            
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    
    async function fetchCardsForSet(setId) {
        let allCards = [];
        let page = 1;
        const pageSize = 100; // You can adjust the page size
    
        try {
            while (true) {
                const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}&pageSize=${pageSize}&page=${page}`, {
                    headers: {
                        "X-Api-Key": '54fd1e83-80e3-4fcf-8da8-e6d5585e7cfa'
                    }
                });
    
                if (!response.ok) {
                    console.error("API Error:", response.status);
                    return;
                }
    
                const data = await response.json();
                allCards = allCards.concat(data.data); // Add fetched cards to the list
    
                // Stop fetching more cards when we have all of them
                if (data.data.length < pageSize) {
                    break;
                }
    
                page++; // Go to the next page
            }
    
            // Now display the total card count (allCards.length)
            const totalCardCount = allCards.length;
    
            // Update the total card count in the HTML
            document.getElementById('total-cards').textContent = `Total cards in this set: ${totalCardCount}`;
    
            console.log("Fetched Cards for Set:", allCards);  // Debug: check the final list of cards
    
            // Display all cards
            displayCards(allCards);
    
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    

    
    // Function to display cards
    function displayCards(cards) {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = ''; // Clear existing cards (if any)
    
        cards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
    
            // Create HTML for each card (simplified)
            cardDiv.innerHTML = `
                <img src="${card.images.small}" alt="${card.name}" class="card-image" />
                <button class="viewCardDetailsBtn" onclick="window.location.href='card.html?id=${card.id}'">View Details</button>
            `;
            
            cardsContainer.appendChild(cardDiv);
        });
    }
    
});
