<!--
  * 콘크리트 관리 > 타설관리 > 결과 입력
 -->

<template>
  <div
    class="tab_contents"
    v-if="defaultInfo"
  >
    <div class="inner type2">
      <h2 class="sub_title">
        {{ isEditable ? '타설입력(물성시험)' : '타설상세(물성시험)' }}
        <div
          class="fr"
          
        >
          <button
            type="button"
            class="btn btn_md btn_outline btn_darkgray"
            :disabled="isActiveApproveSelectBtn"
            @click="approveViewBtn"
          >
           <!-- && !isEditable -->
            결재보기
          </button>
          <button
            type="button"
            class="btn btn_md btn_outline btn_darkgray"
            :disabled="!isEditable || !unuse"
            @click="activeDeleteBtn"
          >
           <!-- && !isEditable -->
            삭제
          </button>
          <button
            type="button"
            class="btn btn_md btn_outline btn_darkgray"
            :disabled="!isActiveApproveBtn"
            v-if="change"
            @click="activeApproveBtn"
          >
           <!-- && !isEditable -->
            결재상신
          </button>
          <button
            type="button"
            class="btn btn_md btn_outline btn_darkgray"
            :disabled="!isActivePourBtn "
            v-if="change"
            @click="activeCompletePour"
          >
          <!-- && !isEditable -->
            타설완료
          </button>

          <button
            type="button"
            class="btn btn_md btn_outline btn_darkgray"
            @click="routeToList"
          >
            목록
          </button>
        </div>
      </h2>
      <div
        class="data_num"
        v-if="defaultInfo.docSeq"
      >
        <table>
          <caption class="sr_only" />
          <colgroup>
            <col width="86">
            <col width="*">
            <col width="86">
            <col width="*">
          </colgroup>
          <tbody>
            <tr>
              <th>타설번호</th>
              <td>{{ defaultInfo.docSeq }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="lst_tabs">
        <ul>
          <li
            v-for="(tab, index) in tabs"
            :class="[
              {'active': currentTab===index},
              {'disable': !tab.clickable}
            ]"
            :key="index"
          >
            <a
              href="javascript:void(0);"
              @click="() => {
                if(!tab.clickable) return
                getPourStatusView(index)
              }"
            >
              {{ tab.label }}
            </a>
          </li>
        </ul>
      </div>

      <section
        class="tab_area"
        v-if="currentTab == 0"
      >
        <pour-set-up-manage-default-form 
          :data="defaultInfo"
          :is-editable="isEditable"
          :change="change"
          :unuse="unuse"
          :down="down"
        />
      </section>
      <!-- 기본/시험 정보관리 -->

      <section
        class="tab_area"
        v-else-if="currentTab == 1"
      >
        <pour-set-up-manage-physic-test-form 
          :data="defaultInfo"
          :is-editable="isEditable"
          :change="change"
          :unuse="unuse"
          :down="down"
        />
      </section>
      <!-- 물성시험관리 -->

      <section
        class="tab_area"
        v-else-if="currentTab == 2"
      >
        <pour-set-up-disuse-form
          :data="defaultInfo"
          :is-editable="isEditable"
          :change="change"
          :unuse="unuse"
          :down="down"
        />
      </section>
      <!-- 폐기 및 물량 -->

      <section
        class="tab_area"
          v-else-if="currentTab == 3"
        >
        <pour-set-up-last-pour-info
          :data="defaultInfo"
          :is-editable="isEditable"
          :change="change"
          :unuse="unuse"
          :down="down"
        />
      </section>
      <!-- 최종타설정보 -->
    </div>

    <Approve
        ref-id="ApproveModal"
        :code-type="approve.codeType"
        :code-dtl-type="approve.codeDtlType"
        :doc-seq="approve.docSeq"
        :doc-name="approve.docName"
        :doc-type="approve.docType"
        :main-code-id="approve.mainCodeId"
        :mid-code-id="approve.midCodeId"
        :request-id="approve.requestId"
        :file-type="approve.fileType"
        :site-mstr-id="approve.siteMstrId"
        @callback="fn_setSourceApproval"
        alertable
    />
    <approval-view
      ref-id="AprvViewModal"
      :aprv-info-id="aprvInfoId"
      :requestId="requestId"
      fileType="ConcreteMngt"
    />
  </div>
