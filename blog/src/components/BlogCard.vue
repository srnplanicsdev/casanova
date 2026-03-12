<script setup>
const props = defineProps({
    blog: {
        type: Object,
        required: true,
    },
});
</script>
<template>
 
    <div v-if="blog" class="rounded-md h-full shadow-md  dark:shadow-neutral-700 dark:border-neutral-50 dark:text-gray-50 dark:bg-neutral-800 backdrop-blur-2xl opacity-90 flex flex-col p-3">
        <div class="w-full overflow-hidden">

            <img v-if="blog.image !==null " class="w-full h-full  object-cover rounded-lg shadow-md"
                :src="blog.image || 'https://picsum.photos/seed/picsum/900/300'" alt="" />
        </div>
        <div>
            <span class="text-lg font-semibold">{{
                blog.title || "Lorem Ipsum"
                }}</span>
        </div>
        <div>
            <p class="truncate w-full">
                {{
                    blog.content ||
                `What is Lorem Ipsum?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
                `
                }}
            </p>
        </div>
        <div class="flex mt-auto justify-end items-end text-gray-500">
            Made by {{ blog.user.name || " Lorem Ipsum" }}
        </div>
    </div>
   
</template>

