<template>
<!-- 품질관리비 저장 팝업 -->
    <b-modal id="QualityCostWrite" title="품질관리비 저장" 
        hide-backdrop size="lg" 
        :footer-bg-variant="footerBg" scrollable @shown="resetAll">
        <template #default>
            <div class="pop_container">
                <h3 class="subject">* 제목과 비고를 입력하여 품질관리비를 관리하세요</h3>
                
                <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="20%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="emp_red">제목</span></th>
                                <td><input type="text" class="form_control" v-model="title"></td>
                            </tr>
                            <tr>
                                <th>비고</th>
                                <td><textarea name="" id="" class="form_control" v-model="comment"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId" v-bind:btn-name="{first : '확인'}"
                    v-on:first-btn-fn="closePop"
                />
            </div>
        </template>
        <template #modal-footer="{ }"> <!-- #modal-footer="{ ok, hide }" -->
            <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="saveCheck">등록</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hidePop">취소</b-button>
        </template>
    </b-modal>
</template>
<script>
import PopAlert from '@/pages/common/popup/PopAlert.vue' 
import API from '@/apis/'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

export default {
    name:'QualityCostWrite',
    mixins: [MsgBoxMixins],
    components:{
        PopAlert,
    },
    data(){
        return {
            footerBg: 'transparent',
            popMsg:'',                                      // 알림창 메세지
            confirmUse:'',                                  // 알림창 버튼개수
            popId:'writePopAlert',                           // 알림창 Id
            // siteMstrId:'',                                  // 현장정보Id
            title: '',                                      // 제목
            comment: '',                                    // 내용
            saveYn: false,                                  // 저장 여부
            id: '',                                         // 히스토리 아이디
            checkYn: false,                                 // 체크검사 여부
        }
    },
    props:{
        ibSheet:{
            type: Array,
            default: () => [],
        },
        siteMstrId:{
            type: String,
            default: '',
        },
        list:{
            type: Array,
            default: () => [],
        },
    },
    created(){

    },
    watch: {

    },
    methods:{
        resetAll:function(){
            this.title = '';
            this.comment = '';
        },
        saveCheck: function(){
            this.checkYn = false;
            this.popMsg = '';
            if(this.title == null || this.title == ''){
                // this.popMsg = '제목을 입력해주세요.';
                // this.confirmUse = false;
                // this.checkYn = true;
                // this.$root.$emit('bv::show::modal', 'writePopAlert');
                this.alert('제목을 입력해주세요.');
                return;
            }
            if(this.ibSheet.length<=0){
                // this.popMsg = '조회에 실패했습니다.';
                // this.confirmUse = false;
                // this.checkYn = true;
                // this.$root.$emit('bv::show::modal', 'writePopAlert');
                this.alert('조회에 실패했습니다.');
                return;
            }
            if(!this.checkYn){
                this.confirm('등록하시겠습니까?',this.saveSheet);
                // this.saveSheet();
            }
        },
        saveSheet: async function(){
            let param = {
                siteMstrId: this.siteMstrId,
                title: this.title,
                comment: this.comment,
                data: this.ibSheet,
                bgin: this.list[0],
                midl: this.list[1],
                advc: this.list[2],
                expr: this.list[3],
            };
            const rst = await API.crack.addCostHis(param);
            // console.log(rst);
            // if(rst.statusText == 'OK'){
            if(rst.status == 200){
                this.alert('저장되었습니다.',()=>{
                    this.title = '';
                    this.comment = '';
                    this.id = rst.data.data;
                    this.$emit('fn-save', this.id);
                });
                // this.popMsg = '저장되었습니다.';
                // this.confirmUse = false;
                // this.saveYn = true;
                // this.id = rst.data.data;
                // this.$root.$emit('bv::show::modal', 'writePopAlert');
            }else{
                // this.popMsg = '저장에 실패했습니다.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'writePopAlert');
                this.alert('저장에 실패했습니다.');
            }
        },
        closePop : function(){
            if(this.checkYn){
                this.$root.$emit('bv::hide::modal', 'writePopAlert');
                return;
            };
            //초기화
            this.title = '';
            this.comment = '';
            // this.ibSheet = [];

            //아이디 보내기
            if(this.saveYn){
                this.$emit('fn-save', this.id);
            }
            this.$root.$emit('bv::hide::modal', 'writePopAlert');
        },
        hidePop:function(){
            this.confirm('취소하시겠습니까?',()=>{
                this.title = '';
                this.comment = '';
                this.$root.$emit('bv::hide::modal', 'QualityCostWrite');
            });
        }
    }
}
</script>