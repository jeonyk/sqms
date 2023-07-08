<template>
  <div class="lst_data">
    <div
      class="button_box"
    >
      <!-- v-if="isEditable" -->
      <div class="fr">
        <button
          type="button"
          class="btn btn_sm btn_darkblue"
          @click="save"
          v-if="isEditable"
        >
          저장
        </button>
      </div>
    </div>

    <div class="data_tit">
      1. 최종 타설 정보
    </div>
    <div class="table_normal_list table_write">
      <table>
        <caption class="sr_only" />
        <colgroup>
          <col width="15%">
          <col width="15%">
          <col width="15%">
          <col width="*">
          <col width="15%">
          <col width="15%">
        </colgroup>
        <tbody>
          <tr>
            <th>최종 호차 번호</th>
            <td class="ac">
              {{ lastInfo.concHocha }} 호차
            </td>
            <th><span :class="{'emp_red': isEditable}">납품 도착 시간</span></th>
            <td class="ac">
              <div class="timepicker_wrap">
                <input
                  v-model="lastInfo.concDeliArrvHour"
                  v-if="isEditable"
                  type="text"
                  class="form_control time"
                  maxlength="2"
                >
                <span v-else>{{ lastInfo.concDeliArrvHour }}</span>
                시
                <input
                  v-model="lastInfo.concDeliArrvMinute"
                  v-if="isEditable"
                  type="text"
                  maxlength="2"
                  class="form_control time"
                >
                <span v-else>{{ lastInfo.concDeliArrvMinute }}</span>
                분
              </div>
            </td>
            <th><span :class="{'emp_red': isEditable}">타설 시 온도</span></th>
            <td class="ac">
              <input
                v-model="lastInfo.concPourTemp"
                v-if="isEditable"
                type="text"
                maxlength="3"
                class="form_control small"
              >
              <span v-else>{{ lastInfo.concPourTemp }}</span>
              <span class="ml10 mr10">℃</span>
            </td>
          </tr>
          <tr>
            <th>마지막 호차 타설량</th>
            <td class="ac">
              {{ lastInfo.concSupply }}㎥
            </td>
            <th><span :class="{'emp_red': isEditable}">타설 완료 시간</span></th>
            <td class="ac">
              <div class="timepicker_wrap">
                <input
                  v-model="lastInfo.concPourComplHour"
                  v-if="isEditable"
                  type="text"
                  maxlength="2"
                  class="form_control time"
                >
                <span v-else>{{ lastInfo.concPourComplHour }}</span>
                시
                <input
                  v-model="lastInfo.concPourComplMinute"
                  v-if="isEditable"
                  class="form_control time"
                  type="text"
                  maxlength="2"
                >
                <span v-else>{{ lastInfo.concPourComplMinute }}</span>
                분
              </div>
            </td>
            <th><span :class="{'emp_red': isEditable}">타설 종료일</span></th>
            <td class="ac">
              <DatePicker v-model="changePourEndDate" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'" v-if="isEditable"/>
                <!-- changePourEndDate" -->
              <span v-else>{{ lastInfo.concPourEndDate }}</span>
            </td>
          </tr>
          <tr>
            <th>타설물량(예정)</th>
            <td class="ac">{{ lastInfo.pourSupply }}㎥</td>
            <th>최종타설량</th>
            <td class="ac">{{ lastInfo.concFinalPourAmt }}㎥</td>
            <th>폐기물량</th>
            <td class="ac">{{ lastInfo.concDispSpl }}㎥</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="data_tit">
      2. 첨부파일
    </div>
    <div class="line_box check_area">
      <label class="input_check">
        <input
          v-model="attach.isSiteFile"
          type="checkbox"
          :disabled="!isEditable"          
        >
        <span class="label_text">현장배합표</span>
      </label>
      <label class="input_check">
        <input
          v-model="attach.isSuperPrintFile"
          type="checkbox"
          :disabled="!isEditable"
        >
        <span class="label_text">슈퍼프린트</span>
      </label>
      <label class="input_check">
        <input
          v-model="attach.isConfirmDisuse"
          type="checkbox"
          :disabled="!isEditable"
        >
        <span class="label_text">폐기확약서</span>
      </label>
    </div>
    <LstFile
        :lst-file-rst="lstFileRst"
        :files="files"
        :second-remove-file-id="deleteFiles"
        @file-changed="fn_fileChange"
        @file-removed="fn_fileDelete"
        :uploadable="isEditable"
        :downloadable="down"
    />
  </div>
