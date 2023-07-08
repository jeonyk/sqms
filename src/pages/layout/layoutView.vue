<template>
  <component :is="getLayout">
    <slot/>
    <global-overlay/>
  </component>
</template>

<script>
import mainLayout from "@/pages/layout/mainLayout.vue";
import noType from "@/pages/layout/notypeLayout.vue";
import login from "@/pages/layout/loginLayout.vue";
import Lnb from "@/pages/layout/lnbLayout.vue";
import GlobalOverlay from '@component/common/GlobalOverlay.vue'

export default {
  name: "LayoutView",
  components: {
    mainLayout,
    noType,
    login,
    Lnb,
    GlobalOverlay,
  },
  computed: {
    getLayout: function () {
      // Layout 정보
      let test = this.$route.meta.layout;

      if(test == null || test == "undefined" || test == ""){
        test = "Lnb";
      }

      return test;
    },
  },
};
</script>
