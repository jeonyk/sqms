<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />

        <div class="inner">
            <div class="button_box">
                <!-- Check All -->
                <button type="button" class="btn btn_sm btn_darkgray btn_all_check" v-on:click="checkAll()" v-if="isCheckAll">선택해제</button>
                <button type="button" class="btn btn_sm btn_darkgray btn_all_check" v-on:click="checkAll()" v-if="!isCheckAll">전체선택</button>
                <button type="button" class="btn btn_sm btn_darkgray" v-on:click="fn_refresh()">새로고침</button>
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="qualityImageUnuse()">삭제</button>
                    <button type="button" class="btn btn_sm btn_darkblue" v-on:click="qualityImageDown()">다운로드</button>
                </div>
            </div>
            <div class="lst_img_check" v-show="areaShow">
                <ul v-if="LstImgRst.length > 0">
                    <li v-bind:class="{active : getActive(qualityImgRst.fileQltImgArcvId)}" v-for="(qualityImgRst, index) in LstImgRst" v-bind:key="index">
                        <label class="input_check pop_notext">
                            <input type="checkbox" v-bind:id="'chk_'+qualityImgRst.fileQltImgArcvId" v-bind:value="qualityImgRst.fileQltImgArcvId"  v-model="fileQltImgArcvId" @change="check"/>
                            <span class="label_text"></span>
                        </label>
                        <a href="javascript:void(0);" v-on:click="swiperSet(index)">
                            <div class="img_wrap">
                                <div class="img_area">
                                    <img :src="'/sendApi/api/fileCall/getQltImgFile/' + qualityImgRst.fileQltImgArcvId" >
                                </div>
                            </div>
                            <span class="file_name">{{qualityImgRst.orgFileName}}</span>
                        </a>
                    </li>
                </ul>
                <div class="error" v-else>
                    <p class="desc pt0">업로드된 품질사진이 없습니다. 모바일 앱에서 업로드해주세요.</p>
                </div>
            </div>
            <PopAlert v-bind:msg="popMsg" v-bind:confirm-use="true" v-bind:pop-id="popId" 
                    v-bind:btn-name="btnNm"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"/>

            <PopAlert v-bind:msg="popDownMsg" v-bind:confirm-use="false" v-bind:pop-id="alertPopId" 
                    v-bind:btn-name="{first : '확인'}"
                    v-on:first-btn-fn="closeDownPop"/>
        </div>
        <b-modal id="ImgView" title="사진 보기" 
            hide-backdrop size="lg"
            :footer-bg-variant="footerBg" >
            <template #default>
                <div class="pop_container pl0 pr0">
                    <div class="lst_imgview">
                        <swiper class="swiper" :options="swiperOption">
                            <swiper-slide v-for="(qualityImgRst, index) in LstImgRst" v-bind:key="index">
                                <div class="img_wrap">
                                    <div class="img_area">
                                        <img :src="'/sendApi/api/fileCall/getQltImgFile/' + qualityImgRst.fileQltImgArcvId" alt="">
                                    </div>
                                    <div class="file_name">
                                        <a href="javascript:void(0);" class="ico_file">{{qualityImgRst.orgFileName}}</a>
                                    </div>
                                </div>
                            </swiper-slide>
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
    import { sendPostApi, requestOptions } from '@/apis/common'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import { swiper, swiperSlide } from 'vue-awesome-swiper' 
    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
    import 'swiper/css/swiper.css'
        
    export default {
        name: 'QualityImageSheet',
        mixins: [MsgBoxMixins],
        components: {
            PopAlert,
            Breadcrumb,
            swiper, 
            swiperSlide,
        },
        data() {
            return {
                footerBg: 'transparent',
                areaShow : false,
                LstImgRst : [],
                fileQltImgArcvId : [],
                isCheckAll : false,
                popId : 'qualityImageUnuseAlert',
                alertPopId : 'qualityImageDownAlert',
                popMsg:"삭제하시겠습니까?",
                popDownMsg:"품질사진을 선택해주세요.",
                btnNm : {first : '확인', second : '취소'},
                swiperOption: { 
                    slidesPerView: 1, 
                    initialSlide : 0,
                    spaceBetween: 0, 
                    loop: true, 
                    autoplay: false, 
                    /* pagination: { 
                        el: '.swiper-pagination', 
                        clickable: true 
                    },  */
                    navigation: { 
                        nextEl: '.swiper-button-next', 
                        prevEl: '.swiper-button-prev' 
                    } 
                }
            }
        },
        beforeCreate() {
           
        },
        beforeMount() {
            this.qualityImageList();
        }, 
        mounted() {
            
        },
        methods: {
            qualityImageList : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/file/upFileList';
                let param = {
                    fileType : "QualityImage"
                };

                const resData = await sendPostApi(url, param).then((result) => {
                    return result.data;
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });
                let resultList = [];
                resData.data.forEach(data => {
                    resultList.push(data);
                })
                this.LstImgRst = resultList;
                this.areaShow = true;
                return resData;
            },
            qualityImageUnuse : async function() {
                // console.log("fileQltImgArcvId = ", this.fileQltImgArcvId);
                if(this.fileQltImgArcvId.length > 0) {
                    this.$root.$emit('bv::show::modal', 'qualityImageUnuseAlert');
                }
                else{
                    return this.alert("품질사진을 선택해주세요.");
                }
            },
            clickCheck : function(val) {
                this.fileQltImgArcvId.push(val);
            }, 
            alertConfirmFn : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/file/fileUnUse';
                let param = {
                    fileType : "QualityImage",
                    fileQltImgArcvIds : this.fileQltImgArcvId
                };
                const resData = await sendPostApi(url, param).then((result) => {
                    // console.log('result : ', result)
                    if(result.status == '200'){
                        this.LstImgRst = [];
                        this.$root.$emit('bv::hide::modal', 'qualityImageUnuseAlert');
                        this.alert('삭제되었습니다.', () => {
                            this.qualityImageList();
                        });
                        return result.data;
                    }
                    else{
                        this.alert('삭제에 실패했습니다.');
                        return result.data;
                    }
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });
                // console.log(resData);
            },
            closePop : function() { //기본 팝업 닫기 event
                this.$root.$emit('bv::hide::modal', 'qualityImageUnuseAlert');
                this.$bvModal.hide('qualityImageUnuseAlert');
            },
            closeDownPop : function() {
                this.$root.$emit('bv::show::modal', 'qualityImageDownAlert'); 
                this.$bvModal.hide('qualityImageDownAlert');
            },
            getActive : function (idx) {
                var result = false;
                this.fileQltImgArcvId.forEach(data => {
                    if(data == idx) {
                        result = true;
                        //return result;
                    }
                });
                //console.log(this.fileQltImgArcvId);
                //console.log("idx = " + idx + ", result = " + result);
                return result;
            },
            check : function() {
                if(this.LstImgRst.length == this.fileQltImgArcvId.length){
                    this.isCheckAll = true;
                }
                else{
                    this.isCheckAll = false;
                }
            },
            checkAll : function() {
                if(!this.isCheckAll) {
                    this.LstImgRst.forEach(data => {
                        this.fileQltImgArcvId.push(data.fileQltImgArcvId);
                    });
                } else this.fileQltImgArcvId = [];
                this.isCheckAll = !this.isCheckAll;
            },
            qualityImageDown : async function() {
                if(this.fileQltImgArcvId.length > 0) {
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let url = '/sendApi/api/file/qualityImagefileDown';
                    let param = {
                        fileType : "QualityImage",
                        fileQltImgArcvIds : this.fileQltImgArcvId
                    };
                    const resData = await sendPostApi(url, param).then((result) => {
                        const url = window.URL.createObjectURL(new Blob([result.data], { type : "application/zip"}));
                        const link = document.createElement('a');
                        const contentDisposition = result.headers['content-disposition']; // 파일 이름
                        let fileName = contentDisposition.split('=')[1];
                        // console.log("contentDisposition = ", contentDisposition);
                        /*
                        if (contentDisposition) {
                        const [ fileNameMatch ] = contentDisposition.split(';').filter(str => str.includes('filename'));
                        if (fileNameMatch)
                            [ , fileName ] = fileNameMatch.split('=');
                        }
                        */
                        link.href = url;
                        link.setAttribute('download', fileName);
                        link.style.cssText = 'display:none';
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        
                    }).catch((e) => {
                        // console.log(e);
                        return e.response.data;
                    });
                    
                    // console.log(resData);


                } else {
                    this.$root.$emit('bv::show::modal', 'qualityImageDownAlert');           
                }
            },
            swiperSet : function(index) {
                this.swiperOption.initialSlide = index;
                 this.$root.$emit('bv::show::modal', 'ImgView'); 
            },
            fn_refresh(){
                this.fileQltImgArcvId = [];
                this.isCheckAll = false;
                this.qualityImageList();
            },
        }
   }
</script>