</template>

<script>
import API from '@/apis/'
import DatePicker from '@component/common/DatePicker.vue'
import LstFile from '@/pages/common/popup/LstFile.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import { sendPostApi, sendFileApi, requestFileOptions, requestOptions  } from '@/apis/common'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

export default {
    name: 'PourSetUpLastPourInfo',
    components: {
        DatePicker,
        LstFile
    },
    mixins: [MsgBoxMixins, authCheckMixns],
	  props: {
      data: {
        type: Object,
        default: undefined
      },
      isEditable: {
        type: Boolean,
        default: true
      },
      change: { // 편집 가능한 지?
        type: Boolean,
        default: false
      },
      unuse: { // 편집 가능한 지?
        type: Boolean,
        default: false
      },
      down: { // 편집 가능한 지?
        type: Boolean,
        default: false
      },
    },
    data:() => ({
        lastInfo: { // 최종 타설 정보
            concHocha: '', // 최종 호차 번호
            concLastPourAmt: '', // 마지막 호차 타설량 (㎥)
            pourSupply: '', // 타설물량(예정)
            concDeliArrvHour: '', // 납품 도착 시간(시)
            concDeliArrvMinute: '', // 납품 도착 시간(분)
            concPourComplHour: '', // 타설 완료 시간(시)
            concPourComplMinute: '', // 타설 완료 시간(분)
            concFinalPourAmt: '', // 최종 타설량
            concPourTemp: '', // 타설시 온도
            concPourEndDate: null, // 타설 종료일
            concDispSpl: '', // 폐기물량
            pourProgress: '',
        },
        attach: { // 첨부파일
            isSiteFile: true,
            isSuperPrintFile: true,
            isConfirmDisuse: true,
        },
        changePourEndDate : null,
        fileSiteFormul: null, // 첨부파일 - 현장배합표
        fileSuperPrint: null, // 첨부파일 - 슈퍼프린트
        fileDispCommit: null, // 첨부파일 - 폐기확약서
        alertMsg: '',
        confirmMsg: '',
        files: [],
        deleteFiles: [],
        lstFileRst: [],
        userId : '',
        siteMstrId : '',
    }),
    watch : {
      'lastInfo.concDeliArrvHour' : {
        handler(val){
          if(val != null && val != 0){
            this.lastInfo.concDeliArrvHour = val.replace(/[^0-9]/g, '');
            if(Number(val) > 23) {
              this.lastInfo.concDeliArrvHour = 0;
            }
          }
        }
      },
      'lastInfo.concDeliArrvMinute' : {
        handler(val){
          if(val != null && val != 0){
            this.lastInfo.concDeliArrvMinute = val.replace(/[^0-9]/g, '');
            if(Number(val) > 59) {
              this.lastInfo.concDeliArrvMinute = 0;
            }
          }
        }
      },
      'lastInfo.concPourTemp' : {
        handler(val) {
          this.lastInfo.concPourTemp = String(val).replace(/[^0-9]/g, '');
        }
      },
      'lastInfo.concPourComplHour' : {
        handler(val){
          if(val != null && val != 0){
            this.lastInfo.concPourComplHour = val.replace(/[^0-9]/g, '');
            if(Number(val) > 23) {
              this.lastInfo.concPourComplHour = 0;
            }
          }
        }
      },
      'lastInfo.concPourComplMinute' : {
        handler(val){
          if(val != null && val != 0){
            this.lastInfo.concPourComplMinute = val.replace(/[^0-9]/g, '');
            if(Number(val) > 59) {
              this.lastInfo.concPourComplMinute = 0;
            }
          }
        }
      },
    },
    mounted (){
      this.siteMstrId = this.$store.getters['auth/getSiteMstrId']
      this.getFinalPourInfo()
      // this.lastInfo.concPourEndDate = new Date().toISOString().split('T')[0]
    },
    methods: {
		/**
		 * API: 최종 타설 정보 초기 데이터 조회
		 */
      async getFinalPourInfo () {
        try {
          const response = await API.concrete.getFinalPourInfo({
            concPourDtlId: this.data.concPourDtlId,
            siteMstrId : this.siteMstrId
          })
          if(response?.resultData) {
            let resultData = response.resultData;
            if(resultData.concFinalPosuDtlId){
              this.changePourEndDate = resultData.concPourEndDate;
              this.attach.isSiteFile = resultData.fileSiteFormul == 'Y' ? true : false; // 첨부파일 - 현장배합표
              this.attach.isSuperPrintFile = resultData.fileSuperPrint == 'Y' ? true : false; // 첨부파일 - 현장배합표
              this.attach.isConfirmDisuse = resultData.fileDispCommit == 'Y' ? true : false; // 첨부파일 - 현장배합표
            }
            this.lastInfo = {...response.resultData}
            this.getFileInfoList();
          }
        } catch (error) {
          console.error('최종 타설 정보 조회 에러: ', error)
        }
		},
		/**
		 * API: 최종 타설 저장
		 */
		async updateFinalPourInfo (payload) {
			try {
				const response = await API.concrete.updateFinalPourInfo(payload)
				if(response) {
					return response
				}
			} catch (error) {
				console.error('최종 타설 정보 저장 에러: ', error)
			}
		},
      /**
       * 첨부파일 변경 이벤트
       * @param {Array} files 첨부 파일 목록 (fileForm)
       */
      fn_fileChange (files) {
        this.files = files;
      },
      fn_fileDelete (files) {
        this.deleteFiles = files;
      },
      /**
       * 저장
       */
      save () {

        if(this.lastInfo.concDeliArrvHour == '' || this.lastInfo.concDeliArrvHour == null || this.lastInfo.concDeliArrvMinute == '' || this.lastInfo.concDeliArrvMinute == null){
          return this.alert('납품 도착 시간을 입력해주세요.');
        }
        if(this.lastInfo.concPourTemp == ''){
          return this.alert('타설 시 온도를 입력해주세요.');
        }
        if(this.lastInfo.concPourComplHour == '' || this.lastInfo.concPourComplHour == null || this.lastInfo.concPourComplMinute == '' || this.lastInfo.concPourComplMinute == null){
          return this.alert('타설 완료 시간을 입력해주세요.');
        }
        if(!this.changePourEndDate){
          return this.alert('타설 종료일을 선택해주세요.');
        }

        this.confirm('저장하시겠습니까?', async () => {
            
          const payload = {
              ...this.lastInfo,
              siteMstrId : this.data.siteMstrId,
              concPourDtlId: this.data.concPourDtlId, // 타설등록번호
              docSeq: this.data.docSeq, // 문서번호
              concFinalHochaNm: this.lastInfo.concHocha, // 최종 호차 번호
              concPoursAmt: this.lastInfo.pourSupply, // 티설물량
              concLastPourAmt: this.lastInfo.concSupply,
              concPourEndDate: this.changePourEndDate,
              fileSiteFormul: this.attach.isSiteFile ? 'Y' : 'N', // 첨부파일 - 현장배합표
              fileSuperPrint: this.attach.isSuperPrintFile ? 'Y' : 'N', // 첨부파일 - 슈퍼프린트
              fileDispCommit: this.attach.isConfirmDisuse ? 'Y' : 'N' // 첨부파일 - 폐기확약서
          }

          const result = await this.updateFinalPourInfo(payload)

          if(result?.json.rCode === '0000') { 
            if((this.files && this.files.length > 0) || (this.deleteFiles && this.deleteFiles.length > 0)){
              let resultData = true;
              //파일 추가
              if(this.files && this.files.length > 0){
                  requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                  const subResponse = await sendFileApi(this.data.concPourDtlId, "ConcreteMngt", this.files)
                  if(subResponse.status == '200'){
                  }
                  else{
                    resultData = false;
                  }
              }
              if(this.deleteFiles && this.deleteFiles.length > 0){
                let url = '/sendApi/api/file/fileUnUse';
                const param = {
                  fileType : "ConcreteMngt",
                  fileQltArcvIds : this.deleteFiles,
                }
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                const subResponse = await sendPostApi(url, param)
                if(subResponse.status == '200'){
                }
                else{
                  resultData = false;
                }
              }
              if(resultData){
                this.alert('저장되었습니다.', () => {
                  this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                  this.$parent.getPourStatusView(3)
                });
              }
            }
            else{
              this.alert('저장되었습니다.', () => {
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$parent.getPourStatusView(3)
              });
            }
          }
        })
      },
      async getFileInfoList() {
          const payload = {
              fileConnectId : this.data.concPourDtlId,
              fileType : 'ConcreteMngt',
          }
          try {
              const result = await API.concrete.loadFileInfo(payload)
              if(result?.data){
                  this.lstFileRst = result.data
              }
          } catch (error) {
              console.error('파일 불러오기 에러 : ', error)
          }
      },
    }
}
</script>
<style lang="scss" scoped>
	.form_control.time { width: 70px; }
</style>