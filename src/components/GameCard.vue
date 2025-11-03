<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
/**
 * Composant GameCard - Affiche une carte pour un jeu de société
 *
 * Props:
 * - id: Identifiant unique du jeu
 * - name: Nom du jeu
 * - description: Description courte du jeu
 * - image: URL de l'image du jeu
 * - isFavorite: Indique si le jeu est en favori
 *
 * Événements:
 * - toggle-favorite: Émis quand l'utilisateur clique sur le bouton favori
 */

// Définition des props avec TypeScript
interface Props {
  id: number
  name: string
  description: string
  image: string
  players: string
  duration: string
  isFavorite: boolean
}

// Déclaration des props
defineProps<Props>()

// Déclaration de l'événement émis
const emit = defineEmits<{
  (e: 'toggle-favorite', id: number): void
}>()

// Fonction pour gérer le clic sur le bouton favori
const handleFavoriteClick = (id: number) => {
  emit('toggle-favorite', id)
}

const openDetail = (id: number) => {
  router.push(`/game/${id}`);
}
</script>

<template>
  <div class="game-card" :class="{ 'is-favorite': isFavorite }" @click.prevent="openDetail(id)">
    <!-- Image du jeu -->
    <div class="game-image">
      <img :src="image" :alt="name" />
      <!-- Badge favori affiché en haut à droite si le jeu est favori -->
      <div v-if="isFavorite" class="favorite-badge">★</div>
    </div>

    <!-- Contenu de la carte -->
    <div class="game-content">
      <h3 class="game-title">{{ name }}</h3>
      <p class="game-description">{{ description }}</p>

      <!-- Informations sur le jeu (joueurs et durée) -->
      <div class="game-info">
        <div class="info-item">
          <span class="info-icon">👥</span>
          <span class="info-text">{{ players }} joueurs</span>
        </div>
        <div class="info-item">
          <span class="info-icon">⏱️</span>
          <span class="info-text">{{ duration }} min</span>
        </div>
      </div>

      <!-- Bouton favori -->
      <button
        class="favorite-button"
        :class="{ 'is-active': isFavorite }"
        @click.stop.prevent="handleFavoriteClick(id)"
        :aria-label="isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
      >
        <span class="heart-icon">{{ isFavorite ? '❤️' : '🤍' }}</span>
        {{ isFavorite ? 'Retirer' : 'Favoris' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Carte du jeu */
.game-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 3px solid transparent;
}

/* État hover de la carte */
.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

/* Bordure colorée pour les favoris */
.game-card.is-favorite {
  border-color: #ff4757;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
}

.game-card.is-favorite:hover {
  box-shadow: 0 4px 16px rgba(255, 71, 87, 0.4);
}

/* Conteneur de l'image */
.game-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.game-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-card:hover .game-image img {
  transform: scale(1.05);
}

/* Badge favori sur l'image */
.favorite-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4757;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: pulse 1.5s ease-in-out infinite;
}

/* Animation du badge favori */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Contenu de la carte */
.game-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* Titre du jeu */
.game-title {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
}

/* Description du jeu */
.game-description {
  margin: 0 0 12px 0;
  font-size: 0.9rem;
  color: #7f8c8d;
  line-height: 1.5;
  flex: 1;
}

/* Informations du jeu (joueurs et durée) */
.game-info {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  justify-content: center;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #495057;
  font-weight: 500;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  flex: 1;
  justify-content: center;
}

.info-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.info-text {
  white-space: nowrap;
}

/* Bouton favori */
.favorite-button {
  background: #ecf0f1;
  border: 2px solid #bdc3c7;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #2c3e50;
}

.favorite-button:hover {
  background: #dfe6e9;
  border-color: #95a5a6;
  transform: scale(1.02);
}

/* État actif du bouton favori */
.favorite-button.is-active {
  background: #ffe5e9;
  border-color: #ff4757;
  color: #ff4757;
}

.favorite-button.is-active:hover {
  background: #ffd1d8;
  transform: scale(1.02);
}

/* Icône coeur */
.heart-icon {
  font-size: 1.2rem;
  line-height: 1;
}
</style>
