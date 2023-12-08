<script>
import LoadSpinner from '../../components/LoadSpinner.vue';
import ListView from '../ListView/ListView.vue';
import CreateView from '../CreateView/CreateView.vue';
import DetailsView from '../DetailsView/DetailsView.vue';
import DeleteView from '../DeleteView/DeleteView.vue';

export default {
  components: {
    LoadSpinner,
    ListView,
    CreateView,
    DetailsView,
    DeleteView,
  },
  props: {
    loadAll: {
      type: Boolean,
    },
    isDeleting: {
      type: Boolean,
    },
    isEditing: {
      type: Boolean,
    },
    isCreating: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
      reviews: [],
      listType: 'ReviewsList',
      objectType: 'ReviewDetails',
      createType: 'CreateReview',
      deleteType: 'DeleteReview',
    };
  },
  computed: {
    reviewObject() {
      if (this.$route.params.id) {
        // API call for single object here
        console.log(this.loadList);
        return { id: this.$route.params.id };
      }
      return {};
    },
    loadList() {
      if (this.loadAll) {
        return [{
          id: -1,
          user: 'Build',
          userImage: '',
          comment: 'this is a comment from listview',
          submited: 'ytoda',

        }, {
          id: -1,
          user: 'Build',
          userImage: '',
          comment: 'this is a comment from listview',
          submited: 'ytoda',

        }];
      }
      return [];
    },
    canEdit() {
      return this.isEditing;
    },
    canDelete() {
      return this.isDeleting;
    },
    canCreate() {
      return this.isCreating;
    },

  },
  methods: {
    deleteObject() {
      console.log('object is deleted');
      this.$router.push({ name: 'show-all-reviews' });
    },
  },

};
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <template v-else>
    <CreateView
      v-if="canCreate || (reviewObject && canEdit)"
      :is-editing="canEdit"
      :create-object="createType"
      :object="reviewObject"
    />
    <ListView v-else-if="!reviewObject.id" :list-type="listType" :array="loadList" />
    <DetailsView
      v-else-if="reviewObject && !canEdit && !canDelete"
      :object-type="objectType"
      :object="reviewObject"
    />
    <DeleteView
      v-if="canDelete"
      :delete-type="deleteType"
      :object-i-d="reviewObject.id"
      @confirm-delete="deleteObject"
    />
  </template>
</template>

<style scoped>
.spinner-border {
  position: absolute;
  top: calc(50% - 2.5rem);
  left: calc(50% - 2.5rem);
  width: 5rem;
  height: 5rem;
}
</style>
