<script lang="ts">
    let { children } = $props();
</script>

<div class="relative min-h-screen">
  <!-- Top right image -->
  <div class="flex w-full justify-end p-2"> 
    <img 
      src="/assets/01.inici/GLYPHS.png" 
      alt="Logo" 
      class="h-10 object-contain"
    />
  </div>
  
  <!-- Main content -->
  <div class="w-full">
    {@render children()}
  </div>
</div>