</template>

<script>
import API from '@/apis/'
import PourSetUpManageDefaultForm from './PourSetUpResultWriteForm/PourSetUpManageDefaultForm'
import PourSetUpManagePhysicTestForm from './PourSetUpResultWriteForm/PourSetUpManagePhysicTestForm'
import PourSetUpDisuseForm from './PourSetUpResultWriteForm/PourSetUpDisuseForm'
import PourSetUpLastPourInfo from './PourSetUpResultWriteForm/PourSetUpLastPourInfo'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import Approve from '@modal/approval/Approve.vue'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import ApprovalView from '@modal/approval/ApprovalView.vue'

export default {
    name: 'PourSetUpView',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        PourSetUpManageDefaultForm,
        PourSetUpManagePhysicTestForm,
        PourSetUpDisuseForm,
        PourSetUpLastPourInfo,
        Approve,
        ApprovalView
    },
    data: () => ({
        currentTab: -1, // 기본 current 값 지정
        tabs: [
            { label: '기본/시험 정보관리', clickable: true },
            { label: '물성시험관리', clickable: true },
            { label: '폐기 및 물량', clickable: true }, // 🟢 clickable => true 로 하시면 탭이 활성화 됩니다.
            { label: '최종타설정보', clickable: true } // 🟢 clickable => true 로 하시면 탭이 활성화 됩니다.
        ],
        searchObj: {
            csrtStartDt: '',
            csrtEndDt: ''
        },
        isActiveApproveSelectBtn: true, // 결재상신 버튼 활성화 여부
        isActiveApproveBtn: false, // 결재상신 버튼 활성화 여부
        isActivePourBtn: false, // 타설완료 버튼 활성화 여부
        lastInfo : {},
		    concPourDtlId: '',
        pourStateList: [],
        defaultInfo: {}, // 선택한 타설 현황 정보
        isEditable: false,// 편집 가능한지?
        approve: {},  // 결재상신 정보
        userId : '',
        unuse : false,
        write : false,
        change : false,
        down : false,
        aprvInfoId : '',
        requestId : '',
    }),
	  mounted (){
      if(!this.$route.params.concPourDtlId){
        this.routeToList();
        return false;
      }
      else{
        this.userId = this.$store.getters['auth/getUserId']
        this.unuse = this.checkUser(this.userId,'unuse')
        this.write = this.checkUser(this.userId,'write')
        this.change = this.checkUser(this.userId,'change')
        this.down = this.checkUser(this.userId,'down')
        this.concPourDtlId = this.$route.params.concPourDtlId
        this.getPourStatusView(1) // 물성 조회 
      }
      // this.isEditable = !!this.$route.path.includes('/concreteMngt/pourSetUp/change')
      // if(!this.isEditable) this.tabs = this.tabs.map(t => { return {...t, clickable: true }})
		},
    methods: {
      
      /**
       * API: 타설 목록 조회
       */
      async getPourStatusView (idx) {
        //초기값
        this.currentTab = -1;
        const payload = {
          concPourDtlId : this.concPourDtlId,
          siteMstrId : this.$store.getters['auth/getSiteMstrId']
        }
        const response = await API.concrete.getPourStatusView(payload);
        if(response?.data) {
          // this.pourStateList = response.data
          this.defaultInfo = {...response.data}
          this.aprvInfoId = response.data.aprvInfoId
          this.requestId = response.data.concPourDtlId
          this.isActiveApproveSelectBtn = true;
          if(this.defaultInfo.pourProgress == 'POURRING' && this.defaultInfo.concFinalPosuDtlId != null) {
            this.isEditable = true;
            this.isActivePourBtn = true;
            this.isActiveApproveBtn = false;
          } else if(this.defaultInfo.pourProgress == 'POUR_COMPL') {
            this.isEditable = false;
            this.isActivePourBtn = false;
            this.isActiveApproveBtn = true;
          } else if(this.defaultInfo.pourProgress == 'APVL' || this.defaultInfo.pourProgress == 'APRV' ) {
            this.isEditable = false;
            this.isActivePourBtn = false;
            this.isActiveApproveBtn = false;
            this.isActiveApproveSelectBtn = false;
          } else if(this.defaultInfo.pourProgress == 'POURRING' && this.defaultInfo.concFinalPosuDtlId === null) {
            this.isEditable = true;
          } else if(this.defaultInfo.pourProgress == 'REGT'){ 
            this.isEditable = true;
            this.isActivePourBtn = false;
            this.isActiveApproveBtn = false;
          }

          if(!this.change){
            this.isEditable = false;
            this.isActivePourBtn = false;
            this.isActiveApproveBtn = false;
            this.isActiveApproveSelectBtn = true;
          }

          if(idx != undefined && idx >= 0){
            this.currentTab = idx;
          }
        }
        try {
        } catch (error) {
          console.error('타설 현황 조회 에러: ', error)
        }
      },
      
      routeToList () {
        this.$router.push({
            name: 'PourSetUpSheet'
        })
      },
      /**
       * [타설 완료] 클릭시 발생 이벤트
       */
      activeCompletePour () {
        this.confirm('타설완료처리 하시겠습니까?', async () => {
          try {
            const result = await API.concrete.changePourProgress({
              concPourDtlId: this.concPourDtlId
              , siteMstrId : this.$store.getters['auth/getSiteMstrId']
            }) // 타설 완료 진행상황 업데이트
            if(result?.json?.rCode === '0000') { // 성공
              this.alert('타설이 완료되었습니다.', () => {
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.getPourStatusView(this.currentTab);
              })
              // await this.getFinalPourInfo()
            } else {
              let failMsg = result?.json?.rMsg ? result.json.rMsg : '타설 진행상황 업데이트에\n문제가 발생했습니다.'
              return this.alert(failMsg)
            }
          } catch (error) {
            console.error('타설 완료 진행상황 업데이트 에러: ', error)
            return this.alert('타설 진행상황 업데이트에\n문제가 발생했습니다.')
          }
        })
      },
      activeDeleteBtn(){
        this.confirm('삭제하시겠습니까?', async () => {
          const result = await API.concrete.deletePourStatusList({
            concPourDtlId: this.defaultInfo.concPourDtlId
          });
					if(result?.json?.rCode === '0000') {
						this.alert('삭제되었습니다', () => {
              this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
              this.routeToList();
            });
					} else {
						let failMsg = result?.json?.rMsg ? result.json.rMsg : '삭제에 실패했습니다.'
						return this.alert(failMsg)
					}
        });
      },
      /**
       * [결재 상신] 클릭시 발생 이벤트
       */
      activeApproveBtn(){
        this.signYn = false;
      
        if(this.defaultInfo.pourProgress != 'POUR_COMPL'){   // 타설 완료가 아닌경우
          if(this.defaultInfo.pourProgress == 'APVL' || this.defaultInfo.pourProgress == 'APRV'){  // 결재상태 확인
            this.alert('결재중이거나 완료된 건입니다.');
            return;
          }else{
            this.alert('완료되지 않은 타설입니다.')
            return;
          }
        }  

        this.approve = {
          requestId : this.defaultInfo.concPourDtlId,
          fileType : 'ConcreteMngt',
          siteMstrId : this.defaultInfo.siteMstrId,
          mainCodeId : '',
          midCodeId : '',
          codeType : 'CCRT',
          codeDtlType : 'CONC', 
          docSeq : this.defaultInfo.docSeq,
          docName :"콘크리트 물성시험 성과표",   // 임시
          docType : "CCRT"
        }

        this.$bvModal.show('ApproveModal');
      },

      async fn_setSourceApproval(obj){
        let payload = {
          'concPourDtlId' : this.approve.requestId ,   // 타설 ID
          'aprvInfoId' : obj.aprvInfoId ,              // 결재 ID
          'pourProgress' : 'APVL'                      // 결재중
        }

        try {
          const response = await API.concrete.concretePourProgressChange(payload)
          if(response.resultCode == '0000'){
                this.alert('결재상신 되었습니다.',()=>{
                  // this.getFinalPourInfo()
                  this.$bvModal.hide('ApproveModal');
                  this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                  this.getPourStatusView(this.currentTab);
                });
            }
        } catch (error) {
          console.error(error)
        }
      },
      /** 결재 보기 버튼 이벤트 */
      approveViewBtn(){
        this.$bvModal.show('AprvViewModal');
      },
    }
}
</script>