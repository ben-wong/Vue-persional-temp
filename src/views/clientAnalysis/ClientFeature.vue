<template>
  <no-auth v-if="!authorized"></no-auth>
    <iframe  v-else :src="url"
      name="self"
      frameborder="0"
      width="100%"
      scrolling="no"
      height="98%"
      allowfullscreen></iframe>
</template>

<script>
export default {
  name: 'ClientFeature',
  components: {
  },
  data() {
    return {
      url: ''

    };
  },
  created() {
    const API_BASE_URL = process.env.VUE_APP_WO_BASE_URL;

    this.url = API_BASE_URL + '/agapreport/ReportServer?reportlet=educenter%2F' + 'ClientFeature.cpt';
  },
  computed: {
    authorized() {
      let authorized = false;
      console.log(2222, this.$store.state.agapOriMenu);
      authorized = (this.$store.state.agapOriMenu || []).some(item => item.resourceUrl === this.$route.path);
      return authorized;
    }
  }
};
</script>
<style>
</style>
