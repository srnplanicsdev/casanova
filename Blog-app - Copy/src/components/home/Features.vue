<script setup>
import FeatureCard from '../common/FeatureCard.vue';
import SectionHeader from '../common/SectionHeader.vue';

const featureData = [{
    title: 'Quantity',
    context: 'Over 1,000 articles on emerging tech trends and breakthroughs.'
},
{
    title: 'Variety',
    context: 'Articles cover fields like AI, robotics, biotechnology, and more.'
},
{
    title: 'Frequency',
    context: 'Fresh content added daily to keep you up to date.'
},
{
    title: 'Authoritative',
    context: 'Written by our team of tech experts and industry professionals.'
},
]
 const researchBlog = [
    {title:"Depth",
        context:"500+ research articles for in-depth understanding."
    },
    {title:"Graphics",
        context:"Visual aids and infographics to enhance comprehension."
    },
    {title:"Trends",
        context:"Explore emerging trends in future technology research."
    },
    {title:"Contributors",
        context:"Contributions from tech researchers and academics."
    },

 ]

 const featureContent = {
    title:"FutureTech Features",
    badge:'Unlock the Power of',
    
 }
 


</script>
<template>
   
    <SectionHeader :content="featureContent"/>
    <div class=" px-20 gap-20 grid grid-cols-3 bg-neutral-900 border border-neutral-700">
        <div class=" px-20 col-span-1  py-39">
            <img src="@/assets/Icon3.png" alt="">
            <div class="mt-12 ">

                <p class="text-white text-4xl">
                    Future Technology Blog
                </p>
                <span class=" text-neutral-500 text-lg">
                    Stay informed with our blog section dedicated to future technology.
                </span>
            </div>

        </div>
        <div class=" border-s col-span-2 grid grid-cols-2 p-20 gap-7 border-neutral-700">
            <div class="" v-for="feature in featureData " :key="feature.title">

                <FeatureCard :feature="feature"/>
            </div>
        </div>
    </div>
     <div class=" px-20 gap-20 grid grid-cols-3 border-t-0 bg-neutral-900 border border-neutral-700">
        <div class=" px-20 col-span-1  py-39">
            <img src="@/assets/Icon2.png" alt="">
            <div class="mt-12 ">

                <p class="text-white text-4xl">
                    Research Insights Blogs
                </p>
                <span class=" text-neutral-500 text-lg">
Dive deep into future technology concepts with our research section.
                </span>
            </div>

        </div>
        <div class=" border-s col-span-2 grid grid-cols-2 p-20 gap-7 border-neutral-700">
            <div class="" v-for="feature in researchBlog " :key="feature.title">

                <FeatureCard :feature="feature"/>
            </div>
        </div>
    </div>
    

</template>