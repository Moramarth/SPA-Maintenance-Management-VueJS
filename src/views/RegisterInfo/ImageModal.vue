<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  tinyImgURL: {
    type: String,
    required: true,
  },
  originalImgURL: {
    type: String,
    required: true,
  },
  isLandscape: {
    type: Boolean,
    required: true,
  },
});

const isOpen = ref(false);

onMounted(() => {
  document.addEventListener('keyup', handleKeyEvent);
});

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyEvent);
});

function handleKeyEvent(event) {
  if (event.keyCode === 27) {
    close();
  }
}

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}
</script>

<template>
  <div class="info-page-img">
    <a class="image-popup-link" @click="open">
      <img :src="props.tinyImgURL" alt="">
    </a>
  </div>

  <transition name="fade">
    <div v-show="isOpen" class="vue-modal">
      <div :class=" props.isLandscape ? 'vue-modal-inner landscape' : 'vue-modal-inner'">
        <div class="vue-modal-content">
          <img :src="props.originalImgURL" alt="">

          <i class="fa-solid fa-xmark" @click="close" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style  scoped>
.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.vue-modal-inner {
  max-width: 490px;
  margin: 2rem auto;
}

.landscape {
    max-width:900px;
}

.vue-modal-content {
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border-radius: 1rem;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

i {
    position: absolute;
    top:20px;
    right:20px;
}
</style>
