<template>
    <div class="tab_contents">

        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only">제목</caption>
                <colgroup>
                    <col width="5%">
                    <col width="20%">
                    <col width="4%">
                    <!-- <col width="20%">
                    <col width="4%">
                    <col width="20%">
                    <col width="*"> --> -->
                </colgroup>
                <tbody>
                    <tr>
                        <th>메뉴명</th>   
                        <td> 
                            <select v-model="search.menuNm" class="form_control size_md">
                                <option value="">전체</option>
                                <option v-for="option in menuNmList" :key="option" :value="option">
                                    {{ option }}
                                </option>
                            </select>
                        </td>
                        <th>TYPE명</th>
                        <td>
                            <input type="text" v-model="search.type" class="form_control size_md" placeholder="입력해주세요" @keyup.enter="docInfo()">
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="clearSearchData()">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="docInfo()">검색</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
            <div class="button_box">
                <strong class="txt_md">▣ 문서 리스트</strong>
                
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkblue" @click="fn_Save()">저장</button>
                </div> 
            </div>
                        
            <!-- ibsheet -->
            <div class="ib_wrap mt0" style="height: calc(100vh - 355px)">
                <div id="ibsheet_OzdocTypeSiteSetUp" class="ibsheet_table" style="height: 100%;"></div>
            </div>
                
        </div>   <!-- // inner -->

        <!-- 시료 사진 보기(개별) 팝업 -->
        <b-modal id="ozPhotoView" title="시료 사진 보기" 
            no-hide-backdrop no-close-on-backdrop scrollable size="lg"
            :footer-bg-variant="footerBg" >
            <template #default>
                <div class="pop_container">
                    <div class="lst_imgview">
                        <swiper class="swiper" :options="swiperOption">
                            <swiper-slide v-for="(item, idx) in upFileImg" :key="idx">
                                <div class="img_wrap">
                                    <div class="img_area">
                                        <img :src="'/sendApi/api/fileCall/getOzImgFile/'+`${item.fileComArcvId}`">
                                    </div>
                                </div>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">선택</b-button> -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { OzdocTypeSiteSetUp } from '@/pages/common/data/UserMngtList'
