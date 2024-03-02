<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import DeleteFormFooter from '../../components/form-footers/DeleteFormFooter.vue';
import { singleObjectIsValid } from '../../helpers/loadSingleObject';
import { dataObjectMapping, deleteObjectMapping } from '../../dataProviders/dataLoadMapping';
import {commonRouteNames, deleteRouteNames, detailsRouteNames, listRouteNames} from '../../router/routeNames';

const props = defineProps({
  objectType: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const object = ref({});

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === deleteRouteNames[props.objectType])
        object.value = await dataObjectMapping[props.objectType](route.params.id);
      if (!singleObjectIsValid(object.value))
        router.push({ name: commonRouteNames.pageNotFound });
    },

    { immediate: true },
  );
});

async function deleteObject() {
  await deleteObjectMapping[props.objectType](object.value.id);
  router.push({ name: listRouteNames[props.objectType] });
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1><slot name="page-header" /></h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post">
            <div class="form__fields">
              <slot name="info-message" v-bind="object" />
            </div>
            <DeleteFormFooter
              :fallback-u-r-l="{ name: detailsRouteNames[props.objectType], params: { id: object.id } }"
              @confirm-delete="deleteObject"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
