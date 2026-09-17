import { store } from './store.js';

export function renderHeader(currentPath) {
    const cartCount = store.getCartCount();
    const wishlistCount = store.wishlist.length;

    return `
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="lg:hidden text-eloria-black p-2 focus:outline-none" aria-label="Menu Mobile">
                <i class="fa-solid fa-bars text-xl"></i>
            </button>

            <!-- Brand Logo -->
            <a href="#/" class="text-2xl md:text-3xl font-serif tracking-[0.25em] font-normal uppercase hover:opacity-80 transition-opacity">
                ÉLORIA
            </a>

            <!-- Navigation Desktop -->
            <nav class="hidden lg:flex items-center space-x-10 text-xs uppercase tracking-[0.2em] font-medium text-eloria-black/80">
                <a href="#/shop" class="hover:text-eloria-gold transition-colors ${currentPath === '/shop' ? 'text-eloria-gold border-b border-eloria-gold pb-1' : ''}">Collection</a>
                <a href="#/shop?cat=Parfums" class="hover:text-eloria-gold transition-colors">Parfums</a>
                <a href="#/shop?cat=Soins" class="hover:text-eloria-gold transition-colors">Beauté & Soins</a>
                <a href="#/about" class="hover:text-eloria-gold transition-colors ${currentPath === '/about' ? 'text-eloria-gold border-b border-eloria-gold pb-1' : ''}">Maison Éloria</a>
                <a href="#/journal" class="hover:text-eloria-gold transition-colors ${currentPath === '/journal' ? 'text-eloria-gold border-b border-eloria-gold pb-1' : ''}">Journal</a>
            </nav>

            <!-- Right Actions -->
            <div class="flex items-center space-x-5 text-lg text-eloria-black">
                <button id="open-search-btn" class="hover:text-eloria-gold transition-colors p-1" aria-label="Recherche">
                    <i class="fa-solid fa-magnifying-glass text-base"></i>
                </button>
                <a href="#/wishlist" class="hover:text-eloria-gold transition-colors p-1 relative" aria-label="Favoris">
                    <i class="fa-regular fa-heart text-base"></i>
                    ${wishlistCount > 0 ? `<span class="absolute -top-1 -right-2 bg-eloria-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">${wishlistCount}</span>` : ''}
                </a>
                <button id="open-cart-btn" class="hover:text-eloria-gold transition-colors p-1 relative" aria-label="Panier">
                    <i class="fa-solid fa-bag-shopping text-base"></i>
                    ${cartCount > 0 ? `<span class="absolute -top-1 -right-2 bg-eloria-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">${cartCount}</span>` : ''}
                </button>
            </div>
        </div>

        <!-- Mobile Nav Menu Overlay -->
        <div id="mobile-menu" class="hidden lg:hidden bg-eloria-cream border-b border-eloria-beige px-6 py-6 transition-all">
            <nav class="flex flex-col space-y-4 text-sm tracking-[0.15em] uppercase font-medium">
                <a href="#/shop" class="hover:text-eloria-gold">Toute la Collection</a>
                <a href="#/shop?cat=Parfums" class="hover:text-eloria-gold">Parfums</a>
                <a href="#/shop?cat=Soins" class="hover:text-eloria-gold">Soins & Beauté</a>
                <a href="#/about" class="hover:text-eloria-gold">La Maison Éloria</a>
                <a href="#/journal" class="hover:text-eloria-gold">Journal</a>
            </nav>
        </div>
    `;
}

