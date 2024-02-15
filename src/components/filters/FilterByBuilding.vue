<script setup>
import { onMounted, ref } from 'vue';
import { dataArrayMapping } from '../../dataProviders/dataLoadMapping';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

const buildings = ref([]);

onMounted(async () => {
  buildings.value = await dataArrayMapping.buildings();
});

function handleSelection(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<template>
  <select :value="props.modelValue" @change="handleSelection">
    <option value="" selected>
      Filter by Building
    </option>
    <option v-for="building in buildings" :key="building.id" :value="building.name">
      {{ building.name }}
    </option>
  </select>
</template>

<style scoped>

</style>
