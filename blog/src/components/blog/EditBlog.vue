<script setup>
import api from "@/utils/api";
import { inject, onMounted, ref } from "vue";
import BlogCard from "../BlogCard.vue";
import { useRoute } from "vue-router";
import { TrashIcon } from "@heroicons/vue/20/solid";
import BackButton from "./BackButton.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";


const router = useRouter()
const blog = ref({});
const route = useRoute()
const store = useStore()
const id = route.params.id
const imagePreview = ref(null);
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    blog.value.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};
const fetchBlogById = async () => {
  try {
    const res = await store.dispatch('blog/fetchBlogById', id)
    blog.value = {
      ...res,
      isActive: res.is_active,
      image: null
    }
  } catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  await fetchBlogById()

})

const updateBlog = async () => {
  try {
    await store.dispatch('blog/updateBlog', {
      id,
      payload: {
        title: blog.value.title,
        content: blog.value.content,
        image: blog.value.image,
        is_active: blog.value.isActive,
      }
    });
    
    blog.value = {}
    router.back()
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
<div>
  <BackButton />
  <div class=" mt-5 p-5 mx-5">
    <div>
      <label for="title">Blog Title</label>
      <input name="title" v-model="blog.title" type="text" class="text-xl font-bold border rounded p-2 w-full"
        placeholder="Enter Title" />
    </div>

    <div>
      <label for="content">Content</label>
      <textarea name="content" v-model="blog.content" class="border rounded p-2 w-full" rows="5"
        placeholder="Enter Content"></textarea>
    </div>

    <div class="inline-flex items-center cursor-pointer">
      <span class="select-none text-sm font-medium text-heading">Set Deactive</span>
      <label class="flex items-center cursor-pointer select-none text-dark dark:text-white mx-2">
        <div class="relative">
          <input type="checkbox" class="sr-only" @change="handleCheckboxChange" />
          <div class="block h-8 rounded-full box bg-blue-600 w-14"></div>
          <div :class="{ 'translate-x-full bg-white': blog.isActive }"
            class="absolute flex items-center justify-center w-6 h-6 transition bg-white rounded-full dot left-1 top-1">
          </div>
        </div>
      </label>
      <span class="text-sm font-medium text-heading">Set Active</span>
    </div>

    <div class="mt-4">
      <label for="image">Enter an Image:</label>
      <input class="border dark:text-gray-900 rounded ps-2 ms-2 bg-gray-100" type="file" name="image" accept="image/*"
        @change="handleImageChange" />
      <div v-if="imagePreview" class="mt-2">
        <img :src="imagePreview" alt="Image Preview" class="max-h-40 rounded" />
        <button @click="removeImage" class="bg-red-600 w-8 h-8 p-1 rounded-full  text-white">
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>

    <button @click="updateBlog" class="bg-blue-600 text-white px-4 py-2 rounded mt-4">
      Update Blog
    </button>
  </div>
</div>
</template>
