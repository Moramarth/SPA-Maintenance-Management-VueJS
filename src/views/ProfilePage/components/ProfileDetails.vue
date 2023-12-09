<script>
import LoadSpinner from '../../../components/LoadSpinner.vue';

export default {
  components: {
    LoadSpinner,
  },
  data() {
    return {
      isLoading: false,
      object: {
        id: -1,
        company: {
          id: -1,
        },
      },
      address: {
        building: {
          id: -1,
          city: 'Varna',
        },
      },
    };
  },

};
</script>

<template>
  <LoadSpinner v-if="isLoading" />

  <section v-else class="section">
    <div class="container">
      <div class="section__head">
        <h1>Profile Details</h1>
      </div>
      <div class="section__body">
        <!-- {% address_display_for_profile object as address %}
        {% profile_group_info object.user as owner_group %} -->
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
          <!-- {% if address %} -->
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
          <!-- {% endif %} -->
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
                  <h1>{{ object.full_name }}</h1>
                  <div class="form-main form-main--filters">
                    <div class="form__label">
                      <label>Phone number:</label> {{ object.phone_number }}
                      <label>Email:</label> {{ object.email }}
                    </div>
                    <div class="form__foot">
                      <!-- {% if request.user == appuserprofile.user %} -->
                      <router-link
                        class="btn btn-warning"
                        :to="{ name: 'edit-profile', params: { id: object.id } }"
                      >
                        Edit
                        Profile
                      </router-link>
                      <a
                        class="btn btn-danger"
                        href="#change-password"
                      >Change
                        Password</a>
                      <!-- {% endif %} -->
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
              <div class="block-testimonial">
                <div class="block__image">
                  <img v-if="object.company.file" :src="object.company.file" alt="Company Logo">

                  <img v-else src="../../../../public/default_company_logo.jpg" alt="">
                </div>
                <div class="block__content">
                  <h1>
                    {{ object.company.name }}
                    <router-link :to="{ name: 'company-details', params: { id: object.company.id } }" target="_blank">
                      <i
                        class="fa-solid fa-arrow-right-to-bracket"
                        data-toggle="tooltip"
                        title="See Details"
                      />
                    </router-link>
                  </h1>
                  <div class="form-main form-main--filters">
                    <div v-if="object.company.businessField" class="form__label">
                      <label>Business Field:</label>
                      {{ object.company.businessField }}
                    </div>
                    <div class="form__label">
                      <router-link
                        class="btn btn-danger"
                        :to="{ name: 'edit-company', params: { id: object.company.id } }"
                      >
                        Edit
                        Company
                        Info
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="address"
              id="contact"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div class="container">
                <div class="form-main form-main--login">
                  <div class="form__label">
                    <label>Address:</label>
                  </div>
                  <p> {{ address.building.city }}, {{ address.building.address }}</p>
                  <div class="form__label">
                    <label>Building:</label>
                  </div>
                  {{ address.building.name }}
                  <router-link :to="{ name: 'building-details', params: { id: address.building.id } }" target="_blank">
                    <i
                      class="fa-solid fa-arrow-right-to-bracket"
                      data-toggle="tooltip"
                      title="See Details"
                    />
                  </router-link>

                  <div class="form__label">
                    <label>Location:</label>
                  </div>
                  <span v-if="address.section">{{ address.section }}, </span>
                  floor {{ address.floor }},
                  office {{ address.office_number }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
