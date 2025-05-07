<script lang="ts">
    import { goto } from '$app/navigation';

    let { data } = $props();
    
    const typographies = data.typographies;
    const uniqueTypes = $derived([...new Set(typographies.map(typography => typography.type))]);
    // aixo es molt feo xd
    const types = $derived(uniqueTypes.length < 2 ? uniqueTypes : 
      [uniqueTypes[uniqueTypes.length - 1], 
       ...uniqueTypes.slice(1, uniqueTypes.length - 1), 
       uniqueTypes[0]]);

</script>

<section class="flex justify-center h-[70%]">
  <div class="gap-4 flex flex-col items-center w-full px-6">
    {#each types as type}
      <button 
        onclick={() => goto('/categories/' + type)}
        class="h-full w-full text-4xl font-sloop rounded-lg border-1 border-[#F7F7F7] hover:bg-[#FF00DB]"
      >
        {type}
      </button>
    {/each}
  </div>
</section>