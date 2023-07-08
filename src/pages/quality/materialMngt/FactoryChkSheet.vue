<template>
    <div class="tab_contents">
        <h2 class="sub_title">공장검사 Check List</h2>
        <div class="inner">
            <div class="table_normal_list">
                <table>
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="7%">
                        <col width="20%">
                        <col width="*">
                        <col width="18%">
                        <col width="18%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>공종</th>
                            <th>세부공종</th>
                            <th>품명</th>
                            <th>등록일자</th>
                            <th>개정번호</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>공통</td>
                            <td>토공사 및 기초공사</td>
                            <td>성토용 흙</td>
                            <td>2021-11-11</td>
                            <td>Rev. 0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="button_box">
                <div class="fr">
                    <span class="ico ico_save">저장됨</span>
                    <button type="button" class="btn btn_sm btn_darkgray btn_number"><span class="num">1</span> 행 추가</button>
                    <button type="button" class="btn btn_sm btn_darkgray">행 삭제</button>
                    <button type="button" class="btn btn_sm btn_darkblue">저장</button>
                    <button type="button" class="btn btn_sm btn_darkgray">등록</button>
                    <button type="button" class="btn btn_sm btn_darkgray">목록</button>
                </div>
            </div>
            <!-- ibsheet -->
            <div class="ib_wrap">
                <div id="sheetTable" class="ibsheet_table"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import loader from '@ibsheet/loader';
    import { MaterialChecklist2 } from '@/pages/common/data/MaterialsList';

    let SHEET_ID = '';

    export default {
        name: 'FactoryChkSheet',
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['자재분류체계 및 Check List 등록', '신규 등록 자재 (프로젝트별)'] // tab name
            }
        },
        mounted() {
            let data = MaterialChecklist2.data;
            let options = MaterialChecklist2.options;

            loader.createSheet({
                el: 'sheetTable',
                data: data,
                options: options
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },
        methods: {
        }
    }
</script>