<script setup>
import { ArrowUpRightIcon, PlusIcon } from '@heroicons/vue/20/solid';
import ArrowButton from '../common/ArrowButton.vue';



</script>
<template>
    <div class="grid grid-cols-12 bg-neutral-900  border border-neutral-700">
        <div class="col-span-7 border-e border-neutral-700 ">
            <div class="pt-38 md:h-189 flex flex-col  ">
                <div class="flex flex-col ps-41 ">
                    <span class="font-medium text-3xl text-neutral-500">Your Journey to Tomorrow Begins Here</span>
                    <span class="font-medium text-7xl mt-7 text-white">Explore the Frontiers of Artificial
                        Intelligence</span>
                    <span class="font-base text-lg mt-5 text-neutral-400">Welcome to the epicenter of AI innovation.
                        FutureTech AI News is your passport to a world
                        where machines think, learn, and reshape the future. Join us on this visionary expedition into
                        the heart of AI.</span>

                </div>
                <div class=" mt-auto grid grid-cols-3  ">
                    <div class=" flex flex-col p-12 ps-41 border-t border-neutral-700">
                        <span class="text-4xl font-semibold text-white inline-flex items-center">300
                            <PlusIcon class="text-yellow-400 w-8 h-8" />
                        </span>
                        <span class="text-neutral-400 mt-2.5">Resources available</span>
                    </div>
                    <div class=" flex flex-col border border-b-0 p-12 border-neutral-700">
                        <span class="text-4xl font-semibold text-white inline-flex items-center">12k
                            <PlusIcon class="text-yellow-400 w-8 h-8" />
                        </span>
                        <span class="text-neutral-400 mt-2.5">Total Downloads</span>
                    </div>
                    <div class=" flex flex-col p-12  border-t border-neutral-700">
                        <span class="text-4xl font-semibold text-white inline-flex items-center">10k
                            <PlusIcon class="text-yellow-400 w-8 h-8" />
                        </span>
                        <span class="text-neutral-400 mt-2.5">Active Users</span>
                    </div>

                </div>



            </div>
        </div>
        <div class="col-span-5 relative flex flex-col  justify-end">


            <img src="@/assets/Abstract-Design.png" alt="Abstract background"
                class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none rounded-lg" />

            <div class="relative  z-10 ms-20  ">
                <div class="inline-flex -space-x-3 border mb-7 rounded-full p-2.5 bg-neutral-900/80 border-neutral-700">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User 1"
                        class="w-15 h-15 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="User 2"
                        class="w-15 h-15 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="User 3"
                        class="w-15 h-15 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="User 4"
                        class="w-15 h-15 rounded-full border-2 border-neutral-700" />
                </div>

                <div class="mb-7 ">
                    <h3 class="text-white text-3xl font-semibold">
                        Explore 1000+ resources
                    </h3>
                    <p class="text-neutral-400 text-lg  ">
                        Over 1,000 articles on emerging tech trends and breakthroughs.
                    </p>
                </div><div class="mb-20">
                    
                <ArrowButton>Explore Resources</ArrowButton>
                </div>
            </div>
        </div>


    </div>
    <div class="grid grid-cols-3 bg-neutral-900 px-20 border border-t-0 border-neutral-700">
        <div class=" px-20 border-e py-12 border-neutral-700">
            <img src="@/assets/Icon.png" alt="">
            <div class="flex mt-7 justify-between">
                <div class="">
                    <p class="text-white text-xl">
                        Latest News Updates
                    </p>
                    <span class=" text-neutral-500 text-lg">
                        Stay Current
                    </span>

                </div>
                <div class="bg-yellow-400 rounded-full h-13 w-13  flex justify-center items-center">
                    <ArrowUpRightIcon class=" h-6 w-6 text-neutral-900" />
                </div>

            </div>
            <p class=" text-lg mt-7 text-neutral-400">
                Over 1,000 articles published monthly
            </p>
        </div>
        <div class=" px-20 border-e py-12 border-neutral-700">
            <img src="@/assets/Group2.png" alt="">
            <div class="flex mt-7 justify-between">
                <div class="">
                    <p class="text-white text-xl">
                        Expert Contributors
                    </p>
                    <span class=" text-neutral-500 text-lg">
                        Trusted Insights
                    </span>

                </div>
                <div class="bg-yellow-400 rounded-full h-13 w-13  flex justify-center items-center">
                    <ArrowUpRightIcon class=" h-6 w-6 text-neutral-900" />
                </div>

            </div>
            <p class=" text-lg mt-7 text-neutral-400">
                50+ renowned AI experts on our team
            </p>
        </div>
        <div class=" px-20  py-12">
            <img src="@/assets/Group3.png" alt="">
            <div class="flex mt-7 justify-between">
                <div class="">
                    <p class="text-white text-xl">
                        Global Readership
                    </p>
                    <span class=" text-neutral-500 text-lg">
                        Worldwide Impact
                    </span>

                </div>
                <div class="bg-yellow-400 rounded-full h-13 w-13  flex justify-center items-center">
                    <ArrowUpRightIcon class=" h-6 w-6 text-neutral-900" />
                </div>

            </div>
            <p class=" text-lg mt-7 text-neutral-400">
                2 million monthly readers
            </p>
        </div>
    </div>

</template>