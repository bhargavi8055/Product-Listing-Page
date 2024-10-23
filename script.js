function toggleMenu() {
    const mobileItems = document.querySelector('.mobile-items');
    mobileItems.classList.toggle('active'); // Toggle the active class
}
function toggleCategories() {
    if (window.innerWidth <= 768) { // Check if in mobile view
        const categories = document.querySelector('.filter-categories');
        categories.classList.toggle('active'); // Toggle active class
    }
}

let allProducts = [];  // To store all products fetched from the API




// Fetch products from the API
const fetchProducts = async () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        allProducts = await response.json();
        displayProducts(allProducts);  // Display all products by default
    } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error in Fetching Products",error);
    }
    finally{
        loader.style.display='none';
    }
};

// // Function to display products
const displayProducts = (productList) => {
    const productGrid = document.getElementById('productGrid');
    const resultCount = document.querySelector('.products-header span');
    
    productGrid.innerHTML = '';  // Clear the grid
    resultCount.textContent = `${productList.length} Results`;  // Set dynamic results count

    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <i class="favorite-icon">♥</i>
        `;

        productGrid.appendChild(productCard);
    });
};

// Function to sort products by price
const sortProducts = () => {
    const sortOption = document.getElementById('sortPrice').value;
    let productsToDisplay = [...allProducts];

    if (sortOption === 'asc') {
        productsToDisplay.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'desc') {
        productsToDisplay.sort((a, b) => b.price - a.price);
    }

    displayProducts(productsToDisplay);
};

// Function to filter products by category
const filterProducts = () => {
    let filteredProducts = allProducts;

    const categories = document.querySelectorAll('.filter-categories input[type="checkbox"]');
    const selectedCategories = Array.from(categories)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);  // Use checkbox 'value' instead of textContent

    if (selectedCategories.length > 0) {
        filteredProducts = allProducts.filter(product =>
            selectedCategories.includes(product.category)
        );
    }

    displayProducts(filteredProducts);
};

// Event listeners for filters
document.querySelectorAll('.filter-categories input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});

// Initial fetch and display
fetchProducts();