<script lang="ts">
    let { data } = $props();
    
    const typography = data.item;
</script>

<main class="container mx-auto px-4 py-8">
    <div class="mb-6">
        <a href="/" class="text-blue-600 hover:underline">&larr; Back to all typographies</a>
    </div>
    
    <div class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-3xl font-bold mb-4">{typography.name}</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h2 class="text-xl font-semibold mb-3">Typography Details</h2>
                <div class="space-y-2">
                    <p><span class="font-medium">Type:</span> {typography.type}</p>
                    <p><span class="font-medium">Created:</span> {new Date(typography.created).toLocaleDateString()}</p>
                    <p><span class="font-medium">Last Updated:</span> {new Date(typography.updated).toLocaleDateString()}</p>
                </div>
            </div>
            
            {#if typography.expand?.info}
                <div>
                    <h2 class="text-xl font-semibold mb-3">Additional Information</h2>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p>{typography.expand.info.info}</p>
                    </div>
                </div>
            {:else}
                <div>
                    <h2 class="text-xl font-semibold mb-3">Additional Information</h2>
                    <p class="text-gray-500 italic">No additional information available</p>
                </div>
            {/if}
        </div>
    </div>
</main>