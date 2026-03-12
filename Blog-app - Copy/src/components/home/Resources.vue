<script setup>
import { EyeIcon } from '@heroicons/vue/24/outline';
import ArrowButton from '../common/ArrowButton.vue';
import FeatureCard from '../common/FeatureCard.vue';
import SectionHeader from '../common/SectionHeader.vue';
const topicContent = {
    badge: 'Your Gateway to In-Depth Information',
    title: "Unlock Valuable Knowledge with FutureTech's Resources",
    btntitle: "View All Resources"
}
const featureContent = {
    title: "Total Ebooks",
    context: "Over 100 ebooks"
}
</script>
<template>
    <div>
        <SectionHeader :content="topicContent" />
    </div>
    <div class=" grid grid-cols-3 px-20 bg-neutral-900  border border-neutral-700">
        <div class="col-span-1 px-20 flex flex-col py-39 justify-between gap-15">
            <div class=" flex flex-col gap-12.5">

                <div class="w-20 h-20"><img src="@/assets/Group5.png" /></div>
                <div>
                    <span class="text-white font-semibold text-4xl">
                        Ebooks
                    </span>
                    <p class="text-neutral-400 text-lg pt-4">Explore our collection of ebooks covering a wide spectrum
                        of future technology topics.</p>
                </div>
                <div>
                    <ArrowButton class="bg-neutral-800/30! w-full! flex justify-center">Download Ebooks Now
                    </ArrowButton>
                </div>
            </div>
            <div class=" bg-neutral-800/30 inline-flex gap-12.5 p-7.25 rounded-xl border-neutral-700">
                <div>
                    <span class="text-neutral-400 text-lg">Downloaded By</span>
                    <p class="text-white font-semibold text-2xl">10k+ Users</p>
                </div>
                <div class="inline-flex -space-x-3   rounded-xl p-2.5 bg-neutral-900/80 ">
                    <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="User 1"
                        class="w-12 h-12 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="User 2"
                        class="w-12 h-12 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="User 3"
                        class="w-12 h-12 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/men/6.jpg" alt="User 4"
                        class="w-12 h-12 rounded-full border-2 border-neutral-700" />
                </div>
            </div>
        </div>
        <div class="col-span-2 border-s py-20 px-20 border-neutral-700 flex flex-col gap-7.5">
            <div class="flex items-center gap-5 justify-between">
                <span class="w-60 text-2xl text-white font-semibold">
                    Variety of Topics
                </span>
                <p class="text-lg flex-1 font-semibold text-neutral-400 w-full">
                    Topics include AI in education (25%), renewable energy (20%), healthcare (15%), space exploration
                    (25%), and biotechnology (15%).
                </p>
            </div>
            <div >
                <img class=" w-full" src="@/assets/Image.png" alt="">
            </div>
            <div class="flex gap-5">
                <div class=" bg-neutral-800/30 border h-full border-neutral-700 flex flex-col gap-1 p-7 rounded-xl">
                    <p class=" text-neutral-400 text-lg">
                        Total Ebooks
                    </p>
                    <div class="text-white font-medium text-xl">Over 100 ebooks</div>
                </div>
            
                <div class=" border h-full rounded-xl flex-1 flex justify-between items-center p-7 bg-neutral-800/30 border-neutral-700  ">
                    <div
                        class="flex flex-col gap-1 ">
                        <p class=" text-neutral-400 text-lg">
                            Download Formats
                        </p>
                        <div class="text-white font-medium text-xl">PDF format for access.</div>
                    </div>
                    <div>
                        <ArrowButton :icon="EyeIcon">Preview</ArrowButton>
                    </div>
                </div>
            </div>
            <div>
                <div class=" bg-neutral-800/30 border h-full border-neutral-700 flex flex-col gap-1 p-7 rounded-xl">
                    <p class=" text-neutral-400 text-lg">
                        Average Author Expertise
                    </p>
                    <div class="text-white font-medium text-xl">Ebooks are authored by renowned experts with an average of 15 years of experience</div>
                </div>
            </div>
        </div>


    </div>
    <div class=" grid grid-cols-3 px-20 bg-neutral-900  border border-neutral-700">
        <div class="col-span-1 px-20 flex flex-col py-39 justify-between gap-15">
            <div class=" flex flex-col gap-12.5">

                <div class="w-20 h-20"><img src="@/assets/Group4.png" /></div>
                <div>
                    <span class="text-white font-semibold text-4xl">
                        Whitepapers
                    </span>
                    <p class="text-neutral-400 text-lg pt-4">Dive into comprehensive reports and analyses with our collection of whitepapers. </p>
                </div>
                <div>
                    <ArrowButton class="bg-neutral-800/30! w-full! flex justify-center">Download Whitepapers Now
                    </ArrowButton>
                </div>
            </div>
            <div class=" bg-neutral-800/30 inline-flex gap-12.5 p-7.25 rounded-xl border-neutral-700">
                <div>
                    <span class="text-neutral-400 text-lg">Downloaded By</span>
                    <p class="text-white font-semibold text-2xl">10k+ Users</p>
                </div>
                <div class="inline-flex -space-x-3  rounded-xl p-2.5 bg-neutral-900/80 ">
                    <img src="https://randomuser.me/api/portraits/men/13.jpg" alt="User 1"
                        class="w-12 h-12 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="User 2"
                        class="w-12 h-12 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="User 3"
                        class="w-12 h-12 rounded-full border-2 border-neutral-700" />
                    <img src="https://randomuser.me/api/portraits/men/12.jpg" alt="User 4"
                        class="w-12 h-12 rounded-full border-2 border-neutral-700" />
                </div>
            </div>
        </div>
        <div class="col-span-2 border-s py-20 px-20 border-neutral-700 flex flex-col gap-7.5">
            <div class="flex items-center gap-5 justify-between">
                <span class="w-60 text-2xl text-white font-semibold">
                    Topics Coverage
                </span>
                <p class="text-lg flex-1 font-semibold text-neutral-400 w-full">
                    Whitepapers cover quantum computing (20%), AI ethics (15%), space mining prospects (20%), AI in healthcare (15%), and renewable energy strategies (30%).
                </p>
            </div>
            <div >
                <img class=" w-full" src="@/assets/Image2.png" alt="">
            </div>
            <div class="flex gap-5">
                <div class=" bg-neutral-800/30 border h-full border-neutral-700 flex flex-col gap-1 p-7 rounded-xl">
                    <p class=" text-neutral-400 text-lg">
                        Total Whitepapers
                    </p>
                    <div class="text-white font-medium text-xl">Over 50 whitepapers</div>
                </div>
            
                <div class=" border h-full rounded-xl flex-1 flex justify-between items-center p-7 bg-neutral-800/30 border-neutral-700  ">
                    <div
                        class="flex flex-col gap-1 ">
                        <p class=" text-neutral-400 text-lg">
                            Download Formats
                        </p>
                        <div class="text-white font-medium text-xl">PDF format for access.</div>
                    </div>
                    <div>
                        <ArrowButton :icon="EyeIcon">Preview</ArrowButton>
                    </div>
                </div>
            </div>
            <div>
                <div class=" bg-neutral-800/30 border h-full border-neutral-700 flex flex-col gap-1 p-7 rounded-xl">
                    <p class=" text-neutral-400 text-lg">
                        Average Author Expertise
                    </p>
                    <div class="text-white font-medium text-xl">Whitepapers are authored by subject matter experts with an average of 20 years of experience.</div>
                </div>
            </div>
        </div>


    </div>
</template>