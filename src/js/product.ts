import type { Product } from "./types.mts";
import { getLocalStorage, setLocalStorage } from "./utils.mts";
import { findProductById } from "./productData.mts";

function addProductToCart(product: Product) {
  const storedCart = getLocalStorage("so-cart");

  const cart: Product[] = Array.isArray(storedCart)
    ? storedCart
    : storedCart
      ? [storedCart]
      : [];

  cart.push(product);

  setLocalStorage("so-cart", cart);
}

async function addToCartHandler(e: Event) {
  const button = e.currentTarget as HTMLButtonElement;
  const productId = button.dataset.id;

  if (!productId) return;

  const product = await findProductById(productId);

  if (product) {
    addProductToCart(product);
  }
}

document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);
