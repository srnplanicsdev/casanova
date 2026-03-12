<script setup>
import { PlusIcon, SunIcon } from "@heroicons/vue/20/solid";
import {MoonIcon} from '@heroicons/vue/24/outline'
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BlogCard from "@/components/BlogCard.vue";
import { useStore } from "vuex";

const props= defineProps({
  isDark:{
    type: Boolean
  }
})
const router =useRouter()
const emit = defineEmits(["toggleDark"])
const store = useStore()
const blogs = computed(() => store.state.blog.blogs)
const loading =  computed(() => store.state.blog.loading)
const pagination = computed(() => store.state.blog.pagination);
onMounted( () => {
   store.dispatch('blog/fetchBlogs', 1)
 
});

const changePage = (page) => {
  store.dispatch("blog/fetchBlogs", page);
};
const redirect =()=>{
    router.push({name:'createblog'})
}
const handleBlog =(id)=>{
    router.push({name:"blog", params:{id:id}})
}

const logout =async()=>{
  try{
    await store.dispatch('blog/logout')
    router.push({name:'login'})
  }catch(error){
    console.error(error)
  }
}
const handleToggle = () => {
  emit("toggleDark")
}






</script> 
<template>
  <div v-if="loading" class="flex justify-center items-center min-h-screen dark:bg-neutral-900 bg-gray-50">
    <div class="flex flex-col items-center space-y-4">
      <div class="animate-spin rounded-full h-16 w-16 border-b border-blue-600"></div>
      <p class="text-gray-600 text-lg">Loading blogs...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gray-50  dark:bg-neutral-900">

    <nav class="bg-white shadow-lg border-b dark:bg-neutral-900  border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl sm:text-3xl font-bold dark:text-gray-50 text-gray-900">Blogs</h1>

          <div class="flex items-center space-x-4">
    
    <div>
        <div class="flex items-center justify-center space-x-4">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only" @change="handleToggle" />
            <div class="w-14 h-8 bg-gray-300 rounded-full transition duration-300 ease-in-out"
              :class="{ 'bg-neutral-800!': isDark }"></div>
            <div :class="{ 'translate-x-6 bg-transparent!': isDark }"
              class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out flex items-center justify-center">
              <span v-if="isDark" class="text-xs text-white"><MoonIcon class="w-6 h-6"/></span>
              <span v-else class="text-xs "><SunIcon class="w-6 h-6"/></span>
            </div>
          </label>
        </div>
      </div>
            <button
              @click="redirect"
              class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusIcon class="w-5 h-5 mr-2" />
              Create Blog
            </button>
       
            <div class="relative group">
              <button class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
                <img
                  class="h-10 w-10 rounded-full border-2 border-gray-300 hover:border-blue-400 transition duration-200"
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=mail@ashallendesign.co.uk"
                  alt="User avatar"
                />
              </button>

        
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-1">
                  <button
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>


    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="blogs.length === 0" class="text-center py-12">
        <div class="text-gray-500 text-lg">No blogs found. Create your first blog!</div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="blog in blogs"
          :key="blog.id"
          class="transform hover:scale-101 transition duration-100 cursor-pointer"
          @click="handleBlog(blog.id)"
        >
          <BlogCard :blog="blog" />
        </div>
      </div>

 
      <div v-if="pagination.last_page > 1" class="flex justify-center items-center mt-12 space-x-2">
        <button
          @click="changePage(pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Previous
        </button>

        <div class="flex space-x-1">
          <button
            v-for="page in  pagination.last_page"
            :key="page "
            :class="[
              'px-3 py-2 text-sm font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              page  === pagination.current_page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            ]"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
            
        </div>

        <button
          @click="changePage(pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </main>
  </div>
</template>
