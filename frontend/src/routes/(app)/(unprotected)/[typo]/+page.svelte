<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

    let { data } = $props();
    
    const typography = data.item;
    const information = typography.expand?.info;

    function getInfoImageUrl(info_id: string, image: string) {
      return `${PUBLIC_POCKETBASE_URL}/api/files/pbc_3649584119/${info_id}/${image}`;
    }

    function getTypoImageUrl(type_id: string, gimage: string) {
      return `${PUBLIC_POCKETBASE_URL}/api/files/typographies/${type_id}/${gimage}`;
    }
</script>


{#if information}
    <!-- Content when information exists -->
    <section class="w-full h-full px-6 overflow-y-scroll">
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
                            <p class="text-sm font-extrabold mb-2">{example}</p>
                        {/each}
                    </div>
                </div>
            </section>

            <section class="flex h-[5%]">
            </section>

            <!-- Information -->
            <section class="grid grid-cols-2 gap-2">
                <div class="flex justify-center items-start h-full w-ful">
                    <img 
                        src={getTypoImageUrl(typography.id, typography.gimage)}
                        alt="Gimage" 
                        class="max-w-[90%] max-h-[90%] object-contain"
                    />
                </div>
                <div class="flex flex-col">
                    <p class="text-md font-bold mb-1"> Vox-ATypI: {information.settings.vox_name}</p>
                    <p class="text-sm font-thin mb-1 text-justify leading-relaxed">{information.settings.characteristics}</p>
                    <hr class="border-t border-[#F7F7F7] mb-4" />
                    <p class="text-md font-bold mb-1">Stephen Coles: {information.settings.col_name}</p>
                    <p class="text-sm font-thin mb-1 text-justify leading-relaxed">{information.settings.justification}</p>
                    <hr class="border-t border-[#F7F7F7] mb-4" />
                </div>
                    
            </section>
        </section>
    </section>
{:else}
    <!-- Content when information doesn't exist -->
    <section class="w-full h-full flex items-center justify-center">
        <p>No information available for this typography.</p>
    </section>
{/if}