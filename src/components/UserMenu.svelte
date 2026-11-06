<script lang="ts">
  import { onMount } from "svelte";
  import { userStore, logout, checkAuth } from "../js/auth.svelte.ts";

  let visible = $state(false);

  function openUserMenu(event: MouseEvent) {
    event.stopPropagation();
    visible = !visible;
  }

  function closeMenu() {
    visible = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeMenu();
    }
  }

  // Using functions from our auth.svelte.ts file (Step 2.5)
  function handleLogout() {
    logout();
    closeMenu();
  }

  onMount(() => {
    // Using function from our auth.svelte.ts file (Step 2.6)
    checkAuth();
    
    window.addEventListener("click", closeMenu);
    window.addEventListener("scroll", closeMenu, true);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("click", closeMenu);
      window.removeEventListener("scroll", closeMenu, true);
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>


<div class="user">
  <!-- Created Svelte {#if} statement to show username from local storage when logged in (Step 2.7) -->
  {#if userStore.isLoggedIn}
    <span class="user_name">{userStore.user?.name}</span>
  {/if}

  <button
    type="button"
    class="user__button"
    aria-label="user management"
    aria-expanded={visible}
    title="User Management"
    onclick={openUserMenu}
  >
    <img src="/images/noun-hiker.svg" alt="user icon" />
  </button>

  <nav class="user__menu" class:open={visible}>
    <!-- Created Svelte {#if} statement to show a different menu based on if user is logged in (Step 2.7) -->
    {#if !userStore.isLoggedIn}
      <a href="/login">Login</a>
    {:else}
      <a href="/login" onclick={handleLogout}>Logout</a>
      <a href="#">Profile</a>
      <a href="#">Orders</a>
    {/if}
  </nav>
</div>

<style>
  .user {
    position: relative;
    display: flex;
    align-items: flex-end;
  }

  /* Arbituary Styling set to look a little cleaner (Step 2.7) */
  .user_name {
    margin-right: 0.75rem;
    margin-bottom: 0.35rem;
  }

  .user__menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
  }
</style>