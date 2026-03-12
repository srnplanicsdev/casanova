
<script setup>
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import ArrowButton from './ArrowButton.vue'
import ProfileChip from './ProfileChip.vue'
const props= defineProps({
    blogpost:{
        type: Object,
        required: true
    }
})
const likes = ref(12500)
const comments = ref(12)
const shares = ref(12)

</script>
<template>
    <div class="bg-neutral-900 border border-neutral-700  px-40  gap-12 p-10 flex flex-col md:flex-row py-20 w-full">

        
        <div class="w-96"><ProfileChip :person="blogpost"/></div>

        <div class="flex flex-col gap-7 md:flex-1">
            <span class="text-neutral-400 text-lg">{{blogpost.date}}</span>
            <div>
                <p class="text-white text-2xl font-semibold">{{blogpost.title}}</p>
                <p class="text-neutral-400 text-lg mt-2.5">
                    {{blogpost.content}}
                </p>
            </div>

            <div class="flex gap-4 mt-3 text-neutral-400">
                <button
                    class="flex items-center gap-2 hover:text-red-500 transition rounded-full px-5 py-3 bg-neutral-800/30"
                    @click="likes++">
                    <HeartIcon class="w-5  h-5" />
                    <span>{{ likes >= 1000 ? (likes / 1000).toFixed(1) + 'k' : likes }}</span>
                </button>

                <button
                    class="flex items-center gap-2 hover:text-blue-400 transition rounded-full px-5 py-3 bg-neutral-800/30"
                    @click="comments++">
                    <ChatBubbleOvalLeftIcon class="w-5 h-5" />
                    <span>{{ comments }}</span>
                </button>

                <button
                    class="flex items-center gap-2 hover:text-yellow-400 transition rounded-full px-5 py-3 bg-neutral-800/30"
                    @click="shares++">
                    <PaperAirplaneIcon class="w-5 h-5" />
                    <span>{{ shares }}</span>
                </button>
            </div>
        </div>


        <div class="md:ml-auto flex md:items-center">
            <ArrowButton>View Blog</ArrowButton>
        </div>

    </div>
</template>