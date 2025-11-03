import type { Game } from "@/interfaces/Game";
import { defineStore } from "pinia";
import { ref } from "vue";
import gamesData from "../data/boardGames.json";

export const useGameStore = defineStore("Games", () => {
  const games = ref(gamesData as Array<Game>);

  return { games };
});
