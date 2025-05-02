<script lang="ts">
    import { goto } from '$app/navigation';

    let { data } = $props();
    
    const typographies = data.typographies;
    const types = $derived([...new Set(typographies.map(typography => typography.type))]);

</script>

<main class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Typography Showcase</h1>
  <div class="gap-6 flex flex-col justify-center items-center">
    {#each types as type}
      <button 
        onclick={() => goto('/categories/' + type)}
        class="h-[30%] w-[50%] font-semibold rounded-lg bg-[#F7F7F7] text-[#1C1C1C] hover:bg-[#FF00DB] hover:text-[#F7F7F7]"
      >
        {type}
      </button>
    {/each}
  </div>
</main>