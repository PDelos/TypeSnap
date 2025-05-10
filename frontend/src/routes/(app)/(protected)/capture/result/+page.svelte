<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    let progressCircle: SVGCircleElement;
    
    // Access the navigation state from the page store
    $: navigationState = $page.state || {};
    $: capturedImage = navigationState.capturedImage;
    $: result = navigationState.result || {};

    $: hasStateData = !!capturedImage && Object.keys(result || {}).length > 0;

    import { onMount } from 'svelte';

    onMount(() => {
        if (result && result.confidence != null && progressCircle) {
            const radius = 30;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference * (1 - result.confidence / 100);
            // Animate with a slight delay
            setTimeout(() => {
                progressCircle.style.strokeDashoffset = `${offset}`;
            }, 100);
        }
    });
</script>
  
<section class="flex flex-col gap-4 h-[65%] px-14">
    {#if hasStateData}
        <!-- Image Preview Area -->
        <div class="border-1 border-[#F7F7F7] rounded-lg h-[50%] flex justify-center items-center overflow-hidden">
            <img src={capturedImage} alt="Captured" class="w-full h-full object-cover" />
        </div>

        <!-- Reason and confidence score -->
        <div class="grid grid-cols-[2fr_1fr] gap-2 w-full">
            <div>
                <p class="text-md font-extrabold mb-1 uppercase">Reason:</p>
                <p class="text-sm font-thin mb-1 text-justify leading-relaxed">{result.reason}</p>
            </div>
            
            <div class="flex flex-col w-full items-center justify-center">
                <p class="text-md font-extrabold uppercase">Confidence:</p>
                <div class="relative w-32 h-32 mx-auto">
                
                    <!-- Foreground animated circle -->
                    <svg class="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                        <circle
                            bind:this={progressCircle}
                            class="text-[#F7F7F7] transition-all duration-1000 ease-out"
                            stroke="currentColor"
                            stroke-width="8"
                            fill="transparent"
                            r="30"
                            cx="48"
                            cy="48"
                            stroke-dasharray="188.5"
                            stroke-dashoffset="188.5"
                            stroke-linecap="round"
                        />
                    </svg>
                
                    <!-- Center text -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <p class="text-xl font-bold text-[#F7F7F7]">
                            {Math.round(result.confidence || 0)}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Go to typography Button -->
        <button 
        onclick={() => goto(`/${result.code}`)}
        class="bg-[#F7F7F7] hover:bg-[#FF00DB] active:bg-[#FF00DB] active:scale-95
                rounded-lg flex justify-center items-center w-full gap-2
                transition-all duration-150 cursor-pointer disabled:opacity-60"
        >
            <p class="text-xl uppercase text-[#1C1C1C] p-2">
                {result.type}
            </p>
        </button>
  
    {:else}
        <!-- Fallback for missing state -->
        <div class="flex flex-col items-center justify-center h-full gap-4">
            <div class="bg-[#F7F7F7] rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#1C1C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 class="text-xl font-bold ">No Classification Data</h2>
            <p class="text-center max-w-xs">
                There's no classification data available. Please capture an image first.
            </p>
            <button 
                onclick={() => goto('/capture')}
                class="mt-4 bg-[#F7F7F7] hover:bg-[#FF00DB] active:bg-[#FF00DB] px-6 py-2
                    rounded-lg flex justify-center items-center gap-2
                    transition-all duration-150"
            >
                <p class="text-xl uppercase text-[#1C1C1C] p-2">
                    Go to Capture
                </p>
            </button>
        </div>
    {/if}
  </section>