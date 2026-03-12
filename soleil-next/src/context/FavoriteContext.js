'use client'

import { createContext, useContext, useState, useMemo } from 'react'

const FavoriteContext = createContext()

export function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState([])

    const addFavorite = (property) => {
        setFavorites((prev) => [...prev, property])
    }

    const removeFavorite = (property) => {
        setFavorites((prev) => prev.filter((p) => p._id !== property._id))
    }

    const removeAllFavorites = () => {
        setFavorites([])
    }

    const value = useMemo(() => ({
        favorites,
        addFavorite,
        removeFavorite,
        removeAllFavorites,
    }), [favorites])
    return (
        <FavoriteContext.Provider
            value={value}
        >
            {children}
        </FavoriteContext.Provider>
    )
}

export function useFavorite() {
    return useContext(FavoriteContext)
}