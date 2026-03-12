<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { API, properties } from '../../../dummy-data/API';
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { propertiesApi } from '@/utils/api';

const { t } = useI18n();
const propertyTypes = properties.type;
const townsList = properties.towns;
const areasList = ref([
    { label: 'Costa del Sol', value: 'Costa del Sol' },
    { label: 'Costa Blanca', value: 'Costa Blanca' },
    { label: 'Costa Calida', value: 'Costa Calida' },
    { label: 'Costa de la Luz', value: 'Costa de la Luz' },
    { label: 'Costa Tropical', value: 'Costa Tropical' }
]);

const postPropertyForm = ref({
    title: '',
    type: '',
    status: 'New Build',
    price: 0,
    currency: 'EUR',
    reference: '',
    images: [],
    energyRating: '',
    location: {
        country: 'Spain',
        area: '',
        city: '',
        zone: '',
        distanceToBeachMeters: 0
    },
    propertyDetails: {
        bedrooms: 0,
        bathrooms: 0,
        floor: 0,
        usableArea: 0,
        plotSize: 0,
        balconyArea: 0,
        pool: ''
    },
    construction: {
        year: new Date().getFullYear(),
        deliveryDate: ''
    },
    description: '',
    communityFeatures: [],
    architects: []
});

const imageUrls = ref('');
const featureInput = ref('');
const architectInput = ref('');
const successMessage = ref('');
const errorMessage = ref('');

const addImage = () => {
    const urls = imageUrls.value.split('\n').filter(url => url.trim());
    postPropertyForm.value.images.push(...urls);
    imageUrls.value = '';
};

const removeImage = (index) => {
    postPropertyForm.value.images.splice(index, 1);
};

const addFeature = () => {
    if (featureInput.value.trim()) {
        postPropertyForm.value.communityFeatures.push(featureInput.value.trim());
        featureInput.value = '';
    }
};

const removeFeature = (index) => {
    postPropertyForm.value.communityFeatures.splice(index, 1);
};

const addArchitect = () => {
    if (architectInput.value.trim()) {
        postPropertyForm.value.architects.push(architectInput.value.trim());
        architectInput.value = '';
    }
};

const removeArchitect = (index) => {
    postPropertyForm.value.architects.splice(index, 1);
};

const createProperty = async () => {
    try {
        successMessage.value = '';
        errorMessage.value = '';
        const response = await propertiesApi.post('/properties', postPropertyForm.value);
        successMessage.value = 'Property created successfully!';
        console.log('Created property:', response.data);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } catch (error) {
        errorMessage.value = 'Error creating property: ' + (error.response?.data?.message || error.message);
        console.error('Error creating property:', error);
    }
};
</script>

