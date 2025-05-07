<script lang="ts">
  let { children } = $props();
</script>

<!-- Main container section -->  
<section class="w-full h-full">
  <!-- Header Section: Title and Image -->
  <section class="flex flex-col justify-end items-center h-[15%]">
    <h1 class="text-2xl font-thin uppercase">TYPOGRAPHY</h1>
    <img 
      src="/assets/CATEGORIES.png" 
      alt="Title" 
      class="w-[97%]"
    />
  </section>

  <!-- Spacer Section -->
  <section class="h-[5%]">
  </section>

  <!-- Content Section: Child Routes -->
  {@render children()}
</section>