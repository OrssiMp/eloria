import { PRODUCTS } from './data.js';
import { store } from './store.js';
import { renderHeader, renderProductCard, renderCartDrawer, renderFooter } from './components.js';

// --- ROUTEUR SPA SIMPLIFIÉ ---
function getRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString || '');
    return { path, params };
}

function navigateTo(url) {
    window.location.hash = url;
}

// --- RENDU DES VUES ---

// 1. PAGE D'ACCUEIL
function renderHome() {
    const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

    return `
        <div class="animate-fade-in">
            <!-- Hero Section -->
            <section class="relative min-h-[85vh] flex items-center bg-eloria-black text-white overflow-hidden">
                <div class="absolute inset-0 z-0 opacity-40">
                    <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1920&q=80" alt="ÉLORIA Fragrance Hero" class="w-full h-full object-cover">
                </div>
                <div class="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center md:text-left">
                    <p class="text-xs uppercase tracking-[0.4em] text-eloria-gold mb-4">Haute Parfumerie Paris</p>
                    <h1 class="font-serif text-4xl md:text-7xl font-light tracking-wide max-w-2xl leading-tight mb-6">
                        THE ART OF SCENT
                    </h1>
                    <p class="text-sm md:text-base text-eloria-beige/80 max-w-md font-light mb-8">
                        Des fragrances d'exception imaginées pour sculpter vos souvenirs et laisser une empreinte indélébile.
                    </p>
                    <a href="#/shop" class="inline-block px-8 py-4 bg-white text-eloria-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-eloria-gold hover:text-white transition-all">
                        Découvrir la collection
                    </a>
                </div>
            </section>

            <!-- Best Sellers Section -->
            <section class="max-w-7xl mx-auto px-6 py-20">
                <div class="text-center mb-16">
                    <p class="text-xs uppercase tracking-[0.3em] text-eloria-gold mb-2">Sélection Exclusive</p>
                    <h2 class="font-serif text-3xl md:text-4xl text-eloria-black">Nos Créations Signature</h2>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${bestSellers.map(renderProductCard).join('')}
                </div>
            </section>

            <!-- Storytelling Editorial -->
            <section class="bg-eloria-beige/40 py-24">
                <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="space-y-6">
                        <p class="text-xs uppercase tracking-[0.3em] text-eloria-gold">L'Esprit Éloria</p>
                        <h2 class="font-serif text-3xl md:text-5xl text-eloria-black leading-snug">L'essence pure d'une émotion capturée.</h2>
                        <p class="text-sm text-eloria-gray leading-relaxed font-light">
                            Chaque flacon ÉLORIA est le résultat d'une quête d'excellence sans compromis. Nos maîtres parfumeurs assemblent des essences rares issues de récoltes éthiques à travers le monde.
                        </p>
                        <a href="#/about" class="inline-block border-b border-eloria-black pb-1 text-xs uppercase tracking-widest font-semibold hover:text-eloria-gold hover:border-eloria-gold transition-colors">En savoir plus sur notre Maison</a>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80" alt="Parfum artisanal" class="w-full h-80 object-cover">
                        <img src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80" alt="Rose parfumée" class="w-full h-80 object-cover mt-8">
                    </div>
                </div>
            </section>

            <!-- Pyramide Olfactive Highlight -->
            <section class="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 class="font-serif text-3xl text-eloria-black mb-12">L'Anatomie d'une Fragrance</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="p-8 bg-white border border-eloria-beige/60">
                        <span class="text-xs uppercase tracking-[0.2em] text-eloria-gold block mb-2">01. Envolée</span>
                        <h3 class="font-serif text-xl mb-2">Notes de Tête</h3>
                        <p class="text-xs text-eloria-gray font-light">La première impression, volatile et éclatante. Bergamote, baies roses et citrus nobles.</p>
                    </div>
                    <div class="p-8 bg-white border border-eloria-beige/60">
                        <span class="text-xs uppercase tracking-[0.2em] text-eloria-gold block mb-2">02. Cœur</span>
                        <h3 class="font-serif text-xl mb-2">Notes de Cœur</h3>
                        <p class="text-xs text-eloria-gray font-light">La personnalité profonde du parfum. Iris d'Exception, Rose Centifolia et Jasmin rare.</p>
                    </div>
                    <div class="p-8 bg-white border border-eloria-beige/60">
                        <span class="text-xs uppercase tracking-[0.2em] text-eloria-gold block mb-2">03. Sillage</span>
                        <h3 class="font-serif text-xl mb-2">Notes de Fond</h3>
                        <p class="text-xs text-eloria-gray font-light">L'empreinte tenace qui persiste. Ambre naturel, bois précieux et vanille Bourbon.</p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// 2. PAGE CATALOGUE / SHOP
function renderShop(params) {
    const activeCategory = params.get('cat') || 'All';
    const searchQuery = params.get('q') || '';

    let filtered = PRODUCTS;
    if (activeCategory !== 'All') {
        filtered = filtered.filter(p => p.category === activeCategory || p.subCategory === activeCategory);
    }
    if (searchQuery) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return `
        <div class="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
            <div class="text-center mb-12">
                <h1 class="font-serif text-4xl text-eloria-black mb-4">Le Catalogue</h1>
                <p class="text-xs uppercase tracking-[0.2em] text-eloria-gray">Toutes nos créations d'exception</p>
            </div>

            <!-- Filtres Catégories -->
            <div class="flex flex-wrap justify-center gap-4 mb-12 text-xs uppercase tracking-[0.15em]">
                <a href="#/shop" class="px-4 py-2 border ${activeCategory === 'All' ? 'border-eloria-black bg-eloria-black text-white' : 'border-eloria-beige text-eloria-black hover:border-eloria-black'} transition-colors">Tous</a>
                <a href="#/shop?cat=Parfums" class="px-4 py-2 border ${activeCategory === 'Parfums' ? 'border-eloria-black bg-eloria-black text-white' : 'border-eloria-beige text-eloria-black hover:border-eloria-black'} transition-colors">Parfums</a>
                <a href="#/shop?cat=Soins" class="px-4 py-2 border ${activeCategory === 'Soins' ? 'border-eloria-black bg-eloria-black text-white' : 'border-eloria-beige text-eloria-black hover:border-eloria-black'} transition-colors">Soins & Beauté</a>
                <a href="#/shop?cat=Coffrets" class="px-4 py-2 border ${activeCategory === 'Coffrets' ? 'border-eloria-black bg-eloria-black text-white' : 'border-eloria-beige text-eloria-black hover:border-eloria-black'} transition-colors">Coffrets</a>
            </div>

            <!-- Grille Produits -->
            ${filtered.length === 0 ? `
                <div class="text-center py-20">
                    <p class="text-base text-eloria-gray mb-4">Aucun produit ne correspond à votre recherche.</p>
                    <a href="#/shop" class="text-xs uppercase tracking-widest border-b border-eloria-black pb-1">Réinitialiser les filtres</a>
                </div>
            ` : `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${filtered.map(renderProductCard).join('')}
                </div>
            `}
        </div>
    `;
}

// 3. PAGE DETAIL PRODUIT
function renderProductDetail(params) {
    const id = params.get('id');
    const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
    const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

    return `
        <div class="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                <!-- Galerie Image -->
                <div class="space-y-4">
                    <div class="aspect-square bg-white border border-eloria-beige overflow-hidden">
                        <img id="main-product-img" src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                    </div>
                </div>

                <!-- Info Produit -->
                <div class="flex flex-col justify-center space-y-6">
                    <div>
                        <span class="text-xs uppercase tracking-[0.25em] text-eloria-gold block mb-1">${product.category} • ${product.size}</span>
                        <h1 class="font-serif text-3xl md:text-4xl text-eloria-black mb-2">${product.name}</h1>
                        <p class="text-sm text-eloria-gray font-light mb-4">${product.subtitle}</p>
                        <p class="text-2xl font-serif text-eloria-black font-semibold">${product.price} €</p>
                    </div>

                    <p class="text-sm text-eloria-black/80 font-light leading-relaxed border-t border-b border-eloria-beige/80 py-4">
                        ${product.description}
                    </p>

                    <!-- Accords / Pyramide Olfactive -->
                    <div class="space-y-2 text-xs">
                        <p><strong class="font-semibold uppercase tracking-wider text-eloria-gold">Tête :</strong> ${product.notes.head}</p>
                        <p><strong class="font-semibold uppercase tracking-wider text-eloria-gold">Cœur :</strong> ${product.notes.heart}</p>
                        <p><strong class="font-semibold uppercase tracking-wider text-eloria-gold">Fond :</strong> ${product.notes.base}</p>
                    </div>

                    <!-- Actions -->
                    <div class="flex space-x-4 pt-4">
                        <button data-id="${product.id}" class="add-to-cart-btn flex-grow py-4 bg-eloria-black text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-eloria-gold transition-colors">
                            Ajouter au Panier
                        </button>
                        <button data-id="${product.id}" class="wishlist-btn px-6 border border-eloria-beige text-eloria-black hover:border-eloria-gold transition-colors">
                            <i class="${store.isInWishlist(product.id) ? 'fa-solid text-eloria-gold' : 'fa-regular'} fa-heart text-base"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Produits Similaires -->
            <div class="pt-16 border-t border-eloria-beige">
                <h3 class="font-serif text-2xl text-center mb-10">Vous Aimerez Aussi</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    ${related.map(renderProductCard).join('')}
                </div>
            </div>
        </div>
    `;
}

// 4. PAGE CHECKOUT
function renderCheckout() {
    const cart = store.cart;
    const total = store.getCartTotal();

    if (cart.length === 0) {
        return `
            <div class="max-w-md mx-auto text-center py-20 px-6">
                <h1 class="font-serif text-2xl mb-4">Votre panier est vide</h1>
                <a href="#/shop" class="inline-block px-6 py-3 bg-eloria-black text-white text-xs uppercase tracking-widest">Retour au catalogue</a>
            </div>
        `;
    }

    return `
        <div class="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
            <h1 class="font-serif text-3xl text-center mb-12">Finaliser votre Commande</h1>
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <!-- Formulaire adresse -->
                <div class="lg:col-span-7 space-y-6">
                    <div class="bg-white p-6 border border-eloria-beige">
                        <h2 class="font-serif text-xl mb-4">1. Adresse de Livraison</h2>
                        <div class="grid grid-cols-2 gap-4 text-xs">
                            <input type="text" placeholder="Prénom" class="p-3 border border-eloria-beige focus:outline-none focus:border-eloria-gold col-span-1">
                            <input type="text" placeholder="Nom" class="p-3 border border-eloria-beige focus:outline-none focus:border-eloria-gold col-span-1">
                            <input type="email" placeholder="Email" class="p-3 border border-eloria-beige focus:outline-none focus:border-eloria-gold col-span-2">
                            <input type="text" placeholder="Adresse" class="p-3 border border-eloria-beige focus:outline-none focus:border-eloria-gold col-span-2">
                            <input type="text" placeholder="Code Postal" class="p-3 border border-eloria-beige focus:outline-none focus:border-eloria-gold col-span-1">
                            <input type="text" placeholder="Ville" class="p-3 border border-eloria-beige focus:outline-none focus:border-eloria-gold col-span-1">
                        </div>
                    </div>

                    <div class="bg-white p-6 border border-eloria-beige">
                        <h2 class="font-serif text-xl mb-4">2. Mode de Paiement</h2>
                        <p class="text-xs text-eloria-gray mb-4">Zone prête pour intégration sécurisée Stripe / PayPal.</p>
                        <div class="p-4 bg-eloria-cream border border-eloria-gold/40 text-center text-xs uppercase tracking-wider">
                            Paiement Sécurisé SSL Simulation
                        </div>
                    </div>
                </div>

                <!-- Récapitulatif -->
                <div class="lg:col-span-5 bg-white p-6 border border-eloria-beige h-fit space-y-4">
                    <h2 class="font-serif text-xl border-b border-eloria-beige pb-3">Récapitulatif</h2>
                    ${cart.map(item => `
                        <div class="flex justify-between items-center text-xs">
                            <span>${item.name} x${item.quantity}</span>
                            <span class="font-semibold">${item.price * item.quantity} €</span>
                        </div>
                    `).join('')}
                    <div class="border-t border-eloria-beige pt-3 flex justify-between font-serif text-lg font-bold">
                        <span>Total</span>
                        <span>${total} €</span>
                    </div>
                    <button id="place-order-btn" class="w-full py-4 bg-eloria-black text-white text-xs uppercase tracking-[0.2em] hover:bg-eloria-gold transition-colors">
                        Confirmer la Commande
                    </button>
                </div>
            </div>
        </div>
    `;
}

// --- INITIALISATION & LOGIQUE GLOBALE ---

function renderApp() {
    const { path, params } = getRoute();
    const appView = document.getElementById('app-view');
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    const cartDrawerContainer = document.getElementById('cart-drawer-container');

    // Rendu global des conteneurs
    headerContainer.innerHTML = renderHeader(path);
    footerContainer.innerHTML = renderFooter();
    cartDrawerContainer.innerHTML = renderCartDrawer();

    // Routing vers la vue demandée
    switch (path) {
        case '/shop':
            appView.innerHTML = renderShop(params);
            break;
        case '/product':
            appView.innerHTML = renderProductDetail(params);
            break;
        case '/checkout':
            appView.innerHTML = renderCheckout();
            break;
        case '/':
        default:
            appView.innerHTML = renderHome();
            break;
    }

    attachEvents();
    window.scrollTo(0, 0);
}

function attachEvents() {
    // Event Add to Cart
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.onclick = (e) => {
            const id = e.currentTarget.dataset.id;
            const product = PRODUCTS.find(p => p.id === id);
            if (product) {
                store.addToCart(product);
                showToast(`${product.name} ajouté au panier`);
            }
        };
    });

    // Event Wishlist Toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.onclick = (e) => {
            const id = e.currentTarget.dataset.id;
            const product = PRODUCTS.find(p => p.id === id);
            if (product) {
                const added = store.toggleWishlist(product);
                showToast(added ? 'Ajouté à vos favoris' : 'Retiré des favoris');
            }
        };
    });

    // Event Drawer Panier Toggle
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const closeCartOverlay = document.getElementById('close-cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');

    if (openCartBtn && cartDrawer) {
        openCartBtn.onclick = () => cartDrawer.classList.remove('hidden');
    }
    if (closeCartBtn && cartDrawer) {
        closeCartBtn.onclick = () => cartDrawer.classList.add('hidden');
    }
    if (closeCartOverlay && cartDrawer) {
        closeCartOverlay.onclick = () => cartDrawer.classList.add('hidden');
    }

    // Adjust quantities in Cart
    document.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.onclick = (e) => {
            const id = e.currentTarget.dataset.id;
            const action = e.currentTarget.dataset.action;
            const item = store.cart.find(i => i.id === id);
            if (item) {
                store.updateQuantity(id, action === 'inc' ? item.quantity + 1 : item.quantity - 1);
            }
        };
    });

    // Remove item from Cart
    document.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.onclick = (e) => {
            const id = e.currentTarget.dataset.id;
            store.removeFromCart(id);
        };
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.onclick = () => mobileMenu.classList.toggle('hidden');
    }
}

function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'alert bg-eloria-black text-white text-xs uppercase tracking-wider p-4 rounded-none shadow-xl transition-all';
    toast.innerText = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// Inscription de la mise à jour UI sur le store
store.subscribe(renderApp);

// Écoute des changements de route SPA

window.addEventListener('hashchange', renderApp);
window.addEventListener('DOMContentLoaded', renderApp);