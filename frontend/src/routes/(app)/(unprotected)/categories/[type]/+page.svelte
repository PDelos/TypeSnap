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

<!-- Title Section -->
<section>
<h1 class="text-5xl font-custom px-6 pb-2">{currentType}</h1>
</section>

<!-- Typography Grid Section -->
<section class="grid grid-cols-2 px-6 overflow-y-auto no-scrollbar">
{#each filteredTypographies as typography}
  <!-- Typography Item Card -->
  <div class="m-2">
    <h2 class="text-md font-bold uppercase">{typography.name}</h2>
    <button 
      onclick={() => goto('/' + typography.id)}
      class="flex items-center justify-center rounded-xl border-1 
             border-[#F7F7F7] hover:bg-[#FF00DB] 
             active:bg-[#FF00DB] transition-all
               duration-150 w-full h-50"
    >
      <img 
        src={getImageUrl(typography.id, typography.gimage)} 
        alt={typography.name} 
        class="max-w-[80%] max-h-[90%] object-contain"
      />
    </button>
  </div>
{/each}
</section>