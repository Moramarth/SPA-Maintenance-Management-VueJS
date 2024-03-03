<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import { useUsersStore } from '../../stores/usersStore';
import { commonRouteNames, detailsRouteNames, listRouteNames } from '../../router/routeNames';
import { dataObjectMapping } from '../../dataProviders/dataLoadMapping';
import { singleObjectIsValid } from '../../helpers/loadSingleObject';

const props = defineProps({
  objectType: {
    type: String,
    required: true,
  },
  objectRepresentedAs: {
    type: Object,
    required: true,
  },
});
const route = useRoute();
const router = useRouter();
const userStore = useUsersStore();

const object = ref({});
const userCanEdit = computed(() => userStore.authenticationStatus && userStore.getCurrentUser.id === object.value.created_by);

onMounted(() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === detailsRouteNames[props.objectType])
        object.value = await dataObjectMapping[props.objectType](route.params.id);
      if (!singleObjectIsValid(object.value))
        router.push({ name: commonRouteNames.pageNotFound });
    },

    { immediate: true },
  );
});
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>
          <slot name="page-header" />
        </h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--filters">
          <div class="form__wrap">
            <div class="form__foot">
              <template v-if="userCanEdit">
                <slot name="user-can-edit-options" v-bind="object" />
              </template>
              <router-link class="btn btn-primary" :to="{ name: listRouteNames[props.objectType] }">
                <slot name="back-to-array-btn-text">
                  Back to Array
                </slot>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-if="objectRepresentedAs.table" class="section__body-group">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr class="table table-light">
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              <slot name="table-body" v-bind="object" />
            </tbody>
            <thead>
              <tr class="table table-light">
                <th />
                <th />
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
