import type { Product } from "./types.mts";
import { setLocalStorage, getLocalStorage } from "./utils.mts";
import { findProductById } from "./productData.mts";


function addProductToCart(product: Product) {
  let cartContents: Product[] = [];
  
  if (getLocalStorage("so-cart") == "") {
    cartContents = [];
  }
  
  cartContents = getLocalStorage("so-cart");

  cartContents.push(product);

  setLocalStorage("so-cart", cartContents);

  // setLocalStorage("so-cart", product);
}

// add to cart button event handler
async function addToCartHandler(e: Event) {
  const target = e.target as HTMLButtonElement;
  if (target.dataset.id) {
    const product = await findProductById(target.dataset.id);
    addProductToCart(product);
  }
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);
