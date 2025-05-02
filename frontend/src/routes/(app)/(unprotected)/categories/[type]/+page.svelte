<script lang="ts">
    import { goto } from '$app/navigation';

    let { data } = $props();
    
    // Get all typographies
    const typographies = data.typographies;
    
    // Get current type from page parameters
    const currentType = data.type;
    
    // Filter typographies by the current type
    const filteredTypographies = $derived(typographies.filter(typography => typography.type === currentType));
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Typography: {currentType}</h1>
    
    <div class="gap-6 flex flex-col justify-center items-center">
        {#if filteredTypographies.length === 0}
            <p class="text-gray-500">No typographies found with type "{currentType}"</p>
        {:else}
            {#each filteredTypographies as typography}
            <button 
                onclick={() => goto('/'+typography.id)}
                class="h-[30%] w-[50%] font-semibold rounded-lg bg-[#F7F7F7] text-[#1C1C1C] hover:bg-[#FF00DB] hover:text-[#F7F7F7]"
            >
                {typography.name}
            </button>
            {/each}
        {/if}
    </div>
</main>