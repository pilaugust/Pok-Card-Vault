function displayCollection() {
    const collectionContainer = document.getElementById('myCollectionDisplay');
    const collection = JSON.parse(localStorage.getItem('userCollection')) || [];
    const sortBy = document.getElementById('sortOptions').value;  // Get selected sort option
    const sortOrder = document.getElementById('sortOrder').value;  // Get selected order (ascending/descending)

    // Sort the collection based on the selected criteria (excluding sorting by set)
    if (sortBy === "name") {
        collection.sort((a, b) => a.name.localeCompare(b.name));  // Sort alphabetically by card name
    } else if (sortBy === "date") {
        collection.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));  // Sort by date added
    }

    // Reverse the order if the selected order is descending
    if (sortOrder === "desc") {
        collection.reverse();
    }

    // Update the display based on sorted collection
    if (collection.length === 0) {
        collectionContainer.innerHTML = '<p class="collectText">Your collection is empty!</p>';
    } else {
        collectionContainer.innerHTML = collection.map(card => `
            <div class="setCard" id="collectionWrapper">
                <div class="setImageWrapper" id="imageWrapper">
                    <a href="card.html?id=${card.id}">
                        <img src="${card.imageUrl}" alt="${card.name}"  id="setImage"/>
                    </a>
                </div>
                <div class="setDetails">
                    <h3 class="setName">${card.name}</h3>
                    <button class="removeBtn" onclick="removeFromCollection('${card.id}')">Remove from Collection</button>
                </div>
            </div>
        `).join('');
    }
}

// Event listeners for sorting options
document.addEventListener("DOMContentLoaded", function () {
    const sortOptions = document.getElementById('sortOptions');
    const sortOrder = document.getElementById('sortOrder');

    sortOptions.addEventListener('change', displayCollection);
    sortOrder.addEventListener('change', displayCollection);

    displayCollection();  // Initial call to display collection on page load
});

function removeFromCollection(cardId) {
    let collection = JSON.parse(localStorage.getItem('userCollection')) || [];

    // Remove the card from the collection
    collection = collection.filter(card => card.id !== cardId);

    // Save the updated collection back to Local Storage
    localStorage.setItem('userCollection', JSON.stringify(collection));

    // Reload the collection display
    displayCollection();
}
