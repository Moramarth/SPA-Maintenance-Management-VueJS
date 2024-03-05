<script setup>
import { useUsersStore } from '../../../stores/usersStore';
import { deleteRouteNames, editRouteNames } from '../../../router/routeNames.js';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering.js';
import DetailsView from '../../../components/defaultViews/DetailsView.vue';

const userStore = useUsersStore();

const conditions = structuredClone(conditionalObjectRendering);
conditions.representedAs.customPage = true;
</script>

<template>
  <DetailsView
    :object-type="conditions.review"
    :object-represented-as="conditions.representedAs"
  >
    <template #page-header>
      Review Details
    </template>
    <template #custom-page-body="{ ...object }">
      <div class="form-main form-main--filters">
        <div v-if="userStore.authenticationStatus && userStore.getCurrentUser.id === object.user" class="form__wrap">
          <div class="form__foot">
            <router-link class="btn btn-warning" :to="{ name: editRouteNames.review, params: { id: object.id } }">
              Edit
            </router-link>
            <router-link class="btn btn-danger" :to="{ name: deleteRouteNames.review, params: { id: object.id } }">
              Delete
            </router-link>
          </div>
        </div>
      </div>

      <div class="section__body-group">
        <div class="block-review">
          <div class="block__image">
            <img
              v-if="object.user_profile_picture"
              class="img-fluid rounded-start"
              :src="object.user_profile_picture"
              alt=""
            >
            <img
              v-else
              class="img-fluid rounded-start"
              src="../../../../public/default_profile_picture.png"
              alt=""
            >
          </div>

          <div class="block__content">
            <div class="block__content-bg">
              <p v-if="object.user">
                <strong>From:</strong>
                {{ object.user_full_name }}
              </p>
              <p v-else>
                <strong>From:</strong> Ex tenant
              </p>

              <p v-if="object.user_company_name">
                <strong>Company:</strong>
                {{ object.user_company_name }}
              </p>

              <p v-else>
                <strong>Company:</strong> Previous Partner
              </p>

              <p v-if="object.service_report">
                <strong>For:</strong> {{ object.service_report_title }}
              </p>

              <p><strong>Rating:</strong> {{ object.rating }}</p>
              <p><strong>Comment:</strong> {{ object.comment }}</p>
            </div>
          </div>

          <div class="block__logo">
            <img
              v-if="object.company_logo"
              class="img-fluid rounded-start"
              :src="object.company_logo"
              alt=""
            >
            <img
              v-else
              class="img-fluid rounded-start"
              src="../../../../public/default_company_logo.jpg"
              alt=""
            >
          </div>
        </div>
      </div>
    </template>
  </DetailsView>
</template>

<style  scoped>

</style>
