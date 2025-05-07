<script>
  import { goto } from '$app/navigation';
</script>

<main class="flex flex-col h-screen w-full"> 
  <!-- Top Section: Title -->
  <section class="flex flex-col justify-end items-center h-[40%]">
    <img 
      src="/assets/GLYPHS.png" 
      alt="Logo" 
      class="w-[90%] "
    />
    <p class="text-2xl font-thin">VOX-ATYPI</p>
  </section>

  <!-- Middle Section: Spacer or Content -->
  <section class="h-[5%]">
  </section>

  <!-- Bottom Section: Buttons -->
  <section class="flex justify-center h-[55%]">
    <div class="flex flex-row justify-center gap-6 w-[90%]">
      <button 
        onclick={() => goto('/categories')}
        class="h-[30%] w-[60%] text-xl tracking-tighter rounded-2xl bg-[#F7F7F7] text-[#1C1C1C] hover:bg-[#FF00DB] hover:text-[#F7F7F7]"
      >
        TYPOGRAPHY CATEGORIES
      </button>

      <button 
        onclick={() => goto('/capture')}
        class="h-[30%] w-[60%] text-xl tracking-tighter rounded-2xl bg-[#F7F7F7] text-[#1C1C1C] hover:bg-[#FF00DB] hover:text-[#F7F7F7]"
      >
        CATEGORIZE TYPOGRAPHY
      </button>
    </div>
  </section>
</main>
