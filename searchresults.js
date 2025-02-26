document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    const resultsContainer = document.getElementById("results-container");
    const searchQueryDisplay = document.getElementById("search-query-display");

    const apiKey = '54fd1e83-80e3-4fcf-8da8-e6d5585e7cfa';

    if (query) {
        searchQueryDisplay.innerHTML = `<h2 class="searchResultT">Please wait, searching for: "${query}"</h2>`;
        setLoadingCursor(true);  // Set cursor to loading symbol
        await fetchSearchResults(query);
        setLoadingCursor(false); // Reset cursor back to normal after search
    }

    async function fetchSearchResults(query) {
        try {
            console.log("Fetching search results for:", query);
    
            // Encode query properly
            const encodedQuery = encodeURIComponent(query);
    
            // Construct the API request to search by:
            // - Name (e.g., "Charizard")
            // - Set Name (e.g., "Evolutions")
            const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:${encodedQuery}* OR set.name:${encodedQuery}*&pageSize=1500`;
    
            const response = await fetch(apiUrl, {
                headers: { "X-Api-Key": apiKey }
            });
    
            if (!response.ok) {
                console.error("API Error:", response.status);
                return;
            }
    
            const data = await response.json();
            console.log("API Response:", data);
    
            if (data.data.length === 0) {
                searchQueryDisplay.innerHTML += `<p class="searchResultCount">0 results found</p>`;
            } else {
                displayResults(data.data);
                searchQueryDisplay.innerHTML += `<p class="searchResultCount">${data.data.length} results found</p>`;
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    function displayResults(cards) {
        resultsContainer.innerHTML = "";
        const grid = document.createElement("div");
        grid.classList.add("card-grid");

        cards.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card-item");

            cardElement.innerHTML = `
                <img src="${card.images.small}" alt="${card.name}" class="card-image">
                <button class="viewCardDetailsBtn2" onclick="window.location.href='card.html?id=${card.id}'">View Details</button>
            `;

            cardElement.addEventListener("click", () => {
                window.location.href = `card.html?id=${card.id}`;
            });

            grid.appendChild(cardElement);
        });

        resultsContainer.appendChild(grid);
    }

    // Function to change the cursor to the loading symbol
    function setLoadingCursor(isLoading) {
        if (isLoading) {
            document.body.style.cursor = 'wait'; // Set to loading cursor
        } else {
            document.body.style.cursor = 'default'; // Reset to default cursor
        }
    }
});

