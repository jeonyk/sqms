<template>
   <div class="App">
      <div class="app_agree_wrap">
         <div class="nav_header center">
            <h2>개인정보 수집 및 이용 안내</h2>
         </div>
         <div class="main_container">
            <div class="all_check">
               <input type="checkbox" id="all_agree" :checked="allCheck" @click="allCheck = !allCheck">
               <label for="all_agree" class="btn_all_agree">전체동의</label>
            </div>
            <ul class="agree_list">
               <li v-for="(item,index) in privacyList" v-bind:key="index">
                  <button @click="openPop(index)">
                     <p>{{item.title}} 자세히보기</p>
                  </button>
                  <p class="main_txt">{{item.mainText}}</p>
                  <p class="sub_txt">{{item.midText}}</p>
                  <div class="agree_box">
                     <input type="radio" :id="'agree'+index" :name="'agree_'+index" :checked="allCheck" class="radio">
                     <label :for="'agree'+index">
                        <p>동의</p>
                     </label>
                     <input type="radio" :id="'throb'+index" :name="'agree_'+index" @click="allCheck = false" class="radio">
                     <label :for="'throb'+index">
                        <p>비동의</p>
                     </label>
                  </div>
               </li>
            </ul>
         </div>
         <div class="info_txt">
            <p>
               회사는 만 14세 미만의 아동(이하 '아동')의 고객정보는 원칙적으로 수집하지 않습니다.
            </p>
         </div>

         <div class="button_box button_box_type2">
            <router-link to="/download" class="btn_cancel">취소</router-link>
            <a :class="allCheck ? 'btn_ok' : 'btn_ok gray' " @click="fnDownloadPop">확인</a>
         </div>
      </div>

      <downPrivacyP1 :title="title" :content="content" :date="date"/>

      <b-modal id="offMainP2" static>
         <div class="popup modal_type2">
            <h2 class="mb10">
               <strong>SQMS 다운로드</strong>
            </h2>
            <h3 style="font-size:14px; color:#000;">
               SQMS 앱 다운로드 안내 <br>
               <br>
               SQMS 앱 설치파일은 Wi-Fi 연결 상태에 따라 다르게 다운받아집니다. <br>
               <br>
               [다운로드]를 선택하실 경우 다운로드가 진행되며, [취소]를 선택하실 경우 이전 화면으로 이동합니다. <br>
               <br>
               (1) Wi-Fi가 켜진 상태에서는 Wi-Fi로 다운받습니다. <br>
               (2) Wi-Fi가 꺼진 상태에서는 모바일 데이터로 다운받습니다. <br>
               <br>
               * 모바일 데이터를 이용할 경우 요금제에 따라 비용이 발생할 수 있습니다.
               <br>
            </h3>
         </div>
         <template #modal-footer="{ ok }">
            <div class="modal_button_box type1">
               <a class="btn_cancel" @click="ok">취소</a>
               <a class="btn_ok" @click="ok">다운로드</a>
            </div>
         </template>
      </b-modal>

      <!-- <updatePop id="updatePop" 
      subMsg="SQMS 앱이 업데이트 되었습니다." 
      mainMsg="최신 버전을 설치하세요" 
      btnRight="다운로드 사이트로 이동" 
      @modalHandler="$bvModal.hide('updatePop')" /> -->

      <b-modal id="updatePop" static>
         <div class="popup modal_type2" style="white-space:pre-line">

            <h3>SQMS 앱이 업데이트 되었습니다.</h3>
            <h2>
               <strong>최신 버전을 설치하세요</strong>
            </h2>

         </div>
         <template #modal-footer>
            <div :class="'modal_button_box '">
               <a class="btn_cancel" v-show="false"></a>
               <a class="btn_ok" @click="true">다운로드 사이트로 이동</a>
            </div>
         </template>
      </b-modal>

   </div>
</template>

