<template>
  <div v-if="currentLink.id">
    <h4 class="m-1">ShortLink</h4>
    <!-- <form> -->
    <div class="form-group m-1">
      <label for="shortcode_uuid">Short URL</label>
      <label class="form-control disabled">{{
        `http://localhost:3000/${currentLink.shortcode_uuid}`
      }}</label>
    </div>
    <!-- </form> -->
    <form @submit.prevent="updateLink">
      <div class="form-group m-1">
        <label for="redirect_url">Long URL</label>
        <input
          type="url"
          class="form-control"
          id="redirect_url"
          v-model="currentLink.redirect_url"
          placeholder="https://example.com"
          pattern="https?://.+"
          required
        />
      </div>
      <div class="form-group m-1">
        <button type="submit" class="btn btn-success">Update</button>
      </div>
    </form>
    <div class="form-group m-1">
      <label>Status:</label>
      <strong>{{ currentLink.active ? "Published" : "Pending" }}</strong>
    </div>
    <div class="form-group m-1">
      <button
        class="btn btn-primary"
        v-if="currentLink.active"
        @click="updatePublished(false)"
      >
        UnPublish
      </button>
      <button v-else class="btn btn-primary" @click="updatePublished(true)">
        Publish
      </button>
      <button class="btn btn-danger m-1" @click="deleteLink">Delete</button>
    </div>

    <p>
      <strong>{{ message }}</strong>
    </p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Link...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkDataService from "@/services/LinkDataService";
import ShortLink from "@/types/Link";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "shortlink",
  data() {
    return {
      currentLink: {} as ShortLink,
      message: "",
    };
  },
  methods: {
    getLink(id: any) {
      LinkDataService.get(id)
        .then((response: ResponseData) => {
          this.currentLink = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(status: boolean) {
      let data = {
        id: this.currentLink.id,
        active: status,
      };

      LinkDataService.update(this.currentLink.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.currentLink.active = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateLink() {
      LinkDataService.update(this.currentLink.id, this.currentLink)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The url was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteLink() {
      LinkDataService.delete(this.currentLink.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "links" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getLink(this.$route.params.id);
  },
});
</script>

<style>
.disabled {
  background-color: #e9ecef;
}
</style>
