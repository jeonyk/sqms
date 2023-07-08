<template>
<div class="lnb" >
   <!-- style="min-height:calc(100vh - 132px - 40px); max-height:calc(100% - 56px - 40px);" -->
   <ul>
      <li v-for="( item, index ) in gnbMenuList" :key="index">
         <a href="javascript:void(0);" class="dp1" @click="depthCurrentHandler">{{ item.name }}</a>
         <ul class="dp2">
            <li v-for=" ( item2, index2 ) in item.children " :key="index2">               
               <a href="javascript:void(0);" v-if="item2.path == '' || item2.path == 'undefinded' || item2.path == null" @click="depth2CHandler($event)" > {{ item2.name }} </a>
               <a href="javascript:void(0);" v-if="item2.path != '' && item2.path != 'undefinded' && item2.path != null" @click="depth2CHandler($event, item2, item.name)">{{ item2.name }} </a>

               <ul class="dp3" >
                  <li v-for=" ( item3, index3 ) in item2.children " :key="index3">
                     <a href="javascript:void(0);"  @click="depth3Handler($event, item3, item2.name)">{{ item3.name }}</a>
                  </li>
               </ul>
            </li> 
         </ul>
      </li>
   </ul>
   <!-- <div class="toggle_btn" @click="toggleHandler"></div> -->
   <!-- 21.04.01 삭제요청 -->
   <!-- <div class="cog_layout">
      <a href="#none">설정</a>
      <a href="#none">알림</a>
      <a href="#none">로그아웃</a>
   </div> -->
</div>
</template>

<script>

   //import GnbMenuList from '../data/GnbMenuList.js'
   import { mapGetters } from 'vuex';

   export default {
      name: 'LnbList',
      computed: {
         ...mapGetters({ gnbMenuList : 'tabInfo/getMenuList' })
      },
      mounted() {
         // console.log("@@@@@ LnbList mounted");
      },
      methods: {
         /* toggleHandler : function() {
            document.querySelector('.lnb_container').classList.toggle('on')
         }, */

         depthCurrentHandler : function(e){

            /* let depth1 = document.querySelectorAll('.lnb > ul > li');

            for ( let i = 0; i < depth1.length; i++){
               for (let j = 0; j < depth1.length; j++){
                  depth1[j].classList.remove('on');
               }
               e.currentTarget.classList.add('on');
            } */

            let depth1 = document.querySelectorAll('.lnb > ul > li'); 
            let target = e.target.parentElement;

            if(target.className != "on"){
               for ( let i = 0; i < depth1.length; i++){ // 뎁스 갯수 만큼
                  depth1[i].classList.remove('on');
               }
               target.classList.add('on');
            }else{
               target.classList.remove('on');
            }
         },

         depth2CHandler : function(e, item , upperName){

            /* let depth2 = document.querySelectorAll('.lnb .dp2 > li');
            
            for ( let i = 0; i < depth2.length; i++){
               for (let j = 0; j < depth2.length; j++){
                  depth2[j].classList.remove('active');
               }
               e.currentTarget.classList.add('active');
            } */
            let depth1 = document.querySelectorAll('.lnb > ul > li'); 
            let depth2 = document.querySelectorAll('.lnb .dp2 > li');
            let depth3 = document.querySelectorAll('.lnb .dp3 > li');

            let target = e.target.parentElement;

            if(target.className != "active"){
              
               for ( let i = 0; i < depth2.length; i++){
                  depth2[i].classList.remove('on');
                  depth2[i].classList.remove('active');

                  for ( let i = 0; i < depth3.length; i++){
                     depth3[i].classList.remove('on');
                  }
               }
   
               target.classList.add('active');

            }else{               
               target.classList.remove('active');
               
               if(target.classList.contains('on active')){
                  target.classList.remove('on');
                  target.classList.remove('active');
               }
            }

            if(item != null && item != undefined){
               
               for ( let i = 0; i < depth1.length; i++){ // 뎁스 갯수 만큼
                 depth1[i].classList.remove('on');
               }

               for ( let i = 0; i < depth2.length; i++){
                  depth2[i].classList.remove('on');
                  depth2[i].classList.remove('active');
               }

               let moveMenuInfo = new Object();

               moveMenuInfo.item = item;
               moveMenuInfo.upperName = upperName;

               this.$store.dispatch('tabInfo/setMoveMenu',moveMenuInfo);
            }
         },
         
         depth3Handler : function(e, item , upperName){
            let depth1 = document.querySelectorAll('.lnb > ul > li'); 
            let depth2 = document.querySelectorAll('.lnb .dp2 > li');
            let depth3 = document.querySelectorAll('.lnb .dp3 > li');
            let target = e.target.parentElement;

            for ( let i = 0; i < depth3.length; i++){
               depth3[i].classList.remove('on');
            }

            for ( let i = 0; i < depth2.length; i++){
               depth2[i].classList.remove('on');
               depth2[i].classList.remove('active');
            }

            for ( let i = 0; i < depth1.length; i++){ // 뎁스 갯수 만큼
               depth1[i].classList.remove('on');
            }
            
            let moveMenuInfo = new Object();

            moveMenuInfo.item = item;
            moveMenuInfo.upperName = upperName;

            this.$store.dispatch('tabInfo/setMoveMenu',moveMenuInfo);


            // if(target.className != "on"){
            //    for ( let i = 0; i < depth3.length; i++){
            //       depth3[i].classList.remove('on');
            //    }
            //    target.classList.add('on');
               
            //    for ( let i = 0; i < depth2.length; i++){
            //       depth2[i].classList.remove('on');
            //    }
            //    target.parentElement.parentElement.classList.add('on')
            // }
         

            /* let depth3 = document.querySelectorAll('.lnb .dp3 > li');

            for ( let i = 0; i < depth3.length; i++){
               for (let j = 0; j < depth3.length; j++){
                  depth3[j].classList.remove('on');
               }
               e.currentTarget.classList.add('on');
            } */
         }
      },
   }
</script>
