<!-- Component.vue -->
<template>
   <footer id="footer">
      <div class="l_layout">
         <div class="ft_logo"><img src="../../../assets/img/layout/HEC_LOGO_ENG.svg" alt="HEC LOGO"></div>
         <div class="copy">
            CopyrightⓒHyundai Engineering co., LTD ALL RIGHTS RESERVED.
         </div>
      </div>
      <!-- 정보 부족으로 주석처리 22.07.02-->
      <ul class="r_layout">
         <!--<li>Version : 1.19.3.29.1420  </li>-->
         <li>IP ADRESS: {{userInfo.currentIp}}</li>
         <li>USER: [{{userInfo.userId}}] {{userInfo.userNm}}</li>
         <li>Last login IP : {{userInfo.loginIp}}</li>
         <li>Last login time: {{userInfo.finalLoginDttm}}</li>
         <li><b-icon icon="exclamation-circle-fill"></b-icon><a href="">도움말</a></li>
      </ul>
   </footer>
</template>
<script>
   export default {
      name: "FooterComponent",
      data() {
         return {
            userInfo : this.$session.get('userInfo')
         } 
      },
   };
</script>

<style lang="scss" scoped>
#footer{
   min-width: 1900px;
}
</style>