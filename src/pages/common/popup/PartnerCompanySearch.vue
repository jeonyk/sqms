<template>
  <b-modal
    :id="refId"
    title="협력사 선택"
    hide-backdrop
    static
    size="lg"
    :footer-bg-variant="footerBg"
    @shown="searchReset"
  >
    <template #default>
      <div class="pop_container">
        <div class="lookup_box multi_line align_center">
          <table>
            <tbody>
              <tr>
                <th>유형</th>   
                <td>
                  <select
                    name=""
                    id=""
                    class="form_control"
                    v-model="searchName"
                    @change="sheetCreate"
                  >
                    <option value="">
                      전체
                    </option>
                    <!-- <option value="Q">
                      품질시험기관
                    </option> -->
                    <option value="B">
                      BS점검업체
                    </option>
                    <option value="I">
                      감리단
                    </option>
                    <option value="R">
                      레미콘
                    </option>
                    <option value="C">
                      시공/자재
                    </option>
                  </select>    
                </td>        
                <th>협력사명</th>
                <td>
                  <input
                    type="text"
                    class="form_control"
                    placeholder="입력해주세요"
                    v-model="searchValue"
                    @keyup="enterEvent"
                  >
                </td>
                <td class="ar">
                  <button
                    type="button"
                    class="btn btn_sm btn_darkblue btn_radius btn_search"
                    @click="sheetCreate"
                  >
                    검색
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
                
        <div class="ib_wrap">
          <div
            id="partnerCompanyPopsheetTable"
            class="ibsheet_table"
            style="height: 337px;"
          />
        </div>

        <PopAlert
          :msg="popMsg"
          :pop-id="popId"
          @first-btn-fn="closePop"
        />
      </div>
    </template>
    <template #modal-footer="{ hide }">
      <b-button
        class="btn btn_md btn_outline btn_darkgray"
        @click="fnCompanyChoice"
      >
        선택
      </b-button>
      <b-button
        class="btn btn_md btn_outline btn_gray"
        @click="hide('forget')"
      >
        닫기
      </b-button>
    </template>
  </b-modal>
