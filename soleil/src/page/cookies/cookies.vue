<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
const { t } = useI18n();
const cookiesTable = computed(() => [
    { name: "__not", type: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.third-party"), expiration: "2 " + t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.years"), purpose: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.users-and-sessions"), class: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.not-exempt") },
    { name: "__utmb", type: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.third-party"), expiration: "30 " + t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.minutes"), purpose: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.new-sessions-or-visits"), class: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.not-exempt") },
    { name: "__utmc", type: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.third-party"), expiration: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.end-of-session"), purpose: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.configured-for-use-with-urchin"), class: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.not-exempt") },
    { name: "__utmz", type: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.third-party"), expiration: "6 " + t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.months"), purpose: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.stores-the-origin"), class: t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.not-exempt") },
])
</script>
<template>
    <Navbar />
    <div
        class="bg-[url('@/assets/media/images/banner/banner_1.jpg')] brightness-90 w-full h-screen bg-cover bg-center text-white text-center">
        <div class="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <strong class="text-5xl lg:text-6xl italic font-bold font-dm-serif-display">{{ t("cookies-page.title")
                }}</strong>
            </div>
        </div>
    </div>
    <div class="container mx-auto px-4 py-10">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl font-medium font-work-sans">{{ t("cookies-page.title") }}</h1>
            <div class="p-4 ">
                <p class="text-gray-800 font-semibold">1.- {{ t("cookies-page.background.title") }}</p>
                <p class="text-gray-800">{{ t("cookies-page.background.description") }}
                </p>
            </div>
            <div class="p-4 ">
                <p class="text-gray-800 font-semibold">2. {{ t("cookies-page.what-are-cookies.title") }}</p>
                <p class="text-gray-800">{{ t("cookies-page.what-are-cookies.description") }}
                </p>
            </div>
            <div class="p-4">
                <p class="text-gray-800 font-semibold">3. {{ t("cookies-page.types-of-cookies.title") }}</p>
                <ol class="ps-8 text-gray-800 list-decimal">
                    <li class="mt-2"><strong>{{ t("cookies-page.types-of-cookies.first-party.title") }}</strong> {{
                        t("cookies-page.types-of-cookies.first-party.description") }}</li>
                    <li class="mt-2"><strong>{{ t("cookies-page.types-of-cookies.third-party.title") }}</strong> {{
                        t("cookies-page.types-of-cookies.third-party.description") }}</li>
                    <li class="mt-2"><strong> {{ t("cookies-page.types-of-cookies.session.title") }}</strong> {{
                        t("cookies-page.types-of-cookies.session.description") }}</li>
                    <li class="mt-2"><strong>{{ t("cookies-page.types-of-cookies.persistent.title") }}</strong> {{
                        t("cookies-page.types-of-cookies.persistent.description") }}</li>
                    <li class="mt-2"><strong>{{ t("cookies-page.types-of-cookies.analytics.title") }}</strong> {{
                        t("cookies-page.types-of-cookies.analytics.description") }}</li>
                    <li class="mt-2"><strong>{{ t("cookies-page.types-of-cookies.advertising.title") }}</strong> {{
                        t("cookies-page.types-of-cookies.advertising.description") }}</li>
                    <li class="mt-2"><strong>{{ t("cookies-page.types-of-cookies.behavioral-advertising.title")
                    }}</strong> {{ t("cookies-page.types-of-cookies.behavioral-advertising.description") }}</li>
                </ol>
            </div>
            <div class="p-4">
                <p class="text-3xl font-medium font-work-sans">2. {{
                    t("cookies-page.types-of-cookies-used-by-this-website.title") }}</p>
                <p class="text-gray-800">{{ t("cookies-page.types-of-cookies-used-by-this-website.description") }}</p>
            </div>
            <div class="p-4">
                <p class="text-gray-800">{{ t("cookies-page.types-of-cookies-used-by-this-website.description-span") }}
                </p>
            </div>
            <table class="w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr class="">
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                            {{ $t("about-card.name") }}</th>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                            {{ $t("about-card.type") }}</th>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                            {{ $t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.expiration") }}</th>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                            {{ $t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.purpose") }}</th>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                            {{ $t("cookies-page.types-of-cookies-used-by-this-website.cookies-list.class") }}</th>

                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(cookie, index) in cookiesTable" :key="index">
                        <td class="px-2 py-2 whitespace-nowrap  text-gray-900">{{ cookie.name }}</td>
                        <td class="px-2 py-2 whitespace-nowrap  text-gray-900">{{ cookie.type }}</td>
                        <td class="px-2 py-2 whitespace-nowrap  text-gray-900">{{ cookie.expiration }}</td>
                        <td class="px-2 py-2 whitespace-nowrap  text-gray-900">{{ cookie.purpose }}</td>
                        <td class="px-2 py-2 whitespace-nowrap  text-gray-900">{{ cookie.class }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="p-4 flex flex-col gap-3">
                <p class="text-3xl font-medium font-work-sans">{{
                    t("cookies-page.revocation-and-deletion-of-cookies.title") }}</p>
                <p class="text-gray-800">{{ t("cookies-page.revocation-and-deletion-of-cookies.description") }}</p>
                <p class="text-gray-800"><strong>{{
                    t("cookies-page.revocation-and-deletion-of-cookies.google-chrome.title") }}</strong> {{
                            t("cookies-page.revocation-and-deletion-of-cookies.google-chrome.description") }} <a
                        href="https://support.google.com/chrome/answer/95647?hl=es">https://support.google.com/chrome/answer/95647?hl=es</a>
                </p>
                <p class="text-gray-800"><strong>{{
                    t("cookies-page.revocation-and-deletion-of-cookies.microsoft-internet-explorer.title")
                        }}</strong> {{
                            t("cookies-page.revocation-and-deletion-of-cookies.microsoft-internet-explorer.description") }} <a
                        href="http://windows.microsoft.com/es-es/internet-explorer/delete-manage-cookies#ie=ie-9">http://windows.microsoft.com/es-es/internet-explorer/delete-manage-cookies#ie=ie-9</a>
                </p>
                <p class="text-gray-800"><strong>{{ t("cookies-page.revocation-and-deletion-of-cookies.firefox.title")
                }}</strong> {{ t("cookies-page.revocation-and-deletion-of-cookies.firefox.description") }} <a
                        href="http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we">http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we</a>
                </p>
                <p class="text-gray-800"><strong>{{ t("cookies-page.revocation-and-deletion-of-cookies.safari.title")
                }}</strong> {{ t("cookies-page.revocation-and-deletion-of-cookies.safari.description") }} <a
                        href="http://www.apple.com/es/privacy/use-of-cookies/">http://www.apple.com/es/privacy/use-of-cookies/</a>
                </p>
                <p class="text-gray-800"><strong>{{ t("cookies-page.revocation-and-deletion-of-cookies.opera.title")
                }}</strong> {{ t("cookies-page.revocation-and-deletion-of-cookies.opera.description") }} <a
                        href="http://help.opera.com/Linux/10.60/es-ES/cookies.html">http://help.opera.com/Linux/10.60/es-ES/cookies.html</a>
                </p>
            </div>
            <div class="p-4">
                <p class="text-3xl font-medium font-work-sans">{{ t("cookies-page.third-party-service-providers.title")
                }}</p>
                <p class="text-gray-800">{{ t("cookies-page.third-party-service-providers.description") }}</p>
            </div>
            <table>
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-2 py-2 whitespace-nowrap  text-gray-900">{{
                            t("cookies-page.third-party-service-providers.supplier") }}</th>
                        <th class="px-2 py-2 whitespace-nowrap  text-gray-900">{{
                            t("cookies-page.third-party-service-providers.purpose-of-the-service-and-the-cookie") }}
                        </th>
                        <th class="px-2 py-2 whitespace-nowrap  text-gray-900">{{
                            t("cookies-page.third-party-service-providers.supplier-information") }}</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-x divide-gray-200">
                    <tr>
                        <td class="px-2 py-2 whitespace-nowrap  text-gray-900">{{
                            t("cookies-page.third-party-service-providers.google-analytics.title") }}</td>
                        <td class="px-2 py-2 whitespace-nowrap  text-gray-900">{{
                            t("cookies-page.third-party-service-providers.google-analytics.description") }}</td>
                        <td class="px-2 py-2 whitespace-nowrap  text-gray-900"><a
                                href="http://www.google.es/intl/es/policies/privacy/">http://www.google.es/intl/es/policies/privacy/</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Footer />
</template>