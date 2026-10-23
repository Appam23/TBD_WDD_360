// wrapper for querySelector...returns matching element
export function qs(selector:string, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Invalid localStorage data for "${key}". Resetting it.`);
    localStorage.removeItem(key);
    return [];
  }
}

export function setLocalStorage(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param: string): string | null {
  return new URLSearchParams(window.location.search).get(param);
}

// set a listener for both touchend and click
interface ClickHandler {
  (e:Event):void;
}

export function setClick(selector:string, callback:ClickHandler) {
  const element = qs(selector);
  element?.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  element?.addEventListener("click", callback);
}

export function openUserMenu(selector:string) {
  setClick(selector, (e:Event) => {
    e.stopPropagation();
    const el = document.querySelector(".user__menu");
    el?.classList.toggle("open");
  });
  setClick("body", () => {
    const openMenus = document.querySelectorAll(".open");
    openMenus.forEach((el) => {
      el?.classList.remove("open");
    });
  });
}
