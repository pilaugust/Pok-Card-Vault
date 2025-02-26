document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const suggestionsContainer = document.getElementById("autocomplete-suggestions");

    const apiKey = '54fd1e83-80e3-4fcf-8da8-e6d5585e7cfa'; 
    let debounceTimer;

    async function fetchCardSuggestions(query) {
        if (query.length < 2) { 
            suggestionsContainer.innerHTML = "";
            suggestionsContainer.style.display = "none";
            return;
        }

        try {
            console.log("Fetching cards for:", query);
            const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${encodeURIComponent(query)}*&pageSize=20`, {
                headers: { "X-Api-Key": apiKey }
            });

            if (!response.ok) {
                console.error("API Error:", response.status);
                return;
            }

            const data = await response.json();
            console.log("API Response:", data);

            if (data.data.length === 0) {
                suggestionsContainer.innerHTML = "<div class='suggestion-item no-results'>No results found</div>";
                suggestionsContainer.style.display = "block";
            } else {
                showSuggestions(data.data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    function showSuggestions(cards) {
        console.log("Showing suggestions...", cards);
        suggestionsContainer.innerHTML = "";

        cards.slice(0, 5).forEach(card => {
            const suggestion = document.createElement("div");
            suggestion.classList.add("suggestion-item");
            suggestion.textContent = card.name;

            console.log("Appending suggestion:", card.name);
            suggestion.addEventListener("click", () => {
                searchInput.value = card.name;
                suggestionsContainer.innerHTML = "";
                suggestionsContainer.style.display = "none";
                window.location.href = `card.html?id=${card.id}`;
            });

            suggestionsContainer.appendChild(suggestion);
        });

        const rect = searchInput.getBoundingClientRect();
        suggestionsContainer.style.top = `${rect.bottom + window.scrollY}px`;
        suggestionsContainer.style.left = `${rect.left + window.scrollX}px`;

        suggestionsContainer.style.display = cards.length > 0 ? "block" : "none";
    }

    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fetchCardSuggestions(searchInput.value);
        }, 300);
    });

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query.length > 0) {
                window.location.href = `search.html?query=${encodeURIComponent(query)}`;
            }
        }
    });

    document.addEventListener("click", (event) => {
        if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
            suggestionsContainer.innerHTML = "";
            suggestionsContainer.style.display = "none";
        }
    });
});
