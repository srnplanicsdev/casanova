<script setup>
import BackButton from "@/components/blog/BackButton.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import printJS from 'print-js';

const selectedBlog = ref({});
const route = useRoute();
const store = useStore();
const router = useRouter();
const id = route.params.id;
const loading =  computed(() => store.state.blog.loading)
const fetchBlogById = async () => {
  try {
    const res = await store.dispatch("blog/fetchBlogById", id);
    selectedBlog.value = res;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchBlogById();
});
const deleteBlog = async () => {
  try {
    await store.dispatch("blog/deleteBlog", id);
    selectedBlog.value = {};
    router.back();
  } catch (error) {
    console.error(error);
  }
};

const editBlog = () => {
  router.push({ name: "editblog", params: { id: id } });
};

const printBlog = () => {
  const printableContent = `
    <div style="font-family: Arial, sans-serif; height: 92vh; max-width: 800px; border: 2px solid #000;margin: 0 auto; padding: 20px;">
      <h1 style="font-size: 2em; margin-bottom: 20px;">${selectedBlog.value.title}</h1>
    <img src="${selectedBlog.value.image}"/>
      <div style="line-height: 1.6; border-top: 1px solid #000; text-align: justify;">${selectedBlog.value.content}</div>
    </div>
  `;
  printJS({
    printable: printableContent,
    type: 'raw-html',
    style: '@page { size: A4; margin: 20mm; } body { font-family: Arial, sans-serif; }'
  });
};
</script>
<template>
  <div v-if="loading" class="flex justify-center items-center min-h-screen dark:bg-neutral-900 bg-gray-50">
    <div class="flex flex-col items-center space-y-4">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      <p class="text-gray-600 text-lg">Loading blog...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gray-50 dark:bg-neutral-900" >
    <BackButton />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div class="flex justify-end space-x-3 mb-6">
        <button
          @click="printBlog"
          class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
          </svg>
          Print
        </button>
        <button
          @click="editBlog"
          class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Edit
        </button>
        <button
          @click="deleteBlog"
          class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Delete
        </button>
      </div>

      <article class="bg-white dark:bg-neutral-800  shadow-lg rounded-lg overflow-hidden">
        <div class="px-6 py-8 sm:px-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {{ selectedBlog.title }}
          </h1>

          <div class="mb-8">
            <img
              :src="selectedBlog.image"
              :alt="selectedBlog.title"
              class="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-md"
            />
          </div>


          <div class="prose prose-lg max-w-none">
            <div class="text-gray-800 leading-relaxed dark:text-white text-justify whitespace-pre-line">
              {{ selectedBlog.content }}
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
