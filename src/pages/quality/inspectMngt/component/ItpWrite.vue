<template>
    <div class="inner">
        <!-- 편집모드 -->
        <div class="button_box">
            <h2>ITP</h2>
            <div class="mt10">
                <!-- <button type="button" v-show="editYn" class="btn btn_sm btn_excel" @click="excelUpload">엑셀 업로드</button> -->
                <button type="button" v-show="editYn" class="btn btn_sm btn_excel" @click="excelDown">엑셀 다운로드</button>
                <div class="fr">
                    <button v-if="checkUser(userId,'down')" v-show="!editYn" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="print">출력</button>
                    <button v-if="checkUser(userId,'write')" v-show="editYn" type="button" class="btn btn_sm btn_darkgray" v-b-modal.ItpProjectLoad>타 프로젝트 가져오기</button>
                    <button v-if="checkUser(userId,'write')" v-show="editYn" type="button" class="btn btn_sm btn_outline btn_darkblue" @click="fnCancel">편집해제</button>
                    <button v-if="checkUser(userId,'write')" type="button" v-show="editYn" class="btn btn_sm btn_darkgray" @click="copyRow">행 복사</button>
                    <div v-if="checkUser(userId,'write')" class="btn_number" v-show="editYn">
                        <select name="" id="" class="form_control num" v-model="addIdx">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <button type="button" class="btn btn_sm" @click="addRow">행 추가</button>
                    </div>
                    <button v-if="checkUser(userId,'unuse')" v-show="editYn" type="button" class="btn btn_sm btn_darkgray" @click="delRow">행 삭제</button>
                    <button v-if="checkUser(userId,'write')" v-show="editYn" type="button" class="btn btn_sm btn_outline btn_darkblue" @click="fnBeforeSave">저장</button>
                    <button v-if="checkUser(userId,'write')" v-show="!editYn" type="button" class="btn btn_sm btn_darkblue" @click="tempEdit">편집</button>
                    <button v-if="checkUser(userId,'write')" v-show="!editYn" type="button" class="btn btn_sm btn_darkgray" @click="finalWrite">최종 등록</button>
                </div>
            </div>

        </div>
        <div class="ib_wrap" v-show="!editYn" :style="{'height': 'calc(100vh - 350px)'}">
            <div id="itpWriteSheetTable3" class="ibsheet_table" style="height: 100%;"></div>
        </div>
        <div class="ib_wrap" v-show="editYn" style="height: calc(100vh - 360px)">
            <div id="itpWriteSheetTable3_1" class="ibsheet_table" style="height: 100%;"></div>
        </div>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
        <FinalWrite :site-id="siteMstrId" @fn-load="loadSheet"/>
        <itp-project-load :site-id="siteMstrId" @fn-close="subMainId = '', subMidId = '', loadSheet" @dataChoice="dataChoice" @allData="allData"/>
    </div>
