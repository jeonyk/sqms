<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="4%">
                    <col width="20%">
                    <col width="4%">
                    <col width="20%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>코드</th>   
                        <td>
                            <input type="text" class="form_control size_lg" placeholder="">
                        </td>
                        <th>코드명</th>
                        <td>
                            <input type="text" class="form_control size_lg" placeholder="">
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search">검색</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
            <div class="button_box">
                <span class="total">총 <b>536</b> 건</span> 
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkgray" v-b-modal.InspectionWrite2>등록</button>
                </div>
            </div>

            <div class="table_normal_list ac">
                <table class="">
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="5%">
                        <col width="13%">
                        <col width="13%">
                        <col width="*">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>분류코드</th>
                            <th>코드</th>
                            <th>코드명(KR)</th>
                            <th>정렬순서</th>
                            <th>등록일</th>
                            <th>사용여부</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>0001</td>
                            <td></td>
                            <td>구분</td>
                            <td>1</td>
                            <td>yyyy-mm-dd</td>
                            <td>Y</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0001</td>
                            <td></td>
                            <td>공종</td>
                            <td>1</td>
                            <td>yyyy-mm-dd</td>
                            <td>Y</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0001</td>
                            <td></td>
                            <td>종별</td>
                            <td>1</td>
                            <td>yyyy-mm-dd</td>
                            <td>Y</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>  <!--  // table_normal_list -->

            <div class="board_paging">
                <ul>
                    <li class="paging_first"><a href="javascript:void(0);">paging_first</a></li>
                    <li class="active"><a href="javascript:void(0);">1</a></li>
                    <li><a href="javascript:void(1);">2</a></li>
                    <li><a href="javascript:void(0);">3</a></li>
                    <li><a href="javascript:void(0);">4</a></li>
                    <li><a href="javascript:void(0);">5</a></li>
                    <li><a href="javascript:void(0);">6</a></li>
                    <li><a href="javascript:void(0);">7</a></li>
                    <li><a href="javascript:void(0);">8</a></li>
                    <li><a href="javascript:void(0);">9</a></li>
                    <li><a href="javascript:void(0);">10</a></li>
                    <li class="paging_last"><a href="javascript:void(0);">paging_last</a></li>
                </ul>
            </div> <!-- // board_paging -->
        </div>   <!-- // inner -->
    </div>
</template>

<script>
import loader from '@ibsheet/loader';

    let SheetId_Language = '';
    let SheetId_Code = '';
    // let NoticeSheet = null;

    export default {
        name: 'CmmnCodeSheet',
        components: {

        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['메뉴관리', '공통코드', '언어설정', '코드번역'], // tab name
            }
        },
        mounted() {
            const LanguageList = {
                options: {
                    Cols: [
                        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1, CanEdit: 1 },
                        { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 1, CanEdit: 0 },
                        { Name: 'case3', Header: [{ Value: '언어명' }], RelWidth: 5, CanEdit: 1 },
                        { Name: 'case4', Header: [{ Value: '코드' }], RelWidth: 5, CanEdit: 1 },
                        { Name: 'case5', Header: [{ Value: '등록일' }], RelWidth: 5, CanEdit: 0 },
                    ]
                },
                data: [
                    { case1: '0', case2: '1', case3: 'English', case4: 'EN', case5: '2021-11-27' },
                    { case1: '0', case2: '2', case3: '日本語', case4: 'JP', case5: '2021-11-27' },
                    { case1: '0', case2: '3', case3: '中國人', case4: 'CN', case5: '2021-11-27' },
                ]
            };

            const CodeList = {
                options: {
                    Cols: [
                        { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 1, CanEdit: 0 },
                        { Name: 'case2', Header: [{ Value: '분류코드' }], RelWidth: 4, CanEdit: 0 },
                        { Name: 'case3', Header: [{ Value: '코드' }], RelWidth: 4, CanEdit: 0 },
                        { Name: 'case4', Header: [{ Value: '상위코드' }], RelWidth: 4, CanEdit: 0 },
                        { Name: 'case5', Header: [{ Value: '한국어' }], RelWidth: 4, CanEdit: 0 },
                        { Name: 'case6', Header: [{ Value: '번역' }], RelWidth: 4, CanEdit: 1 },
                    ]
                },
                data: [
                    { case1: '1', case2: '', case3: '', case4: '', case5: '구분', case6: 'TYPE' },
                    { case1: '2', case2: '', case3: '', case4: '', case5: '공종', case6: 'Common Type' },
                    { case1: '3', case2: '', case3: '', case4: '', case5: '종별', case6: 'Species' },
                    { case1: '4', case2: '', case3: '', case4: '', case5: '규격', case6: 'Standard' },
                    { case1: '5', case2: '', case3: '', case4: '', case5: '시험 종목', case6: 'Test event' },
                ]
            };

           loader.createSheet({
                el: 'ibsheet_language',
                data: LanguageList.data,
                options: LanguageList.options,
            }).then((sheet) => {
                SheetId_Language = sheet.id
                // NoticeSheet = sheet;
                /* sheet.bind("ondblclick", function(evtParam) {
                    // console.log(evtParam.row.id);
                    var rowID = sheet.getRowById(evtParam.row.id);
                    sheet.setCheck(rowID, "case1", 1);
                }) */
            });

            loader.createSheet({
                el: 'ibsheet_code',
                data: CodeList.data,
                options: CodeList.options,
            }).then((sheet) => {
                SheetId_Code = sheet.id
                // NoticeSheet = sheet;
            });
        },
        beforeDestroy() {
            loader.removeSheet(SheetId_Language);
            loader.removeSheet(SheetId_Code);
        },

        methods: {
            
        },
        
   }
</script>