<script setup lang="ts">
import type { Game } from "@/interfaces/Game";
import { useGameStore } from "@/stores/GameStore";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import QrCode from "@/components/QrCode.vue";

interface Props {
  id: number;
}

const props = defineProps<Props>();
const route = useRoute();
const gameStore = useGameStore();

const game = ref({} as Game);
const selectedImage = ref<string>("");

// Compute the full URL of this page (for QR code)
const currentUrl = computed(() => window.location.origin + route.fullPath  + "#youtube");

onMounted(() => {
  const found = gameStore.games.find((g) => g.id === props.id);
  if (found) {
    game.value = found;
    selectedImage.value = found.images != null ? found.images[0] : found.image;
  }
});

// Converts "watch?v=" URLs to "embed/"
function embedYoutubeUrl(url: string): string {
  if (!url) return "";
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}
</script>

<template>
  <div class="detail-container">
    <div class="top-section">
      <!-- LEFT SIDE -->
      <div class="left-side">
        <nav class="breadcrumb">
          <router-link to="/">🎲 Liste des jeux </router-link>
          <span class="separator">/</span>
          <span>{{ game.name }}</span>
        </nav>
        <div class="main-image">
          <img :src="selectedImage" :alt="game.name" />
        </div>
        <div class="thumbnails">
          <img
            v-for="(img, index) in game.images"
            :key="index"
            :src="img"
            :alt="game.name"
            @click="selectedImage = img"
            :class="{ active: selectedImage === img }"
          />
        </div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="right-side">
        <h1>{{ game.name }}</h1>
        <p class="description">{{ game.long_description }}</p>

      <div class="game-info">
        <div class="info-item">
          <span class="info-icon">👥</span>
          <span class="info-text">{{ game.players }} joueurs</span>
        </div>
        <div class="info-item">
          <span class="info-icon">⏱️</span>
          <span class="info-text">{{ game.duration }} min</span>
        </div>
      </div>

        <!-- SHARE SECTION -->
        <div class="qr-section" v-if="game.how_to_play_link">
          <h3 class="qr-title">Lien vers l'explication des règles :</h3>
          <QrCode :url="currentUrl" />
        </div>
      </div>
    </div>

    <!-- YOUTUBE VIDEO -->
    <div id="youtube" class="video-section" v-if="game.how_to_play_link">
      <h2 class="video-heading">Comment jouer 🎲</h2>
      <iframe
        :src="embedYoutubeUrl(game.how_to_play_link)"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  color: #333;
}

.top-section {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: stretch; /* make left and right sides equal height */
}

.left-side,
.right-side {
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
}

.left-side {
  display: flex;
  flex-direction: column;
  height: 100%; /* match the right-side panel */
}

.main-image {
  flex: 2; /* 2/3 of left panel */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* ensure image doesn't overflow the container */
}

.main-image img {
  width: 60%;        /* fill width of the section */
  height: 60%;       /* fill height of the section */
  object-fit: contain; /* maintain aspect ratio without cropping */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.thumbnails {
  flex: 1; /* takes 1/3 of the left-side height */
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.thumbnails img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.2s, border-color 0.2s;
}

.thumbnails img:hover {
  transform: scale(1.05);
}
.thumbnails img.active {
  border-color: #007bff;
}

.right-side {
  flex: 1 1 45%;
}

.details p {
  margin: 10px 0;
  font-size: 1.05rem;
}

.qr-section {
  display: flex;
  flex-direction: column; /* stack title above QR code */
  align-items: flex-start;
  margin-top: 30px;
  gap: 10px;
}

.qr-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}
/* YOUTUBE SECTION */
.video-section {
  margin-top: 50px; /* more space above the section */
  text-align: center;
}

.video-section .video-heading {
  margin-bottom: 20px; /* spacing between heading and iframe */
}

.video-section iframe {
  width: 100%;
  max-width: 800px;
  height: 450px;
  border-radius: 10px;
}
.description {
  white-space: pre-line;
  margin-bottom: 20px; /* spacing below description */
}

.game-info {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  justify-content: flex-start; /* left align the tags */
  flex-wrap: wrap; /* allow wrapping on smaller screens */
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
  border-radius: 20px; /* more pill-like */
  border: 1px solid #e9ecef;
  min-width: 100px; /* fixed size */
  max-width: 160px; /* prevent overly wide tags */
  justify-content: center;
}


.info-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.info-text {
  white-space: nowrap;
}

.breadcrumb {
  width: 100%;
  margin: 0 0 20px 0; /* bottom spacing */
  padding: 0 10px;    /* same as main-image container if needed */
  font-size: 0.9rem;
  color: black;
  display: flex;
  align-items: center;
  gap: 5px;
}


.breadcrumb .separator {
  margin: 0 5px;
}

.breadcrumb a {
  color: rgb(53, 51, 51);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}
</style>
