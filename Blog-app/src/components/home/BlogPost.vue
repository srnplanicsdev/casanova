<script setup>
import { ref } from 'vue'
import SectionHeader from '../common/SectionHeader.vue'
import ArrowButton from '../common/ArrowButton.vue'
import BlogPostCard from '../common/BlogPostCard.vue'


const blogPostContent = {
    title: "Explore FutureTech's In-Depth Blog Posts",
    badge: 'A Knowledge Treasure Trove',
    btntitle: 'View All Blogs',
}


const activeCategory = ref('All')
const groupButton = ref([
    'All',
    'Quantum Computing',
    'AI Ethics',
    'Space Exploration',
    'Biotechnology',
    'Renewable Energy',
])

const blogPost = [
    {
        img: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: "John Techson",
        profession: "Quantum Computing",
        date: "October 15, 2023",
        title: "The Quantum Leap in Computing",
        content: "Explore the revolution in quantum computing, its applications, and its potential impact on various industries."
    }, {
        img: 'https://randomuser.me/api/portraits/women/3.jpg',
        name: "Sarah Ethicist",
        profession: "AI Ethics",
        date: "November 5, 2023",
        title: "The Ethical Dilemmas of AI",
        content: "A deep dive into ethical challenges posed by AI, including bias, privacy, and transparency."
    }, {
        img: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: "Astronomer X",
        profession: "Space Exploration",
        date: "December 10, 2023",
        title: "The Mars Colonization Challenge",
        content: "Exploring the technical and logistical challenges of human colonization on Mars."
    }
]

</script>

<template>
    <SectionHeader :content="blogPostContent" />
    <div
        class="bg-neutral-900 px-6 lg:px-40 gap-3 md:gap-5 py-6 lg:py-12.5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <button v-for="btn in groupButton" :key="btn" @click="activeCategory = btn"
            class="border rounded-lg text-xs md:text-sm lg:text-lg w-full text-neutral-400 border-neutral-700 p-3 md:p-4 lg:p-7.5 transition"
            :class="activeCategory === btn ? 'bg-neutral-800/30 text-white' : 'bg-neutral-900'">
            {{ btn }}
        </button>
    </div>
    <BlogPostCard v-for="blog in blogPost" :key="blog.name" :blogpost="blog" />
</template>
