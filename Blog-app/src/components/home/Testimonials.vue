<script setup>
import { StarIcon } from '@heroicons/vue/20/solid';
import ProfileChip from '../common/ProfileChip.vue';
import SectionHeader from '../common/SectionHeader.vue';
import ReviewCard from '../common/ReviewCard.vue';
const testimonalContent = {
    badge: 'What Our Readers Say',
    title: "Real Words from Real Readers",
    btntitle: "View All Testimonials"
}

const blogPost =
{
    img: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: "John Techson",
    profession: "Quantum Computing",
    date: "October 15, 2023",
    title: "The Quantum Leap in Computing",
    content: "Explore the revolution in quantum computing, its applications, and its potential impact on various industries."
}
const reviewCard = [
    {
        img: 'https://randomuser.me/api/portraits/women/5.jpg',
        name: "Sarah Thompson",
        profession: "San Francisco, USA",
        content: "The ebooks on AI in education have been a game-changer for my research. They provide in-depth insights and case studies that are invaluable for staying updated."
    },
    {
        img: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: "Raj Patel",
        profession: "Mumbai, India",
        content: "The whitepapers on renewable energy strategies have greatly influenced my work. They offer detailed data and analysis, helping me make informed decisions."
    },
    {
        img: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: "Emily Adams",
        profession: "London, UK",
        content: "The AI in healthcare reports have been an essential resource for our hospital. They highlight the latest innovations and best practices, improving patient care."
    },
    {
        img: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: "Alan Jackson",
        profession: "Houston, USA",
        content: "The reports on space mining prospects have fueled my passion for space exploration. They provide a comprehensive view of what lies beyond Earth."
    },
    {
        img: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: "Jessica Miller",
        profession: "Boston, USA",
        content: "The research papers on genomic breakthroughs have been a goldmine of information. They've shaped the direction of my research in genomics."
    },
    {
        img: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: "Diego Lopez",
        profession: "Barcelona, Spain",
        content: "The ebooks on renewable energy strategies have given me the insights I needed to pivot our startup toward sustainability."
    },

]
</script>
<template>
    <SectionHeader :content="testimonalContent" />
    <div class="px-6 lg:px-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-neutral-700 bg-neutral-900">

        <div v-for="(review, index) in reviewCard" :key="index"
            class="py-10 md:py-20 px-6 md:px-12.5 border-b border-neutral-700 md:even:border-r-0 lg:even:border-r lg:nth-[3n]:border-r-0 last:border-b-0 md:border-r lg:border-r"
            :class="{ 'md:nth-last-[-n+2]:border-b-0 lg:nth-last-[-n+3]:border-b-0': true }">
            <ReviewCard :review="review" />
        </div>
    </div>


</template>