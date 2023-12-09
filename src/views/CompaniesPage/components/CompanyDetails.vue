<script>
export default {
  data() {
    return {
      // TODO: parse address and employees inside a single object
      object: {
        type: Object,
        required: false,
        default: () => {
          return {
            file: '',
            name: 'Company Name',
            businessField: 'Company Business Field',
            additionalInformation: 'Additional information',
            createdOn: 'Date registered in system',

          };
        },

      },
      address: {
        type: Object,
        required: false,
        default: () => {
          return {
            buildingID: -1,
            buildingCity: 'City',
            buildingAddress: 'Building address',
            buildingName: 'Building Name',
            section: 'section',
            floor: 'floor',
            officeNumber: 'Office Number',
          };
        },
      },

      employees: {
        type: Array,
        required: false,
        default: () => {
          return [];
        },
      },
    };
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Company Details</h1>
      </div>
      <div class="section__body">
        <!-- {% address_display_for_company company as address %} -->
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
          <!-- {% if user_is_authenticated %}
    {% if address %} -->
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
          <!-- {% endif %} -->
          <!-- {% if company.appuserprofile_set.all %} -->
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
          <!-- {% endif %}
    {% endif %} -->
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
                  <!-- {% if object.file %} -->
                  <!-- <img src="{{ object.file.url }}" alt="">
            {% else %} -->
                  <img src="../../../../public/default_company_logo.jpg" alt="">
                  <!-- {% endif %} -->
                </div>
                <div class="block__content">
                  <h1>{{ object.name }}</h1>
                  <div class="form-main form-main--filters">
                    <div class="form__label">
                      <!-- {% if object.business_field %} -->

                      <label>Business Field:</label>
                      {{ object.businessField }}

                      <!-- {% endif %}
                {% if object.additional_information %} -->

                      <label>About us:</label>
                      {{ object.additionalInformation }}

                      <!-- {% endif %} -->
                    </div>
                    <div class="form__label">
                      <p class="text-muted">
                        Partner since: {{ object.createdOn }}
                      </p>

                      <!-- {% if request.user.appuserprofile in company.appuserprofile_set.all %} -->
                      <router-link class="btn btn-danger" :to="{ name: 'edit-company', params: { id: object.id } }">
                        Edit
                        Company Info
                      </router-link>
                      <!-- {% endif %} -->
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- {% if user_is_authenticated %}
      {% if address %} -->
            <div
              id="profile"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div class="container">
                <div class="form-main form-main--login">
                  <div class="form__label">
                    <label>Address:</label>
                  </div>
                  <p>{{ address.buildingCity }}, {{ address.buildingAddress }}</p>

                  <div class="form__label">
                    <label>Building:</label>
                  </div>
                  {{ address.buildingName }}
                  <router-link :to="{ name: 'building-details', params: { id: address.buildingID } }" target="_blank">
                    <i
                      class="fa-solid fa-arrow-right-to-bracket"
                      data-toggle="tooltip"
                      title="See Details"
                    />
                  </router-link>

                  <div class="form__label">
                    <label>Location:</label>
                  </div>
                  <!-- {% if address.section %} -->
                  {{ address.section }},
                  <!-- {% endif %} -->
                  floor {{ address.floor }},
                  office {{ address.officeNumber }}
                </div>
              </div>
            </div>
            <!-- {% endif %} -->
            <!-- {% if company.appuserprofile_set.all %} -->
            <div
              id="contact"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div class="container">
                <div class="form-main form-main--login">
                  <!-- {% for person in object.appuserprofile_set.all %} -->
                  <h2 v-if="employees.length === 0">
                    No Employees to show
                  </h2>
                  <template v-else>
                    <div v-for="person in employees" :key="person.id">
                      {{ person.full_name }}
                      <a href="#" target="_blank">
                        <i
                          class="fa-solid fa-circle-info"
                          data-toggle="tooltip"
                          title="Contact Info"
                        />
                      </a>
                      <p />
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <!-- {% endif %} -->
          </div>
          <!-- {% endif %} -->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
