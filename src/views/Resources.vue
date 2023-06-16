<template>
  <div class="homePageWidth">
    <ResourcePage></ResourcePage>
    <!-- <ResourcePageTwo></ResourcePageTwo> -->
  </div>
</template>

<script>
import ResourcePage from "@/components/Resource/ResourcePage.vue";
import ResourcePageTwo from "@/components/Resource/ResourcePageV2.vue";
export default {
  name: "Resource Page",
  components: {
    ResourcePage,
    ResourcePageTwo,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* General Page */
.homePageWidth {
  width: 90vw;
  margin: auto auto;
}
</style>
