<template>
  <div>
    <div class="col col-8 align-middle mt-5 offset-2">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="submit(url)">
            <div class="form-group m-2">
              <label for="url">Enter Url</label>
              <input
                type="url"
                class="form-control"
                v-model="url"
                placeholder="https://example.com"
                pattern="https?://.+"
                required
              />
            </div>
            <div class="for-group m-2" v-show="shortUrl">
              <p>
                Short URL:
                <a :href="shortUrl" class="text-primary">{{ shortUrl }}</a>
              </p>
            </div>
            <div class="form-group m-2">
              <button class="btn btn-primary" type="submit">Shorten URl</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  data: () => {
    return {
      url: "",
      shortUrl: "",
    };
  },
  methods: {
    submit: async function (url: any) {
      try {
        const api = "http://localhost:3000/api/v1/codes";
        const response = await axios.post(api, {
          redirect_url: url,
        });
        this.shortUrl = `http://localhost:3000/${response.data.shortcode_uuid}`;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
