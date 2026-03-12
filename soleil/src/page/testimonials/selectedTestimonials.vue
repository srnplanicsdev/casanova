<script setup>
const props = defineProps({
    cardData: Object
})
</script>
<template>
    <div>
        <div class="">
            <div class="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-0 w-full">
                <div class="col-span-1 flex justify-center sm:justify-start pt-5">
                    <img class="w-20 h-20 sm:w-25 sm:h-25 rounded-full" :src="cardData.image" alt="">
                </div>
                <div class="col-span-1 sm:col-span-5 flex flex-col gap-4 ps-0 sm:ps-5 text-center sm:text-left">
                    <div class="text-xl md:text-2xl font-bold font-dm-serif-display italic">
                        {{ cardData.name }}
                    </div>
                    <div class="text-sm md:text-base font-work-sans font-light">
                        {{ cardData.description }}
                    </div>
                    <div class="mt-4">
                        <img src="@/assets/media/images/website/logo-firma-test.svg" alt="">
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>