</template>
<script>
    import loader from '@ibsheet/loader'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import { DetectionAdmin3 } from '@/pages/common/data/InptOptnList'
    import API from '@/apis/'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import FinalWrite from '@/pages/quality/inspectMngt/popup/FinalWrite.vue'
    import ItpProjectLoad from '../popup/ItpProjectLoad.vue'
    
    export default {
        name: 'ItpSelect',
        mixins: [authCheckMixns,MsgBoxMixins],
        components: {
            PopAlert,
            FinalWrite,
            ItpProjectLoad,
        },
        data() {
            return {
                itpWriteSheet:null,
                itpWriteSheetEdit:null,
                popMsg : '',
                confirmUse:'',
                popId:'itpWriteAlert',                     // 알림창 Id
                
                orgSubCodeCombo : [],
                subCodeCombo : [],
                chrgCombo : [],
                siteMstrId:'',
                mainCodeId:'',
                midCodeId:'',
                subCodeId:'',
                mounted:false,
                editYn:false,
                addIdx:'1',
                dataEdit:[],
                dataOrg:[],
                saveCheckYn:false,
                delChkYn:false,
                delIds:[],
                insertIds:[],
                subMainId:'',
                subMidId:'',
                option:{
                    Cfg:{
                        NoDataMessage:3,
                        NoVScroll:0,
                        ShowFilter: true,
                    },
                    Cols: [
                        { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
                        { Name: 'mainName', Header: [{ Value: '대공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0 ,Required:1,},
                        { Name: 'midName', Header: [{ Value: '공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0,Required:1, },
                        { Name: 'subCodeId', Header: [{ Value: '세부 공종', RowSpan: 3 }], Type: 'Enum', RelWidth: 6, CanEdit:1, Required:1, },
                        // { Name: 'subCodeId', Header: [{ Value: '세부 공종', RowSpan: 3 }], Type: 'Enum', RelWidth: 6, CanEdit:0, Required:1, },
                        // { Name: 'inptStep', Header: [{ Value: '단계', RowSpan: 3 }], RelWidth: 6, CanEdit:0,Required:1,  },
                        // { Name: 'inptIem', Header: [{ Value: '항목', RowSpan: 3 }], RelWidth: 6,Required:1, },
                        { Name: 'chkIem', Header: [{ Value: '검사항목', Span: 3, RowSpan: 3 }], Type: 'Lines', RelWidth: 6 ,Required:1, Align: 'left' },
                        { Name: 'chkIem01', Header: [{ Value: '검사항목', RowSpan: 3 }], Type: 'Lines', RelWidth: 6, Align: 'left'},
                        { Name: 'chkIem02', Header: [{ Value: '검사항목', RowSpan: 3 }], Type: 'Lines', RelWidth: 6 , Align: 'left' },
                        { Name: 'chkEra', Header: [{ Value: '시기 및 빈도', RowSpan: 3 }], RelWidth: 6,Required:1, },
                        { Name: 'chkStd', Header: [{ Value: '기 준', RowSpan: 3 }], Type: 'Lines', RelWidth: 20, Align: 'left' },
                        { Name: 'chkMtd', Header: [{ Value: '검사 방법', RowSpan: 3 }], RelWidth: 6, Align: 'left' },
                        { Name: 'inptMngtId', Visible: 0},
                        { Name: 'relateHis', Header: [{ Value: '결과물', RowSpan: 3 }], RelWidth: 6},
                        { Name: 'ccpyTradeType', Header: [{ Value: '검 사 점', Span: 4 }, { Value: '협력업체', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6 },
                        { Name: 'cnstrctTradeChrgType', Header: [{}, { Value: '시공사', Span: 2 }, { Value: '담당/책임' }], Type: 'Enum', RelWidth: 6 },
                        // { Name: 'cnstrctTradeRspnberType', Header: [{},{}, { Value: '검사점' }], Type: 'Enum', Enum: '|공무|공사|공사/품질|품질', EnumKeys: '|001|002|003|004', RelWidth: 6 },
                        { Name: 'cnstrctTradeChkType', Header: [{}, {},{ Value: '검사점' }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6 },
                        // { Name: 'cnstrctTradeChkType', Header: [{}, { Value: '검사점', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6 },
                        { Name: 'spvsTradeType', Header: [{}, { Value: '건설사업 \n 관리단', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M',  RelWidth: 6 },
                        { Name: 'comment', Header: [{ Value: '비고', RowSpan: 3 }], RelWidth: 6  },
                        { Name: 'siteMstrId', Visible: 0},
                        { Name: 'mainCodeId', Visible: 0},
                        { Name: 'midCodeId', Visible: 0},
                    ]
                },
            }
        },
        props:{
            mainId:{
                type:String,
                default:'',
            },
            mainIdName:{
                type:String,
                default:'',
            },
            midId:{
                type:String,
                default:'',
            },
            midIdName:{
                type:String,
                default:'',
            },
            revId:{
                type:Number,
                default:'',
            },
            userId:{
                type:String,
                default: '',
            }
        },
        async created() {
            await this.getSubCodeCombo();
            await this.getChrgCombo()
        },
        mounted(){
            // this.sheetCreate();
            this.mounted = true;
            this.siteMstrId = this.$cookies.get("siteMstrId");
            this.loadSheet();
        },
        watch:{
            mainId : function(){
                if (this.mounted) {
                    //console.log(this.mainId);
                    this.subMainId = this.mainId;
                    if(this.midId == '' || this.midId == null){
                        // if(!this.editYn){
                            this.loadSheet();
                        // }else{
                        //     this.hideRow();
                        // }
                    }
                }
            },
            midId : function(){
                this.subCodeCombo = this.orgSubCodeCombo.filter(item => item.midCodeId === this.midId);
                // console.log("mid = this.subCodeCombo : %o", this.subCodeCombo);
                if (this.mounted) {
                    this.subMidId = this.midId;

                    // if(!this.editYn){
                        this.loadSheet();
                    // }else{
                    //     this.hideRow();
                    // }
                }
            },
        },
        methods:{
            getSubCodeCombo : async function(){
                let url   = '/sendApi/api/common/cntrwkType/list';
                let param = { codeType: 'ITP' };
                
                try {
                    const data = await sendPostApi(url, param);
                    // console.log("DATA : %o", data.data.dlSubCode) ;
                    this.orgSubCodeCombo = data.data.dlSubCode;
                    this.subCodeCombo    = this.orgSubCodeCombo
                                           .filter(item => item.midCodeId === this.midId);
                } catch (error) {
                    console.log(error.response.data)
                }

            },
            getChrgCombo : async function() {
                // 검사점-시공사-담당/책임 콤보
                let url   = '/sendApi/api/common/masterCode/list';
                let param = { groupCode: 'CNSTRCT_TRADE_CHRG_TYPE' };
                
                try {
                    const resultData = await sendPostApi(url, param);
                    // console.log(resultData);
                    this.chrgCombo = resultData.data.data;

                } catch (error) {
                    console.log("ERROR : %o", error)
                }
            },
            setSubCodeCombo : function(payload){
                const options = {
                    subCodeCombo : this.subCodeCombo,
                    seperator: '|',
                    ...payload,
                }

                options.subCodeId.Enum       = `${options.seperator}선택${options.seperator}${options.subCodeCombo.map(item => item['subName']).join(options.seperator)}`
                options.subCodeId.EnumKeys   = `${options.seperator}${options.seperator}${options.subCodeCombo.map(item => item['subCodeId']).join(options.seperator)}`
                // console.log("options.subCodeId : %o", options.subCodeId)
            },
            setChrgCombo : function(payload){
                const options = {
                    chrgData : this.chrgCombo,
                    seperator: '|',
                    ...payload,
                }

                options.cnstrctTradeChrgType.Enum       = `${options.seperator}${options.chrgData.map(item => item['codeNameKr']).join(options.seperator)}`
                options.cnstrctTradeChrgType.EnumKeys   = `${options.seperator}${options.chrgData.map(item => item['codeVal']).join(options.seperator)}`
            },
            /* 타 프로젝트 데이터 가져오기 */ 
            dataChoice(data){   // 선택된 데이터 가져오기
                data.forEach(row=>{ 
                    this.itpWriteSheetEdit.addRow({"init": row})
                })
                // console.log(data)
            },
            allData(data){      // 전체 데이터 가져오기
                loader.createSheet({
                    el: 'itpWriteSheetTable3_1',
                    data: data,
                    options: this.option,
                }).then((sheet) => {
                    this.itpWriteSheetEdit = sheet;
                    sheet.bind('onAfterChange',this.fnIsCopy);
                    sheet.bind('onAfterClick',this.fnClick);
                });
            },
            finalWrite(){
                if(this.itpWriteSheet.getDataRows().length > 0){
                    this.$root.$emit('bv::show::modal', 'FinalWrite');
                }else{
                    this.alert('등록할 데이터가 없습니다.')
                }
            },
            loadSheet: async function(){

                this.itpWriteSheetEdit = null;
                if(this.siteMstrId!= null && this.siteMstrId!= ''){
                    let param = {
                        'siteMstrId':this.siteMstrId,
                    };
                    if(this.mainId != '' && this.mainId != null){
                        param['mainCodeId'] = this.mainId;
                    }
                    if(this.midId != '' && this.midId != null){
                        param['midCodeId'] = this.midId;
                    }
                    if(this.revId != '' && this.revId != null && parseInt(this.revId) != 0){
                        param['nextRevisionId'] = this.revId;
                    }
                    let rst = await API.inspect.inptITPWritngList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(rst);

                    /* ITP 작성 */
                    this.dataEdit = [];
                    // this.dataOrg = [];
                    let options2 = DetectionAdmin3.options;
                    if(rst.data.rCode == '0000'){
                        this.dataEdit = rst.data.datas.dlWritng;
                        // if((this.subMainId == ''||this.subMainId == null) && (this.subMidId == '' || this.subMidId == null)){
                            this.dataOrg = rst.data.datas.dlWritng;
                        // }
                    }

                    this.setChrgCombo({
                        cnstrctTradeChrgType : options2.Cols[13],
                    })

                    // if(this.editYn){
                    //     options2.Cols = [
                    //         { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
                    //         { Name: 'mainName', Header: [{ Value: '공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0 },
                    //         { Name: 'midName', Header: [{ Value: '세부 공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0 },
                    //         { Name: 'inptStep', Header: [{ Value: '단계', RowSpan: 3 }], RelWidth: 6, CanEdit:0  },
                    //         { Name: 'inptIem', Header: [{ Value: '항목', RowSpan: 3 }], RelWidth: 6 , CanEdit:1 },
                    //         { Name: 'chkIem', Header: [{ Value: '검사항목', RowSpan: 3 }], RelWidth: 6, CanEdit:1  },
                    //         { Name: 'chkEra', Header: [{ Value: '검사시기/ \n 빈도', RowSpan: 3 }], RelWidth: 6 , CanEdit:1 },
                    //         { Name: 'chkStd', Header: [{ Value: '검사기준 및 \n 시험 기준', RowSpan: 3 }], RelWidth: 17, CanEdit:1  },
                    //         { Name: 'chkMtd', Header: [{ Value: '검사방법', RowSpan: 3 }], RelWidth: 6, CanEdit:1  },
                    //         { Name: 'relateHis', Header: [{ Value: '관련 기록', RowSpan: 3 }], RelWidth: 6 , CanEdit:1 },
                    //         { Name: 'ccpyTradeType', Header: [{ Value: '시험 기준', Span: 5 }, { Value: '협력업체', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6, CanEdit:1  },
                    //         { Name: 'cnstrctTradeChrgType', Header: [{}, { Value: '시공사', Span: 2 }, { Value: '담당/책임' }], Type: 'Enum', Enum: '|공사|공무|품질|안전', EnumKeys: '|001|002|003|004', RelWidth: 6, CanEdit:1  },
                    //         { Name: 'cnstrctTradeRspnberType', Header: [{},{}, { Value: '책임' }], Type: 'Enum', Enum: '|공사|공무|품질|안전', EnumKeys: '|001|002|003|004', RelWidth: 6, CanEdit:1  },
                    //         { Name: 'cnstrctTradeChkType', Header: [{}, { Value: '검사점', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6, CanEdit:1  },
                    //         { Name: 'spvsTradeType', Header: [{}, { Value: '건설사업 \n 관리단', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M',  RelWidth: 6 , CanEdit:1 },
                    //         { Name: 'comment', Header: [{ Value: '비고', RowSpan: 3 }], RelWidth: 6, CanEdit:0  },
                    //     ]
                    // }
                    
                    loader.createSheet({//편집모드전
                        el: 'itpWriteSheetTable3',
                        data: this.dataEdit,
                        options: options2,
                    }).then((sheet) => {
                        this.itpWriteSheet = sheet;
                        if(this.editYn){
                            sheet.showCol("selectYn");
                        }else{
                            sheet.hideCol("selectYn");
                        }
                    });

                    this.setChrgCombo({
                        cnstrctTradeChrgType : this.option.Cols[13],
                    })
                    this.setSubCodeCombo({
                        subCodeId : this.option.Cols[3],
                    })

                    loader.createSheet({
                        el: 'itpWriteSheetTable3_1',
                        data: this.dataOrg,
                        options: this.option,
                    }).then((sheet) => {
                        this.itpWriteSheetEdit = sheet;
                        sheet.bind('onAfterChange',this.fnIsCopy);
                        sheet.bind('onAfterClick',this.fnClick);
                    });
                }
            },
            fnBeforeSave : function(){
                this.$emit('change-code',true);
                this.popMsg = '';
                this.insertIds = [];
                let sheet = this.itpWriteSheetEdit;
                // let dup = sheet.getRowsByDup('mainName,midName,inptStep,inptIem,chkIem', false, false,false,"Deleted");
                let dup = sheet.getRowsByDup('mainName,midName,subName,chkIem,chkIem01,chkIem02', false, false, false, "Deleted");

                if(dup.length>0){
                    for(let x = 0; x< dup.length; x++){
                        for(let y = 1;y<dup[x].length; y++){
                            sheet.setAttribute({
                                row: dup[x][y],
                                attr: 'Color',
                                val: '#f96f6f'
                            })
                        }
                        // sheet.refreshRow(dup[x]);
                    }
                    this.alert('중복된 데이터가 있습니다.')
                    return
                }else{
                    let rows = sheet.getShownRows(0);
                    for(let x = 0; x<rows.length; x++){
                        let row ={};
                        // row['status'] = rows[x].Added?'Added':(rows[x].Deleted?'Deleted':(rows[x].Changed?'Changed':''));
                        row['status'] = rows[x].Deleted? 'Deleted' : 'Added'
                        row['inptMngtId'] = rows[x].inptMngtId;
                        row['siteInptMngtId'] = rows[x].siteInptMngtId;
                        row['mainCodeId'] = rows[x].mainCodeId;
                        row['midCodeId'] = rows[x].midCodeId;
                        row['subCodeId'] = rows[x].subCodeId;
                        row['inptStep']  = rows[x].inptStep;
                        row['inptIem']   = rows[x].inptIem;
                        row['chkIem']    = rows[x].chkIem;
                        row['chkIem01']  = rows[x].chkIem01;
                        row['chkIem02']  = rows[x].chkIem02;
                        row['chkEra']    = rows[x].chkEra;
                        row['chkStd']    = rows[x].chkStd;
                        row['chkMtd']    = rows[x].chkMtd;
                        row['relateHis'] = rows[x].relateHis;
                        row['ccpyTradeType'] = rows[x].ccpyTradeType;
                        row['cnstrctTradeChrgType'] = rows[x].cnstrctTradeChrgType;
                        // row['cnstrctTradeRspnberType'] = rows[x].cnstrctTradeRspnberType;
                        row['cnstrctTradeChkType'] = rows[x].cnstrctTradeChkType;
                        row['spvsTradeType'] = rows[x].spvsTradeType;
                        row['comment'] = rows[x].comment;
                        row['revisionId'] = rows[x].revisionId;

                        this.insertIds.push(row);
                    }
                    this.fnSave();
                }
            },
            fnSave: async function(){
                this.saveCheckYn = false;
                for(let x =0;x<this.delIds.length; x++){
                    this.insertIds.push(this.delIds[x]);
                }

                let param = {
                    'param':{
                        'siteMstrId':this.siteMstrId,
                    },
                    'listData':this.insertIds,
                }; 
                // let rst = await API.inspect.inptITPWritngWrite(param,{
                //     headers:{
                //         'Authorization': this.$cookies.get("Authorization")
                //     }
                // });
                let rst = await API.inspect.otrPrjctDataAllWrite(param, {
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                if(rst.status == 200){
                    this.alert('저장되었습니다.',()=>{
                        this.changeEdit();
                    })
                }else{
                    this.alert('저장에 실패했습니다.')
                    return
                }
            },
            hideRow:function(){
                let sheet = this.itpWriteSheetEdit;
                let rows = sheet.getDataRows();
                let count = 0;
                for(let i = 0; i <rows.length; i++){
                    if(this.subMainId == '' || this.subMainId == null){
                        sheet.showRow(rows[i]);
                        count++;
                    }else{
                        if(rows[i].mainCodeId == this.subMainId){
                            if(this.subMidId == '' || this.subMidId == null){
                                sheet.showRow(rows[i]);
                                count++;
                            }else{
                                if(rows[i].midCodeId == this.subMidId){
                                    sheet.showRow(rows[i]);
                                    count++;
                                }else{
                                    sheet.hideRow(rows[i]);
                                }
                            }
                        }else{
                            sheet.hideRow(rows[i]);
                        }
                    }
                }
                // if(count == 0){
                //     sheet.addRow( {"next":sheet.getFirstRow()} );
                //     let fst = sheet.getFirstRow();
                //     fst['selectYn'] =  '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     fst[''] = '조회된 데이터가 없습니다.';
                //     sheet.showMessage({message:"<span style='color:black'>조회된 데이터가 없습니다.</span>", importance:4, type:0});
                // }else{
                //     sheet.addRow( {"next":sheet.getFirstRow()} )
                //     sheet.hideMessage();
                // }
                //console.log(sheet.getDataRows().length);
                //console.log('hide');
            },
            delRow: function(){ //행삭제
                let sheet = this.itpWriteSheetEdit;
                this.delChkYn = false;
                let rows = sheet.getRowsByChecked("selectYn");
                if(rows == []||rows.length == 0){
                    this.alert('삭제할 행을 선택해주세요.')
                    return
                }else{
                    for(let i =0; i< rows.length; i++){
                        let id = {
                            'siteInptMngtId':rows[i].siteInptMngtId,
                            'status':'Deleted',
                            'inptMngtId':rows[i].inptMngtId,
                            'siteMstrId':rows[i].siteMstrId,
                        };
                        if(id.siteInptMngtId != '' && id.siteInptMngtId != null){
                            this.delIds.push(id);
                        }
                    }
                    sheet.removeRows(rows);
                }
            },
            fnIsCopy: function(evt){
                if(evt.col == 'inptIem'||evt.col == 'chkIem'){
                    // let dup = evt.sheet.getRowsByDup('mainName,midName,inptStep,inptIem,chkIem', false, false,false,"Deleted");
                    let dup = evt.sheet.getRowsByDup('mainName,midName,subName,chkIem,chkIem01,chkIem02', false, false,false,"Deleted");
                    let yn = false;
                    for(let x = 0;x<dup.length; x++){
                        for(let y = 0; y<dup[x].length;y++){
                            if(evt.sheet.getRowIndex(dup[x][y])==evt.sheet.getRowIndex(evt.row)){
                                evt.row[evt.col] = '';
                                evt.sheet.setAttribute(evt.row,evt.col,'Color','#f96f6f');
                                // evt.sheet.setAttribute({
                                //     row: evt.row,
                                //     attr: 'Color',
                                //     val: '#f96f6f'
                                // })
                                evt.sheet.refreshRow(evt.row);
                                yn = true;
                            }
                        }
                    }
                    if(!yn){
                        evt.sheet.setAttribute(evt.row,evt.col,'Color',null);
                        evt.sheet.setAttribute({
                            row: evt.row,
                            attr: 'Color',
                            val: null
                        })
                    }
                }
            },
            copyRow: function(){    //행복사
                let rows = this.itpWriteSheetEdit.getRowsByChecked("selectYn");
                if(rows == []||rows.length == 0){
                    this.alert('선택된 행이 없습니다.')
                    return;
                }else{
                    for(let idx = 0; idx<rows.length;idx++){
                        let focusRow = rows[idx];
                        let i = this.itpWriteSheetEdit.getRowIndex(focusRow)+1;
                        this.itpWriteSheetEdit.copyRow({row:focusRow,next:this.itpWriteSheetEdit.getNextRow(focusRow)});
                        let newRow = this.itpWriteSheetEdit.getRowByIndex(i);
                        newRow['selectYn'] = 0;
                        newRow['inptMngtId'] = '';
                        newRow['siteInptMngtId'] = '';

                        
                        this.itpWriteSheetEdit.refreshRow(newRow);
                    }
                    
                    // for(let i = 1;i <=rows.length; i++){
                    //     let selectRow = this.itpWriteSheetEdit.getRowByIndex(i);
                    //     selectRow['selectYn'] = 0;
                    //     selectRow['siteInptMngtId'] = '';
                    //     this.itpWriteSheetEdit.refreshRow(selectRow);
                    // }
                }   
            },
            addRow:function(){  //행추가
                // let row = this.itpWriteSheetEdit.getRowsByChecked('selectYn');
                this.popMsg = '';
                // if(row.length == 0){
                //     this.alert('선택된 행이 없습니다.')
                //     return
                // }else if(row.length > 1){
                //     this.alert('하나의 행만 선택해주세요.')
                //     return
                // }
                // this.itpWriteSheetEdit
                //     .addRows({
                //         "count":this.addIdx,
                //         "next":this.itpWriteSheetEdit.getNextRow(row[0])
                //     });
                this.itpWriteSheetEdit
                    .addRows({
                        count: this.addIdx,
                        next: this.itpWriteSheetEdit.getFirstRow(),
                    });

                // let idx = this.itpWriteSheetEdit.getRowIndex(row[0]);

                for(let i=1; i<=this.addIdx; i++){
                    let selectRow = this.itpWriteSheetEdit.getRowByIndex(i);
                    // console.log("row : %o",  selectRow)

                    selectRow['selectYn'] = 0;
                    // selectRow['inptMngtId'] = '';
                    // selectRow['siteInptMngtId'] = '';
                    selectRow['siteMstrId'] = this.siteMstrId;
                    selectRow['mainCodeId'] = this.mainId;
                    selectRow['mainName']   = this.mainIdName;
                    selectRow['midCodeId']  = this.midId;
                    selectRow['midName']    = this.midIdName;
                    selectRow['subCodeId']  = '';
                    selectRow['subName']    = '선택';
                    selectRow['revisionId'] = '0';
                    // console.log("row : %o",  selectRow)

                    this.itpWriteSheetEdit.refreshRow(selectRow);
                }
                this.itpWriteSheetEdit.rerender();

            },
            fnClick:function(evt){
                //console.log(evt.row);
            },
            tempEdit:function(){
                if(!this.editYn){
                    this.subMidId = '';
                    this.subMainId = '';
                    this.editYn = true;
                    this.delIds = [];
                    this.insertIds = [];
                }else{
                    this.editYn = false;
                    this.insertIds = [];
                    this.delIds = [];
                    this.$emit('change-code',true);
                }
                //console.log(this.editYn);
            },
            changeEdit: async function(){
                //console.log('editStart');
                if(!this.editYn){
                    // this.$emit('change-code',true);
                    this.subMidId = '';
                    this.subMainId = '';
                    this.loadSheet();
                    // this.$nextTick(()=>{
                        this.editYn = true;
                        this.delIds = [];
                        this.insertIds = [];
                        this.itpWriteSheetEdit.showCol("selectYn");
                        // this.itpWriteSheetEdit.setAttribute(null, "inptStep","CanEdit",1);

                        // this.itpWriteSheetEdit.setAttribute(null, "inptIem","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "chkIem","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "chkEra","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "chkStd","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "chkMtd","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "relateHis","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "ccpyTradeType","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "cnstrctTradeChrgType","CanEdit",1);
                        // this.itpWriteSheetEdit.setAttribute(null, "cnstrctTradeRspnberType","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "cnstrctTradeChkType","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "spvsTradeType","CanEdit",1);
                        this.itpWriteSheetEdit.setAttribute(null, "comment","CanEdit",1);
                        this.hideRow();
                        // this.itpWriteSheetEdit.rerender();
                    // });
                }else{
                    this.editYn = false;
                    this.insertIds = [];
                    this.delIds = [];
                    this.$emit('change-code',true);
                    await this.loadSheet();
                    // this.itpWriteSheetEdit.hideCol("selectYn");
                    // // this.itpWriteSheetEdit.setAttribute(null, "inptStep","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "inptIem","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "chkIem","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "chkEra","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "chkStd","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "chkMtd","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "relateHis","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "ccpyTradeType","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "cnstrctTradeChrgType","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "cnstrctTradeRspnberType","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "cnstrctTradeChkType","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "spvsTradeType","CanEdit",0);
                    // this.itpWriteSheetEdit.setAttribute(null, "comment","CanEdit",0);
                }
                //console.log('edit');
            },
            print:function(){
                if(this.itpWriteSheet.getDataRows().length > 0){
                    // this.itpWriteSheet.doPrint({
                    //     pageOrient : 1,
                    //     menu: 2,
                    // });
                    this.itpWriteSheet.doPrint();
                }else{
                    this.alert('출력할 데이터가 없습니다.')
                    return
                }
            },
            alertConfirmFn:function(){
                if(this.saveCheckYn){
                    this.saveCheckYn = false;
                    this.changeEdit();
                }
                this.$root.$emit('bv::hide::modal', 'itpWriteAlert');
            },
            closePop: function(){
                this.$root.$emit('bv::hide::modal', 'itpWriteAlert');
            },
            excelDown: function(){
                this.itpWriteSheetEdit.down2Excel({
                    merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                    downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                    reqHeader:  {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Accept-Language': 'ko'
                    },
                    fileName:   `시험검사장비_목록_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                })
            },
            excelUpload: function(){
                this.alert('준비중입니다');
            },
            fnCancel(){
                this.confirm('수정중인 내용이 있습니다. 취소하시겠습니까?', () => {
                    this.editYn = !this.editYn
                    this.loadSheet();
                })

            },
        }
    }
</script>