import { sendPostApi, requestOptions, sendFileApi } from '@/apis/common';
import LstImg from '@/pages/common/popup/LstImg';
import DatepickerRange from '@component/common/DatePickerRange.vue'
import _ from 'lodash'
import { commonFn } from '@/script/commonFn.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper';

    export default {
        name: 'OzdocTypeSiteSetUpSheet',
        mixins: [MsgBoxMixins],
        components: {
            DatepickerRange,
            LstImg,
            swiper, 
            swiperSlide,
        },
        data() {
            return {
                addRowsCount : 1,           // 행추가 Num
                footerBg: 'transparent',
                docInfoList : [],           // 기본 문서 리스트
                menuNmList : [],            // 메뉴명 리스트
                deleteList : [],          // 삭제 리스트
                upFileImg  : [],          // 사진 리스트

                swiperOption: { 
                    slidesPerView: 1, 
                    spaceBetween: 0, 
                    loop: false, 
                    autoplay: false, 
                    pagination: { 
                        el: '.swiper-pagination', 
                        clickable: true 
                    }, 
                    navigation: { 
                        nextEl: '.swiper-button-next', 
                        prevEl: '.swiper-button-prev' 
                    },
                    on: {
                        slideChange() {
                            _vm.activeIdx = this.activeIndex;
                        }
                    }
                },
                

                // 시트
                ozGrid : {
                    data : null,
                    options : {},
                },
                search : {
                    menuNm : '' ,
                    type : '' ,
                    // jspNm : '' ,
                    // inDttm : [null, null] ,
                },
                
            }
        },
        async mounted() {
            await this.docInfo();
        },
        beforeDestroy() {
            if(this.ozGrid.data) loader.removeSheet(this.ozGrid.data)
        },
        methods: {
            
            // init 
            initGrid : function() {
                let data    = OzdocTypeSiteSetUp.data;
                let options = OzdocTypeSiteSetUp.options;

                let menuNm = options.Cols.find(col => col.Name === 'menuNm')

                menuNm.Enum = '|'+this.menuNmList.join('|')
                menuNm.EnumKeys = '|'+this.menuNmList.join('|')

                options.Events = {
                    onclick : this.click,
                    onAfterChange : this.change,
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                }

                loader.createSheet({
                    el: 'ibsheet_OzdocTypeSiteSetUp',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    this.ozGrid.data = sheet
                });
            },

            // 문서 리스트 조회
            docInfo : async function() {
                let url = '/sendApi/api/myWork/userMngt/ozReportDocInfo/list';
                await sendPostApi(url, {}).then((data) => { 
                    if(typeof data.data.datas.docInfo != 'undefined'){
                        
                        // 문서 리스트 
                        this.docInfoList = data.data.datas.docInfo
                        
                        // 메뉴명 리스트
                        this.menuNmList = _.uniqBy(data.data.datas.docInfo, 'menuNm').map(row => row.menuNm)
                        
                        // 테이블 생성
                        this.initGrid();
                    }
                });
            },

            // 리스트 조회
            searchData : async function() {
                let url = '/sendApi/api/myWork/userMngt/OzReportInfoList/list';
                let param = {
                    siteMstrId : this.$store.getters['auth/getSiteMstrId'],
                    menuNm : this.search.menuNm ,
                    type : this.search.type 
                }

                await sendPostApi(url, param).then(async (data) => {
                    if(typeof data.data.datas.setUpOzInfo != 'undefined'){
                        let infoList = data.data.datas.setUpOzInfo
                        url = '/sendApi/api/file/upFileList';   // 파일 조회 URL

                        this.ozGrid.data.loadSearchData({
                            data: infoList
                        });

                        this.ozGrid.data.getDataRows().forEach(row => {
                            this.ozGrid.data.setAttribute(row, "type", 'Enum', row.typeList)
                            this.ozGrid.data.setAttribute(row, "type", 'EnumKeys', row.typeKey)
                            row.type = row.typeVal
                        })
                    }
                });
             },

            // 검색 초기화
            clearSearchData : function() {
                this.search.menuNm  = '';
                this.search.type = '';
                // this.search.jspNm = '';
                // this.search.inDttm = [null, null] ;
            },


            // 시트 클릭 이벤트
            click : function(evt) {
                if(evt.col == 'fileYn' && evt.row.fileYn == 1){
                    let url='/sendApi/api/file/upFileList';
                    let param = {
                        fileConnectId : evt.row.type,
                        fileType : 'ozType',
                        fileSubType : evt.row.seq,
                    }   

                    try {
                        sendPostApi(url, param).then(data => {
                            this.upFileImg = data.data.data;
                            this.$root.$emit('bv::show::modal', 'ImgView');
                        });
                    } catch (error) {
                        console.log(error.response.data);
                    }
                    this.$bvModal.show('ozPhotoView')
                }
            },

            // 시트 변경 이벤트
            async change(evt){
                if(evt.col == 'type'){
                    let url = '/sendApi/api/myWork/userMngt/OzReportInfoFile/Cnt';
                    let param = {
                        seq : evt.row.type,
                        ozSeq : evt.row.seq,
                    }   
                    
                    await sendPostApi(url, param).then((data) => {
                        if(data.data.datas.cnt > 0){
                            evt.sheet.setValue(evt.row, 'fileYn', 1)
                        }else{
                            evt.sheet.setValue(evt.row, 'fileYn', 0)
                        }

                        if(evt.row.ozSeq == null){
                            evt.row.Added = '1';
                        }else{
                            evt.row.chg = '1';
                        }
                    });
                }
            },

            // 저장
            fn_Save : async function(evt) {
                let rows = this.ozGrid.data.getDataRows().map(item => {return { 
                        'seq'      : item.ozSeq,
                        'ozSeq'    : item.seq,
                        'admOzSeq' : item.type,
                        'Added'    : item.Added ,
                        'chg'      : item.chg,
                    }
                })

                let addList = rows.filter(row => row.Added == '1')  // 추가 리스트
                let chgList = rows.filter(row => row.chg == '1')    // 수정 리스트

                let url = '/sendApi/api/myWork/userMngt/ozReportInfo/write';
                let param = {
                    'addList' : addList,
                    'chgList' : chgList,
                    'siteMstrId' : this.$store.getters['auth/getSiteMstrId']
                }
                
                try{
                    await sendPostApi(url, param).then(async (data) => { 
                        if(data.data.rCode == '0000'){
                            this.alert('문서 TYPE을 저장했습니다.',()=>{
                                this.docInfo()
                            })
                        }
                    });
                }catch(e){
                    this.alert('문서 TYPE 저장에 실패했습니다.');
                }
            },
        },
   }
</script>