<script lang="ts">
  import { loginWithProvider } from '$lib/auth';
</script>

<div class="auth-buttons">
  <button on:click={() => loginWithProvider('google')}>Login with Google</button>
  <button on:click={() => loginWithProvider('github')}>Login with GitHub</button>
</div>

<style>
  .auth-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem auto;
    max-width: 300px;
  }
  
  button {
    padding: 0.75rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
  }
</style>