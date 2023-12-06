<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          user: 'User full name',
          createdBy: 'Created By user',
          assignment: 'Assignment title',
          description: 'Some description here',
          meetingDate: 'Meeting date',
          file: '',
          company: 'Company name',
          serviceReport: 'service report title',
          rating: 4,
          comment: 'this is details review comment',
        };
      },
    },
  },
};
</script>

<template>
  <!-- {% if user_is_authenticated and request.user == object.user %} -->
  <div class="form-main form-main--filters">
    <div class="form__wrap">
      <div class="form__foot">
        <a class="btn btn-warning" href="{% url 'edit review' object.pk %}">Edit</a>
        <a class="btn btn-danger" href="{% url 'delete review' object.pk %}">Delete</a>
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
          src="default_profile_picture.png"
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
          src="default_company_logo.jpg"
          alt=""
        >
        <!-- {% endif %} -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
