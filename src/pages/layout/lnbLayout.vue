<template>
    <div class="wrap" >
      <Header @change-header-tabs="changeHeaderTabs"/>  
      <div class="lnb_container on">
        <Lnb />
        <!--<test/>-->
        <!-- <keep-alive v-if="iskeepAlive" ref="keepAlive">  -->
        <keep-alive :include="keepAliveList">
        {{keepAliveList}} 
        <slot />
        </keep-alive>

        <!-- <slot v-if="!iskeepAlive" />  -->

      </div>
      <Footer />
      <global-overlay/>
      
    </div>
</template>

<script>
import Header from "@/pages/common/frame/Header.vue";
import Footer from "@/pages/common/frame/Footer.vue";
import Lnb from "@/pages/common/frame/LnbList.vue";
import { mapGetters } from 'vuex';
import GlobalOverlay from '@component/common/GlobalOverlay.vue'
//import test from "@/pages/test/test.vue";

export default {
  name: "lnbLayout",
  components: {
    Header,
    Footer,
    Lnb,
    GlobalOverlay,
    //test
  },
  data () {
    return {
      headerCurrentTab: null,
      // headerCurrentTab: 
    } 
  },
  computed: {
    ...mapGetters({ keepAliveList: 'tabInfo/getKeepAliveList'})
  },
  methods : {
    changeHeaderTabs: function(headerCurrentTab) { // headerTabs 클릭 시, 전체 삭제시 header 컴포넌트에서 전달되는 headerCurrentTab
        // console.log(headerCurrentTab)
        this.headerCurrentTab = headerCurrentTab;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 100%;
}
</style>