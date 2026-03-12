import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useFavoriteStore = defineStore('favorite', () => {
    const favorites = ref([])
    const clearFavorites = () => {
        favorites.value = []
    }
    const addFavorite = (property) => {
        favorites.value.push(property)
    }
    const removeFavorite = (property) => {
        favorites.value = favorites.value.filter((item) => item.id !== property.id)
    }
    return { favorites, addFavorite, removeFavorite, clearFavorites }
})