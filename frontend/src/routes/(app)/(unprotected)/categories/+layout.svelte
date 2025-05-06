<script lang="ts">
    let { children } = $props();
</script>

<main class="flex flex-col h-screen w-screen">
  <!-- Top right image -->
  <section class="flex w-full justify-end px-2 py-4"> 
    <img 
      src="/assets/01.inici/GLYPHS.png" 
      alt="Logo" 
      class="h-12"
    />
  </section>
  
  <!-- Main content -->
  <section class="w-full h-full">
    <section class="flex flex-col justify-end items-center h-[15%]">
      <h1 class="text-xl font-thin">TYPOGRAPHY</h1>
      <img 
        src="assets/02.secundaria/typography_categories/CATEGORIES.png" 
        alt="Title" 
        class="w-[97%]"
      />
    </section>
  
    <section class="h-[5%]">
    </section>

    {@render children()}
  </section>
</main>
