document.addEventListener("alpine:init", () => {
  Alpine.data("cartPage", () => ({
    cart: [],

    init() {
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.updateSummary();
    },

    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.updateSummary();
    },

    removeItem(i) {
      this.cart.splice(i, 1);
      this.updateCart();
    },

    cartTotal() {
      return this.cart.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      );
    },

    updateSummary() {
      let subtotal = this.cartTotal();
      let tax = subtotal * 0.12; // 12% pajak
      let total = subtotal + tax;

      let subtotalEl = document.getElementById("cart-subtotal");
      let taxEl = document.getElementById("cart-tax");
      let totalEl = document.getElementById("cart-total");

      if (subtotalEl)
        subtotalEl.textContent = "Rp. " + subtotal.toLocaleString();
      if (taxEl) taxEl.textContent = "Rp. " + tax.toLocaleString();
      if (totalEl) totalEl.textContent = "Rp. " + total.toLocaleString();
    },
  }));
});
