<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import QRCode from "qrcode";

const props = defineProps<{
  url: string;
}>();

const qrSrc = ref("");

async function generateQR() {
  if (props.url) {
    qrSrc.value = await QRCode.toDataURL(props.url, {
      width: 180,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });
  }
}

watch(() => props.url, generateQR, { immediate: true });
onMounted(generateQR);
</script>

<template>
  <div class="qr-wrapper">
    <img v-if="qrSrc" :src="qrSrc" alt="QR Code" />
  </div>
</template>

<style scoped>
.qr-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.qr-wrapper img {
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  padding: 8px;
}
</style>
