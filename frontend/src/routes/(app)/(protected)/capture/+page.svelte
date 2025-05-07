<script lang="ts">
  import type { ChangeEvent } from 'svelte/elements';
  
  // Define proper type for information
  let information: string | null = null; // Will store the captured photo

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
          information = event.target?.result as string;
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
          information = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }
  
  function handleClassify(): void {
    if (!information) {
      alert('Please capture or upload an image first');
      return;
    }
    console.log("Classifying image...");
    // Add your classification logic here
  }
</script>

<section class="flex flex-col gap-4 h-[65%] px-14">
  <div class="border-1 border-[#F7F7F7] rounded-lg h-[40%] flex justify-center items-center overflow-hidden">
    {#if information}
      <img src={information} alt="Captured" class="w-full h-full object-cover" />
    {:else}
      <p>Upload an image</p>
    {/if}
  </div>

  <div class="grid grid-cols-2 gap-2 w-full">
    <button class="border-1 border-[#F7F7F7] rounded-lg flex justify-center items-center hover:bg-[#FF00DB] cursor-pointer" onclick={handlePhotoClick}>
      <img src="assets/simbol_imatge.png" alt="Open camera" class="h-20 p-3"/>
    </button>
    <button class="border-1 border-[#F7F7F7] rounded-lg flex justify-center items-center hover:bg-[#FF00DB] cursor-pointer" onclick={handleGalleryClick}>
      <img src="assets/simbol_documents.png" alt="Select from gallery" class="h-20 p-3" />
    </button>
  </div>
  
  <button 
    class="bg-[#F7F7F7] hover:bg-[#FF00DB] rounded-lg flex justify-center items-center w-full cursor-pointer" 
    onclick={handleClassify}
  >
    <p class="text-xl uppercase text-[#1C1C1C] p-2">Classify</p>
  </button>
</section>