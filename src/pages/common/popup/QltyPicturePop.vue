<template>
    <b-modal
        :id="refId"
        :title="title" 
        :style="popupStyle"
        hide-backdrop
        static
        size="lg"
        footer-bg-variant="transparent"
        @shown="init"
        @hide="close"
    >
    <div class="pop_container">
            <div class="button_box">
                <!-- <button type="button" class="btn btn_sm btn_darkgray btn_all_check" v-on:click="checkAll()" v-if="isCheckAll">선택해제</button> -->
                <!-- <button type="button" class="btn btn_sm btn_darkgray btn_all_check" v-on:click="checkAll()" v-if="!isCheckAll">전체선택</button> -->
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkgray" @click="init">새로고침</button>
                </div>
            </div>
            <div class="lst_img_check" style="min-height:200px; max-height:700px;">
                <ul v-if="lstImgRst.length > 0">
                    <li v-for="(mngrImgRst, mIndex) in lstImgRst" v-bind:key="mIndex" v-bind:class="{active : getActive(mngrImgRst.fileQltImgArcvId)}" style="width:23%;">
                        <label class="input_check pop_notext">
                            <input type="checkbox" v-bind:id="'chk_'+mngrImgRst.fileQltImgArcvId" v-bind:value="mngrImgRst"  v-model="fileQltImgArcvId" @change="check"/>
                            <span class="label_text"></span>
                        </label>
                        <a href="javascript:void(0);" style="height:100%; width:100%">
                            <div class="img_wrap" v-if="mngrImgRst.fileQltImgArcvId != null && mngrImgRst.fileQltImgArcvId != ''" style="height:150px;">
                                <div class="img_area" style="height:150px;">
                                    <img :src="'/sendApi/api/fileCall/getQltImgFile/'+mngrImgRst.fileQltImgArcvId" @click="swiperSet(mIndex)">
                                </div>
                            </div>
                            <span  class="file_name" @click="swiperSet(mIndex)">{{mngrImgRst.orgFileName}}</span>
                        </a>
                    </li>
                </ul>
                <!-- <ul v-if="lstImgRst.length > 0">
                    <li v-for="(mngrImgRst, mIndex) in lstImgRst" v-bind:key="mIndex" v-bind:class="{active : getActive(mngrImgRst.fileQltImgArcvId)}">
                        <div class="img_wrap" v-if="mngrImgRst.fileQltImgArcvId != null && mngrImgRst.fileQltImgArcvId != ''">
                            <label class="input_check pop_notext">
                                <input type="checkbox" v-bind:id="'chk_'+mngrImgRst.fileQltImgArcvId" v-bind:value="mngrImgRst.fileQltImgArcvId"  v-model="fileQltImgArcvId" @change="check"/>
                                <span class="label_text"></span>
                            </label>
                            <p 
                                class="img_area"
                                @click="download(mngrImgRst)"
                            >
                                <img :src="'/sendApi/api/fileCall/getQltImgFile/'+mngrImgRst.fileQltImgArcvId">
                            </p>
                        </div>
                        <a href="javascript:void(0);" @click="download(mngrImgRst)">
                            <i class="ico_file" :class="fn_getFileIcons(mngrImgRst.orgFileName)">{{mngrImgRst.orgFileName}}</i>
                        </a>
                    </li>
                </ul> -->
                <div class="error" style="margin-top:40px;" v-else>
                    <p class="desc pt0">
                            업로드된 품질사진이 없습니다.
                        <br/>
                            모바일 앱에서 업로드해주세요.
                    </p>
                </div>
            </div>
        </div>
        <template #modal-footer>
            <b-button
            class="btn btn_lg btn_outline btn_darkgray"
            @click="select"
            >
            선택
            </b-button>
            <b-button
            class="btn btn_lg btn_outline btn_darkgray"
            @click="$bvModal.hide(refId)"
            >
            닫기
            </b-button>
        </template>
        <b-modal :id="subRefId" title="사진 보기" 
            hide-backdrop size="lg"
            :footer-bg-variant="'transparent'" no-close-on-backdrop>
            <template #default>
                <div class="pop_container pl0 pr0">
                    <div class="lst_imgview">
                        <swiper class="swiper" :options="swiperOption">
                            <swiper-slide v-for="(qualityImgRst, index) in lstImgRst" v-bind:key="index">
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
    </b-modal>
</template>
<script>
    import { sendPostApi, requestOptions } from '../../../apis/common';
    import axios from 'axios'
    import commonUtilMixins from '@plugin/mixin/CommonUtil.js'
    import { swiper, swiperSlide } from 'vue-awesome-swiper' 
    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
    import _ from 'lodash'

    export default{
        name: 'QltyPicturePop',
        mixins: [commonUtilMixins,MsgBoxMixins],
        components:{
            swiper, 
            swiperSlide,
        },
        data(){
            return{
                title :'품질사진 불러오기',
                img: [],
                lstImgRst:[],
                fileQltImgArcvId : [],
                secondRemoveImgId:[],
                areaShow: false,
                subRefId:'',
                isCheckAll : false,

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
        props: {
            refId:{
                type:String,
                default:'QltyPicturePop',
            },
            popupStyle:{
                type:String,
                default: '',
            }
        },
        mounted(){
            
        },
        methods :{
            init: async function(){
                this.subRefId = this.refId+'Preview';
                this.fileQltImgArcvId = [];
                this.isCheckAll = false;

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
                this.lstImgRst = resultList;
                this.areaShow = true;
                return resData;
            },
            check : function() {
                if(this.lstImgRst.length == this.fileQltImgArcvId.length){
                    this.isCheckAll = true;
                }
                else{
                    this.isCheckAll = false;
                }
            },
            checkAll : function() {
                if(!this.isCheckAll) {
                    this.lstImgRst.forEach(data => {
                        this.fileQltImgArcvId.push(data.fileQltImgArcvId);
                    });
                } else this.fileQltImgArcvId = [];
                this.isCheckAll = !this.isCheckAll;
            },
            getActive : function (idx) {
                var result = false;
                this.fileQltImgArcvId.forEach(data => {
                    if(data.fileQltImgArcvId == idx) {
                        result = true;
                        //return result;
                    }
                });
                //console.log(this.fileQltImgArcvId);
                //console.log("idx = " + idx + ", result = " + result);
                return result;
            },
            swiperSet : function(index) {
                this.swiperOption.initialSlide = index;
                this.$root.$emit('bv::show::modal', this.subRefId);
            },
            select: function(){
                console.log(this.fileQltImgArcvId);
                this.$emit('file-copied',this.fileQltImgArcvId);
                this.$root.$emit('bv::hide::modal', this.refId);
            },
            close:function(){
                this.$emit('pop-closed',true);
                this.$root.$emit('bv::hide::modal', this.refId);
            }
        },
    }
</script>