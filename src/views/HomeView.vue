<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import GameGrid from '../components/GameGrid.vue'
import gamesData from '../data/boardGames.json'
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();

// Clé pour le localStorage
const STORAGE_KEY = 'boardgames-favorites'

// État réactif des favoris (utilisation d'un Set pour des opérations rapides)
const favorites = ref<Set<number>>(new Set())

// État du filtre d'affichage
const filterMode = ref<'all' | 'favorites'>('all')

// Chargement des favoris depuis le localStorage au démarrage
onMounted(() => {
  loadFavoritesFromStorage()
})

/**
 * Charge les favoris depuis le localStorage
 */
const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const favArray = JSON.parse(stored) as number[]
      favorites.value = new Set(favArray)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des favoris:', error)
  }
}

/**
 * Sauvegarde les favoris dans le localStorage
 */
const saveFavoritesToStorage = () => {
  try {
    const favArray = Array.from(favorites.value)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favArray))
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des favoris:', error)
  }
}

/**
 * Bascule un jeu en favori ou le retire des favoris
 */
const toggleFavorite = (gameId: number) => {
  if (favorites.value.has(gameId)) {
    // Retire le jeu des favoris
    favorites.value.delete(gameId)
  } else {
    // Ajoute le jeu aux favoris
    favorites.value.add(gameId)
  }

  // Sauvegarde dans le localStorage
  saveFavoritesToStorage()
}


/**
 * Compte le nombre de favoris
 */
const favoritesCount = computed(() => favorites.value.size)
</script>

<template>
      <GameGrid
        :games="gameStore.games"
        :favorites="favorites"
        @toggle-favorite="toggleFavorite"
      />

</template>