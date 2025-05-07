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
    <section class="w-full h-[80%] px-6">
        <img 
            src={getInfoImageUrl(information.id, information.title)}
            alt="Title" 
            class="w-full pb-4"
        />

        <section class="flex flex-col h-full w-full">
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

            <section class="h-[15%]">
            </section>

            <!-- Information -->
            <section class="grid grid-cols-2 gap-2">
                <div class="flex justify-center items-start h-full w-full">
                    <img 
                        src={getTypoImageUrl(typography.id, typography.gimage)}
                        alt="Gimage" 
                        class="w-full"
                    />
                </div>
                <div class="flex flex-col">
                    {#each information.settings.characteristics as characteristic}
                        <p class="text-md font mb-1">{characteristic}</p>
                        <hr class="border-t border-gray-300 mb-4" />
                    {/each}
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