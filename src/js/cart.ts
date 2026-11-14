import { getLocalStorage } from "./utils.mts";
import type { Product } from "./types.mts";

function renderCartContents() {
  const listEl = document.querySelector(".product-list");
  if (!listEl) return;

  const storedCart = getLocalStorage("so-cart");
  const cartItems: Product[] = Array.isArray(storedCart) ? storedCart : [];

  if (cartItems.length === 0) {
    listEl.innerHTML = '<li class="empty-cart">Your cart is empty.</li>';
    return;
  }

  listEl.innerHTML = cartItems
    .map((item: Product) => cartItemTemplate(item))
    .join("");
}

function cartItemTemplate(item: Product) {
  const image = item.images?.primarySmall;
  const colorName = item.colors?.[0]?.colorName ?? "Selected color";
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    ${image ? `<img src="${image}" alt="${item.name}" />` : ""}
  </a>
  <a href="#">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <p class="cart-card__color">${colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.finalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
