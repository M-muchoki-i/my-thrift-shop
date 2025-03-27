// Fetch data from JSON server
fetch("http://localhost:3002/items")
  .then((response) => response.json())
  .then((data) => {
    displayItems(data);
  })
  .catch((error) => console.error("Error:", error));

// Function to display items
function displayItems(items) {
  const itemsContainer = document.getElementById("items-container");
  itemsContainer.innerHTML = "";

  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.innerHTML = `
      <h2>${item.name}</h2>
      <p>Price: $${item.price}</p>
      <p>Quality: ${item.quality}</p>
      <p>Quantity: ${item.quantity}</p>
      <img src="${item.image}" alt="${item.name}" style="width:200px;height:auto;">
      <button class="purchase-btn" data-id="${item.id}">Purchase</button>
    `;
    itemsContainer.appendChild(itemDiv);
  });

  // Add event listeners for purchase buttons
  const purchaseButtons = document.querySelectorAll(".purchase-btn");
  purchaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = this.getAttribute("data-id");
      purchaseItem(itemId);
    });
  });
}

// Function to handle purchasing an item
function purchaseItem(itemId) {
  // Find the item element to remove
  const itemElements = document.querySelectorAll(".item");
  itemElements.forEach((item) => {
    const purchaseButton = item.querySelector(".purchase-btn");
    if (purchaseButton && purchaseButton.getAttribute("data-id") === itemId) {
      item.remove(); // Remove the item element from the webpage
    }
  });
}

// Event listener for search input
document.getElementById("search-input").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  fetch("http://localhost:3002/items")
    .then((response) => response.json())
    .then((data) => {
      const filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
      displayItems(filteredItems);
    })
    .catch((error) => console.error("Error:", error));
});

// Event listener for toggle dark mode button 
document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

// Event listener for sort by price button
document.getElementById("sort-price").addEventListener("click", function () {
  fetch("http://localhost:3002/items")
    .then((response) => response.json())
    .then((data) => {
      const sortedItems = data.sort((a, b) => a.price - b.price);
      displayItems(sortedItems);
    })
    .catch((error) => console.error("Error:", error));
});

// Event listener for mouseover on items
document.addEventListener("mouseover", function (event) {
  if (event.target.classList.contains("item")) {
    event.target.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  }
});

// Event listener for mouseout on items
document.addEventListener("mouseout", function (event) {
  if (event.target.classList.contains("item")) {
    event.target.style.boxShadow = "0 0 5px rgba(0,0,0,0.1)";
  }
});
