<script lang="ts">
  import { register } from "../js/auth.svelte.ts";

  let name = $state("");
  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let errorMessage = $state("");

  async function registerHandler(event: Event) {
    event.preventDefault();
    errorMessage = "";

    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match";
      return;
    }

    try {
      await register(email, password, name);
      window.location.href = "/";
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "Registration failed";
    }
  }
</script>

<h2>Create an account</h2>
{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}
<form onsubmit={registerHandler} class="register-form">
  <label>
    Name:
    <input type="text" bind:value={name} autocomplete="name" required />
  </label>
  <label>
    Email:
    <input type="email" bind:value={email} autocomplete="email" required />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} autocomplete="new-password" required />
  </label>
  <label>
    Confirm password:
    <input type="password" bind:value={confirmPassword} autocomplete="new-password" required />
  </label>
  <button type="submit">Register</button>
</form>
<p class="login-link">Already have an account? <a href="/login">Login</a></p>

<style>
  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  input {
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  }
  .login-link {
    text-align: center;
  }
</style>
