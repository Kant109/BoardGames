<script setup lang="ts">
/**
 * Composant GameGrid - Affiche une grille responsive de jeux de société
 *
 * Props:
 * - games: Tableau des jeux à afficher
 * - favorites: Set des IDs des jeux favoris
 *
 * Événements:
 * - toggle-favorite: Émis quand l'utilisateur clique sur le bouton favori d'un jeu
 */

import GameCard from './GameCard.vue'

// Interface pour un jeu
interface Game {
  id: number
  name: string
  description: string
  image: string
}

// Définition des props
interface Props {
  games: Game[]
  favorites: Set<number>
}

defineProps<Props>()

// Déclaration de l'événement émis
const emit = defineEmits<{
  (e: 'toggle-favorite', id: number): void
}>()

// Fonction pour transmettre l'événement toggle-favorite au parent
const handleToggleFavorite = (id: number) => {
  emit('toggle-favorite', id)
}
</script>

<template>
  <div class="game-grid">
    <!-- Boucle sur tous les jeux pour créer une carte pour chacun -->
    <GameCard
      v-for="game in games"
      :key="game.id"
      :id="game.id"
      :name="game.name"
      :description="game.description"
      :image="game.image"
      :is-favorite="favorites.has(game.id)"
      @toggle-favorite="handleToggleFavorite"
    />
  </div>
</template>

<style scoped>
/* Grille responsive */
.game-grid {
  display: grid;
  /*
    Grille responsive utilisant CSS Grid:
    - Mobile: 1 colonne
    - Tablette: 2 colonnes (à partir de 640px)
    - Desktop: 3 colonnes (à partir de 1024px)
    - Large desktop: 4 colonnes (à partir de 1280px)
  */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Ajustement pour très petits écrans */
@media (max-width: 320px) {
  .game-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 12px;
  }
}

/* Tablettes */
@media (min-width: 640px) {
  .game-grid {
    padding: 24px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .game-grid {
    padding: 32px;
    gap: 28px;
  }
}
</style>
