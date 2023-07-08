<template>
    <div class="tab_contents">
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>

        <div class="tab_area" v-show="currentTab == 0">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="5%">
                        <col width="22%">
                        <col width="5%">
                        <col width="22%">
                        <col width="5%">
                        <col width="22%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>타설 번호</th>   
                            <td>
                                <input
                                    v-model="mySiteFiltering.docSeq"
                                    type="text"
                                    class="form_control"
                                    placeholder="입력해주세요"
                                >
                            </td>    
                            <th>공급업체</th>
                            <td>
                                <select 
                                    v-model="mySiteFiltering.tradeNm" 
                                    class="form_control"
                                >
                                    <option 
                                        v-for="option in spplierOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </td>
                            <th>진행상태</th>
                            <td>
                                <select 
                                    v-model="mySiteFiltering.pourProgress" 
                                    class="form_control"
                                >
                                    <option 
                                        v-for="option in pourprogessOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </td>
                            <td class="ar">
                                <button
                                    type="button"
                                    class="btn_reset"
                                    @click="searchMySiteData(true)"
                                >
                                    초기화
                                </button>
                                <button
                                    type="button"
                                    class="btn btn_sm btn_darkblue btn_radius btn_search"
                                    @click="searchMySiteData(false)"
                                >
                                    검색
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th>배합규격</th>
                                <td>
                                <select
                                    v-model="mySiteFiltering.concMixSd"
                                    class="form_control"
                                >
                                    <option 
                                        v-for="option in conMixSdOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                    {{ option.label }}
                                    </option>
                                </select>
                            </td>
                            <th>타설옵션</th>
                            <td>
                            <select
                                v-model="mySiteFiltering.pourQntm"
                                name=""
                                id=""
                                class="form_control"
                            >
                                <option
                                v-for="option in pourQntmOptions"
                                :key="option.value"
                                :value="option.value"
                                >
                                {{ option.label }}
                                </option>
                            </select>
                            </td>
                            <th>타설일</th>
                            <td>
                            <DatepickerRange
                                @value-change="(param) => {
                                mySiteFiltering.pourStartDt = param[0]
                                mySiteFiltering.pourEndDt = param[1]
                                }"
                            />
                            </td>
                        </tr>
                        <tr>
                            <th>구조물명</th>
                            <td>
                            <input
                                v-model="mySiteFiltering.structure"
                                type="text"
                                class="form_control"
                                placeholder="입력해주세요"
                            >
                            </td>
                            <th>타설부위</th>
                            <td>
                            <input
                                v-model="mySiteFiltering.pourPart"
                                type="text"
                                class="form_control"
                                placeholder="입력해주세요"
                            >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray">압축강도 시험일지</button>
                        <button type="button" class="btn btn_sm btn_darkgray">복수 입력</button>
                    </div>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div id="sheetTable" class="ibsheet_table"></div>
                </div>
            </div>
        </div>

        <div class="tab_area" v-show="currentTab == 1">
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
                        <td><input type="text" class="form_control" placeholder="입력해주세요"></td>              
                        <th>프로젝트코드</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요"></td>                                
                        <th>공사기간</th>
                        <td>
                            <DatepickerRange />
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search">검색</button>
                        </td>
                    </tr>

                    <tr>
                        <th>현장명</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요"></td>                 
                        <th>현장코드</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요"></td>                  
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div id="sheetTable2" class="ibsheet_table"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import loader from '@ibsheet/loader';
    import { ConcretePourstatus3, ConcretePourstatus2 } from '@/pages/common/data/MaterialsList';
    import DatepickerRange from '@/pages/common/popup/DatepickerRange.vue';

   let SHEET_ID = '';

   export default {
        name: 'CompStrgWrite',
        components: {
            DatepickerRange
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name


                mySiteFiltering: {
				docSeq: null, // 타설 번호
				tradeNm: null, // 공급업체
				pourProgress: null, // 진행상태
				concMixSd: null, // 배합규격
				pourOption: null , // 타설옵션
				pourStartDt: null, // 타설일 > 시작
				pourEndDt: null, // 타설일 > 끝
				structure: null, // 구조물명
				pourPart: null // 타설부위
			    },
                spplierOptions: [], // 공급업체 목록
                conMixSdOptions: [], // 배합규격 목록
                pourQntmOptions: [  // 타설옵션 옵션
                    { label: '전체', value: null },
                    { label: '기초', value: 'BASIC' },
                    { label: '벽체', value: 'WALL' },
                    { label: '슬라브', value: 'SLAB' },
                    { label: '벽체&슬라브', value: 'WALL_SLAB' },
                    { label: '버림', value: 'BEOLIM' },
                    { label: '기타', value: 'ETC' }
                ],
                pourProgressOptions: [
                    { label: '타설등록', value: 'REGT' },
                    { label: '타설중', value: 'POURRING' },
                    { label: '타설완료', value: 'POUR_COMPL' },
                    { label: '결재중', value: 'APVL' },
                    { label: '완료', value: 'APRV' }
                ],
                makeConcMixSd: (id) => {
                    if (id.includes('-')) return id
                    const result = id.slice(0, 2) + '-' + id.slice(2, -3) + '-' + id.slice(-3)
                    return result
                }
            }
        },
        mounted() {
            let data = ConcretePourstatus3.data;
            let options = ConcretePourstatus3.options;

            loader.createSheet({
                el: 'sheetTable',
                data: data,
                options: options,
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });

            let data2 = ConcretePourstatus2.data;
            let options2 = ConcretePourstatus2.options;

            loader.createSheet({
                el: 'sheetTable2',
                data: data2,
                options: options2,
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