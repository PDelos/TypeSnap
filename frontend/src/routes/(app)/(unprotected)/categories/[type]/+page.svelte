<script lang="ts">
    import { goto } from '$app/navigation';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
  
    let { data } = $props();
    
    const typographies = data.typographies;
    const currentType = data.type;
    
    const filteredTypographies = $derived(
      typographies.filter(typography => typography.type === currentType)
    );
  
    function getImageUrl(type_id: string, gimage: string) {
      return `${PUBLIC_POCKETBASE_URL}/api/files/typographies/${type_id}/${gimage}`;
    }
  </script>
  
  <main class="flex flex-col items-center mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Typography: {currentType}</h1>
    
    <div class="grid grid-cols-2 w-200 gap-12 place-items-center overflow-y-auto no-scrollbar">
    {#each filteredTypographies as typography}
        <div>
            <h2 class="text-xl font-bold mb-4">{typography.name}</h2>
            <button 
                onclick={() => goto('/' + typography.id)}
                class="flex justify-center items-center rounded-lg border-2 border-[#F7F7F7] hover:bg-[#FF00DB] p-4 w-60"
            >
                <img 
                    src={getImageUrl(typography.id, typography.gimage)} 
                    alt={typography.name} 
                    class="m-4" 
                />
            </button>
        </div>
    {/each}
    </div>
    
  </main>
  