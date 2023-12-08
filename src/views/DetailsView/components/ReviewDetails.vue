<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
    },
  },

};
</script>

<template>
  <!-- {% if user_is_authenticated and request.user == object.user %} -->
  <div class="form-main form-main--filters">
    <div class="form__wrap">
      <div class="form__foot">
        <router-link class="btn btn-warning" :to="{ name: 'edit-review', params: { id: object.id } }">
          Edit
        </router-link>
        <router-link class="btn btn-danger" :to="{ name: 'delete-review', params: { id: object.id } }">
          Delete
        </router-link>
      </div>
    </div>
  </div>
  <!-- {% endif %} -->

  <div class="section__body-group">
    <div class="block-review">
      <div class="block__image">
        <!-- {% if object.user.appuserprofile.file %} -->
        <!-- <img
          class="img-fluid rounded-start"
          src="{{ object.user.appuserprofile.file.url }}"
          alt=""
        >
        {% else %} -->
        <img
          class="img-fluid rounded-start"
          src="../../../../public/default_profile_picture.png"
          alt=""
        >
        <!-- {% endif %} -->
      </div>

      <div class="block__content">
        <div class="block__content-bg">
          <p v-if="object.user">
            <strong>From:</strong> {{ object.user }}
          </p>
          <p v-else>
            <strong>From:</strong> Ex tenant
          </p>

          <p v-if="object.company">
            <strong>Company:</strong> {{ object.company }}
          </p>

          <p v-else>
            <strong>Company:</strong> Previous Partner
          </p>

          <p v-if="object.serviceReport">
            <strong>For:</strong> {{ object.serviceReport }}
          </p>

          <p><strong>Rating:</strong> {{ object.rating }}</p>
          <p><strong>Comment:</strong> {{ object.comment }}</p>
        </div>
      </div>

      <div class="block__logo">
        <!-- {% if object.user.appuserprofile.company.logo %}
        <img
          class="img-fluid rounded-start"
          src="{{ object.user.appuserprofile.company.logo.url }}"
          alt=""
        >
        {% else %} -->
        <img
          class="img-fluid rounded-start"
          src="../../../../public/default_company_logo.jpg"
          alt=""
        >
        <!-- {% endif %} -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
