<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { useUsersStore } from '../../../stores/usersStore';
import ProfileCompany from '../components/ProfileCompany.vue';
import { singleObjectIsValid } from '../../../helpers/loadSingleObject';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import ProfileAddress from './profileAddress.vue';

const route = useRoute();
const router = useRouter();
const userStore = useUsersStore();

const isLoading = ref(true);
const object = ref({});
const user = ref({});
const userCanEdit = computed(() => userStore.authenticationStatus && userStore.getCurrentUser?.id === object.value.user);

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'profile-details')
        object.value = await dataObjectMapping.profile(route.params.id);
      if (!singleObjectIsValid(object.value))
        router.push({ name: 'NotFound' });

      isLoading.value = false;
      user.value = await dataObjectMapping.user(route.params.id);
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
        <h1>Profile Details</h1>
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
              Personal Information
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
              Company Details
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
              Current Address
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
                  <img v-if="object.file" :src="object.file" alt="Profile Picture">

                  <img v-else src="../../../../public/default_profile_picture.png" alt="">
                </div>
                <div class="block__content">
                  <h1>{{ object.first_name }} {{ object.last_name }}</h1>
                  <div class="form-main form-main--filters">
                    <div class="form__label">
                      <label>Phone number:</label> {{ object.phone_number }}
                      <label>Email:</label> {{ user.email }}
                    </div>
                    <div v-if="userCanEdit" class="form__foot">
                      <router-link
                        class="btn btn-warning"
                        :to="{ name: 'edit-profile', params: { id: object.user } }"
                      >
                        Edit
                        Profile
                      </router-link>

                      <!-- not implemented in backend api
                      <a
                        class="btn btn-danger"
                        href="#change-password"
                        disabled="true"
                      >Change
                        Password</a> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="profile"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <ProfileCompany :profile-object="object" />
            </div>
            <div
              id="contact"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <ProfileAddress :company-id="object.company" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
