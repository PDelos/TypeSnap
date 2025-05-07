<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  
  let { children } = $props();

  function goBack() {
      window.history.back();
  }
</script>

<main class="flex flex-col h-screen w-screen">
  <!-- Top Section: Navigation -->
  <section class="flex w-full justify-between items-center px-2 py-4 h-[8%]"> 
    <!-- Back arrow -->
    <button 
      onclick={goBack}
      class="p-2 flex items-center justify-center rounded-full
             hover:bg-[#FF00DB]
             active:bg-[#FF00DB] active:scale-95
             transition-all duration-150"
      aria-label="Go back"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
    
    <!-- Logo -->
    <img 
      src="/assets/GLYPHS.png" 
      alt="Logo"
      class="h-full"
    />
  </section>
  
  <!-- Main Content Section -->
  <section class="flex-1">
    {@render children()}
  </section>
</main>