/*
  script.js
  This file contains all the interactive logic for the Smoke & Scroll website.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- PRODUCT DATA ---
    // In a real application, this would come from a server/API
    const products = [
        {
            id: 1,
            name: 'Classic Rolling Papers',
            type: 'Papers',
            price: '25',
            imageUrl: 'PH images/papers4.png'
        },
        {
            id: 2,
            name: 'Organic Hemp Papers',
            type: 'Papers',
            price: '25',
            imageUrl: 'PH images/papers2.jpg'
        },
        {
            id: 3,
            name: 'King Size Cones',
            type: 'Papers',
            price: '35',
            imageUrl:'PH images/ocb.jpg'
        },
        {
            id: 4,
            name: 'Unbleached Papers',
            type: 'Papers',
            price: '35',
            imageUrl: 'PH images/papers3.jpg'
        },
        {
            id: 5,
            name: 'Peter Stuveysant Cigarettes',
            type: 'Cigarettes',
            price: '3',
            imageUrl: 'PH images/cig1.jpg'
        },
        {
            id: 6,
            name: 'Safari Cigarettes',
            type: 'Cigarettes',
            price: '2.50',
            imageUrl: 'PH images/cig3.jpg'
        },
        {
            id: 7,
            name: 'Rothmans Cigarettes',
            type: 'Cigarettes',
            price: '2.50',
            imageUrl: 'PH images/cig2.jpg'
        },
        {
            id: 8,
            name: 'Peter Stuveysant Menthol Cigarettes',
            type: 'Cigarettes',
            price: '18.00',
            imageUrl: 'PH images/cig1.jpg'
        }
    ];

    // --- DOM ELEMENTS ---
    const productGrid = document.getElementById('product-grid');
    const cartCountElement = document.getElementById('cart-count');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const ageVerificationModal = document.getElementById('age-verification-modal');
    const ageModalContent = document.getElementById('age-modal-content');
    const confirmAgeBtn = document.getElementById('confirm-age-btn');
    const denyAgeBtn = document.getElementById('deny-age-btn');
    const ageDeniedMessage = document.getElementById('age-denied-message');
    const mainContent = document.getElementById('main-content');
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');

    let cartCount = 0;

    // --- FUNCTIONS ---

    /**
     * Renders product cards into the grid
     */
    function renderProducts() {
        // Ensure productGrid exists before trying to modify it
        if (!productGrid) return;
        
        productGrid.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300';
            card.innerHTML = `
                <div class="relative">
                    <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-56 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found';">
                    <div class="absolute inset-0 card-gradient"></div>
                    <span class="absolute top-3 right-3 bg-amber-500 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full">${product.type}</span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-white">${product.name}</h3>
                    <p class="text-2xl font-semibold text-amber-400 mt-2">ZMK${product.price}</p>
                    <button data-product-id="${product.id}" class="add-to-cart-btn w-full mt-4 btn-primary">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    /**
     * Handles adding an item to the cart
     */
    function addToCart(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                // Animate cart icon
                cartCountElement.classList.add('transform', 'scale-150');
                setTimeout(() => {
                    cartCountElement.classList.remove('transform', 'scale-150');
                }, 200);
            }
        }
    }

    /**
     * Toggles the mobile navigation menu
     */
    function toggleMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }

    /**
     * Shows the main content of the page with a fade-in effect
     */
    function showPageContent() {
        if (ageVerificationModal) {
            ageVerificationModal.classList.add('hidden');
        }
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Fade in content
        if (mainContent) mainContent.classList.remove('opacity-0');
        if (header) header.classList.remove('opacity-0');
        if (footer) footer.classList.remove('opacity-0');
    }

    /**
     * Handles age confirmation
     */
    function confirmAge() {
        sessionStorage.setItem('ageVerified', 'true');
        showPageContent();
    }

    /**
     * Handles age denial
     */
    function denyAge() {
        if (ageModalContent) ageModalContent.classList.add('hidden');
        if (ageDeniedMessage) ageDeniedMessage.classList.remove('hidden');
    }
    
    /**
     * Checks if age has been verified in the current session
     */
    function checkAgeVerification() {
        if (sessionStorage.getItem('ageVerified') === 'true') {
            showPageContent();
        } else {
            if (ageVerificationModal) {
                ageVerificationModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
                // Animate modal entrance
                if (ageModalContent) {
                    setTimeout(() => {
                        ageModalContent.classList.remove('opacity-0', 'scale-95');
                        ageModalContent.classList.add('opacity-100', 'scale-100');
                    }, 50);
                }
            }
        }
    }


    // --- EVENT LISTENERS ---
    if (productGrid) productGrid.addEventListener('click', addToCart);
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (confirmAgeBtn) confirmAgeBtn.addEventListener('click', confirmAge);
    if (denyAgeBtn) denyAgeBtn.addEventListener('click', denyAge);

    // --- INITIALIZATION ---
    renderProducts();
    checkAgeVerification();
});
