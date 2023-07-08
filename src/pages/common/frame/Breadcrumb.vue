<template>
  <nav class="breadcrumb">
      <ol>
          <li class="breadcrumb-item"><a href="javascript:void(0);" @click="$router.push({name: 'Main'})">HOME</a></li>
          <li class="breadcrumb-item">{{ pageInfo.depth1 }}</li>
          <li  :class="{'breadcrumb-item':true ,'on': dep2On}">{{ pageInfo.depth2 }}</li>
          <li  v-if="!dep2On" :class="{'breadcrumb-item':true, 'on': dep3On}">{{ pageInfo.depth3 }}</li>
      </ol>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    currentPath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      gnbMenuList : 'tabInfo/getMenuList'
    })
  },
  data() {
    return {
      //menuList: this.gnbMenuList,
      pageInfo: {},
      dep2On : false,
      dep3On : false
    }
  },
  mounted () {
    this.gnbMenuList.forEach(item => {
      item.children.forEach(element => {
        //2dep까지만 있는 경우
        if(item.dep3){
          if(element.path === this.currentPath) {
            this.pageInfo = { 
                  depth1: item.name,
                  depth2: element.name
            };

            this.dep2On = true;
          }
        }else{
          // console.log(element.children)
        element.children.forEach(child => {
          {
            if(child.path === this.currentPath) {
              // console.log(item.name, element.name, child.name)
              this.pageInfo = { 
                depth1: item.name,
                depth2: element.name,
                depth3: child.name
              };
              this.dep3On = true;
            }
          }
        })   
        }
      });
    })
  },
}
</script>

<style>

</style>