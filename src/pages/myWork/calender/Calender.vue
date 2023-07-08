<template>
    <div class="lnb_container on">
        <div class="tab_contents">
            <!-- <h2 class="sub_title">현장 캘린더</h2> -->
            <Breadcrumb :currentPath="$route.fullPath" />
            <div class="tab_area">
                <div class="inner">
                <!-- <div class="fr">
                    <button class="btn btn_md btn_outline btn_darkgray" @click="scheduleBtn">일정등록</button>
                </div> -->
                    <FullCalendar 
                        class="calendar_schedule"
                        :events="events"
                        :registable="true"
                        @writeSchedule="fn_writeBtn"
                        @updateBtn="fn_updateBtn"
                        @deleteBtn="fn_deleteBtn"
                        @changed="fn_changed"
                    >
                    </FullCalendar>
                </div>
            </div>
        </div>

        <b-modal id="ScheduleWrite" title="일정등록" hide-backdrop size="lg">
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="emp_red">제목</span></th>
                                <td>
                                    <input type="text" class="form_control" placeholder="제목을 입력해주세요" v-model="scdlTitle" maxlength="50"/>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">기간</span></th>
                                <td>
                                    <span class="label_text">
                                        &nbsp;&nbsp;기간 : &nbsp;
                                    </span>
                                    <Datepicker ref="datepicker_startDt_range" v-model="scdlStartDt"/> ~
                                    <Datepicker ref="datepicker_endDt_range" v-model="scdlEndDt"/>                                    
                                    <span class="label_text">
                                        &nbsp;&nbsp;시간 : &nbsp;
                                    </span> 
                                    <Datepicker ref="datepicker_startTm_range" type="time" format="HH:mm" class="timepicker" placeholder="HH:MM" :disabled="!checkTime" v-model="scdlStartTm" start="07:00" step="01:00" end="19:00" :timeOptions="{start:'07:00',end:'19:00', step:'01:00', format: 'HH:mm'}"/> ~ 
                                    <Datepicker ref="datepicker_endtTm_range" type="time" format="HH:mm" class="timepicker" placeholder="HH:MM" :disabled="!checkTime" v-model="scdlEndTm" start="07:00" step="01:00" end="19:00" :timeOptions="{start:'07:00',end:'19:00', step:'01:00', format: 'HH:mm'}"/>
                                    <label class="input_check">
                                        <input type="checkbox" @change="checkChangeHandler" :checked="checkTime">
                                        <span class="label_text">시간 추가</span>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="">장소</span></th>
                                <td>
                                    <input type="text" class="form_control" placeholder="장소를 입력해주세요" v-model="scdlPlace" maxlength="50"/>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">색상</span></th>
                                <td>
                                    <div class="lst_color">
                                        <label class="input_radio pop_notext" for="color1">
                                            <input type="radio" id="color1" name="color_type" value="red" v-model="scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color2">
                                            <input type="radio" id="color2" name="color_type"  value="yellow" v-model="scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color3">
                                            <input type="radio" id="color3" name="color_type" value="green" v-model="scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color4">
                                            <input type="radio" id="color4" name="color_type" value="blue" v-model="scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color5">
                                            <input type="radio" id="color5" name="color_type" value="gray" v-model="scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color6">
                                            <input type="radio" id="color6" name="color_type" value="purple" v-model="scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><span>내용</span></th>
                                <td>
                                    <div class="contents">
                                        <textarea class="form_control lg" @keyup="fn_scdlContentsInputChk($event)" :maxLength="1000" :value="scdlContents" placeholder="내용을 입력해주세요."></textarea>
                                        <p class="table_message ar mt0">{{ scdlContents.length }} / {{ 1000 }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>            
                    <!-- <LstFile /> -->
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_write">등록</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <b-modal id="ScheduleUpdate" title="일정 수정" hide-backdrop size="lg">
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="emp_red">제목</span></th>
                                <td>
                                    <input type="text" class="form_control" placeholder="제목을 입력해주세요." v-model="detail.scdlTitle" maxlength="50"/>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">기간</span></th>
                                <td>
                                    <Datepicker ref="datepicker_startDt_range" v-model="detail.checkDt"/>
                                    <Datepicker ref="datepicker_startTm_range" type="time" format="HH:mm" class="timepicker" placeholder="HH:MM" :disabled="!detailCheckTime" v-model="detail.scdlStartTm" start="07:00" step="01:00" end="19:00" :timeOptions="{start:'07:00',end:'19:00', step:'01:00', format: 'HH:mm'}"/> ~ 
                                    <Datepicker ref="datepicker_endtTm_range" type="time" format="HH:mm" class="timepicker" placeholder="HH:MM" :disabled="!detailCheckTime" v-model="detail.scdlEndTm" start="07:00" step="01:00" end="19:00" :timeOptions="{start:'07:00',end:'19:00', step:'01:00', format: 'HH:mm'}"/>
                                    <label class="input_check">
                                        <input type="checkbox" @change="detailCheckChangeHandler" :checked="detailCheckTime">
                                        <span class="label_text">시간 추가</span>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="">장소</span></th>
                                <td>
                                    <input type="text" class="form_control" placeholder="장소를 입력해주세요." v-model="detail.scdlPlace" maxlength="50"/>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">색상</span></th>
                                <td>
                                    <div class="lst_color">
                                        <label class="input_radio pop_notext" for="color1">
                                            <input type="radio" id="color1" name="color_type" value="red" v-model="detail.scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color2">
                                            <input type="radio" id="color2" name="color_type" value="yellow" v-model="detail.scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color3">
                                            <input type="radio" id="color3" name="color_type" value="green" v-model="detail.scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color4">
                                            <input type="radio" id="color4" name="color_type" value="blue" v-model="detail.scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color5">
                                            <input type="radio" id="color5" name="color_type" value="gray" v-model="detail.scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                        <label class="input_radio pop_notext" for="color6">
                                            <input type="radio" id="color6" name="color_type" value="purple" v-model="detail.scdlColor">
                                            <span class="label_text"></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="">내용</span></th>
                                <td>
                                    <div class="contents">
                                        <textarea class="form_control lg" @keyup="fn_dtlScdlContentsInputChk($event)" :maxLength="1000" :value="detail.scdlContents" placeholder="내용을 입력해주세요."></textarea>
                                        <p class="table_message ar mt0">{{ detail.scdlContents.length }} / {{ 1000 }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>            
                    <!-- <LstFile /> -->
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_update">수정</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>
    </div>        
</template>

<script>
    import { sendPostApi , requestOptions} from '../../../apis/common';
    import Datepicker from '@component/common/DatePicker.vue'
    import LstFile from '@/pages/common/popup/LstFile'
    import FullCalendar from '@component/common/FullCalendar.vue'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';
    import _ from 'lodash'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

    export default {
        name: 'Calender',
        mixins: [MsgBoxMixins],
        components: {
            LstFile,
            FullCalendar,
            Datepicker,
            Breadcrumb
        },
        data:() => ({
            checkTime: false,
            detailCheckTime : true,
            type : 'dayGridMonth',
            sendUrl : '/sendApi/api/calender/schedule',
            events : [],
            scdlTitle : '',
            scdlPlace : '',
            scdlColor : 'red', //default
            scdlContents : '',
            scdlStartDt : '',
            scdlEndDt : '',
            scdlStartTm : '',
            scdlEndTm : '',
            checked : false,

            detail : {},
        }),
        mounted() {
            this.fn_scheduleList()
        },
        methods: {

            //체크 박스
            detailCheckChangeHandler(evt) {
                this.detailCheckTime = !this.detailCheckTime;
            },
            checkChangeHandler(evt) {
                this.checkTime = !this.checkTime;
            },
            
            /**
             * 월간 주간 바꾸기
             */
            fn_changed (obj) {
                this.type = obj.type
                this.fn_scheduleList();
            },

            //리스트 호출
            async fn_scheduleList() {

                // try {
                    const payload = {
                        siteMstrId : this.$session.get('userInfo').siteMstrId,
                    }

                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                    const url = this.sendUrl + '/list';
                    const result = await sendPostApi(url ,payload);

                    if(result.status == '200'){
                        if(result.data.schdlMonthLst && result.data.schdlMonthLst.length > 0) {
    
                            let resultList = result.data.schdlMonthLst;
                            let schdList = [];
    
                            for (let i = 0; i < resultList.length; i++) {
                                let item = resultList[i];
                                const inputObj = {
                                    id : item.scdlId,
                                    title : item.scdlTitle,
                                    start : item.scdlStartTm ? item.scdlStartDt + "T" + item.scdlStartTm : item.scdlStartDt,
                                    end : item.scdlEndTm ? item.scdlEndDt + "T" + item.scdlEndTm : item.scdlEndDt,
                                    place : item.scdlPlace,
                                    description : item.scdlContents,
                                    manager : item.userNm,
                                    className : item.scdlColor,
                                    ...item,
                                }                              
                                schdList.push(inputObj);
                            }
                            this.events = schdList;
                        }
                        else{
                            this.events = [];
                        }
                    }

                // } catch (error) {
                //     console.log('일정 조회에 실패하였습니다.', error)
                // }
            },

            //등록 모달 오픈
            fn_writeBtn() {
                this.scdlTitle = '';
                this.scdlPlace = '';
                this.scdlColor = 'red';
                this.scdlContents = '';
                this.scdlStartDt = '';
                this.scdlEndDt = '';
                this.scdlStartTm = '';
                this.scdlEndTm = '';
                this.checkTime = false;
                this.$root.$emit('bv::show::modal', 'ScheduleWrite');
                // this.$bvModal.show('ScheduleWrite')
            },

            //등록
            fn_write () {

                if(this.scdlTitle == ''){
                    this.alert('제목을 입력해주세요.');
                    return;
                }
                if(this.scdlStartDt == '' || this.scdlStartDt == null){
                    this.alert('시작일을 선택해주세요.');
                    return;
                }
                if(this.scdlEndDt == '' || this.scdlEndDt == null){
                    this.alert('종료일을 선택해주세요.');
                    return;
                }

                const dateChk = this.$moment(this.scdlStartDt).isAfter(this.scdlEndDt)

                if(dateChk){
                    this.alert('시작일은 종료일보다 클 수 없습니다.');
                    return;
                }
                
                if(this.checkTime){
                    if(this.scdlStartTm == '' || this.scdlStartTm == null){
                        this.alert('시작시간을 선택해주세요.');
                        return;
                    }    
                    if(this.scdlEndTm == '' || this.scdlEndTm == null){
                        this.alert('종료시간을 선택해주세요.');
                        return;
                    }    
                    //시,분 계산 체크
                    let startTime = this.scdlStartTm.split(':');
                    let endTime = this.scdlEndTm.split(':');
                    let startMnt = (Number(startTime[0]) * 60);
                    let endMnt = (Number(endTime[0]) * 60);

                    if(startMnt >= endMnt){
                        this.alert('시작시간은 종료시간보다 같거나 클 수 없습니다.');
                        return;
                    }
                }   

                this.confirm('등록하시겠습니까?', async () => {

                    const payload = {
                        scdlTitle : this.scdlTitle,
                        scdlPlace :  this.scdlPlace,
                        scdlColor : this.scdlColor,
                        scdlContents : this.scdlContents,
                        scdlStartDt : this.scdlStartDt,
                        scdlEndDt : this.scdlEndDt,
                        scdlStartTm : this.checkTime ? this.scdlStartTm : '',
                        scdlEndTm : this.checkTime ? this.scdlEndTm : '',
                        checkYn : this.checkTime ? 'Y' : 'N',
                        siteMstrId : this.$session.get('userInfo').siteMstrId,
                    }

                    try {

                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                        const url = this.sendUrl + '/write';
                        const result = await sendPostApi(url ,payload);

                        if(result.status == '200' && result.data.count > 0){
                            this.alert('등록되었습니다.', () => {
                                this.$root.$emit('bv::hide::modal', 'ScheduleWrite');
                                this.fn_scheduleList();
                            });
                            // this.alert('주간 일정이 수정 되었습니다.', this.fn_scheduleList())
                        }
                    } catch (error) {
                        console.log('일정 등록에 실패하였습니다.', error)
                    }
                })
            },

            //수정 모달 오픈 - 상세 조회
            async fn_updateBtn(obj) {

                try {

                    const payload = {
                        scdlId : obj.id,
                        siteMstrId : this.$session.get('userInfo').siteMstrId,
                    }

                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                    const url = this.sendUrl + '/view';
                    const result = await sendPostApi(url ,payload);

                    if(result.status == '200' && result.data.schdlMonthInfo){
                        result.data.schdlMonthInfo['checkDt'] = result.data.schdlMonthInfo.scdlStartDt;
                        if(result.data.schdlMonthInfo.checkYn == 'Y'){
                            this.detailCheckTime = true;
                        }
                        else{
                            this.detailCheckTime = false;
                        }
                        this.detail = result.data.schdlMonthInfo;
                        this.$root.$emit('bv::show::modal', 'ScheduleUpdate');
                    }
                } catch (error) {
                    console.log('수정 상세 조회 에러 : ' , error)
                }
                
            },

            //수정
            fn_update() {

                if(this.detail.scdlTitle == ''){
                    this.alert('제목을 입력해주세요.');
                    return;
                }
                if(this.detail.checkDt == '' || this.detail.checkDt == null){
                    this.alert('기간을 선택해주세요.');
                    return;
                }


                //시,분 계산 체크
                if(this.detailCheckTime){

                    if(this.detail.scdlStartTm == '' || this.detail.scdlStartTm == null){
                        this.alert('시작시간을 선택해주세요.');
                        return;
                    }    
                    if(this.detail.scdlEndTm == '' || this.detail.scdlEndTm == null){
                        this.alert('종료시간을 선택해주세요.');
                        return;
                    }
                        
                    let startTime = this.detail.scdlStartTm.split(':');
                    let endTime = this.detail.scdlEndTm.split(':');
                    let startMnt = (Number(startTime[0]) * 60);
                    let endMnt = (Number(endTime[0]) * 60);
    
                    if(startMnt >= endMnt){
                        this.alert('시작시간은 종료시간보다 같거나 클 수 없습니다.');
                        return;
                    }
                }

                this.confirm('수정하시겠습니까?', async () => {

                    try {

                        const payload = {
                            scdlId : this.detail.scdlId,
                            groupKey : this.detail.groupKey,
                            scdlTitle : this.detail.scdlTitle,
                            scdlPlace :  this.detail.scdlPlace,
                            scdlColor : this.detail.scdlColor,
                            scdlContents : this.detail.scdlContents,
                            scdlStartDt : this.detail.checkDt,
                            scdlEndDt : this.detail.checkDt,
                            scdlStartTm : this.detailCheckTime ? this.detail.scdlStartTm : '',
                            scdlEndTm : this.detailCheckTime ? this.detail.scdlEndTm : '',
                            checkYn : this.detailCheckTime ? 'Y' : 'N',
                        }

                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                        const url = this.sendUrl + '/change';
                        const result = await sendPostApi(url ,payload);

                        if(result.status == '200' && result.data.count > 0){
                            this.alert('수정되었습니다.', () => {
                                this.fn_scheduleList();
                                this.$root.$emit('bv::hide::modal', 'ScheduleUpdate');
                            })
                        }
                    } catch (error) {
                        console.log('일정 수정에 실패하였습니다.', error)
                    }
                })
            },

            //삭제 버튼
            fn_deleteBtn(obj) {

                this.confirm('삭제하시겠습니까?', async () => {
                    const payload = {
                        scdlId : obj.id,
                    }
                    try {
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                        const url = this.sendUrl + '/unuse';
                        const result = await sendPostApi(url ,payload);

                        if(result.status == '200' && result.data.count > 0) {
                            this.alert('삭제되었습니다.', () => {
                                this.fn_scheduleList();
                            });
                        }
                    } catch (error) {
                        console.log('일정 삭제 중 에러 : ' , error)
                    }
                })
            },

            fn_scdlContentsInputChk(evt){
                if(1000 >= evt.target.value.length){
                    this.scdlContents = evt.target.value
                }
            },

            fn_dtlScdlContentsInputChk(evt){
                if(1000 >= evt.target.value.length){
                    this.detail.scdlContents = evt.target.value
                }
            },

        }
    }
</script>