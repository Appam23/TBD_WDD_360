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
  window.dispatchEvent(new CustomEvent("cart-updated"));
}

async function addToCartHandler(e: Event) {
  const button = e.currentTarget as HTMLButtonElement;
  const productId = button.dataset.id;
  const selectedColor = document.querySelector<HTMLInputElement>(
    'input[name="color"]:checked',
  )?.value;

  if (!productId || !selectedColor) return;

  const product = await findProductById(productId);
  const color = product?.colors.find(
    (productColor) => productColor.colorCode === selectedColor,
  );

  if (product && color) {
    addProductToCart({
      ...product,
      colors: [color],
    });
  }
}

document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);
