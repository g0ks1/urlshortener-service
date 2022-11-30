<template>
  <div class="row">
    <div class="col-md-6">
      <h4>Links List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(link, index) in links"
          :key="index"
          @click="setActiveLink(link, index)"
        >
          {{ `http://localhost:3000/${link.shortcode_uuid}` }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentLink.id">
        <h4>Link</h4>
        <div>
          <label><strong>Code:</strong></label>
          {{ `http://localhost:3000/${currentLink.shortcode_uuid}` }}
        </div>
        <div>
          <label><strong>URL:</strong></label>
          {{ currentLink.redirect_url }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentLink.active ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/links/' + currentLink.id" class="link-primary"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Link...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkDataService from "@/services/LinkDataService";
import ShortLink from "@/types/Link";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "links-list",
  data() {
    return {
      links: [] as ShortLink[],
      currentLink: {} as ShortLink,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    async retrieveLinks() {
      LinkDataService.getAll()
        .then((response: ResponseData) => {
          this.links = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveLinks();
      this.currentLink = {} as ShortLink;
      this.currentIndex = -1;
    },

    setActiveLink(link: ShortLink, index = -1) {
      this.currentLink = link;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.retrieveLinks();
  },
});
</script>
