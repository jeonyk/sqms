<template>

  <div class="wrap main_wrap">
    <Header
      ref="mainHeader"
    />
    <slot />
    <Footer />
  </div>

</template>

<script>
import Header from "@/pages/common/frame/Header.vue";
import Footer from "@/pages/common/frame/Footer.vue";

export default {
  name: "mainLayout",
  components: {
    Header,
    Footer,
  },
  created(){ /*console.log("main layout")*/}
};
</script>
