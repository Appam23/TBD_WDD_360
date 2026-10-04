import type { Product } from "./types.mts";
import { getLocalStorage, setLocalStorage } from "./utils.mts";
import { findProductById } from "./productData.mts";

function saveProductToCart(product: Product): void {
  const existingData = getLocalStorage("so-cart");
  
  let cartList: Product[] = [];
  if (Array.isArray(existingData)) {
    cartList = existingData;
  } else if (existingData) {
    cartList = [existingData];
  }

  cartList.push(product);
  setLocalStorage("so-cart", cartList);
}

async function handleAddToCart(event: Event): Promise<void> {
  const target = event.currentTarget as HTMLButtonElement | null;
  const productId = target?.dataset?.id;

  if (!productId) {
    console.warn("No product ID found on target element.");
    return;
  }

  const selectedProduct = await findProductById(productId);
  if (selectedProduct) {
    saveProductToCart(selectedProduct);
  }
}

const addToCartBtn = document.getElementById("addToCart");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", handleAddToCart);
}