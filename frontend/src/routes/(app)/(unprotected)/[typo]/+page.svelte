<script lang="ts">
    import { goto } from '$app/navigation';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

    let { data } = $props();
    
    const typography = data.item || {};
    const information = typography.expand?.info;

    function getInfoImageUrl(info_id: string, image: string) {
      if (!info_id || !image) return '';
      return `${PUBLIC_POCKETBASE_URL}/api/files/pbc_3649584119/${info_id}/${image}`;
    }

    function getTypoImageUrl(type_id: string, gimage: string) {
      if (!type_id || !gimage) return '';
      return `${PUBLIC_POCKETBASE_URL}/api/files/typographies/${type_id}/${gimage}`;
    }
</script>


{#if typography && typography.expand && typography.expand.info}
    <!-- Content when information exists -->
    <section class="w-full h-full px-6 pb-24 overflow-y-scroll">
        <section class="w-full flex-none pb-4">
            <img 
                src={getInfoImageUrl(information.id, information.title)}
                alt="Title" 
                class="w-full"
            />
        </section>

        <section class="flex flex-col gap-4">
            <!-- Images -->
            <section class="grid grid-cols-[2fr_1fr] gap-2">
                <img 
                    src={getInfoImageUrl(information.id, information.photos[0])}
                    alt="Photo1" 
                    class="w-full"
                />
                <div class="flex flex-col w-full">
                    <img 
                        src={getInfoImageUrl(information.id, information.photos[1])}
                        alt="Photo2"
                    />
                    <div class="flex flex-col justify-center items-center h-full">
                        {#each information.settings.examples as example}
                            <p class="text-sm font-extrabold text-center mb-2">{example}</p>
                        {/each}
                    </div>
                </div>
            </section>

            <section class="flex h-[5%]">
            </section>

            <!-- Information -->
            <section class="flxex flex-col gap-4">
                <div class="grid grid-cols-2 gap-2">
                    <div class="flex justify-center items-start h-full w-ful">
                        <img 
                            src={getTypoImageUrl(typography.id, typography.gimage)}
                            alt="Gimage" 
                            class="max-w-[90%] max-h-[90%] object-contain"
                        />
                    </div>
                    <div class="flex flex-col">
                        <h2 class="text-xl font-bold mb-2 uppercase tracking-wide">Properties</h2>
                        <div class="flex flex-col space-y-3">
                            {#each information.settings.characteristics as characteristic, i}
                            <div>
                                <p class="font-light text-sm mb-1 leading-relaxed italic opacity-90">{characteristic}</p>
                                <div class="w-full h-[1px] bg-gradient-to-r from-[#F7F7F7] to-transparent opacity-90"></div>
                            </div>
                            {/each}
                        </div>
                    </div>
                        
                </div>
                <div class="mt-6 rounded-md p-5 shadow-lg border border-[#F7F7F7]">
                    <div class="flex flex-col">
                        <div class="mb-4 pb-2 border-b border-[#F7F7F7]">
                            <h2 class="text-lg font-bold tracking-wide uppercase">
                                Stephen Coles (2013)
                            </h2>
                            <p class="text-lg mt-1 ">
                                {information.settings.col_name}
                            </p>
                        </div>
                        
                        <div class="relative px-2">
                            <p class="font-light text-sm mb-4 text-justify leading-relaxed italic opacity-90">
                                {information.settings.justification}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </section>
{:else}
    <!-- Content when information doesn't exist -->
    <section class="w-full h-full flex flex-col px-10 items-center justify-center">
        <!-- Fallback for missing state -->
        <div class="flex flex-col items-center justify-center h-full gap-4">
            <div class="bg-[#F7F7F7] rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#1C1C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 class="text-xl font-bold ">No Typography Data</h2>
            <p class="text-center max-w-xs">
                There's no typography data available.
            </p>
            <button 
                onclick={() => goto('/categories')}
                class="mt-4 bg-[#F7F7F7] hover:bg-[#FF00DB] active:bg-[#FF00DB] px-6 py-2
                    rounded-lg flex justify-center items-center gap-2
                    transition-all duration-150"
            >
                <p class="text-xl uppercase text-[#1C1C1C] p-2">
                    Go to Categories
                </p>
            </button>
        </div>
    </section>
{/if}

<style>
    p {
      font-family: 'Helvetica Neue', sans-serif;
    }
    h2 {
      font-family: 'Gotham Black', sans-serif;
    }
</style>