<script>
export default {
  props: {
    offers: {
      type: Array,
      required: false,
      default: () => {
        return [{
          title: 'Offer title',
          createdBy: 'Contractor name',
          forAssignment: 'assignment title',
          additionalInformation: 'some more information',

        }, {
          title: 'Offer title',
          createdBy: 'Contractor name',
          forAssignment: 'assignment title',
          additionalInformation: 'some more information',
        }, { title: 'Offer title', createdBy: 'Contractor name', forAssignment: 'assignment title', additionalInformation: 'some more information' }];
      },

    },
  },
};
</script>

<template>
  <div class="section__body-group">
    filters
  </div>
  <div class="section__body-group">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr class="table table-light">
            <th>Title</th>
            <th>Created by</th>
            <th>Additional info</th>
            <th>For Assignment</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="offers.lenght === 0">
            <td colspan="8" align="center">
              No Offers to show
            </td>
          </tr>
          <template v-else>
            <tr v-for="object in offers" :key="object.id">
              <td>{{ object.title }}</td>
              <td>{{ object.createdBy }}</td>
              <td>{{ object.additionalInformation }}</td>
              <td>{{ object.forAssignment }}</td>
              <td>
                <a class="btn btn-outline-primary" href="{% url 'expense details' object.pk %}">
                  See Details
                </a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    pagination
  </div>
</template>

<style scoped>

</style>
