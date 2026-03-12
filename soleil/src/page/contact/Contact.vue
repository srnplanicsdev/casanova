<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Sitemap from '@/components/Sitemap.vue';

</script>
<template>
    <Navbar />
    <div class="">
        <div
            class="bg-[url('@/assets/media/images/website/bg-contact-form.jpg')] brightness-90 w-full min-h-screen bg-cover bg-center text-center py-30">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div class="bg-white rounded-sm shadow-xl">
                        <div class="bg-gold/10 rounded-sm p-6 md:p-10">
                            <h1
                                class="text-3xl md:text-5xl text-gray-800 italic font-bold font-dm-serif-display text-center">
                                {{ $t('contact') }}
                                <span class="text-gold not-italic">{{ $t("about-card.us") }}</span>
                            </h1>
                            <div class="flex flex-col gap-5 mt-10">
                                <input type="text"
                                    class="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                    :placeholder="$t('about-card.name') + ' *'">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input type="email"
                                        class="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                        :placeholder="$t('about-card.email') + ' *'">
                                    <input type="text"
                                        class="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                        :placeholder="$t('about-card.phone') + ' *'">
                                </div>

                                <textarea name="" rows="4" :placeholder="$t('about-card.message') + ' *'"
                                    class="p-4 bg-white appearance-none border border-gray-200 focus:border-gold outline-none transition-colors"></textarea>
                                <div>
                                    <label class="group flex items-start cursor-pointer">
                                        <input type="checkbox" class="sr-only" />
                                        <span
                                            class="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-black group-has-checked:border-black transition duration-300 ease-in-out">
                                            <svg class="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                        <p class="text-xs text-start w-full ps-3 text-gray-700 ">
                                            {{ $t("about-card.about-the-policy") }}<span
                                                class="underline font-medium">{{ $t("about-card.privacy-policy") }}</span>.
                                            {{ $t("about-card.information") }}
                                        </p>
                                    </label>
                                </div>
                                <button
                                    class="bg-gold text-white py-3 px-10 hover:bg-black transition-colors uppercase font-bold tracking-widest">CONTACT</button>
                                <div>
                                    <textarea
                                        class="p-4 w-full appearance-none text-xs bg-gray-50 border border-gray-200"
                                        rows="4" readonly>{{ $t("about-card.policy") }}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="p-6 md:p-10 flex flex-col justify-center bg-black/50 lg:bg-transparent rounded-sm lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
                        <div>
                            <h1
                                class="text-3xl md:text-5xl text-white italic font-bold font-dm-serif-display text-center">
                                {{ $t("contact") }} <span class="not-italic">{{ $t("info") }}</span></h1>
                            <div class="flex flex-col text-center gap-8 mt-10">
                                <div>
                                    <h2 class="text-2xl text-white font-semibold font-dm-serif-display">{{
                                        $t("footer.email") }}</h2>
                                    <p class="text-xl text-white mt-2 font-work-sans">info@soleildepagne.com</p>
                                </div>
                                <div>
                                    <h2 class="text-2xl text-white font-semibold font-dm-serif-display">{{
                                        $t("footer.phone") }}</h2>
                                    <p class="text-xl text-white mt-2 font-work-sans">+34 622 919 887 | +48 660 512
                                        460</p>
                                </div>
                                <div>
                                    <h2 class="text-2xl text-white font-semibold font-dm-serif-display">{{
                                        $t("footer.address") }}</h2>
                                    <p class="text-xl text-white mt-2 font-work-sans">ALTEA</p>
                                </div>
                                <div>
                                    <h2 class="text-2xl text-white font-semibold font-dm-serif-display">{{
                                        $t("footer.follow-in") }}</h2>
                                    <div class="text-2xl text-white mt-3 flex justify-center gap-4">
                                        <font-awesome-icon icon="fa-brands fa-facebook" />
                                        <font-awesome-icon icon="fa-brands fa-twitter" />
                                        <font-awesome-icon icon="fa-brands fa-instagram" />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-10 flex justify-center">
                                <img src="@/assets/media/images/website/firma-contact.svg" alt=""
                                    class="h-20 invert brightness-0">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-20 px-4">
            <div class="text-3xl md:text-5xl text-gray-800 italic font-bold font-dm-serif-display text-center">{{
                $t("find") }}
                <span class="not-italic text-gold">{{ $t("about-card.us") }}</span>
            </div>
            <div class="mt-10 container mx-auto">
                <Sitemap title="Find us" address="C. Ifach, 18, 03590 Altea, Alicante" height="500px" />
            </div>
        </div>
    </div>
    <Footer />
</template>