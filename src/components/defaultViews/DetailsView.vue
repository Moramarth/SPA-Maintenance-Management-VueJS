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
        <template v-if="props.objectRepresentedAs.table">
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

          <div class="section__body-group">
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
            <slot name="extra-functions-footer" v-bind="object" />
          </div>
        </template>
        <template v-else-if="props.objectRepresentedAs.tabList">
          <ul id="myTab" class="nav nav-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                id="home-tab"
                class="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                <slot name="main-tab-text" />
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                id="profile-tab"
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                <slot name="secondary-tab-text" />
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                id="contact-tab"
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                <slot name="tetriary-tab-text" />
              </button>
            </li>
          </ul>
          <div class="section__body-group">
            <div id="myTabContent" class="tab-content">
              <div
                id="home"
                class="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div class="block-testimonial">
                  <div class="block__image">
                    <slot name="main-tab-block-image" v-bind="object" />
                  </div>
                  <div class="block__content">
                    <slot name="main-tab-block-content" v-bind="object" />
                  </div>
                </div>
              </div>

              <div
                id="profile"
                class="tab-pane fade"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <slot name="secondary-tab-component" v-bind="object" />
              </div>
              <div
                id="contact"
                class="tab-pane fade"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <slot name="tetriary-tab-component" v-bind="object" />
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="props.objectRepresentedAs.customPage">
          <slot name="custom-page-body" v-bind="object" />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
