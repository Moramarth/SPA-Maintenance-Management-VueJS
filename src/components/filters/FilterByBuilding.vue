<script setup>
import { onMounted, ref } from 'vue';
import { getBuildings } from '../../dataProviders/buildings';
import { filterElementId } from '../../helpers/filterReset';

const emit = defineEmits(['selected']);

const buildings = ref([]);

onMounted(async () => {
  buildings.value = await getBuildings();
});

function handleSelection(event) {
  emit('selected', event.target.value);
}
</script>

<template>
  <select :id="filterElementId.building" @change="handleSelection">
    <option>
      Filter by Building
    </option>
    <option v-for="building in buildings" :key="building.id" :value="building.name">
      {{ building.name }}
    </option>
  </select>
</template>

<style  scoped>

</style>
