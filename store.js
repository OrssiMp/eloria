class Store {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('eloria_cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('eloria_wishlist')) || [];
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify() {
        localStorage.setItem('eloria_cart', JSON.stringify(this.cart));
        localStorage.setItem('eloria_wishlist', JSON.stringify(this.wishlist));
        this.listeners.forEach(fn => fn());
    }

    // --- PANIER ---
    addToCart(product, quantity = 1) {
        const existingIndex = this.cart.findIndex(item => item.id === product.id);
        if (existingIndex > -1) {
            this.cart[existingIndex].quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }
        this.notify();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.notify();
    }

    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.notify();
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    // --- FAVORIS ---
    toggleWishlist(product) {
        const index = this.wishlist.findIndex(item => item.id === product.id);
        let added = false;
        if (index > -1) {
            this.wishlist.splice(index, 1);
        } else {
            this.wishlist.push(product);
            added = true;
        }
        this.notify();
        return added;
    }

    isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId);
    }
}

export const store = new Store();
