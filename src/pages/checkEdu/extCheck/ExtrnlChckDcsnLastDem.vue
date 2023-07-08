<template>
   <div class="wrap">
      <!-- <router-view/> -->
      <div class="lnb_container on">
        <div class="tab_contents">
            <h2 class="sub_title">대외 점검 관리 > 최종 벌점 작성
                <div class="fr">
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_lastSave()" :class="{disabled : finlCmpltYn === 'Y' || (dcsnOfldcYn == 'Y' && demDcsnYn != 'Y')}">최종확정</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" :class="{disabled : (demLastDcsnYn=='Y' || dcsnOfldcYn == 'N')}" @click="fn_save()">저장</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="$router.push({ name: 'ExtCheckMngtSheet'})">목록</button>
                </div>
            </h2>
            <div class="tab_area">
                <div class="inner">
                    <div class="button_box">
                        <strong>최종 벌점</strong>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap">
                        <div id="EXT_CHCK_PENALTY" class="ibsheet_table"></div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    
   </div>
</template>

<script>
    import loader from '@ibsheet/loader'
    import { EXT_CHCK_PENALTY } from '@plugin/ibsheet/checkEdu/extCheck.js'
    import { sendPostApi} from '@/apis/common'
    import { commonFn } from '@/script/commonFn.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { mapGetters } from 'vuex'

    export default {
        name: 'ExtrnlChckDcsnLastDem',
        mixins: [MsgBoxMixins],
        computed: {
            ...mapGetters({
                extrnlChckId: 'getExtCheckExtrnlChckId',
            }),
        },
        components: {
        },
        data() {
            return {
                extrnl: {
                    sheet: null,
                    data: [],
                    options: {}
                },

                demDcsnYn : 'N',        // 저장 여부
                dcsnOfldcYn : 'N',      // 확정공문 존재여부
                demLastDcsnYn : 'N',    // 확정 여부
                finlCmpltYn: 'N',
                footerBg: 'transparent',
            }
        },
        mounted() {
            this.extrnl.options = EXT_CHCK_PENALTY.options;

            this.$nextTick(() => {
                this.fn_getPoutMatter()
            })
        },
        beforeDestroy() {
            loader.removeSheet('EXT_CHCK_PENALTY')    
        },
        methods: {
            fn_initSheet(){    // 시트 생성
                this.extrnl.options["Events"] = {
                    onAfterChange : 
                        (event) => {           
                            if(event.col == 'demDcsnYn'){    // 최종벌점 확정여부
                                if(event.val == 'Y'){
                                    event.row.lastDem = '0'
                                    event.sheet.setAttribute(event.row, "lastDem", "Type", "Float", 1)  // 확정벌점 데이터 입력 가능
                                    event.sheet.setAttribute(event.row, "lastDem", "CanEdit", 1, 0)  // 확정벌점 데이터 입력 가능
                                }else{
                                    event.row.lastDem = event.val == 'N' ? '0' : '-'
                                    event.sheet.setAttribute(event.row, "lastDem", "Type", event.val == 'N' ? "Number": "String", 1) 
                                    event.sheet.setAttribute(event.row, "lastDem", "CanEdit", 0, 0)  // 확정벌점 데이터 입력 불가능
                                }
                            }             
                        },
                    onRenderFirstFinish: (event) => {
                        event.sheet.loadSearchData(this.extrnl.data)

                        if(this.demLastDcsnYn != 'Y'){ // 최종 벌점 확정 여부
                            for(var item of this.extrnl.sheet.getDataRows()){   // 기존 벌점 확정여부 세팅
                            
                                if(item.dcsnOfldcYn!="Y"){   // 확정공문 없는경우
                                    item.dcsnResultManagtTrgetNm = '-'   // 조치대상
                                    item.lastDem = '-'                   // 확정여부
                                    item.demDcsnYn = '-'                 // 확정벌점
                                    item.poutTypeNm = 'N/A'              // 지적유형
                                    this.extrnl.sheet.setAttribute(item, "demDcsnYn", "Type", "String", 0)  // 최종벌점 여부 타입 변경
                                    this.extrnl.sheet.setAttribute(item, "demDcsnYn", "CanEdit", 0, 0)     // 최종벌점 여부 데이터 선택 가능
                                    this.extrnl.sheet.setAttribute(item, "lastDem", "Type", "String", 0)   // 최종벌점 타입 변경
                                    this.extrnl.sheet.setAttribute(item, "lastDem", "CanEdit", 0, 1)       // 최종벌점 데이터 입력 불가능
                                }else{                       // 확정공문 있는경우
                                    if(item.demDcsnYn == 'Y'){   // 벌점 확정시
                                        this.extrnl.sheet.setAttribute(item, "demDcsnYn", "Type", "Enum", 0)  // 최종벌점 여부 타입 변경
                                        this.extrnl.sheet.setAttribute(item, "demDcsnYn", "CanEdit", 1, 0)    // 확정벌점 여부 데이터 선택 가능
                                        this.extrnl.sheet.setAttribute(item, "lastDem", "Type", "Float", 0)   // 확정벌점 타입 변경
                                        this.extrnl.sheet.setAttribute(item, "lastDem", "CanEdit", 1, 1)      // 확정벌점 데이터 입력 가능
                                    }
                                    else{                         // 벌점 미선택 / 취소
                                        this.extrnl.sheet.setAttribute(item, "demDcsnYn", "Type", "Enum", 0)  // 최종벌점 여부 타입 변경
                                        this.extrnl.sheet.setAttribute(item, "demDcsnYn", "CanEdit", 1, 0)    // 최종벌점 여부 선택 가능
                                        this.extrnl.sheet.setAttribute(item, "lastDem", "Type", item.demDcsnYn == 'N' ? "Float": "String", 1)  // 최종벌점 타입 변경
                                        item.lastDem = item.demDcsnYn == 'N' ? 0 : '-'                                                          // 최종벌점 0 (취소) or '-' (미선택) 표시
                                        this.extrnl.sheet.setAttribute(item.row, "lastDem", "CanEdit", 0, 1)  // 최종벌점 데이터 입력 불가능
                                    }
                                }
                            }
                        } else{
                            this.extrnl.sheet.getHeaderRows()[0].demDcsnYn = "<span>최종 벌점</span>"    // 헤더 필수요소 표시 제거
                        }
                    }
                }
                loader.createSheet({
                    el: 'EXT_CHCK_PENALTY',
                    data: [],
                    options: this.extrnl.options
                }).then(sheet =>{
                    this.extrnl.sheet = sheet
                })
            },

            async fn_getPoutMatter(){   // 지적사항 리스트 조회
                let url = '/sendApi/api/extrnlChck/extrnlChckPoutMatter/view'
                let payload = {
                    extrnlChckId : this.extrnlChckId
                }
                await sendPostApi(url, payload).then((result) => {
                    for(var item of result.data.dlPoutMatter){       // 벌점 등록일 포맷 변경
                        item.demInDttm = this.$moment(item.demInDttm).format('YYYY-MM-DD')
                        if(item.dcsnOfldcYn=="Y"){
                            this.dcsnOfldcYn = 'Y'

                            if(!commonFn.methods.isEmpty(item.demDcsnYn)){ // 최종벌점 저장여부
                                this.demDcsnYn = 'Y'
                            }
                        }
                    }

                    this.demLastDcsnYn = result.data.dmExtrnChckInfo.demLastDcsnYn ? result.data.dmExtrnChckInfo.demLastDcsnYn : 'N' // 최종벌점 확정 여부
                    this.finlCmpltYn = result.data.dmExtrnChckInfo.finlCmpltYn ? result.data.dmExtrnChckInfo.finlCmpltYn : 'N' // 최종완료 여부
                    this.extrnl.data = result.data.dlPoutMatter
                    this.fn_initSheet()
                })
            },

            async fn_save(){   // 저장
                let dataRows = []
                const Check =  this.extrnl.sheet.getDataRows().some((item)=> {   // 유효성 체크
                    if(item.dcsnOfldcYn == 'Y'){ 
                        if(item.demDcsnYn != 'N'){
                            if(commonFn.methods.isEmpty(item.demDcsnYn)){
                                this.alert("최종벌점 확정 여부를 선택해주세요")
                                return true
                            }
                            if(item.demDcsnYn == 'Y' && commonFn.methods.isEmpty(item.lastDem.toString())){
                                this.alert("확정 벌점을 입력해주세요")
                                return true
                            }
                        }
                        dataRows.push(
                            {
                            'demDcsnYn'     : item.demDcsnYn ,
                            'lastDem'       : item.lastDem ,
                            'extrnlChckId'  : item.extrnlChckId ,
                            'poutMatterSeq' : item.poutMatterSeq ,
                            }
                        )
                    }
                })
                
                if(Check){
                    return
                }
                
                this.confirm('저장하시겠습니까?', async() => {
                    try {
                        let url = '/sendApi/api/extrnlChck/extrnlExtrnlChckDcsnLastDem/change'
                        let payload = {'dlDcsnDocDem' : dataRows}

                        await sendPostApi(url, payload).then((result) => {
                            if(result.status == '200' && result.data > 0){
                                this.alert('저장되었습니다.');
                                this.fn_getPoutMatter()

                                // set-keepAlive Activated 
                                this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                            }else{
                                this.alert("오류로 인해 저장되지 않았습니다.")
                            }
                        })
                    } catch (e) {
                        console.error(e)
                        this.alert("오류로 인해 저장되지 않았습니다.")
                    }
                })
            },
            async fn_lastSave(){   // 최종확정
                if(this.demLastDcsnYn=='Y'){
                    this.alert('이미 완료된 건입니다.');
                    return
                }
                this.confirm('최종확정하시겠습니까?', async() => {
                    try {
                        let url = '/sendApi/api/extrnlChck/extrnlChckDemLastDcsn/change'
                        let payload = {
                            'demLastDcsnYn' : 'Y',                // 최종확정 여부
                            'delYn' : 'N',                        // 삭제 여부
                            'extrnlChckId' : this.extrnlChckId,   // id 값

                            finlCmpltYn : 'Y',                    // 최종완료 여부
                        }
                        
                        await sendPostApi(url, payload).then((result) => {
                            if(result.status == '200' && result.data > 0){
                                this.alert('완료되었습니다.');
                                this.fn_getPoutMatter()

                                // set-keepAlive Activated 
                                this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                            }else{
                                this.alert("오류로 인해 완료되지 않았습니다.")
                            }
                        })
                    } catch (e) {
                        console.error(e)
                        this.alert("오류로 인해 완료되지 않았습니다.")
                    }
                })
            }
        }
    }
</script>