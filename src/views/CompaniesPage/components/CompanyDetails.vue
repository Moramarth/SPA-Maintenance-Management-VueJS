<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import { useUsersStore } from '../../../stores/usersStore';
import { formatDate } from '../../../helpers/formatDate';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { loadSingleObject, singleObjectIsValid } from '../../../helpers/loadSingleObject';
import CompanyAddress from './CompanyAddress.vue';
import CompanyEmployees from './CompanyEmployees.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUsersStore();

const object = ref({});
const isLoading = ref(true);

const canEdit = computed(() => useUsersStore.authenticationStatus && userStore.getCurrentProfile.company === object.value.id);

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'company-details')
        object.value = await loadSingleObject(route.params.id, 'company');
      if (!singleObjectIsValid(object.value))
        router.push({ name: 'NotFound' });
      isLoading.value = false;
    },

    { immediate: true },
  );
});
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <section v-else class="section">
    <div class="container">
      <div class="section__head">
        <h1>Company Details</h1>
      </div>
      <div class="section__body">
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
              Company Info
            </button>
          </li>

          <template v-if="userStore.authenticationStatus">
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
                Address
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
                Employees
              </button>
            </li>
          </template>
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
                  <img v-if="object.file" :src="object.file" alt="Company Logo">

                  <img v-else src="../../../../public/default_company_logo.jpg" alt="Default Company logo">
                </div>
                <div class="block__content">
                  <h1>{{ object.name }}</h1>
                  <div class="form-main form-main--filters">
                    <div class="form__label">
                      <template v-if="object.business_field">
                        <label>Business Field:</label>
                        {{ object.business_field }}
                      </template>

                      <template v-if="object.additional_information">
                        <label>About us:</label>
                        {{ object.additional_information }}
                      </template>
                    </div>
                    <div class="form__label">
                      <p class="text-muted">
                        Partner since: {{ formatDate(object.created_on) }}
                      </p>

                      <router-link v-if="canEdit" class="btn btn-danger" :to="{ name: 'edit-company', params: { id: object.id } }">
                        Edit
                        Company Info
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="userStore.authenticationStatus">
              <div
                id="profile"
                class="tab-pane fade"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <CompanyAddress :company-id="object.id" />
              </div>

              <div
                id="contact"
                class="tab-pane fade"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <CompanyEmployees :company-id="object.id" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
