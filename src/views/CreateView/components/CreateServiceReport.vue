<script>
export default {
  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          title: 'Service report title',
          description: 'Service report description',
          file: 'Service report attachments if any',
        };
      },
    },
    reportType: {
      type: Array,
      required: false,
      default: () => {
        return [
          'Other',
          'Networking',
          'Electrical',
          'Plumbing',
          'Structural Integrity',
          'Security Systems',
          'Landscaping',
        ];
      },
    },
  },
};
</script>

<template>
  <template v-if="isEditing">
    <label for="report-title">Title:</label>
    <input id="report-title" type="text" required>
    <label for="report-description">Description:</label>
    <textarea id="report-description" type="text" required />
    <label for="report-file">Image:</label>
    Currently:
    <a href="#">very long filename for testing</a>
    <p>
      <input id="file-clear" type="checkbox">
      <label class="clear-image" for="file-clear">Clear Current</label>
    </p>
    <input type="file">
  </template>
  <template v-else>
    <label for="report-title">Title:</label>
    <input id="report-title" type="text" required>
    <label for="report-description">Description:</label>
    <textarea id="report-description" type="text" required />
    <label for="report-file">Image:</label>
    <input type="file">
    <label for="report-type">Report Type:</label>
    <select id="report-type" name="">
      <option v-for="type in reportType" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
  </template>
</template>

<style scoped>

</style>
