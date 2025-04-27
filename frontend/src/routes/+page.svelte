<script lang="ts">
    let { data }= $props();
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Typography Showcase</h1>
    
    {#if data.typographies.length === 0}
      <p>No typographies found. Add some in your PocketBase dashboard.</p>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.typographies as typography}
            <h2 class="text-xl font-semibold mb-2">
              <a href="/typo/{typography.id}" class="hover:underline">{typography.name}</a>
            </h2>
        {/each}
      </div>
    {/if}
  </main>