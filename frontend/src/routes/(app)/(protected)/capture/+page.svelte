<script>
  import { onMount, onDestroy } from 'svelte';
  let { data } = $props();

  // State variables
  let stream = null;
  let videoElement;
  let capturedImage = null;
  let isLoading = false;
  let result = null;
  let error = null;
  
  // Fixed typography recognition prompt
  const typographyPrompt = "Please identify the typography/fonts used in this image. Include the font name if possible, and describe its characteristics (serif/sans-serif, weight, style, etc.).";
  
  // Camera setup - mobile-optimized
  const setupCamera = async () => {
    try {
      // Request camera with optimal mobile settings
      stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: window.innerWidth },
          height: { ideal: window.innerHeight }
        } 
      });
      if (videoElement) videoElement.srcObject = stream;
    } catch (err) {
      error = "Camera access denied or not available";
      console.error(error, err);
    }
  };
  
  // Capture photo - optimized for mobile
  const capturePhoto = () => {
    if (!videoElement) return;
    
    const canvas = document.createElement('canvas');
    const { videoWidth: width, videoHeight: height } = videoElement;
    canvas.width = width;
    canvas.height = height;
    
    canvas.getContext('2d').drawImage(videoElement, 0, 0, width, height);
    capturedImage = canvas.toDataURL('image/jpeg', 0.85); // Slightly compressed for mobile
    stopCamera();
  };
  
  // Stop camera
  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    stream = null;
  };
  
  // File upload handler
  const handleFileUpload = ({ target }) => {
    const file = target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = ({ target }) => capturedImage = target.result;
    reader.readAsDataURL(file);
    
    target.value = null;
  };
  
  // Send to OpenAI
  const sendToOpenAI = async () => {
    if (!capturedImage) {
      error = "Please capture an image first";
      return;
    }
  
    isLoading = true;
    error = null;
    result = null;
    
    try {
      const imageBlob = await fetch(capturedImage).then(res => res.blob());
      
      const formData = new FormData();
      formData.append('image', imageBlob, 'image.jpg');
      formData.append('prompt', typographyPrompt);
      
      const response = await fetch('/api/openai', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      result = await response.json();
    } catch (err) {
      error = "Error processing image: " + err.message;
      console.error(error, err);
    } finally {
      isLoading = false;
    }
  };
  
  // Reset everything
  const reset = () => {
    capturedImage = null;
    result = null;
    error = null;
    setupCamera();
  };
  
  onMount(setupCamera);
  onDestroy(stopCamera);
</script>

<main class="max-w-3xl mx-auto p-4 min-h-screen flex flex-col">
  <h1 class="text-center text-2xl font-bold mb-4">{data.user.email}</h1>
  
  {#if error}
    <div class="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
      {error}
    </div>
  {/if}
  
  {#if !capturedImage}
    <div class="flex flex-col items-center flex-grow">
      <video 
        bind:this={videoElement} 
        autoplay 
        playsinline 
        class="w-full h-[60vh] object-cover rounded-lg bg-black mb-4"
      ></video>
      
      <div class="w-full mt-auto">
        <button 
          on:click={capturePhoto}
          class="w-full py-4 mb-4 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 active:bg-blue-700 transition text-lg"
        >
          Take Photo
        </button>
        
        <div class="text-center">
          <label for="gallery-upload" class="block mb-2 text-sm text-gray-600">Or select from gallery</label>
          <input 
            type="file" 
            id="gallery-upload" 
            accept="image/*" 
            on:change={handleFileUpload}
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-full
                   file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
          />
        </div>
      </div>
    </div>
  {:else}
    <div class="flex flex-col items-center">
      <img 
        src={capturedImage} 
        alt="Captured" 
        class="w-full max-h-[50vh] object-contain rounded-lg mb-4 shadow-md" 
      />
      
      <div class="w-full mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <p class="font-medium text-blue-800">Typography Analyzer</p>
        <p class="text-sm text-blue-700 mt-1">This will analyze the image to identify fonts and typography.</p>
      </div>
      
      <div class="w-full grid grid-cols-2 gap-3 mb-4">
        <button 
          on:click={sendToOpenAI} 
          disabled={isLoading}
          class="py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 active:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Identify Font'}
        </button>
        <button 
          on:click={reset} 
          class="py-3 rounded-lg bg-gray-500 text-white font-bold hover:bg-gray-600 active:bg-gray-700 transition"
        >
          New Photo
        </button>
      </div>
      
      {#if isLoading}
        <div class="w-full my-4 p-4 bg-gray-50 rounded-lg text-center">
          <div class="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span class="italic text-gray-600">Analyzing typography...</span>
        </div>
      {/if}
      
      {#if result}
        <div class="w-full mt-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 class="text-xl font-semibold mb-3">Typography Analysis</h2>
          <div class="whitespace-pre-wrap">
            {#if result.text}
              <p class="text-gray-800">{result.text}</p>
            {/if}
            
            {#if result.data}
              <div class="mt-3 overflow-x-auto">
                <details>
                  <summary class="cursor-pointer text-blue-600 font-medium">Show detailed data</summary>
                  <pre class="bg-gray-100 p-4 rounded-lg mt-2 text-xs">{JSON.stringify(result.data, null, 2)}</pre>
                </details>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</main>