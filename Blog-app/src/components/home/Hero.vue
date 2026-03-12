<script setup>
import { ArrowUpRightIcon, PlusIcon } from '@heroicons/vue/20/solid';
import ArrowButton from '../common/ArrowButton.vue';



</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-12 bg-neutral-900 border border-neutral-700">
        <div class="lg:col-span-7 lg:border-e border-neutral-700 ">
            <div class="pt-10 lg:pt-38 flex flex-col h-full min-h-125 lg:h-189">
                <div class="flex flex-col px-6 lg:px-41 ">
                    <span class="font-medium text-lg md:text-xl lg:text-3xl text-neutral-500">Your Journey to Tomorrow
                        Begins
                        Here</span>
                    <span class="font-medium text-3xl md:text-5xl lg:text-7xl mt-5 lg:mt-7 text-white">Explore the
                        Frontiers of Artificial
                        Intelligence</span>
                    <span class="font-base text-sm md:text-base lg:text-lg mt-5 text-neutral-400">Welcome to the
                        epicenter of AI
                        innovation.
                        FutureTech AI News is your passport to a world
                        where machines think, learn, and reshape the future. Join us on this visionary expedition into
                        the heart of AI.</span>

                </div>
                <div class=" mt-auto grid grid-cols-1 md:grid-cols-3 border-t border-neutral-700 ">
                    <div
                        class=" flex flex-col p-6 lg:p-12 lg:ps-41 border-b md:border-b-0 md:border-e border-neutral-700 last:border-0">
                        <span class="text-2xl lg:text-4xl font-semibold text-white inline-flex items-center">300
                            <PlusIcon class="text-yellow-400 w-6 lg:w-8 h-6 lg:h-8" />
                        </span>
                        <span class="text-neutral-400 mt-2.5 text-sm lg:text-base">Resources available</span>
                    </div>
                    <div
                        class=" flex flex-col p-6 lg:p-12 border-b md:border-b-0 md:border-e border-neutral-700 last:border-0">
                        <span class="text-2xl lg:text-4xl font-semibold text-white inline-flex items-center">12k
                            <PlusIcon class="text-yellow-400 w-6 lg:w-8 h-6 lg:h-8" />
                        </span>
                        <span class="text-neutral-400 mt-2.5 text-sm lg:text-base">Total Downloads</span>
                    </div>
                    <div class=" flex flex-col p-6 lg:p-12 last:border-0">
                        <span class="text-2xl lg:text-4xl font-semibold text-white inline-flex items-center">10k
                            <PlusIcon class="text-yellow-400 w-6 lg:w-8 h-6 lg:h-8" />
                        </span>
                        <span class="text-neutral-400 mt-2.5 text-sm lg:text-base">Active Users</span>
                    </div>

                </div>

            </div>
        </div>
        <div class="lg:col-span-5 relative flex flex-col justify-end pt-20 lg:pt-0 pb-10 lg:pb-0">


            <img src="@/assets/Abstract-Design.png" alt="Abstract background"
                class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none rounded-lg" />

            <div class="relative z-10 px-6 lg:px-20  ">
                <div class="inline-flex -space-x-3 border mb-7 rounded-full p-2.5 bg-neutral-900/80 border-neutral-700">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User 1"
                        class="w-10 lg:w-15 h-10 lg:h-15 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="User 2"
                        class="w-10 lg:w-15 h-10 lg:h-15 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="User 3"
                        class="w-10 lg:w-15 h-10 lg:h-15 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="User 4"
                        class="w-10 lg:w-15 h-10 lg:h-15 rounded-full border-2 border-neutral-700" />
                </div>

                <div class="mb-7 ">
                    <h3 class="text-white text-xl lg:text-3xl font-semibold">
                        Explore 1000+ resources
                    </h3>
                    <p class="text-neutral-400 text-base lg:text-lg  ">
                        Over 1,000 articles on emerging tech trends and breakthroughs.
                    </p>
                </div>
                <div class="mb-10 lg:mb-20">

                    <ArrowButton class="w-full md:w-auto justify-center">Explore Resources</ArrowButton>
                </div>
            </div>
        </div>


    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 bg-neutral-900 px-6 lg:px-20 border border-t-0 border-neutral-700">
        <div class=" px-4 lg:px-20 border-b md:border-b-0 md:border-e py-6 lg:py-12 border-neutral-700">
            <img src="@/assets/Icon.png" alt="" class="w-10 lg:w-auto">
            <div class="flex mt-7 justify-between items-center">
                <div class="">
                    <p class="text-white text-lg lg:text-xl">
                        Latest News Updates
                    </p>
                    <span class=" text-neutral-500 text-sm lg:text-lg">
                        Stay Current
                    </span>

                </div>
                <div
                    class="bg-yellow-400 rounded-full h-10 lg:h-13 w-10 lg:w-13  flex justify-center items-center shrink-0">
                    <ArrowUpRightIcon class=" h-5 lg:h-6 w-5 lg:w-6 text-neutral-900" />
                </div>

            </div>
            <p class=" text-base lg:text-lg mt-7 text-neutral-400">
                Over 1,000 articles published monthly
            </p>
        </div>
        <div class=" px-4 lg:px-20 border-b md:border-b-0 md:border-e py-6 lg:py-12 border-neutral-700">
            <img src="@/assets/Group2.png" alt="" class="w-10 lg:w-auto">
            <div class="flex mt-7 justify-between items-center">
                <div class="">
                    <p class="text-white text-lg lg:text-xl">
                        Expert Contributors
                    </p>
                    <span class=" text-neutral-500 text-sm lg:text-lg">
                        Trusted Insights
                    </span>

                </div>
                <div
                    class="bg-yellow-400 rounded-full h-10 lg:h-13 w-10 lg:w-13  flex justify-center items-center shrink-0">
                    <ArrowUpRightIcon class=" h-5 lg:h-6 w-5 lg:w-6 text-neutral-900" />
                </div>

            </div>
            <p class=" text-base lg:text-lg mt-7 text-neutral-400">
                50+ renowned AI experts on our team
            </p>
        </div>
        <div class=" px-4 lg:px-20 py-6 lg:py-12">
            <img src="@/assets/Group3.png" alt="" class="w-10 lg:w-auto">
            <div class="flex mt-7 justify-between items-center">
                <div class="">
                    <p class="text-white text-lg lg:text-xl">
                        Global Readership
                    </p>
                    <span class=" text-neutral-500 text-sm lg:text-lg">
                        Worldwide Impact
                    </span>

                </div>
                <div
                    class="bg-yellow-400 rounded-full h-10 lg:h-13 w-10 lg:w-13  flex justify-center items-center shrink-0">
                    <ArrowUpRightIcon class=" h-5 lg:h-6 w-5 lg:w-6 text-neutral-900" />
                </div>

            </div>
            <p class=" text-base lg:text-lg mt-7 text-neutral-400">
                2 million monthly readers
            </p>
        </div>
    </div>

</template>