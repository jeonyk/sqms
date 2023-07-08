<template>
        <component v-bind:is="cp" />
</template>

<script>
import TestComponent from '@/pages/quality/testMngt/TestMngtHeadSetUpSheet.vue';

// function lazyLoad(view) {
//     return () => import(`${view}`);
// }

export default {
  name: "test",
  comments : {
      TestComponent
  },
  data() {
    return {
      cp: null,
      vuefile : ""
    };
  },
  created(){ 
      console.log("@@@ created route  : %o",this.$route);
      console.log("@@@ created route path : %o",this.$route.matched[0].components.default.__file);
      //console.log("@@@ compnent : %o",TestComponent);
      //this.customComponent = async () => (await import(`./CustomComponent${param}.vue`))
      this.vuefile = this.$route.matched[0].components.default.__file;
      this.vuefile = this.vuefile.replace("src","@");
      console.log("@@@ vuefile : %o",this.vuefile);

      this.cp = async () => (await import(this.vuefile));
      //this.cp = async () => (await lazyLoad(this.vuefile));
      //this.cp = await lazyLoad(this.vuefile);

      console.log("@@@ cp : %o",this.cp);
  },                                      
  watch: {
    "$route": {
      // 기본 watch 는 리스트의 추가, 삭제 만 감지가 가능
      // 리스트 요소의 변경을 감지하려면 deep 옵션이 true 가 되야함
      deep: true,
      handler() {
        console.log("@@@ route watch : %o",this.$route);
        
        console.log("@@@ route path : %o",this.$route.matched[0].components.default.__file);
        this.cp = async () => (await import('@/pages/quality/testMngt/TestMngtHeadSetUpSheet.vue'));
        console.log("@@ 변경");
      },
    },
  },
};
</script>