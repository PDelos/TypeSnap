<script lang="ts">
    let { children } = $props();
  </script>
  
    
  <!-- Main content -->
  <section class="w-full h-full">
    <section class="flex flex-col justify-end items-center h-[30%]">
      <img 
        src="assets/CATEGORIZE.png" 
        alt="Title" 
        class="w-[97%] mb-2"
      />
      <h1 class="text-2xl font uppercase mb-4">THE TYPOGRAPHY</h1>
      <h1 class="text-md font-thin uppercase mb-2">VOX-ATYPI</h1>
    </section>
  
    {@render children()}
  </section>