<template>
    <Navbar />
    <div class="min-h-screen bg-gray-50 py-30 px-4">
        <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-4xl font-bold font-dm-serif-display text-gray-800 mb-8 text-center italic">
                Create New <span class="text-gold not-italic">Property</span>
            </h1>

            <div v-if="successMessage"
                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="createProperty" class="space-y-8">
                <!-- Basic Information -->
                <div class="border-b pb-6">
                    <h2 class="text-2xl font-semibold font-dm-serif-display text-gray-700 mb-4">Basic Information</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                            <input type="text" v-model="postPropertyForm.title" required
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Reference *</label>
                            <input type="text" v-model="postPropertyForm.reference" required
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                            <select v-model="postPropertyForm.type" required
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                                <option value="">Select Type</option>
                                <option v-for="type in propertyTypes" :key="type.value" :value="type.value">{{
                                    type.label
                                    }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                            <select v-model="postPropertyForm.status" required
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                                <option value="New Build">New Build</option>
                                <option value="Resale">Resale</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Price (€) *</label>
                            <input type="number" v-model.number="postPropertyForm.price" required min="0"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Energy Rating</label>
                            <select v-model="postPropertyForm.energyRating"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                                <option value="">Select Rating</option>
                                <option v-for="rating in ['A', 'B', 'C', 'D', 'E', 'F', 'G']" :key="rating"
                                    :value="rating">{{ rating }}</option>
                            </select>
                        </div>
                    </div>
                </div>

               
                <div class="border-b pb-6">
                    <h2 class="text-2xl font-semibold font-dm-serif-display text-gray-700 mb-4">Location</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Area *</label>
                            <select v-model="postPropertyForm.location.area" required
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                                <option value="">Select Area</option>
                                <option v-for="area in areasList" :key="area.value" :value="area.value">{{ area.label }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">City *</label>
                            <select v-model="postPropertyForm.location.city" required
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                                <option value="">Select City</option>
                                <option v-for="town in townsList" :key="town.value" :value="town.value">{{ town.label }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Zone</label>
                            <input type="text" v-model="postPropertyForm.location.zone"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Distance to Beach
                                (meters)</label>
                            <input type="number" v-model.number="postPropertyForm.location.distanceToBeachMeters"
                                min="0"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                    </div>
                </div>

                <!-- Property Details -->
                <div class="border-b pb-6">
                    <h2 class="text-2xl font-semibold font-dm-serif-display text-gray-700 mb-4">Property Details</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                            <input type="number" v-model.number="postPropertyForm.propertyDetails.bedrooms" min="0"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                            <input type="number" v-model.number="postPropertyForm.propertyDetails.bathrooms" min="0"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                            <input type="number" v-model.number="postPropertyForm.propertyDetails.floor" min="0"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Usable Area (m²)</label>
                            <input type="number" v-model.number="postPropertyForm.propertyDetails.usableArea" min="0"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Plot Size (m²)</label>
                            <input type="number" v-model.number="postPropertyForm.propertyDetails.plotSize" min="0"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Balcony Area (m²)</label>
                            <input type="number" v-model.number="postPropertyForm.propertyDetails.balconyArea" min="0"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Pool</label>
                            <select v-model="postPropertyForm.propertyDetails.pool"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                                <option value="">No Pool</option>
                                <option value="Private">Private</option>
                                <option value="Communal">Communal</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Construction Details -->
                <div class="border-b pb-6">
                    <h2 class="text-2xl font-semibold font-dm-serif-display text-gray-700 mb-4">Construction Details
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Construction Year</label>
                            <input type="number" v-model.number="postPropertyForm.construction.year" min="1900"
                                :max="new Date().getFullYear() + 10"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
                            <input type="date" v-model="postPropertyForm.construction.deliveryDate"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        </div>
                    </div>
                </div>

                <!-- Description -->
                <div class="border-b pb-6">
                    <h2 class="text-2xl font-semibold font-dm-serif-display text-gray-700 mb-4">Description</h2>
                    <textarea v-model="postPropertyForm.description" rows="6"
                        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"></textarea>
                </div>

                <!-- Images -->
                <div class="border-b pb-6">
                    <h2 class="text-2xl font-semibold font-dm-serif-display text-gray-700 mb-4">Images</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Add Image URLs (one per
                                line)</label>
                            <textarea v-model="imageUrls" rows="4"
                                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"></textarea>
                            <button type="button" @click="addImage"
                                class="mt-2 bg-gold text-white px-4 py-2 rounded hover:bg-gold/80">Add Images</button>
                        </div>
                        <div v-if="postPropertyForm.images.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div v-for="(image, index) in postPropertyForm.images" :key="index" class="relative">
                                <img :src="image" :alt="`Property image ${index + 1}`"
                                    class="w-full h-32 object-cover rounded">
                                <button type="button" @click="removeImage(index)"
                                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600">×</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Community Features -->
                <div class="border-b pb-6">
                    <h2 class="text-2xl font-semibold font-dm-serif-display text-gray-700 mb-4">Community Features</h2>
                    <div class="flex gap-2 mb-4">
                        <input type="text" v-model="featureInput" placeholder="Add a feature"
                            class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        <button type="button" @click="addFeature"
                            class="bg-gold text-white px-4 py-2 rounded hover:bg-gold/80">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="(feature, index) in postPropertyForm.communityFeatures" :key="index"
                            class="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            {{ feature }}
                            <button type="button" @click="removeFeature(index)"
                                class="text-red-500 hover:text-red-700">×</button>
                        </span>
                    </div>
                </div>

                <!-- Architects -->
                <div class="pb-6">
                    <h2 class="text-2xl font-semibold font-dm-serif-display text-gray-700 mb-4">Architects</h2>
                    <div class="flex gap-2 mb-4">
                        <input type="text" v-model="architectInput" placeholder="Add architect name"
                            class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold">
                        <button type="button" @click="addArchitect"
                            class="bg-gold text-white px-4 py-2 rounded hover:bg-gold/80">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="(architect, index) in postPropertyForm.architects" :key="index"
                            class="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            {{ architect }}
                            <button type="button" @click="removeArchitect(index)"
                                class="text-red-500 hover:text-red-700">×</button>
                        </span>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-center pt-6">
                    <button type="submit"
                        class="bg-gold text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gold/80 transition-colors">
                        Create Property
                    </button>
                </div>
            </form>
        </div>
    </div>
    <Footer />
</template>