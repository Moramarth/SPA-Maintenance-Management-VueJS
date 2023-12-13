<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['pageChange'],
  computed: {
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasNextPage() {
      return this.currentPage < this.totalPages;
    },
  },
  methods: {
    goToPreviousPage() {
      if (this.hasPreviousPage) {
        this.$emit('pageChange', this.currentPage - 1);
      }
    },
    goToNextPage() {
      if (this.hasNextPage) {
        this.$emit('pageChange', this.currentPage + 1);
      }
    },
  },

};
</script>

<template>
  <nav class="nav-pagination">
    <a :disabled="!hasPreviousPage" @click="goToPreviousPage">
      <i v-if="hasPreviousPage" class="fa-solid fa-circle-arrow-left fa-beat" />
      <i v-else class="fa-solid fa-circle-arrow-left" />
    </a>
    <h4>page {{ currentPage }} of {{ totalPages }}</h4>
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
