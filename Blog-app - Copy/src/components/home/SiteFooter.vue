<script setup>
import ArrowButton from '@/components/common/ArrowButton.vue'
</script>

<template>
  <footer class="bg-neutral-900 border-t border-neutral-800">
    <!-- TOP LINKS -->
    <div class="px-40 py-20 grid grid-cols-5 gap-12 text-lg">

      <!-- Column 1 -->
      <div>
        <h4 class="text-white font-medium text-xl mb-4">Home</h4>
        <ul class="space-y-2 text-neutral-400">
          <li>Features</li>
          <li>Blogs</li>
          <li class="flex items-center gap-2">
            Resources <span
  class="inline-flex items-center justify-center rounded-md
         bg-linear-to-r from-neutral-800/60 to-yellow-400/20
         p-px"
>
  <span
    class="rounded-md bg-neutral-800 px-4 py-1
           text-base text-white"
  >
    New
  </span>
</span>

          </li>
          <li>Testimonials</li>
          <li>Contact Us</li>
          <li>Newsletter</li>
        </ul>
      </div>

      <!-- Column 2 -->
      <div>
        <h4 class="text-white font-medium text-xl mb-4">News</h4>
        <ul class="space-y-2 text-neutral-400">
          <li>Trending Stories</li>
          <li>Featured Videos</li>
          <li>Technology</li>
          <li>Health</li>
          <li>Politics</li>
          <li>Environment</li>
        </ul>
      </div>

      <!-- Column 3 -->
      <div>
        <h4 class="text-white font-medium text-xl mb-4">Blogs</h4>
        <ul class="space-y-2 text-neutral-400">
          <li>Quantum Computing</li>
          <li>AI Ethics</li>
          <li>Space Exploration</li>
          <li class="flex items-center gap-2">
            Biotechnology  <span
  class="inline-flex items-center justify-center rounded-md
         bg-linear-to-r from-neutral-800/60 to-yellow-400/20
         p-px"
>
  <span
    class="rounded-md bg-neutral-800 px-4 py-1
           text-base text-white"
  >
    New
  </span></span>
          </li>
          <li>Renewable Energy</li>
          <li>Biohacking</li>
        </ul>
      </div>

      <!-- Column 4 -->
      <div>
        <h4 class="text-white font-medium text-xl mb-4">Podcasts</h4>
        <ul class="space-y-2 text-neutral-400">
          <li>AI Revolution</li>
          <li class="flex items-center gap-2">
            AI Revolution  <span
  class="inline-flex items-center justify-center rounded-md
         bg-linear-to-r from-neutral-800/60 to-yellow-400/20
         p-px"
>
  <span
    class="rounded-md bg-neutral-800 px-4 py-1
           text-base text-white"
  >
    New
  </span></span>
          </li>
          <li>TechTalk AI</li>
          <li>AI Conversations</li>
        </ul>
      </div>

      <!-- Column 5 -->
      <div>
        <h4 class="text-white font-medium text-xl mb-4">Resources</h4>
        <ul class="space-y-3 text-neutral-400">
          <li class="flex items-center gap-2">
            <ArrowButton>Whitepapers </ArrowButton>
          </li>
          <li class="flex items-center gap-2">
             <ArrowButton>Ebooks</ArrowButton>
          </li>
          <li class="flex items-center gap-2">
             <ArrowButton>Reports</ArrowButton>
          </li>
          <li class="flex items-center gap-2">
             <ArrowButton>Research Papers</ArrowButton>
          </li>
        </ul>
      </div>

    </div>

    <!-- BOTTOM BAR -->
    <div class="border-t border-neutral-800 px-40 py-6 flex items-center justify-between text-xs text-neutral-500">
      <div class="flex gap-6">
        <span>Terms & Conditions</span>
        <span>Privacy Policy</span>
      </div>

      <div class="flex gap-4 text-neutral-400">
        <!-- replace with icons later -->
        <span>Twitter</span>
        <span>GitHub</span>
        <span>LinkedIn</span>
      </div>

      <div>
        © 2024 FutureTech. All rights reserved.
      </div>
    </div>
  </footer>
</template>