export function renderProductCard(product) {
    const isFav = store.isInWishlist(product.id);

    return `
        <div class="group relative flex flex-col bg-white border border-eloria-beige/40 p-4 transition-all duration-300 hover:shadow-lg">
            <div class="relative aspect-square w-full img-zoom-container bg-eloria-beige/20 mb-4 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover object-center" loading="lazy">
                
                ${product.isNew ? `<span class="absolute top-3 left-3 bg-eloria-black text-white text-[9px] uppercase tracking-[0.2em] px-2 py-1">Nouveauté</span>` : ''}
                ${product.isBestSeller ? `<span class="absolute top-3 left-3 bg-eloria-gold text-white text-[9px] uppercase tracking-[0.2em] px-2 py-1">Best-Seller</span>` : ''}

                <!-- Quick Wishlist Button -->
                <button data-id="${product.id}" class="wishlist-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-eloria-black hover:text-eloria-gold transition-colors">
                    <i class="${isFav ? 'fa-solid text-eloria-gold' : 'fa-regular'} fa-heart text-sm"></i>
                </button>

                <!-- Quick Add Overlay Desktop -->
                <div class="absolute inset-x-0 bottom-0 p-3 bg-white/90 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                    <button data-id="${product.id}" class="add-to-cart-btn w-full py-2 bg-eloria-black text-white text-xs uppercase tracking-widest hover:bg-eloria-gold transition-colors">
                        Ajouter au panier
                    </button>
                </div>
            </div>

            <div class="flex-grow flex flex-col justify-between text-center">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.2em] text-eloria-gray mb-1">${product.subCategory}</p>
                    <h3 class="font-serif text-xl tracking-wide text-eloria-black mb-1">
                        <a href="#/product?id=${product.id}" class="hover:text-eloria-gold transition-colors">${product.name}</a>
                    </h3>
                    <p class="text-xs text-eloria-gray font-light mb-2">${product.subtitle}</p>
                </div>

                <div class="mt-2 pt-2 border-t border-eloria-beige/60 flex items-center justify-between">
                    <span class="text-sm font-medium text-eloria-black">${product.price} €</span>
                    <button data-id="${product.id}" class="add-to-cart-btn md:hidden text-xs uppercase tracking-wider font-semibold text-eloria-gold">
                        + Ajouter
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function renderCartDrawer() {
    const cart = store.cart;
    const total = store.getCartTotal();

    return `
        <div id="cart-drawer" class="fixed inset-0 z-50 overflow-hidden hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div class="absolute inset-0 bg-eloria-black/50 backdrop-blur-sm transition-opacity" id="close-cart-overlay"></div>

            <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div class="w-screen max-w-md bg-eloria-cream text-eloria-black shadow-2xl flex flex-col">
                    <!-- Drawer Header -->
                    <div class="p-6 border-b border-eloria-beige flex items-center justify-between">
                        <h2 class="font-serif text-2xl tracking-wider">Votre Panier (${store.getCartCount()})</h2>
                        <button id="close-cart-btn" class="p-2 text-eloria-gray hover:text-eloria-black">
                            <i class="fa-solid fa-xmark text-xl"></i>
                        </button>
                    </div>

                    <!-- Items List -->
                    <div class="flex-grow overflow-y-auto p-6 space-y-6">
                        ${cart.length === 0 ? `
                            <div class="text-center py-16">
                                <i class="fa-solid fa-bag-shopping text-4xl text-eloria-beige mb-4"></i>
                                <p class="text-sm tracking-wider uppercase text-eloria-gray">Votre panier est vide</p>
                                <a href="#/shop" class="close-drawer-link inline-block mt-6 px-6 py-3 bg-eloria-black text-white text-xs uppercase tracking-widest hover:bg-eloria-gold transition-colors">Découvrir le catalogue</a>
                            </div>
                        ` : cart.map(item => `
                            <div class="flex items-center space-x-4 border-b border-eloria-beige/60 pb-4">
                                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover bg-white p-1 border border-eloria-beige">
                                <div class="flex-grow">
                                    <h4 class="font-serif text-lg leading-snug">${item.name}</h4>
                                    <p class="text-xs text-eloria-gray mb-2">${item.price} €</p>
                                    <div class="flex items-center space-x-3">
                                        <button data-id="${item.id}" data-action="dec" class="cart-qty-btn border border-eloria-beige w-6 h-6 flex items-center justify-center text-xs hover:bg-white">-</button>
                                        <span class="text-xs font-medium">${item.quantity}</span>
                                        <button data-id="${item.id}" data-action="inc" class="cart-qty-btn border border-eloria-beige w-6 h-6 flex items-center justify-center text-xs hover:bg-white">+</button>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-semibold mb-2">${item.price * item.quantity} €</p>
                                    <button data-id="${item.id}" class="remove-cart-item text-xs text-red-800 hover:underline">Supprimer</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Drawer Footer -->
                    ${cart.length > 0 ? `
                        <div class="p-6 border-t border-eloria-beige bg-white space-y-4">
                            <div class="flex justify-between items-center text-sm font-medium">
                                <span class="uppercase tracking-widest text-xs text-eloria-gray">Sous-total</span>
                                <span class="text-lg font-serif font-bold">${total} €</span>
                            </div>
                            <p class="text-[11px] text-eloria-gray text-center">Frais de port offerts & Échantillons offerts dans chaque commande.</p>
                            <a href="#/checkout" class="close-drawer-link block text-center w-full py-4 bg-eloria-black text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-eloria-gold transition-colors">
                                Procéder au paiement
                            </a>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

export function renderFooter() {
    return `
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-eloria-beige/20 text-xs">
            <div>
                <h3 class="font-serif text-xl tracking-[0.2em] mb-4 text-white">ÉLORIA</h3>
                <p class="text-eloria-beige/70 leading-relaxed font-light mb-4">
                    Haute Parfumerie & Éditions Rare. Des créations olfactives pensées pour sculpter le temps et éveiller les sens.
                </p>
                <div class="flex space-x-4 text-sm text-eloria-beige/80">
                    <a href="#" class="hover:text-eloria-gold"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" class="hover:text-eloria-gold"><i class="fa-brands fa-pinterest"></i></a>
                    <a href="#" class="hover:text-eloria-gold"><i class="fa-brands fa-facebook"></i></a>
                </div>
            </div>

            <div>
                <h4 class="uppercase tracking-[0.2em] font-semibold mb-4 text-eloria-gold">Maison</h4>
                <ul class="space-y-2 text-eloria-beige/70">
                    <li><a href="#/about" class="hover:underline">Notre Histoire</a></li>
                    <li><a href="#/about" class="hover:underline">Savoir-Faire & Ingrédients</a></li>
                    <li><a href="#/journal" class="hover:underline">Le Journal ÉLORIA</a></li>
                    <li><a href="#/contact" class="hover:underline">Engagements Éco-responsables</a></li>
                </ul>
            </div>

            <div>
                <h4 class="uppercase tracking-[0.2em] font-semibold mb-4 text-eloria-gold">Boutique</h4>
                <ul class="space-y-2 text-eloria-beige/70">
                    <li><a href="#/shop?cat=Parfums" class="hover:underline">Eaux de Parfum</a></li>
                    <li><a href="#/shop?cat=Soins" class="hover:underline">Soins & Huiles</a></li>
                    <li><a href="#/shop?cat=Coffrets" class="hover:underline">Coffrets d'Exception</a></li>
                    <li><a href="#/shop" class="hover:underline">Nouveautés</a></li>
                </ul>
            </div>

            <div>
                <h4 class="uppercase tracking-[0.2em] font-semibold mb-4 text-eloria-gold">Service Client</h4>
                <ul class="space-y-2 text-eloria-beige/70">
                    <li><a href="#/contact" class="hover:underline">Nous Contacter</a></li>
                    <li><a href="#/faq" class="hover:underline">Livraisons & Retours</a></li>
                    <li><a href="#/faq" class="hover:underline">Questions Fréquentes</a></li>
                    <li><a href="#/faq" class="hover:underline">Mentions Légales & CGV</a></li>
                </ul>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-eloria-beige/50">
            <p>© 2026 ÉLORIA Haute Parfumerie. Tous droits réservés.</p>
            <div class="flex space-x-6 mt-4 md:mt-0">
                <span>Paiement Sécurisé</span>
                <span>Expédition Internationale</span>
            </div>
        </div>
    `;
}
