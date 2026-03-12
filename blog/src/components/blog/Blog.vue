<script setup>
import { onMounted, ref } from "vue";
import BackButton from "./BackButton.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { PhotoIcon, TrashIcon } from "@heroicons/vue/20/solid";
const store = useStore()
const blog = ref({});
const route = useRoute()
const router = useRouter()
const id = route.params.id || null;
const isEdit = !!id;
const imagePreview = ref(null);
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    blog.value.image = file;

    imagePreview.value = URL.createObjectURL(file) || blog.value.image;
  }
};
const fetchBlogById = async () => {
  if (!isEdit) return;
  try {
    const res = await store.dispatch('blog/fetchBlogById', id);
    blog.value = {
      ...res,
      isActive: res.is_active,
    };
    if (res.image) {
      imagePreview.value = res.image
    }
  } catch (error) {
    console.error(error);
  }
};
onMounted(() =>
  fetchBlogById(),
  imagePreview.value = blog.value.image)
const submitBlog = async () => {
  try {
    if (isEdit) {
      await store.dispatch('blog/updateBlog', {
        id,
        payload: {
          title: blog.value.title,
          content: blog.value.content,

          is_active: blog.value.isActive
        }
      });
    } else {
      await store.dispatch('blog/createBlog', {
        title: blog.value.title,
        content: blog.value.content,
        image: blog.value.image,
        is_active: blog.value.isActive
      });
    }
    router.back();
  } catch (error) {
    console.error(error);
  }
};
const removeImage = () => {
  imagePreview.value = null
}
const handleCheckboxChange = () => {
  blog.value.isActive = !blog.value.isActive
}
</script>
<template>
  <div class="min-h-screen dark:bg-neutral-900 bg-gray-50 ">
    <BackButton />
    <div class="max-w-2xl mx-auto bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-8 mt-6">
      <h1 class="text-3xl font-bold text-center dark:text-neutral-50 text-gray-800 mb-8">{{ isEdit ? "Edit Blog" : "Create Blog" }}</h1>

      <div class="mb-6">
        <label for="title" class="block text-sm font-medium dark:text-white text-gray-700 mb-2">Blog Title</label>
        <input id="title" name="title" v-model="blog.title" type="text"
          class="w-full px-4 py-3 border focus-visible:outline-0 border-gray-300 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-lg font-semibold"
          placeholder="Enter an engaging title for your blog" />
      </div>

      <div class="mb-6">
        <label for="content" class="block text-sm dark:text-white font-medium text-gray-700 mb-2">Content</label>
        <textarea id="content" name="content" v-model="blog.content"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-vertical"
          rows="8" placeholder="Write your blog content here..."></textarea>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium dark:text-white text-gray-700 mb-3">Blog Status</label>
        <div class="flex items-center justify-center space-x-4">
          <span class="text-sm font-medium text-gray-600 dark:text-white">Inactive</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only" @change="handleCheckboxChange" />
            <div class="w-14 h-8 bg-gray-300 rounded-full transition duration-300 ease-in-out"
              :class="{ 'bg-blue-500!': blog.isActive }"></div>
            <div :class="{ 'translate-x-6': blog.isActive }"
              class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out flex items-center justify-center">
              <span v-if="blog.isActive" class="text-xs text-blue-500">✓</span>
            </div>
          </label>
          <span class="text-sm font-medium text-gray-600 dark:text-white">Active</span>
        </div>
      </div>


      <div v-if="!isEdit" class="mb-6">
        <label for="image" class="block text-sm font-medium dark:text-white text-gray-700 mb-2">Blog Image</label>
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition duration-200">
          <input id="image" type="file" accept="image/*" @change="handleImageChange" class="hidden" />
          <label for="image" class="cursor-pointer">
            <div class="text-gray-500 dark:text-white mb-2">
              <svg class="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              
            </div>
            <p class="text-sm text-gray-600 dark:text-white">Click to upload an image or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-white mt-1">PNG, JPG, JPEG, GIF up to 2MB</p>
          </label>
        </div>
      </div>
 
      <div v-if="imagePreview" class="mb-6">
        <label class="block text-sm font-medium dark:text-white text-gray-700 mb-2">Image Preview</label>
        <div class="relative inline-block">
          <img :src="imagePreview" alt="Image Preview" class="max-h-48 rounded-lg shadow-md" />
          <button v-if="!isEdit" @click="removeImage"
            class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition duration-200"
            aria-label="Remove image">
            <TrashIcon class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div class="text-center">
        <button @click="submitBlog"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          {{ isEdit ? "Update Blog" : "Create Blog Post" }}
        </button>
      </div>
    </div>
  </div>
</template>
