<script lang="ts">
  let searchTerm = $state("");

  function submitSearch(event: SubmitEvent) {
    event.preventDefault();
    const query = searchTerm.trim();

    if (!query) {
      return;
    }

    window.location.href = `/product-list/?q=${encodeURIComponent(query)}`;
  }
</script>

<form class="search-form" role="search" onsubmit={submitSearch}>
  <label class="sr-only" for="site-search">Search products</label>
  <input
    id="site-search"
    type="search"
    bind:value={searchTerm}
    placeholder="Search products"
    autocomplete="off"
  />
  <button type="submit">Search</button>
</form>

<style>
  .search-form {
    display: flex;
    gap: 0.35rem;
    align-items: center;
  }

  input {
    width: min(28vw, 220px);
    padding: 0.4rem;
  }

  button {
    padding: 0.4rem 0.6rem;
    cursor: pointer;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
