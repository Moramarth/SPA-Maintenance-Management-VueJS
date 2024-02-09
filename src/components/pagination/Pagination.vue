<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['pageChange']);

const hasPreviousPage = computed(() => {
  return props.currentPage > 1;
});
const hasNextPage = computed(() => {
  return props.currentPage < props.totalPages;
});

function goToPreviousPage() {
  if (hasPreviousPage.value) {
    emit('pageChange', props.currentPage - 1);
  }
}
function goToNextPage() {
  if (hasNextPage.value) {
    emit('pageChange', props.currentPage + 1);
  }
}
</script>

<template>
  <nav class="nav-pagination">
    <a :disabled="!hasPreviousPage" @click="goToPreviousPage">
      <i v-if="hasPreviousPage" class="fa-solid fa-circle-arrow-left fa-beat" />
      <i v-else class="fa-solid fa-circle-arrow-left" />
    </a>
    <h4>page {{ props.currentPage }} of {{ props.totalPages }}</h4>
    <a :disabled="!hasNextPage" @click="goToNextPage">
      <i v-if="hasNextPage" class="fa-solid fa-circle-arrow-right fa-beat" />
      <i v-else class="fa-solid fa-circle-arrow-right" />
    </a>
  </nav>
</template>

<style scoped>
.nav-pagination {
    display: flex;
    justify-content: center;
    gap: 2.0rem;
    align-items: center;
}

.nav-pagination h4 {
    font-size: 1.6rem;
    line-height: 1.33;
    text-transform: lowercase;
    font-weight: 700;
    letter-spacing: 1px;
}
</style>
