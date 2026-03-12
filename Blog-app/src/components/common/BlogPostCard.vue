<script setup>
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import ArrowButton from './ArrowButton.vue'
import ProfileChip from './ProfileChip.vue'
const props = defineProps({
    blogpost: {
        type: Object,
        required: true
    }
})
const likes = ref(12500)
const comments = ref(12)
const shares = ref(12)

</script>
<template>
    <div
        class="bg-neutral-900 border border-neutral-700 px-6 lg:px-40 gap-6 lg:gap-12 p-6 lg:p-10 flex flex-col md:flex-row py-10 lg:py-20 w-full relative">


        <div class="w-full md:w-80 lg:w-96 shrink-0">
            <ProfileChip :person="blogpost" />
        </div>

        <div class="flex flex-col gap-4 md:gap-7 md:flex-1">
            <span class="text-neutral-400 text-base md:text-lg">{{ blogpost.date }}</span>
            <div>
                <p class="text-white text-xl md:text-2xl font-semibold">{{ blogpost.title }}</p>
                <p class="text-neutral-400 text-base md:text-lg mt-2.5 leading-relaxed">
                    {{ blogpost.content }}
                </p>
            </div>

            <div class="flex flex-wrap gap-2 md:gap-4 mt-3 text-neutral-400">
                <button
                    class="flex items-center gap-2 hover:text-red-500 transition rounded-full px-4 md:px-5 py-2 md:py-3 bg-neutral-800/30"
                    @click="likes++">
                    <HeartIcon class="w-4 md:w-5 h-4 md:h-5" />
                    <span class="text-sm md:text-base">{{ likes >= 1000 ? (likes / 1000).toFixed(1) + 'k' : likes
                        }}</span>
                </button>

                <button
                    class="flex items-center gap-2 hover:text-blue-400 transition rounded-full px-4 md:px-5 py-2 md:py-3 bg-neutral-800/30"
                    @click="comments++">
                    <ChatBubbleOvalLeftIcon class="w-4 md:w-5 h-4 md:h-5" />
                    <span class="text-sm md:text-base">{{ comments }}</span>
                </button>

                <button
                    class="flex items-center gap-2 hover:text-yellow-400 transition rounded-full px-4 md:px-5 py-2 md:py-3 bg-neutral-800/30"
                    @click="shares++">
                    <PaperAirplaneIcon class="w-4 md:w-5 h-4 md:h-5" />
                    <span class="text-sm md:text-base">{{ shares }}</span>
                </button>
            </div>
        </div>


        <div class="md:ml-auto flex items-center mt-6 md:mt-0">
            <ArrowButton class="w-full md:w-auto justify-center">View Blog</ArrowButton>
        </div>

    </div>
</template>