<script>
   import downPrivacyP1 from '@/modal/download/downPrivacyP1.vue';
   export default {
      name: 'downPrivacy',
      components: {
         downPrivacyP1,
      },
      data() {
         return {
            allCheck : '',
            requiredCount: 0,
            total:0,
            title: '',
            content: '',
            date:'',
            privacyList :[
               {
                  'RequiredType':'Y', //필수 = Y,선택 = N 
                  'title':'이용약관',
                  'mainText':'이용 약관 동의하십니까?',
                  'midText':'동의하셔야 이용이 가능합니다.',
                  'content':`Ⅰ. 개인정보의 수집 및 이용 동의서 <br>
                           - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다. <br>
                           ① 개인정보 수집 항목 및 수집·이용 목적 <br>
                           가) 수집 항목 (필수항목)<br>
                           - 성명(국문), 주민등록번호, 주소, 전화번호(자택, 휴대전화), 사진, 이메일, 나이, 재학정보, 병역사항,<br>
                           외국어 점수, 가족관계, 재산정도, 수상내역, 사회활동, 타 장학금 수혜현황, 요식업 종사 현황 등 지원<br>
                           신청서에 기재된 정보 또는 신청자가 제공한 정보<br>
                           나) 수집 및 이용 목적<br>
                           - 장학생 선발 전형 진행<br>
                           - 장학생과의 연락 및 자격확인<br>
                           - 장학생 자원관리<br>
                           ② 개인정보 보유 및 이용기간<br>
                           - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지<br>
                           ③ 동의거부관리<br>
                           - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,<br>
                           귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 장학생 선발 과정에 있어 불이익이 발생할 수
                           있음을 알려드립니다.
                           Ⅰ. 개인정보의 수집 및 이용 동의서<br>
                           - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다.<br>
                           ① 개인정보 수집 항목 및 수집·이용 목적<br>
                           가) 수집 항목 (필수항목)<br>
                           - 성명(국문), 주민등록번호, 주소, 전화번호(자택, 휴대전화), 사진, 이메일, 나이, 재학정보, 병역사항,
                           외국어 점수, 가족관계, 재산정도, 수상내역, 사회활동, 타 장학금 수혜현황, 요식업 종사 현황 등 지원
                           신청서에 기재된 정보 또는 신청자가 제공한 정보
                           나) 수집 및 이용 목적<br>
                           - 장학생 선발 전형 진행<br>
                           - 장학생과의 연락 및 자격확인<br>
                           - 장학생 자원관리<br>
                           ② 개인정보 보유 및 이용기간<br>
                           - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지<br>
                           ③ 동의거부관리<br>
                           - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,<br>
                           귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 장학생 선발 과정에 있어 불이익이 발생할 수
                           있음을 알려드립니다.`,
                  'date':'2022-06-11',
               },
               {
                  'RequiredType':'Y', //필수 = Y,선택 = N 
                  'title':'개인정보 수집 및 이용내역',
                  'mainText':'이용 약관 동의하십니까?',
                  'midText':'동의하셔야 이용이 가능합니다.',
                  'content':`Ⅰ. 개인정보의 수집 및 이용 동의서 <br>
                           - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다. <br>
                           ① 개인정보 수집 항목 및 수집·이용 목적 <br>
                           가) 수집 항목 (필수항목)<br>
                           - 성명(국문), 주민등록번호, 주소, 전화번호(자택, 휴대전화), 사진, 이메일, 나이, 재학정보, 병역사항,<br>
                           외국어 점수, 가족관계, 재산정도, 수상내역, 사회활동, 타 장학금 수혜현황, 요식업 종사 현황 등 지원<br>
                           신청서에 기재된 정보 또는 신청자가 제공한 정보<br>
                           나) 수집 및 이용 목적<br>
                           - 장학생 선발 전형 진행<br>
                           - 장학생과의 연락 및 자격확인<br>
                           - 장학생 자원관리<br>
                           ② 개인정보 보유 및 이용기간<br>
                           - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지<br>
                           ③ 동의거부관리<br>
                           - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,<br>
                           귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 장학생 선발 과정에 있어 불이익이 발생할 수
                           있음을 알려드립니다.
                           Ⅰ. 개인정보의 수집 및 이용 동의서<br>
                           - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다.<br>
                           ① 개인정보 수집 항목 및 수집·이용 목적<br>
                           가) 수집 항목 (필수항목)<br>
                           - 성명(국문), 주민등록번호, 주소, 전화번호(자택, 휴대전화), 사진, 이메일, 나이, 재학정보, 병역사항,
                           외국어 점수, 가족관계, 재산정도, 수상내역, 사회활동, 타 장학금 수혜현황, 요식업 종사 현황 등 지원
                           신청서에 기재된 정보 또는 신청자가 제공한 정보
                           나) 수집 및 이용 목적<br>
                           - 장학생 선발 전형 진행<br>
                           - 장학생과의 연락 및 자격확인<br>
                           - 장학생 자원관리<br>
                           ② 개인정보 보유 및 이용기간<br>
                           - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지<br>
                           ③ 동의거부관리<br>
                           - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,<br>
                           귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 장학생 선발 과정에 있어 불이익이 발생할 수
                           있음을 알려드립니다.`,
                  'date':'2022-06-12',
               },
               {
                  'RequiredType':'Y', //필수 = Y,선택 = N 
                  'title':'개인정보 처리 위탁동의',
                  'mainText':'이용 약관 동의하십니까?',
                  'midText':'동의하셔야 이용이 가능합니다.',
                  'content':`Ⅰ. 개인정보의 수집 및 이용 동의서 <br>
                           - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다. <br>
                           ① 개인정보 수집 항목 및 수집·이용 목적 <br>
                           가) 수집 항목 (필수항목)<br>
                           - 성명(국문), 주민등록번호, 주소, 전화번호(자택, 휴대전화), 사진, 이메일, 나이, 재학정보, 병역사항,<br>
                           외국어 점수, 가족관계, 재산정도, 수상내역, 사회활동, 타 장학금 수혜현황, 요식업 종사 현황 등 지원<br>
                           신청서에 기재된 정보 또는 신청자가 제공한 정보<br>
                           나) 수집 및 이용 목적<br>
                           - 장학생 선발 전형 진행<br>
                           - 장학생과의 연락 및 자격확인<br>
                           - 장학생 자원관리<br>
                           ② 개인정보 보유 및 이용기간<br>
                           - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지<br>
                           ③ 동의거부관리<br>
                           - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,<br>
                           귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 장학생 선발 과정에 있어 불이익이 발생할 수
                           있음을 알려드립니다.
                           Ⅰ. 개인정보의 수집 및 이용 동의서<br>
                           - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다.<br>
                           ① 개인정보 수집 항목 및 수집·이용 목적<br>
                           가) 수집 항목 (필수항목)<br>
                           - 성명(국문), 주민등록번호, 주소, 전화번호(자택, 휴대전화), 사진, 이메일, 나이, 재학정보, 병역사항,
                           외국어 점수, 가족관계, 재산정도, 수상내역, 사회활동, 타 장학금 수혜현황, 요식업 종사 현황 등 지원
                           신청서에 기재된 정보 또는 신청자가 제공한 정보
                           나) 수집 및 이용 목적<br>
                           - 장학생 선발 전형 진행<br>
                           - 장학생과의 연락 및 자격확인<br>
                           - 장학생 자원관리<br>
                           ② 개인정보 보유 및 이용기간<br>
                           - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지<br>
                           ③ 동의거부관리<br>
                           - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,<br>
                           귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 장학생 선발 과정에 있어 불이익이 발생할 수
                           있음을 알려드립니다.`,
                  'date':'2022-06-13',
               }
            ],
         }
      },
      props:{
         osChk:{
            type:String,
            default: '',
         }
      },
      mounted(){
         this.total = this.privacyList.length;
         document.querySelector('.wrap.p0').classList.remove('wrap')

      },
      watch:{
         allCheck: function(){
            // console.log(this.allCheck);
         }
      },
      methods:{
         fnDownloadPop:function(){
            if(this.allCheck){
               this.$root.$emit('bv::show::modal', 'offMainP2');
            }else{
               this.$root.$emit('bv::show::modal', 'updatePop');
            }
         },
         openPop: function(index){
            this.title = this.privacyList[index].title;
            this.content = this.privacyList[index].content;
            this.date = this.privacyList[index].date;
            this.$root.$emit('bv::show::modal', 'downPrivacyP1');
         }
      }
   }
</script>

<style>

</style>