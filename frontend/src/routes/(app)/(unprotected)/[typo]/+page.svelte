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

<main class="flex flex-col h-screen w-screen">
    <!-- Top right image -->
    <section class="flex w-full justify-end p-2 pt-4"> 
      <img 
        src="/assets/01.inici/GLYPHS.png" 
        alt="Logo" 
        class="h-8"
      />
    </section>

    {#if information}
        <!-- Content when information exists -->
        <section class="w-full h-full">
            <img 
                src={getInfoImageUrl(information.id, information.title)}
                alt="Title" 
                class="w-full p-2 pt-4"
            />

            <!-- Space -->
            <section class="h-[5%]">
            </section>

            <section class="flex flex-col justify-center h-[70%]">
                <!-- Images -->
                <section class="grid grid-cols-2 px-6 overflow-y-auto no-scrollbar">
                    <img 
                        src={getInfoImageUrl(information.id, information.photos[0])}
                        alt="Photo1" 
                        class="w-full p-2"
                    />
                    <div class="flex flex-col">
                        <img 
                            src={getInfoImageUrl(information.id, information.photos[1])}
                            alt="Photo2" 
                            class="w-full p-2"
                        />
                        <div class="flex flex-col">
                            {#each information.settings.examples as example}
                                <p class="text-sm font-thin mb-2">{example}</p>
                            {/each}
                        </div>
                    </div>
                </section>

                <!-- Information -->
                <section class="grid grid-cols-2 px-6 overflow-y-auto no-scrollbar">
                    <img 
                        src={getTypoImageUrl(typography.id, typography.gimage)}
                        alt="Gimage" 
                        class="w-full p-2"
                    />
                    <div class="flex flex-col">
                        {#each information.settings.characteristics as characteristic}
                            <p class="text-sm font-thin mb-2">{characteristic}</p>
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
</main>