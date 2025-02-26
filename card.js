document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get("id"); // Get card ID from the URL
    const apiKey = '54fd1e83-80e3-4fcf-8da8-e6d5585e7cfa'; // API key

    if (cardId) {
        fetchCardDetails(cardId);
    }

    async function fetchCardDetails(cardId) {
        try {
            const response = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
                headers: {
                    "X-Api-Key": apiKey
                }
            });

            if (!response.ok) {
                console.error("API Error:", response.status);
                return;
            }

            const data = await response.json();
            const card = data.data; // Access card data here

            // Log the full card data to understand its structure
            console.log("Card Data:", card);

            // Get card information (with fallbacks if data is missing)
            const cardName = card.name || "No name available";
            const cardImage = card.images ? card.images.small : 'default_image.jpg'; // Fallback image if not available
            const cardText = card.text || "No description available."; // Provide fallback text if not available
            const cardRarity = card.rarity || "No rarity available"; // Fallback for rarity
            const cardTypes = card.types ? card.types.join(", ") : "No types available"; // Join types if multiple types are present
            const cardAttacks = card.attacks ? card.attacks.map(attack => attack.name).join(", ") : "No attacks available"; // Display attack names if available
            const cardEvolvesFrom = card.evolvesFrom || "No evolution information available"; // Display evolution info if available

            // Display the card information on the page
            document.getElementById('card-name').textContent = cardName;
            document.getElementById('card-image').src = cardImage;
            document.getElementById('card-rarity').textContent = `Rarity: ${cardRarity}`;
            document.getElementById('card-types').textContent = `Types: ${cardTypes}`;
            document.getElementById('card-attacks').textContent = `Attacks: ${cardAttacks}`;
            document.getElementById('card-evolves-from').textContent = `Evolves From: ${cardEvolvesFrom}`;

        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get("id"); // Get card ID from the URL
    const apiKey = '54fd1e83-80e3-4fcf-8da8-e6d5585e7cfa'; // API key

    if (cardId) {
        fetchCardDetails(cardId);
    }

    async function fetchCardDetails(cardId) {
        try {
            const response = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
                headers: {
                    "X-Api-Key": apiKey
                }
            });

            if (!response.ok) {
                console.error("API Error:", response.status);
                return;
            }

            const data = await response.json();
            const card = data.data; // Access card data here

            // Log the full card data to understand its structure
            console.log("Card Data:", card);

            // Get card information (with fallbacks if data is missing)
            const cardName = card.name || "No name available";
            const cardImage = card.images ? card.images.small : 'default_image.jpg'; // Fallback image if not available
            const cardText = card.text || "No description available."; // Provide fallback text if not available
            const cardRarity = card.rarity || "No rarity available"; // Fallback for rarity
            const cardTypes = card.types ? card.types.join(", ") : "No types available"; // Join types if multiple types are present
            const cardAttacks = card.attacks ? card.attacks.map(attack => attack.name).join(", ") : "No attacks available"; // Display attack names if available
            const cardEvolvesFrom = card.evolvesFrom || "No evolution information available"; // Display evolution info if available

            // Display the card information on the page
            document.getElementById('card-name').textContent = cardName;
            document.getElementById('card-image').src = cardImage;
            document.getElementById('card-rarity').textContent = `Rarity: ${cardRarity}`;
            document.getElementById('card-types').textContent = `Types: ${cardTypes}`;
            document.getElementById('card-attacks').textContent = `Attacks: ${cardAttacks}`;
            document.getElementById('card-evolves-from').textContent = `Evolves From: ${cardEvolvesFrom}`;

            // Add event listener to the "Add to Collection" button
            const addButton = document.getElementById('add-to-collection');
            addButton.addEventListener('click', function() {
                addToCollection(cardId, cardName, cardImage);
            });

        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    function addToCollection(cardId, cardName, imageUrl, set) {
        // Get the user's collection from Local Storage, or create a new one if it doesn't exist
        let collection = JSON.parse(localStorage.getItem('userCollection')) || [];
    
        // Get the element where the message will be displayed
        const messageElement = document.getElementById('message');  // Make sure this element exists in your HTML
    
        // Check if the card is already in the collection
        if (!collection.some(card => card.id === cardId)) {
            // If not, add it to the collection
            collection.push({ id: cardId, name: cardName, imageUrl: imageUrl, set: set });
            // Save the updated collection to Local Storage
            localStorage.setItem('userCollection', JSON.stringify(collection));
    
            // Display the success message
            messageElement.textContent = `${cardName} has been added to your collection!`;
    
        } else {
            // If the card is already in the collection
            messageElement.textContent = `${cardName} is already in your collection!`;
        }
    
        // Optionally, hide the message after a few seconds
        setTimeout(() => {
            messageElement.textContent = '';  // Clear the message after 3 seconds
        }, 3000);
    }
    
    
});    