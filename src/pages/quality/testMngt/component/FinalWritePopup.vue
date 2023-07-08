<template>
    <b-modal id="FinalWrite" title="최종 등록" 
        hide-backdrop size="lg" 
        :footer-bg-variant="footerBg" @shown="loadPopup">
        <template #default>
            <div class="pop_container">
                <h3 class="subject">* 제목과 비고를 입력하여 품질시험계획서를 관리하세요</h3>
                
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
                                <td><input type="text" class="form_control" maxLength="100" v-model="title"></td>
                            </tr>
                            <tr>
                                <th><span>비고</span></th>
                                <!-- class="emp_red" -->
                                <td><textarea name="" id="" class="form_control" maxLength="1000" v-model="description"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
        <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide }" -->
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="registFinal">등록</b-button>
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="hide('forget')">취소</b-button>
        </template>
    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            footerBg: 'transparent',
            title: '',
            description: ''
        }
    },
    components: {},
    methods: {
        loadPopup() {   // popup shown
            // 로드시 초기화
            this.title       = "";
            this.description = "";
        },
        registFinal() { // 최종등록
            // console.log('clickRegist')
            const dataItem = {
                title: this.title,
                comment: this.description
            }
            this.$emit('registFinal', dataItem);
        }
    },
}
</script>

<style>

</style>