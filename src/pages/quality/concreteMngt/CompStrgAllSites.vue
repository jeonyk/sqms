<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                <col width="6%">
                <col width="24%">
                <col width="6%">
                <col width="24%">
                <col width="5%">
                <col width="24%">
                <col width="*">
                </colgroup>
                <tbody>
                <tr>
                  <th>프로젝트명</th>
                  <td>
                    <div class="form_area">
                      <input
                        type="text"
                        class="form_control"
                        placeholder="입력해주세요"
                        v-model="searchObj.projectNm"
                        @keyup.enter="searchProject()"
                      >
                    </div>
                  </td>
                  <th>프로젝트코드</th>
                  <td>
                    <input
                      type="text"
                      class="form_control"
                      placeholder="입력해주세요"
                      v-model="searchObj.projectId"
                      @keyup.enter="searchProject()"
                    >
                  </td>
                  <th>공사기간</th>
                  <td>
                    <DatePickerRange
                      ref="datapickerPopupRange"
                      v-model="searchObj.consDt"
                    />
                  </td>
                  <td class="ar">
                    <button
                      type="button"
                      class="btn_reset"
                      @click="reset"
                    >
                      초기화
                    </button>
                    <button
                      type="button"
                      class="btn btn_sm btn_darkblue btn_radius btn_search"
                      @click="searchProject()"
                    >
                      검색
                    </button>
                  </td>
                </tr>

                <tr>
                  <th>현장명</th>
                  <td>
                    <input
                      type="text"
                      class="form_control"
                      placeholder="입력해주세요"
                      v-model="searchObj.siteNm"
                      @keyup.enter="searchProject()"
                    >
                  </td>
                  <th>현장코드</th>
                  <td>
                    <input
                      type="text"
                      class="form_control"
                      placeholder="입력해주세요"
                      v-model="searchObj.siteCd"
                      @keyup.enter="searchProject()"
                    >
                  </td>
                </tr>
              </tbody>
            </table>
        </div>

        <div class="inner">
            <sqms-grid
                ref="compStrgAllSiteSheet"
                id="compStrgAllSiteSheet"
                :columns="columns"
                :data="gridData"
                :upperStyle="{'height':'calc(100vh - 320px)'}"
                :inputStyle="{'height':'100%'}"
                @click="selectRow"
                @init="sheet => { sheet = sheet }"
                :cfg="{
                    NoVScroll: false
                }"
            />
        </div>
    </div>
</template>

<script>
    import API from '@/apis/'
    import _ from 'lodash'
    import { ConcretePourstatus2 } from '@/pages/common/data/MaterialsList';
    import DatePickerRange from '@component/common/DatePickerRange.vue'
   export default {
        name: 'CompStrgAllSites',
        components: {
            DatePickerRange
        },
        data() {
            return {
                footerBg: 'transparent',
                gridData: [],
                columns: [],
                siteMstrId : '',
                searchObj: { // 타 프로젝트 조회 필터링 정보
                    projectNm : undefined, // 프로젝트 명
                    projectId : undefined, // 프로젝트 코드
                    siteNm : undefined, // 현장 명
                    siteCd : undefined, // 현장 코드
                    consDt : [null, null]
                },
                isEditing : false,
            }
        },
        async created() {
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            this.columns = this.isEditing ? ConcretePourstatus2.options.Cols : ConcretePourstatus2.options.Cols.map(col => { return { ...col, CanEdit: 0 }})
            await this.getOtherProjectList()
        },
        methods: {
            /**
             * 프로젝트 검색
             */
            async searchProject (payload = this.searchObj) {
              payload['csrtStartDt'] = this.searchObj.consDt[0]
              payload['csrtEndDt'] = this.searchObj.consDt[1]
              await this.getOtherProjectList(payload)
            },
            async getOtherProjectList(payload) {
                try {
                // const projectId = this.$cookies.get("projectId")
                // const siteId = this.$cookies.get("siteId")
                // const siteMstrId = this.$store.getters['auth/getSiteMstrId']

                const response = await API.concrete.getOtherProjectList({
                    ...payload,
                    // siteId,
                    // siteMstrId
                })
                if(response?.datas) {
                    this.gridData = response.datas?.resultList
                } 

                } catch (error) {
                console.error('프로젝트 리스트 조회 에러: ', error)
                }
            },
            /**
             * row 클릭 이벤트
             */
            selectRow(evt){
                this.$store.dispatch('setInformation', {
                    testYn : 'Y',
                    siteMstrId: evt.row.siteMstrId,
                })
                window.open(this.$router.resolve({name : 'CompStrgSetUpDetailPopUp' }).href,'_blank');
            },
            /**
             * 초기화 버튼
             */
            reset () {
                this.searchObj = {
                    projectNm : undefined,
                    projectId : undefined,
                    siteNm : undefined,
                    siteCd : undefined,
                    consDt : [null,null]
                }
                this.searchProject()
            },
        }
   }
</script>