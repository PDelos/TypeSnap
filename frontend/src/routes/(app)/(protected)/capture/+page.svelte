<script lang="ts">
    import { goto } from '$app/navigation';

  let { data } = $props();
  
  const prompt = data.prompt;

  
  // Define proper type for capturedImage
  let capturedImage= $state<string | null>(null); // Will store the captured photo
  let isLoading = $state(false);
  let classificationResult = $state<string | null>(null);
  let error = $state<string | null>(null);
  

  function handlePhotoClick(): void {
    // Create a file input configured to use the device camera
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use the back camera when possible
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          capturedImage = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }
  
  function handleGalleryClick(): void {
    // Create a file input to select from gallery
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          capturedImage = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }
  
  async function handleClassify(): Promise<void> {
    if (!capturedImage) {
      alert('Please capture or upload an image first');
      return;
    }

    try {
      isLoading = true;
      error = null;
      classificationResult = null;

      const response = await fetch('/service/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: capturedImage, // base64 data:image
          prompt // the full JSON prompt fetched from PocketBase
        })
      });

      if (!response.ok) {
        throw new Error(`Classification failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Classification result:', result);
      classificationResult = result.text;

      await goto(`/capture/result`, {
        replaceState: false,
        state: {
          result: JSON.parse(result.text),
          capturedImage: capturedImage,
          timestamp: new Date().toISOString()
        }
      });
      
    } catch (err) {
      console.error('Classification error:', err);
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  }
</script>

<!-- Main Capture Section -->
<section class="flex flex-col gap-4 h-[65%] px-14">
  <!-- Image Preview Area -->
  <div class="border-1 border-[#F7F7F7] rounded-lg h-[40%] flex justify-center items-center overflow-hidden">
    {#if capturedImage}
      <img src={capturedImage} alt="Captured" class="w-full h-full object-cover" />
    {:else}
      <p>Upload an image</p>
    {/if}
  </div>

  <!-- Image Source Selection Buttons -->
  <div class="grid grid-cols-2 gap-2 w-full">
    <button 
      onclick={handlePhotoClick}
      class="border-1 border-[#F7F7F7] rounded-lg flex justify-center items-center 
             hover:bg-[#FF00DB] active:bg-[#FF00DB] active:scale-95 
             transition-all duration-150 cursor-pointer">
      <img src="assets/simbol_imatge.png" alt="Open camera" class="h-20 p-3"/>
    </button>
    
    <button 
      onclick={handleGalleryClick}
      class="border-1 border-[#F7F7F7] rounded-lg flex justify-center items-center 
             hover:bg-[#FF00DB] active:bg-[#FF00DB] active:scale-95
             transition-all duration-150 cursor-pointer">
      <img src="assets/simbol_documents.png" alt="Select from gallery" class="h-20 p-3" />
    </button>
  </div>
  
  <!-- Classify Button -->
  <button 
  onclick={handleClassify}
  class="{isLoading ? 'bg-[#FF00DB]' : 'bg-[#F7F7F7]'} hover:bg-[#FF00DB] active:bg-[#FF00DB] active:scale-95
        rounded-lg flex justify-center items-center w-full gap-2
        transition-all duration-150 cursor-pointer disabled:opacity-60"
  disabled={isLoading}
  >
  {#if isLoading}
    <svg class="animate-spin h-5 w-5 text-[#F7F7F7]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
    <p class="text-xl uppercase text-[#F7F7F7] p-2">
      Processing...
    </p>
  {:else}
    <p class="text-xl uppercase text-[#1C1C1C] p-2">
      Classify
    </p>
  {/if}
  </button>


</section>