</template>
<script>
    import { PartnersSearch2 } from '../data/PopupList'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import loader from '@ibsheet/loader'
    import {requestOptions, sendPostApi }  from '../../../apis/common';

    let sheetId = '';

    export default {
        name: 'PartnerCompanySearch',
        mixins: [MsgBoxMixins],
        components: {
            PopAlert
        },
        data() {
            return {
                footerBg: 'transparent',

                focusTradeNm: '', //선택한 협력사명
                focusTradeId: '', //선택한 협력사id
                focusTradeType: '', //선택한 협력사 타입
                focusTradeTypeNm: '', //선택한 협력사 타입
                focusCreateSys: '', //선택한 시스템
                focusRegDate: '', //선택한 등록날짜

                companyList : [],

                //검색어
                searchName: '',
                searchValue: '', //협력사 명
                //tradeType: '', //협력사 유형

                //alert pop
                popMsg: '',
                popId: 'companyAlert'
            }
        },
        props: {
            //  searchValue: {
            //     type: String,
            //     default: ''
            //  },
            tradeType: { //필요시 상위컴포넌트에서 v-bind로 값을 받아옴
                type: String,
                default: ''
            },
            siteMstrId:{
              type:String,
              default:'',
            },
            refId:{
              type:String,
              default: 'PartnerCompanySearch',
            }
        },
        beforeDestroy() {
            // loader.removeSheet(sheetId)
        },
        
        mounted() {
        
        },

        created() {
            this.focusTradeId = this.tradeId;
        },
        methods: {
            enterEvent : function(e) { //검색조건 enter event
                if(e.keyCode == 13) {
                    this.sheetCreate();
                }
            },
            searchReset: function(){
              this.searchValue = '';
              this.searchName = '';
              this.sheetCreate();
            },
            sheetCreate: async function() {
                /* 임시용 */
                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                //
                let url = '/sendApi/api/popup/partnerCompanySearch/list';
                let param = {};

                if(this.searchValue != '') {
                    param['searchValue'] = this.searchValue;
                }

                if(this.searchName != '') {
                    param['tradeType'] = this.searchName;
                }
                if(this.siteMstrId != ''){
                  param['siteMstrId'] = this.siteMstrId;
                }
                
/* 검색 오류
                if(this.tradeType != '') {
                    param['tradeType'] = this.tradeType;
                }
 */

                const resData = await sendPostApi(url, param).then((result) => {
                    return result.data;
                }).catch((e) => {
                    return e.response.data;
                });

                let scroll = 1;
                let options = PartnersSearch2.options;
                let data = this.companyList;

                let cols = [
                    { Name: 'tradeTypeNm', Header: [{ Value: '협력사유형' }], RelWidth: 10 },
                    { Name: 'tradeId', Header: [{ Value: '협력사 ID \n (사업자번호)' }], RelWidth: 20 },
                    { Name: 'tradeNm', Header: [{ Value: '협력사명' }], RelWidth: 40 },
                    { Name: 'createSys', Header: [{ Value: '등록시스템' }], RelWidth: 15 },
                    { Name: 'regDate', Header: [{ Value: '등록일자' }], RelWidth: 15 },
                ]

                options.Cols = cols;
                let canEdit = 0; //ibsheet 수정불가
                let dataMerge = 0;
                
                if(resData.rCode == "0000" && resData.datas.resultList.length != 0) {
                    this.companyList = resData.datas.resultList;
                    data = this.companyList;
                    if(data.length<10){
                      scroll = 1;
                    }else{
                      scroll = 0;
                    }
                    dataMerge = 0; //병합 X

                    //맨 윗줄 값 가져오기
                    this.focusTradeNm = data[0].tradeNm;
                    this.focusTradeId = data[0].tradeId;
                    this.focusTradeType = data[0].tradeType;
                    this.focusTradeTypeNm = data[0].tradeTypeNm;
                    this.focusCreateSys = data[0].createSys;
                    this.focusRegDate = data[0].regDate;
                }else {
                    dataMerge = 2; //행 기준 병합
                    data = [];
                    scroll = 1;

                    this.focusTradeNm = '';
                    this.focusTradeId = '';
                    this.focusTradeType = '';
                    this.focusTradeTypeNm = '';
                    this.focusCreateSys = '';
                    this.focusRegDate = '';
                }

                loader.createSheet({
                    el: 'partnerCompanyPopsheetTable',
                    data: data,
                    options: {
                        Cfg : {
                            CanEdit : canEdit,
                            DataMerge : dataMerge,
                            NoVScroll: scroll,
                            NoDataMessage:3,
                        },
                        Cols : cols,
                        Events : {
                            onClick: this.fnClick,
                            ondblclick : this.fnDblClick
                        }
                    },
                }).then((sheet) => {
                    sheetId = sheet.id
                });
                this.heightChange(scroll,'partnerCompanyPopsheetTable');
            },
            fnDblClick : function(evt){
              if(evt.row.Kind != 'Data'){
                return;
              }
              this.fnCompanyChoice();
            },
            fnCompanyChoice: function(){//선택 버튼 누를때 event
                if(this.focusTradeId == '') {
                    // this.popMsg = '협력사를 선택해주세요';
                    // this.$root.$emit('bv::show::modal', 'companyAlert');
                    this.alert('협력사를 선택해주세요');
                    return;
                }
                let infoCompany = {
                    tradeId: this.focusTradeId,
                    tradeNm: this.focusTradeNm,
                    tradeType: this.focusTradeType,
                    tradeTypeNm: this.focusTradeTypeNm,
                    createSys: this.focusCreateSys,
                    regDate: this.focusRegDate,
                }
                this.$emit('fn-company-choice', infoCompany);
                this.focusTradeNm = '';
                this.focusTradeId = '';
                this.focusTradeType = '';
                this.focusCreateSys = '';
                this.focusRegDate = '';

                this.searchValue = '';
                this.searchName = '';

                this.$root.$emit('bv::hide::modal', this.refId);
            },
            fnClick: function(evtParams){//셀 클릭할때마다
                this.focusCompanyName = evtParams.row.companyNm;
                this.focusTradeNm = evtParams.row.tradeNm;
                this.focusTradeId = evtParams.row.tradeId;
                this.focusTradeType = evtParams.row.tradeType;
                this.focusTradeTypeNm = evtParams.row.tradeTypeNm;
                this.focusCreateSys = evtParams.row.createSys;
                this.focusRegDate = evtParams.row.regDate;
            },
            closePop: function() {
                this.$root.$emit('bv::hide::modal', 'companyAlert');
            },
            heightChange:function(scroll,div){
              if(scroll == 0){
                document.getElementById(div).parentElement.style.height = "337px";
              }else{
                document.getElementById(div).parentElement.style.height = "";
              }
              document.getElementById(div).style.height = "100%";
          }
        }
    }
</script>