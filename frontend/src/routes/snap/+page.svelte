<script>
    import { onMount, onDestroy } from 'svelte';
    
    // State variables
    let stream = null;
    let videoElement;
    let capturedImage = null;
    let prompt = '';
    let isLoading = false;
    let result = null;
    let error = null;
    
    // Camera setup
    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      } catch (err) {
        error = "Camera access denied or not available";
        console.error(error, err);
      }
    }
    
    // Capture photo from camera
    function capturePhoto() {
      if (!videoElement) return;
      
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      capturedImage = canvas.toDataURL('image/jpeg');
      stopCamera();
    }
    
    // Stop camera stream
    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
      }
    }
    
    // File upload handler
    function handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        capturedImage = e.target.result;
      };
      reader.readAsDataURL(file);
      
      // Reset file input
      event.target.value = null;
    }
    
    // Send to OpenAI
    async function sendToOpenAI() {
      if (!capturedImage || !prompt.trim()) {
        error = "Please capture an image and enter a prompt";
        return;
      }
      
      isLoading = true;
      error = null;
      result = null;
      
      try {
        // Convert base64 image to blob for upload
        const base64Response = await fetch(capturedImage);
        const imageBlob = await base64Response.blob();
        
        const formData = new FormData();
        formData.append('image', imageBlob, 'image.jpg');
        formData.append('prompt', prompt);
        
        // Replace with your actual API endpoint
        const response = await fetch('/api/openai', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        result = await response.json();
      } catch (err) {
        error = "Error processing image: " + err.message;
        console.error(error, err);
      } finally {
        isLoading = false;
      }
    }
    
    // Reset everything
    function reset() {
      capturedImage = null;
      result = null;
      error = null;
      setupCamera();
    }
    
    onMount(() => {
      setupCamera();
    });
    
    onDestroy(() => {
      stopCamera();
    });
  </script>
  
  
  <main class="max-w-3xl mx-auto p-4">
    <h1 class="text-center text-2xl font-bold mb-8">TypeSnap</h1>
    
    {#if error}
      <div class="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
        {error}
      </div>
    {/if}
    
    {#if !capturedImage}
      <div class="flex flex-col items-center mb-4">
        <video bind:this={videoElement} autoplay playsinline class="w-full max-w-md rounded-lg bg-black"></video>
        <div class="flex flex-col items-center mt-4 w-full">
          <button 
            on:click={capturePhoto}
            class="py-2 px-4 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
          >
            Take Photo
          </button>
          <div class="mt-4 text-center">
            <label for="gallery-upload" class="block mb-2 text-sm text-gray-600">Or select from gallery</label>
            <input 
              type="file" 
              id="gallery-upload" 
              accept="image/*" 
              on:change={handleFileUpload}
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg
                     file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center">
        <img src={capturedImage} alt="Captured" class="max-w-full rounded-lg mb-4 shadow-md" />
        
        <div class="w-full mb-4">
          <textarea 
            bind:value={prompt} 
            placeholder="Enter a prompt for OpenAI (e.g., 'What is shown in this image?')"
            rows="3"
            class="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 resize-none"
          ></textarea>
          
          <div class="flex gap-4 mb-4">
            <button 
              on:click={sendToOpenAI} 
              disabled={isLoading || !prompt.trim()}
              class="py-2 px-4 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Analyze Image'}
            </button>
            <button 
              on:click={reset} 
              class="py-2 px-4 rounded-lg bg-gray-500 text-white font-bold hover:bg-gray-600 transition"
            >
              New Image
            </button>
          </div>
        </div>
        
        {#if isLoading}
          <div class="my-4 italic text-gray-600">Processing your image...</div>
        {/if}
        
        {#if result}
          <div class="w-full mt-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold mb-3">Result</h2>
            <div class="whitespace-pre-wrap">
              {#if result.text}
                <p class="text-gray-800">{result.text}</p>
              {/if}
              
              {#if result.data}
                <pre class="bg-gray-200 p-4 rounded-lg mt-3 overflow-x-auto text-sm">{JSON.stringify(result.data, null, 2)}</pre>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </main>