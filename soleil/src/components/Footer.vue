<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const navigation = computed(() => [
    { title: t("home").toUpperCase(), name: "home" },
    { title: t("properties").toUpperCase(), name: "properties" },
    { title: t("about-us").toUpperCase(), name: "about-us" },
    { title: t("sell-with-us").toUpperCase(), name: "sell-your-property" },
    { title: t("services").toUpperCase(), name: "services" },
    { title: t("testimonials").toUpperCase(), name: "testimonials" },
    { title: t("contact").toUpperCase(), name: "contact" }
])
</script>

<template>
    <footer>
        <div class="bg-gold py-15 flex justify-center">
            <div class="container mx-auto px-4">
                <div class="flex justify-center">
                    <img src="@/assets/media/images/website/sde-for_dark_bg-web.png" alt="Soleildespagne"
                        class="h-32 md:h-40 object-contain" />
                </div>
                <div
                    class="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-10 mt-10 mb-10 text-center">
                    <template v-for="link in navigation" :key="link.name">
                        <router-link :to="{ name: link.name }" class="text-white hover:text-black transition-colors">{{
                            link.title
                        }}</router-link>
                    </template>
                    <router-link to="/favorites/" class="text-white text-xl hover:text-black">
                        <font-awesome-icon icon="fa-solid fa-heart" />
                    </router-link>
                </div>
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200/30 font-dm-serif-display text-white text-xl md:text-2xl font-semibold text-center">
                    <div class="py-4 md:py-0">
                        <span>{{ t("footer.address") }}:</span>
                        <p class="text-base font-normal mt-2 font-work-sans">ALTEA</p>
                    </div>
                    <div class="py-4 md:py-0">
                        <span>{{ t("footer.email") }}:</span>
                        <p class="text-base font-normal mt-2 font-work-sans">info@soleildespagne.com</p>
                    </div>
                    <div class="py-4 md:py-0">
                        <span>{{ t("footer.phone") }}:</span>
                        <p class="text-base font-normal mt-2 font-work-sans">+34 622 919 887 | +48 660 512 460</p>
                    </div>
                    <div class="py-4 md:py-0">
                        <span>{{ t("footer.follow-in") }}</span>
                        <div class="mt-2 flex justify-center gap-4">
                            <font-awesome-icon icon="fa-brands fa-facebook" />
                            <font-awesome-icon icon="fa-brands fa-instagram" />
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap justify-center pt-10 md:pt-15 gap-8 md:gap-15">
                    <img alt="raicv" class="h-16 md:h-20" src="@/assets/media/images/website/logo-api.svg" />
                    <img alt="raicv" class="h-16 md:h-20" src="@/assets/media/images/website/logo-cv.svg" />
                </div>
            </div>

        </div>
        <div class="bg-white text-sm font-light py-4">

            <div class="flex justify-center">
                <p>
                    {{ t("footer.copyright") }}
                </p>
            </div>
        </div>
    </footer>
</template>