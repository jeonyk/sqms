<template>
    <!-- CAR 신규등록 / 수정 -->
        <b-modal id="PunchWrite" :title="viewTitle" size="xxl" :footer-bg-variant="footerBg" v-on:shown="setClear">
            <template #default>
                <div class="pop_container">
                    <div class="tab_contents">
                        <div class="inner">
                            <div class="table_normal_list ac">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="10%">
                                        <col width="*">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>부적합번호</th>
                                            <td class="al">{{docSeq}}</td>
                                            <th>발행일</th>
                                            <td>{{toDay | yyyyMMdd}}</td>
                                            <th>발행자</th>
                                            <td>{{inUserNm}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="lst_tabs mt0">
                            <ul class="">
                                <li v-for="(tab, index) in tabs2" v-bind:class="{active:popcurrentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="checkTab(index)">{{tab}}</a></li>
                            </ul>
                        </div>

                        <div class="button_box pl20 pr20">
                            <div class="fr" v-show="popcurrentTab == 0">
                                <span class="ico ico_save" v-if="isSaveRegt">저장됨</span>
                                <button type="button" id="saveBtn" class="btn btn_md btn_darkgray btn_outline" @click="fnSave()"  v-if="noCnfmStatus === '' && noCfrmType === 'write' && checkUser(userId,'write')">저장</button>
                                <button type="button" id="saveBtn" class="btn btn_md btn_darkgray btn_outline" @click="fnChange()"  v-if="noCnfmStatus === 'REGT' && inUser === userId && checkUser(userId,'write')">저장</button>
                                <button type="button" id="approvalBtn" :class="'btn btn_md btn_blue ' + approvalClass" @click="fnNext('PRCS')" v-if="viewType ==='Punch ' && noCnfmStatus === 'REGT' && inUser === userId && checkUser(userId,'write')">발송</button>
                            </div>
                            <div class="fr" v-show="popcurrentTab == 1 && ptnrId === userId">
                                <span class="ico ico_save" v-if="isSavePrcs">저장됨</span>
                                <button type="button" id="saveBtn" class="btn btn_md btn_darkgray btn_outline" @click="fnChange()" v-if="noCnfmStatus === 'PRCS' && checkUser(userId,'write')">저장</button>
                                <button type="button" id="returnBtn" :class="'btn btn_md btn_blue ' + returnClass" @click="fnApproval()" v-if="noCnfmStatus === 'PRCS' && checkUser(userId,'write')">회신</button>
                                
                            </div>
                            <div class="fr" v-show="popcurrentTab == 2 && inUser === userId">
                                <span class="ico ico_save" v-if="isSaveAprv">저장됨</span>
                                <button type="button" id="saveBtn" class="btn btn_md btn_darkgray btn_outline" @click="fnChange()" v-if="noCnfmStatus === 'CHCK' && checkUser(userId,'write')">저장</button>
                                <button type="button" id="returnBtn" :class="'btn btn_md btn_blue ' + approvalClass2" @click="fnApproval()" v-if="noCnfmStatus === 'CHCK' && cnfmYn === 'N' && checkUser(userId,'write')">회신</button>
                                <button type="button" id="approvalBtn" :class="'btn btn_md btn_blue ' + approvalClass2" @click="fnNext('APRV')" v-if="cnfmYn === 'Y' && viewType ==='Punch' && checkUser(userId,'write') && noCnfmStatus !== 'APRV'">승인</button>
                            </div>
                            
                        </div>

                        <div class="tab_area" v-show="popcurrentTab == 0" v-if="checkInUser('write')">
                            <div class="inner pt0">
                                <div class="table_normal_list table_write">
                                    <table>
                                        <caption class="sr_only"></caption>
                                        <colgroup>
                                            <col width="15%">
                                            <col width="*">
                                            <col width="15%">
                                            <col width="*">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <!-- <th v-if="viewType !== 'Punch'"><span class="emp_red">발행유형</span></th>
                                                <td v-if="viewType !== 'Punch'">
                                                    <select name="issueType" id="issueType" class="form_control large" v-model="issueType">
                                                        <option value="">선택</option>
                                                        <option v-for="(item, idx) in issueTypeList" :key="idx" :value="item.codeVal">{{ item.codeNameKr }}</option>
                                                    </select>
                                                </td> -->

                                                <th><span class="emp_red">조치조직</span></th>
                                                <td colspan="3" v-if="viewType === 'Punch'">
                                                    <label for="action_case1" class="input_radio">
                                                        <input type="radio" id="action_case1" name="action" class="form_control" value="Contractor" v-model="actnOrg" @change="partnerInfo='',ptnrId=''">
                                                        <span class="label_text">Contractor</span>
                                                    </label>
                                                    <label for="action_case2" class="input_radio ml30">
                                                        <input type="radio" id="action_case2" name="action" class="form_control" value="Sub-Contractor" v-model="actnOrg" checked @change="partnerInfo='',ptnrId=''">
                                                        <span class="label_text">Sub-Contractor</span>
                                                    </label>
                                                    <label for="action_case3" class="input_radio ml30">
                                                        <input type="radio" id="action_case3" name="action" class="form_control" value="Supplier" v-model="actnOrg" @change="partnerInfo='',ptnrId=''">
                                                        <span class="label_text">Supplier</span>
                                                    </label>
                                                    <label for="action_case4" class="input_radio ml30">
                                                        <input type="radio" id="action_case4" name="action" class="form_control" value="Others" v-model="actnOrg" @change="partnerInfo='',ptnrId=''">
                                                        <span class="label_text">Others</span>
                                                    </label>
                                                </td>
                                                <!-- <td v-if="viewType !== 'Punch'">
                                                    <label for="action_case1" class="input_radio">
                                                        <input type="radio" id="action_case1" name="action" class="form_control" value="Contractor" v-model="actnOrg">
                                                        <span class="label_text">Contractor</span>
                                                    </label>
                                                    <label for="action_case2" class="input_radio ml30">
                                                        <input type="radio" id="action_case2" name="action" class="form_control" value="Sub-Contractor" v-model="actnOrg" checked>
                                                        <span class="label_text">Sub-Contractor</span>
                                                    </label>
                                                    <label for="action_case3" class="input_radio ml30">
                                                        <input type="radio" id="action_case3" name="action" class="form_control" value="Supplier" v-model="actnOrg">
                                                        <span class="label_text">Supplier</span>
                                                    </label>
                                                    <label for="action_case4" class="input_radio ml30">
                                                        <input type="radio" id="action_case4" name="action" class="form_control" value="Others" v-model="actnOrg">
                                                        <span class="label_text">Others</span>
                                                    </label>
                                                </td> -->
                                            </tr>
                                            <tr>
                                                <th><span class="emp_red">조치업체/수신자</span></th>
                                                <td>
                                                    <input type="text" class="form_control large" v-model="partnerInfo" :disabled="true">
                                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius ml10" @click="fn_PartnerUserSearch()" v-show="actnOrg === 'Sub-Contractor'">검색</button>
                                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius ml10" v-b-modal.NoConfirmWiteModal_emplPopId v-show="actnOrg !== 'Sub-Contractor'">검색</button>
                                                </td>
                                                <th><span class="emp_red">공종/세부공종</span></th>
                                                <td>
                                                    <div class="form_select">
                                                        <select
                                                            v-model="search.box.mainCodeId"
                                                            class="form_control num"
                                                        >
                                                            <option v-if="categoryData.length === 0" disabled > Empty selected </option>
                                                            <option v-else :value="''"  > 선택 </option>
                                                            <option
                                                                v-for="category in categoryData"
                                                                :key="category.mainCodeId"
                                                                :value="category.mainCodeId"
                                                            >
                                                                {{ category.mainName }}
                                                            </option>
                                                        </select>
                                                        <select
                                                            v-model="search.box.midCodeId"
                                                            class="form_control"
                                                            >
                                                            <option :value="''" > 선택 </option>
                                                            <option
                                                                v-for="category in getMidCategoryList()"
                                                                :key="category.midCodeId"
                                                                :value="category.midCodeId"
                                                            >
                                                                {{ category.midName }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                            <!-- <tr v-if="viewType !== 'Punch'">
                                                <th><span class="emp_red">원인</span></th>
                                                <td>
                                                    <div class="form_select">
                                                        <select name="cause" id="cause"
                                                            v-model="search.box.cause" 
                                                            class="form_control num"
                                                        >
                                                            <option value="">선택</option>   
                                                            <option
                                                                v-for="cause in causeList"
                                                                :key="cause.mastercodeId"
                                                                :value="cause.codeVal"
                                                            >
                                                                {{ cause.codeNameKr }}
                                                            </option>
                                                        </select>
                                                        <select name="causeDtl" id="causeDtl" 
                                                            v-model="search.box.causeDtl" 
                                                            class="form_control"
                                                        >
                                                            <option value="">선택</option>   
                                                            <option
                                                                v-for="causeDtl in getCauseDtlList()"
                                                                :key="causeDtl.mastercodeId"
                                                                :value="causeDtl.codeVal"
                                                            >
                                                                {{ causeDtl.codeNameKr }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <th>관련문서</th>
                                                <td><input type="text" class="form_control" v-model="document" maxlength="100"></td>
                                            </tr> -->
                                            <tr>
                                                <th><span class="emp_red">제목</span></th>
                                                <td><input type="text" class="form_control" v-model="title" maxlength="100"></td>
                                                <th><span class="emp_red">종결 요청일</span></th>
                                                <td>
                                                    <Datepicker v-model="closeDt" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                                                </td>
                                            </tr>                                            
                                            <tr>
                                                <th><span class="emp_red">부적합 내용</span></th>
                                                <td colspan="3">
                                                    <textarea name="" id="" class="form_control" v-model="noCnfmContent" maxlength="2000"></textarea>
                                                </td>
                                            </tr>
                                            <!-- <tr v-if="viewType == 'CAR'">
                                                <th><span class="emp_red">시정조치 요구사항</span></th>
                                                <td colspan="3">
                                                    <textarea name="" id="" class="form_control" v-model="actnRqmt" maxlength="2000"></textarea>
                                                </td>
                                            </tr> -->
                                            <tr>
                                                <th><span class="emp_red">부적합 사진</span></th>
                                                <td colspan="3">
                                                    <LstImg v-bind:lst-file-rst="lstImgRst"
                                                        :files="img"
                                                        :copied-file-ids="copiedFileIds"
                                                        :reset-copy-yn="resetCopyYn"
                                                        :limit-total-file-size="1024*1024*300"
                                                        v-bind:second-remove-file-id="secondRemoveImgId"
                                                        @file-changed="imageChanged"
                                                        @file-removed="imageRemoved" 
                                                        @return-reset="resetCopyYn=false"
                                                        :file-type="'selfQualitySitePunchPicturePop'"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>첨부파일</th>
                                                <td colspan="3">
                                                    <LstFile v-bind:lst-file-rst="lstFileRst"
                                                        :limit-total-file-size="1024*1024*300"
                                                        v-bind:files="files"
                                                        v-bind:second-remove-file-id="secondRemoveFileId"
                                                        v-on:file-changed="fileChanged"
                                                        v-on:file-removed="fileRemoved"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="tab_area" v-show="popcurrentTab == 0" v-if="!checkInUser('write')">
                            <div class="inner pt0">
                                <div class="table_normal_list">
                                    <table>
                                        <caption class="sr_only"></caption>
                                        <colgroup>
                                            <col width="15%">
                                            <col width="*">
                                            <col width="15%">
                                            <col width="*">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>발행유형</th>
                                                <td>{{issueTypeNm}}</td>
                                                <th>조치조직</th>
                                                <td>{{actnOrg}}</td>
                                            </tr>
                                            <tr>
                                                <th>조치업체/수신자</th>
                                                <td class="">
                                                    {{partnerInfo}}
                                                </td>
                                                <th>공종/세부공종</th>
                                                <td>
                                                     {{mainName}} / {{midName}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>원인</th>
                                                <td>
                                                    {{causeNm}} - {{causeDtlNm}}
                                                </td>
                                                <th>관련문서</th>
                                                <td>{{document}}</td>
                                            </tr>
                                            <tr>
                                                <th>제목</th>
                                                <td>{{title}}</td>
                                                <th>종결요청일</th>
                                                <td>{{closeDt}}</td>
                                            </tr>
                                            <tr>
                                                <th>부적합내용</th>
                                                <td colspan="3">
                                                    <pre class="form_control">{{noCnfmContent}}</pre>
                                                </td>
                                            </tr>
                                            <!-- <tr v-if="viewType == 'CAR'">
                                                <th>시정조치 요구사항</th>
                                                <td colspan="3">
                                                    <pre class="form_control">{{actnRqmt}}</pre>
                                                </td>
                                            </tr> -->
                                            <tr>
                                                <th>부적합 사진</th>
                                                <td colspan="3">
                                                    <div class="lst_img">
                                                        <ul>
                                                            <li v-for="(mngrImgRst, mIndex) in lstImgRst" v-bind:key="mIndex">
                                                                <div class="img_wrap" v-if="mngrImgRst.fileQltArcvId != null && mngrImgRst.fileQltArcvId != ''">
                                                                    <p class="img_area"><img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+mngrImgRst.fileQltArcvId"></p>
                                                                </div>
                                                                <a href="javascript:void(0);" v-on:click="orgFileDown('img',mIndex)">
                                                                    <i class="ico_file" :class="fn_getFileIcons(mngrImgRst.orgFileName)">{{mngrImgRst.orgFileName}}</i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>첨부파일</th>
                                                <td colspan="3">
                                                     <div class="lst_file">
                                                        <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                                                        <ul>
                                                            <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                                                                <a href="javascript:void(0); " v-on:click="orgFileDown('file',index)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab_area" v-show="popcurrentTab == 1" v-if="checkReUser()">
                            <div class="inner pt0">
                                <div class="table_normal_list table_write">
                                    <table>
                                        <caption class="sr_only"></caption>
                                        <colgroup>
                                            <col width="15%">
                                            <col width="*">
                                            <col width="15%">
                                            <col width="*">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th><span class="emp_red">회신일</span></th>
                                                <td colspan="3">
                                                    <!-- <Datepicker ref="datapicker" v-on:value-change="replyChange"/> -->
                                                    <Datepicker v-model="replyDt" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                                                </td>
                                            </tr>
                                            <!-- <tr v-if="viewType == 'NCR'">
                                                <th><span class="emp_red">조치 방안</span></th>
                                                <td colspan="3">
                                                    <div class="form_select">
                                                        <select name="" id="" class="form_control num" v-model="actnPlan">
                                                            <option value="">선택</option>
                                                            <option
                                                                v-for="actn in actnPlanList"
                                                                :key="actn.mastercodeId"
                                                                :value="actn.codeVal"
                                                            >
                                                                {{ actn.codeNameKr }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr v-if="viewType == 'CAR'">
                                                <th><span class="emp_red">부적합 원인</span></th>
                                                <td colspan="3">
                                                    <textarea name="" id="" class="form_control" v-model="noCnfmCause" maxlength="2000"></textarea>
                                                </td>
                                            </tr>
                                            <tr v-if="viewType == 'CAR'">
                                                <th><span class="emp_red">재발방지대책</span></th>
                                                <td colspan="3">
                                                    <textarea name="" id="" class="form_control" v-model="recurrence" maxlength="2000"></textarea>
                                                </td>
                                            </tr>
                                            <tr v-if="viewType == 'CAR'">
                                                <th><span class="emp_red">시정조치내용</span></th>
                                                <td colspan="3">
                                                    <textarea name="" id="" class="form_control" v-model="actnCarDtl" maxlength="2000"></textarea>
                                                </td>
                                            </tr> -->
                                            <tr v-if="viewType !== 'CAR'">
                                                <th><span class="emp_red">조치 내용</span></th>
                                                <td colspan="3">
                                                    <textarea name="" id="" class="form_control" v-model="actnDtl" maxlength="2000"></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><span class="emp_red">조치 사진</span></th>
                                                <td colspan="3">
                                                    <LstImg v-bind:lst-file-rst="lstImgRst2"
                                                        :files="img2"
                                                        :copied-file-ids="copiedFileIds2"
                                                        :reset-copy-yn="resetCopyYn2"
                                                        :limit-total-file-size="1024*1024*300"
                                                        v-bind:second-remove-file-id="secondRemoveImgId2"
                                                        @file-changed="imageChanged2"
                                                        @file-removed="imageRemoved2" 
                                                        @return-reset="resetCopyYn2=false"
                                                        :file-type="'selfQualitySitePunchPicturePop2'"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>첨부파일</th>
                                                <td colspan="3">
                                                    <LstFile v-bind:lst-file-rst="lstFileRst2"
                                                        :limit-total-file-size="1024*1024*300"
                                                        v-bind:files="files2"
                                                        v-bind:second-remove-file-id="secondRemoveFileId2"
                                                        v-on:file-changed="fileChanged2"
                                                        v-on:file-removed="fileRemoved2"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                        <div class="tab_area" v-show="popcurrentTab == 1" v-if="!checkReUser()">
                            <div class="inner pt0">
                                <div class="table_normal_list">
                                    <table>
                                        <caption class="sr_only"></caption>
                                        <colgroup>
                                            <col width="15%">
                                            <col width="*">
                                            <col width="15%">
                                            <col width="*">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>회신일</th>
                                                <td colspan="3">{{replyDt}}</td>
                                            </tr>
                                            <!-- <tr v-if="viewType == 'CAR'">
                                                <th><span class="">부적합 원인</span></th>
                                                <td colspan="3">
                                                    <pre class="form_control">{{noCnfmCause}}</pre>
                                                </td>
                                            </tr>
                                            <tr v-if="viewType == 'CAR'">
                                                <th><span class="">재발방지대책</span></th>
                                                <td colspan="3">
                                                    <pre class="form_control">{{recurrence}}</pre>
                                                </td>
                                            </tr>
                                            <tr v-if="viewType == 'CAR'">
                                                <th><span class="">시정조치내용</span></th>
                                                <td colspan="3">
                                                    <pre class="form_control">{{actnCarDtl}}</pre>
                                                </td>
                                            </tr> -->
                                            <tr v-if="viewType !== 'CAR'">
                                                <th><span class="">조치내용</span></th>
                                                <td colspan="3">
                                                    <pre class="form_control">{{actnDtl}}</pre>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>조치 사진</th>
                                                <td colspan="3">
                                                    <div class="lst_img">
                                                        <ul>
                                                            <li v-for="(mngrImgRst, mIndex2) in lstImgRst2" v-bind:key="mIndex2">
                                                                <div class="img_wrap" v-if="mngrImgRst.fileQltArcvId != null && mngrImgRst.fileQltArcvId != ''">
                                                                    <p class="img_area"><img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+mngrImgRst.fileQltArcvId"></p>
                                                                </div>
                                                                <a href="javascript:void(0);" v-on:click="orgFileDown('img',mIndex2)">
                                                                    <i class="ico_file" :class="fn_getFileIcons(mngrImgRst.orgFileName)">{{mngrImgRst.orgFileName}}</i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>첨부파일</th>
                                                <td colspan="3">
                                                     <div class="lst_file">
                                                        <h3>첨부파일 {{totalCnt2}}개 ({{totalSize2}})</h3>
                                                        <ul>
                                                            <li v-for="(mngrFileRst, index2) in lstFileRst2" v-bind:key="index2" class="old">
                                                                <a href="javascript:void(0); " v-on:click="orgFileDown('file',index2)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                        <div class="tab_area" v-show="popcurrentTab == 2" v-if="checkEndUser()">
                            <div class="inner pt0">
                                <div class="table_normal_list table_write">
                                    <table>
                                        <caption class="sr_only"></caption>
                                        <colgroup>
                                            <col width="15%">
                                            <col width="*">
                                            <col width="15%">
                                            <col width="*">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th><span class="emp_red">합격여부</span></th>
                                                <td class="">
                                                    <label class="input_radio">
                                                        <input type="radio" name="passYn" class="form_control" value="Y" v-model="cnfmYn" checked>
                                                        <span class="label_text">합격</span>
                                                    </label>
                                                    <label class="input_radio">
                                                        <input type="radio" name="passYn" class="form_control" value="N" v-model="cnfmYn">
                                                        <span class="label_text">불합격</span>
                                                    </label>
                                                </td>
                                                <th><span class="emp_red">확인일</span></th>
                                                <td>
                                                    <Datepicker ref="datapicker" v-model="cnfmDt" v-on:value-change="cnfmChange" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><span class="emp_red">확인내용</span> <br> (불합격은 필수 입력)</th>
                                                <td colspan="3">
                                                    <textarea name="" id="" class="form_control max_height" v-model="cnfmDtl" maxlength="2000"  @keyup="fn_inputCheck($event)" placeholder="내용을 입력해주세요."></textarea>
                                                    <p class="table_message ar mt0">{{ cnfmDtl ? cnfmDtl.length : 0 }} / {{ 2000 }}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="tab_area" v-show="popcurrentTab == 2" v-if="!checkEndUser()">
                            <div class="inner pt0">
                                <div class="table_normal_list">
                                    <table>
                                        <caption class="sr_only"></caption>
                                        <colgroup>
                                            <col width="15%">
                                            <col width="*">
                                            <col width="15%">
                                            <col width="*">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>합격여부</th>
                                                <td>
                                                    {{cnfmYn === 'Y' ? '합격' : cnfmYn === 'N' ? '불합격' : ''}}
                                                </td>
                                                <th>확인일</th>
                                                <td>{{cnfmDt}}</td>
                                            </tr>
                                            <tr>
                                                <th><span class="">확인내용</span> <br> (불합격은 필수 입력)</th>
                                                <td colspan="3">
                                                     <pre class="form_control">{{cnfmDtl}}</pre>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <PartnerUserSearch
                        ref-id="NoConfirmMngtModalPatnerUserSearch"
                        v-on:fn-partner-choice="partnerChoice" v-bind:member-id-list="[]" :site-mstr-id="siteMstrId"
                    />

                    <EmployeeSearch
                        v-on:fn-employee-choice="employeeChoice" v-bind:emplo-name="userNm"
                        v-bind:insert-site-name="siteNm" v-bind:site-code="siteId"
                        v-bind:empl-pop-id="emplPopId" v-bind:choose-person="choosePerson"
                        :site-mstr-id="siteMstrId"
                    />
                    
                    <PopAlert
                        v-bind:msg="popMsg" v-bind:popId="popId" v-bind:confirm-use="confirmUse"
                        v-on:first-btn-fn="closePop"
                    />
                    <approve
                        ref-id="NoConfirmMngtModalApproveModal"
                        :code-type="approve.codeType"
                        doc-type="NCFM"
                        :code-dtl-type="approve.codeDtlType"
                        :doc-seq="approve.docSeq"
                        :request-id="approve.requestId"
                        :doc-name="approve.docName"
                        :file-type="approve.fileType"
                        :site-mstr-id="approve.siteMstrId"
                        :doc-title="approve.inputTitle"
                        @callback="fn_setSourceApproval"
                        alertable
                        keep-after
                    />
                </div>
            </template>
            <template #modal-footer="{  }"> <!-- #modal-footer="{ ok, hide }" -->
                <!-- <b-button class="btn btn_lg btn_outline btn_darkgray">선택</b-button> -->
                <b-button class="btn btn_md btn_darkgray btn_outline" @click="closeModal()">닫기</b-button>
            </template>
            
        </b-modal>
</template>


<script>
    import LstFile from './LstFile.vue'
    import LstImg from './LstImg.vue'
    import Datepicker from '@component/common/DatePicker.vue'
    import DatepickerRange from './DatepickerRange.vue'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import { sendFileApi, requestFileOptions } from '../../../apis/common';

    import PartnerUserSearch from '@/pages/common/popup/PartnerUserSearch.vue'
    import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'

    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
    import commonUtilMixins from '@plugin/mixin/CommonUtil.js'
    import axios from 'axios'

    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import Approve from '@modal/approval/Approve.vue'
    import { mapGetters } from 'vuex'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import { commonFn } from '@/script/commonFn.js';

    export default {
        name: 'SelfQualitySitePunchModal',
        mixins: [MsgBoxMixins, authCheckMixns, commonUtilMixins],
        components: {
            LstFile,
            LstImg,
            Datepicker,
            DatepickerRange,
            PartnerUserSearch,
            EmployeeSearch,
            PopAlert,
            Approve,
        },
        data() {
            return {
                footerBg: 'transparent',
                popcurrentTab: 0,
                tabs2: ['작성', '회신', '최종확인'],
                viewTitle : '',
                siteMstrId : '',
                issueTypeList : [],
                causeList : [],
                actnPlanList : [],
                categoryData : [],
                isSaveRegt : false,
                isSavePrcs : false,
                isSaveAprv : false,
                popMsg: '',
                confirmUse: false,
                noConfirmType : '',
                saveClass : '',
                approvalClass : 'disabled',
                approvalClass2 : 'disabled',
                returnClass : 'disabled',

                siteId: '',
                siteNm: '',
                emplPopId: 'NoConfirmWiteModal_emplPopId',          // 팝업 선택 아이디
                choosePerson: '',                  //사람선택

                search: {
                    tab: {
                        useCheckBox: false,
                        data: null
                    },
                    box: {
                        mngtType: '',
                        projectNm: '',
                        prdtNm: '',
                        mainCodeId: '',
                        midCodeId: '',
                        cause : '',
                        causeDtl : '',
                        status: '',
                        stnd: '',
                        sppr: '',
                        mnft: '',
                        apprResult: '',
                    }
                },
                ptnrNm : '',
                ptnrId : '',
                tradeNm : '',
                tradeId : '',
                partnerInfo : '',
                actnOrg : 'Sub-Contractor',
                issueType : '',
                issueTypeNm : '',
                title : '',
                document : '',
                closeDt : this.$moment().add(1,'days').format('YYYY-MM-DD'),
                noCnfmContent : '',
                actnRqmt : '',
                replyDt : '',
                cnfmDt : '',
                cnfmYn : '',
                cnfmDtl : '',
                toDay : '',
                docSeq : '',
                noCnfmStatus : '',
                noCnfmCause : '',
                recurrence : '',
                actnCarDtl : '',
                actnPlan : '',
                actnDtl : '',
                causeNm : '',
                causeDtlNm : '',
                mainName : '',
                midName : '',
                inUser : '',
                inUserNm : '',
                popup : {
                    msg : '',
                },
                approve: {  // 결재상신
                    codeType: 'NCFM',
                    codeDtlType: null,
                    docSeq: null,
                    docName: null,
                    fileType: null,
                    siteMstrId: null,
                    inputTitle: null,
                },
                //파일 리스트및 삭제
                lstFileRst : [],
                lstImgRst : [],
                files : [],
                img : [],
                secondRemoveImgId : [],
                secondRemoveFileId : [],
                copiedFileIds : [],
                resetCopyYn : false,
                totalCnt:0,
                totalSize:0,
                bytes:"KB",
                
                //파일 추가
                fileConnectId: 0,
                tempFileLst : [],
                tempFiles : [],

                lstFileRst2 : [],
                lstImgRst2 : [],
                files2 : [],
                img2 : [],
                secondRemoveImgId2 : [],
                secondRemoveFileId2 : [],
                copiedFileIds2 : [],
                resetCopyYn2 : false,
                totalCnt2 : 0,
                totalSize2 : 0,
                bytes2 : "KB",

                userId : '',
                userNm : '',
                userType : '',
                siteMstrId : '',
                projectId :'',

                returnFalg : false,

                noCnfmInfoId2 : '',

                chkAprvInfoIdData : {
                    aprvInfoId : ''
                },
                chkAprvInfoId : '',
                chkAprvInfoId2 : '',
            }
            
        },
        props: {
            popId : {
                type: String,
                default : 'popAlert'
            },
            viewType : {
                type: String,
                default : ''
            },
            noCfrmType : {
                type: String,
                default : 'write'
            },
            noCnfmInfoId : {
                type: String,
                default : ''
            },
            siteMode: {
                type: String,
                default : ''
            },
            selfQltySiteInfoId : {
                type : String,
                default : ''
            },
            selfSiteChkRstId : 0

        },
        computed: {
            // ...mapGetters({
            //     userId: 'auth/getUserId',
            //     userNm: 'auth/getUserNm',
            // }),
        },
        filters : {  
            yyyyMMdd : function(value){ 
                // 들어오는 value 값이 공백이면 그냥 공백으로 돌려줌
                if(value == '') return '';
            
                // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
                var js_date = new Date(value);

                // 연도, 월, 일 추출
                var year = js_date.getFullYear();
                var month = js_date.getMonth() + 1;
                var day = js_date.getDate();

                // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
                if(month < 10){
                    month = '0' + month;
                }

                if(day < 10){
                    day = '0' + day;
                }

                // 최종 포맷 (ex - '2021-10-08')
                return year + '-' + month + '-' + day;
            }
        },
        mounted() {
            this.userId = this.$session.get('userInfo').userId;
            this.userType = this.$session.get('userInfo').userType;
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
            this.projectId = this.$session.get('userInfo').projectId;
            this.projectName = this.$store.getters['auth/getProjectNm'];
        },
        watch :{
            //공종,세부공종
            // 'search.box.mainCodeId': {
            //     handler() {
            //         this.search.box.midCodeId = '';
            //     },
            // },
            // //원인,상세원인
            // 'search.box.cause': {
            //     handler() {
            //         this.search.box.causeDtl = '';
            //     },
            // },
        },
        methods : {
            getSiteInfo : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/siteInfo/view';
                let param = { siteMstrId: this.$cookies.get("siteMstrId") };
                
                try {
                    const { data } = await sendPostApi(url, param);
                    this.siteId = data.datas.result.siteId;
                    this.siteNm = data.datas.result.siteNm;
                } catch(e) {

                }
            },
            setClear : function() {
                if(this.noCfrmType === 'write') {
                    this.noCnfmInfoId2= '';
                    this.popcurrentTab = 0
                }
                this.saveClass = '';
                this.approvalClass = 'disabled';
                this.approvalClass2 = 'disabled';
                this.returnClass = 'disabled';
                this.isSaveRegt = false;
                this.isSavePrcs = false;
                this.isSaveAprv = false;
                this.noConfirmType = this.noCfrmType;

                //this.userNm = '';
                this.search.box.mngtType = '';
                this.search.box.projectNm = '';
                this.search.box.prdtNm = '';
                this.search.box.mainCodeId = '';
                this.search.box.midCodeId = '';
                this.search.box.cause = '';
                this.search.box.causeDtl = '';
                this.search.box.status = '';
                this.search.box.stnd = '';
                this.search.box.sppr = '';
                this.search.box.mnft = '';
                this.search.box.apprResult = '';
                this.ptnrNm = '';
                this.ptnrId = '';
                this.tradeNm = '';
                this.tradeId = '';
                this.partnerInfo = '';
                this.actnOrg = 'Sub-Contractor',
                this.issueType = '';
                this.issueTypeNm = '';
                this.title = '';
                this.document = '';
                this.closeDt = this.$moment().add(1,'days').format('YYYY-MM-DD');
                this.noCnfmContent = '';
                this.actnRqmt = '';
                this.replyDt = '';
                this.cnfmDt = '';
                this.cnfmYn = '';
                this.cnfmDtl = '';
                this.toDay = '';
                this.docSeq = '';
                this.noCnfmStatus = '';
                this.noCnfmCause = '';
                this.recurrence = '';
                this.actnCarDtl = '';
                this.actnPlan = '';
                this.actnDtl = '';
                this.causeNm = '';
                this.causeDtlNm = '';
                this.mainName = '';
                this.midName = '';
                this.inUser = '';
                this.inUserNm = '',
                this.img = [];
                this.files = [];
                this.lstFileRst = [];
                this.lstImgRst = [];
                this.lstFileRst2 = [];
                this.lstImgRst2 = [];
                this.returnFalg = false;
                this.copiedFileIds = [];
                this.copiedFileIds2 = [];
                // this.userId = '',
                // this.userNm = '',
                // this.userType = '',
                // this.siteMstrId = '',

                this.chkAprvInfoIdData.aprvInfoId = '';
                this.chkAprvInfoId = '';
                this.chkAprvInfoId2 = '';
                this.createView();
            },
            closeClear() {
                this.saveClass = '';
                this.approvalClass = 'disabled';
                this.approvalClass2 = 'disabled';
                this.returnClass = 'disabled';
                this.isSaveRegt = false;
                this.isSavePrcs = false;
                this.isSaveAprv = false;
                this.noConfirmType = this.noCfrmType;

                //this.userNm = '';
                this.search.box.mngtType = '';
                this.search.box.projectNm = '';
                this.search.box.prdtNm = '';
                this.search.box.mainCodeId = '';
                this.search.box.midCodeId = '';
                this.search.box.cause = '';
                this.search.box.causeDtl = '';
                this.search.box.status = '';
                this.search.box.stnd = '';
                this.search.box.sppr = '';
                this.search.box.mnft = '';
                this.search.box.apprResult = '';
                this.ptnrNm = '';
                this.ptnrId = '';
                this.tradeNm = '';
                this.tradeId = '';
                this.partnerInfo = '';
                this.actnOrg = 'Sub-Contractor',
                this.issueType = '';
                this.issueTypeNm = '';
                this.title = '';
                this.document = '';
                this.closeDt = this.$moment().add(1,'days').format('YYYY-MM-DD');
                this.noCnfmContent = '';
                this.actnRqmt = '';
                this.replyDt = '';
                this.cnfmDt = '';
                this.cnfmYn = '';
                this.cnfmDtl = '';
                this.toDay = '';
                this.docSeq = '';
                this.noCnfmStatus = '';
                this.noCnfmCause = '';
                this.recurrence = '';
                this.actnCarDtl = '';
                this.actnPlan = '';
                this.actnDtl = '';
                this.causeNm = '';
                this.causeDtlNm = '';
                this.mainName = '';
                this.midName = '';
                this.inUser = '';
                this.inUserNm = '',
                this.img = [];
                this.files = [];
                this.img2 = [];
                this.files2 = [];
                this.lstFileRst = [];
                this.lstImgRst = [];
                this.lstFileRst2 = [];
                this.lstImgRst2 = [];
                this.copiedFileIds = [];
                this.copiedFileIds2 = [];
                this.returnFalg = false;
                this.chkAprvInfoIdData.aprvInfoId = '';
                this.chkAprvInfoId = '';
                this.chkAprvInfoId2 = '';
            },
            createView: function() {
                this.getSiteInfo();
                this.getCategoryData();
                this.getOptionData();
                this.toDay = Date.now();
                this.noCnfmInfoId2= this.noCnfmInfoId
                if(this.noCnfmInfoId2 !== '') {
                    this.getNoConfirmData(this.noCnfmInfoId2);
                    this.viewTitle = this.viewType + ' 상세';
                    if(this.noCnfmStatus === 'PRCS' && this.ptnrId === this.userId) {
                        this.popcurrentTab = 1;
                    } 
                } else {
                    this.viewTitle = this.viewType + ' 등록';
                    this.inUserNm = this.$session.get('userInfo').userNm;
                }
            },
            getNoConfirmData : async function(id) {
                this.lstFileRst = []
                this.lstImgRst = []
                this.files = []
                this.img = []
                this.files2 = []
                this.img2 = []
                this.lstFileRst2 = []
                this.lstImgRst2 = []
                this.copiedFileIds = [];
                this.copiedFileIds2 = [];
                this.resetCopyYn = true;
                this.resetCopyYn2 = true;

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/noCnfmMngt/noCnfmInfo/view';
                let param = { noCnfmInfoId: id };
                try {
                    const { data } = await sendPostApi(url, param);
                    if(data.view !== null) {
                        
                        this.docSeq = data.view.docSeq;
                        this.issueDt = data.view.issueDt;
                        this.issueType = data.view.issueType;
                        this.issueTypeNm = data.view.issueTypeNm;
                        this.actnOrg = data.view.actnOrg;
                        this.ptnrId = data.view.actnUser;
                        this.partnerInfo = data.view.partnerInfo;
                        this.search.box.mainCodeId = data.view.mainCodeId;
                        this.mainName = data.view.mainName;
                        this.search.box.midCodeId = data.view.midCodeId;
                        this.midName = data.view.midName;
                        this.search.box.cause = data.view.cause;
                        this.search.box.causeDtl = data.view.causeDtl;

                        this.causeNm = data.view.causeNm;
                        this.causeDtlNm = data.view.causeDtlNm;

                        this.document = data.view.document;
                        this.title = data.view.title;
                        this.closeDt = data.view.closeDt;
                        this.noCnfmContent = data.view.noCnfmContent;
                        this.actnRqmt = data.view.actnRqmt;
                        this.toDay = data.view.issueDt;
                        this.noCnfmStatus = data.view.noCnfmStatus;
                        this.inUser = data.view.inUser;
                        this.replyDt = data.view.replyDt;
                        this.noCnfmCause = data.view.noCnfmCause;
                        this.recurrence = data.view.recurrence;
                        this.actnCarDtl = data.view.actnCarDtl;
                        this.actnPlan = data.view.actnPlan;
                        this.actnDtl = data.view.actnDtl;

                        this.cnfmDt = data.view.cnfmDt;
                        this.cnfmYn = data.view.cnfmYn;
                        this.cnfmDtl = data.view.cnfmDtl;

                        this.noCnfmInfoId2 = data.view.noCnfmInfoId;
                        this.inUserNm = data.view.inUserNm;

                        if(data.view.aprvInfoId !== null && data.view.aprvInfoId !== '' && data.view.aprvInfoId !== undefined) {
                            
                        }
                        if(data.view.aprvInfoId2 !== null && data.view.aprvInfoId2 !== '' && data.view.aprvInfoId2 !== undefined) {
                            this.chkAprvInfoIdData.aprvInfoId = data.view.aprvInfoId2
                            // console.log(this.chkAprvInfoIdData.aprvInfoId)
                        } else if(data.view.aprvInfoId !== null && data.view.aprvInfoId !== '' && data.view.aprvInfoId !== undefined) {
                            this.chkAprvInfoIdData.aprvInfoId = data.view.aprvInfoId
                            // console.log(this.chkAprvInfoIdData.aprvInfoId)
                        }
                        

                        
                        
                        if(data.view.noCnfmStatus === 'REGT') {
                            this.approvalClass = '';
                        } else {
                            this.approvalClass = 'disabled';
                        }
                        if(data.view.noCnfmStatus === 'PRCS') {

                            this.returnClass = '';                    
                        } else {
                            this.returnClass = 'disabled';                    
                        }
                        if(data.view.noCnfmStatus === 'CHCK') {
                            this.approvalClass2 = 'disabled';
                            if(commonFn.methods.isEmpty(this.cnfmYn)) {
                                this.cnfmYn = 'Y'
                            }
                        } else {
                            this.approvalClass2 = '';
                        }
                        if(this.siteMode == "allSite") {
                            this.popcurrentTab = 0;
                        } else {
                            if(data.view.noCnfmStatus === 'REGT' || data.view.noCnfmStatus === 'APVL') {
                                this.popcurrentTab = 0;
                            }else if(data.view.noCnfmStatus === 'PRCS') {
                                if(this.ptnrId === this.userId) {
                                    this.popcurrentTab = 1;
                                } else {
                                    this.popcurrentTab = 0;
                                }
                            }else if(data.view.noCnfmStatus === 'CHCK' || data.view.noCnfmStatus === 'APVL2') {
                                if(this.ptnrId === this.userId) {
                                    this.popcurrentTab = 1;
                                } else {
                                    this.popcurrentTab = 2;
                                }
                            } else if(data.view.noCnfmStatus === 'APRV' && this.userType ==='HEC'){
                                this.popcurrentTab = 2;
                            }
                        }
                        
                        //작성용 첨부파일 가져오기
                        let url = '/sendApi/api/file/upFileList';
                        let param = {
                            fileType : "NoConfirmMngt",
                            fileConnectId : this.noCnfmInfoId2,
                        };
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        const fileRst = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e);
                            return e.response.data;
                        });
                        this.lstFileRst = [];
                        this.lstFileRst = fileRst.data;

                        //계산식
                        this.totalCnt = 0; //파일갯수
                        this.totalSize = '0 KB';

                        if(this.lstFileRst.length>0){
                            let inputFileSize = 0;
                            for(let i = 0; i< this.lstFileRst.length;i++){
                                this.totalCnt++;
                                inputFileSize += parseInt(this.lstFileRst[i].fileSize); //총파일크기
                                this.lstFileRst[i].fileSize = this.formatBytes(parseInt(this.lstFileRst[i].fileSize), 2); //각각의 파일크기
                            }
                            if(inputFileSize > 0){
                                this.totalSize = this.formatBytes(inputFileSize,2);
                            }
                        }
                        
                        //이미지 가져오기
                        param = {
                            fileType : "NoConfirmMngtImg",
                            fileConnectId : this.noCnfmInfoId2,
                        };
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        const imgRst = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e);
                            return e.response.data;
                        });
                        this.lstImgRst = [];
                        this.lstImgRst = imgRst.data;

                        //회신용 첨부파일 가져오기
                        //console.log('파일2');
                        param = {
                            fileType : "NoConfirmMngt2",
                            fileConnectId : this.noCnfmInfoId2,
                        };
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        const fileRst2 = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e);
                            return e.response.data;
                        });
                        this.lstFileRst2 = [];
                        this.lstFileRst2 = fileRst2.data;

                        //계산식
                        this.totalCnt2 = 0; //파일갯수
                        this.totalSize2 = '0 KB';

                        if(this.lstFileRst2.length>0){
                            let inputFileSize = 0;
                            for(let i = 0; i< this.lstFileRst.length;i++){
                                this.totalCnt2++;
                                inputFileSize += parseInt(this.lstFileRst2[i].fileSize); //총파일크기
                                this.lstFileRst2[i].fileSize = this.formatBytes(parseInt(this.lstFileRst2[i].fileSize), 2); //각각의 파일크기
                            }
                            if(inputFileSize > 0){
                                this.totalSize2 = this.formatBytes(inputFileSize,2);
                            }
                        }
                        
                        //이미지 가져오기
                        param = {
                            fileType : "NoConfirmMngtImg2",
                            fileConnectId : this.noCnfmInfoId2,
                        };
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        const imgRst2 = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e);
                            return e.response.data;
                        });
                        this.lstImgRst2 = [];
                        this.lstImgRst2 = imgRst2.data;
                    }
                    
                } catch (error) {
                    console.error(error)
                }
            },
            getOptionData : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/noCnfmMngt/getOptions';
                let param = {};
                try {
                    const { data } = await sendPostApi(url, param);
                    this.issueTypeList = data.issueType;
                    this.causeList = data.causeList;
                    this.actnPlanList = data.actnPlanList;                    
                    //this.userNm = data.userNm;
                } catch (error) {
                    console.error(error.response)
                }
            },
            getCategoryData : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/codeCategory/list';
                let param = { codeType: 'NCFM' };
                
                try {
                    const { data } = await sendPostApi(url, param);
                    this.categoryData = data.list;
                } catch (error) {
                    console.error(error.response.data)
                }
            },
            getMidCategoryList : function() {
                const selectedCategoryData = this.categoryData.filter(item => item.mainCodeId === this.search.box.mainCodeId)[0]
                return selectedCategoryData ? selectedCategoryData.midCodeList : []
            },
            getCauseDtlList : function() {
                const selectedCauseDtl = this.causeList.filter(item => item.codeVal === this.search.box.cause)[0]
                return selectedCauseDtl ? selectedCauseDtl.subMasterCodeList : []
            },
            fnChange() {
                if(this.noCnfmStatus === 'REGT' && this.checkWriteVal()) {
                    this.confirm('저장하시겠습니까?', ()=> {
                        this.fnChanged();
                    })
                } else if(this.noCnfmStatus === 'PRCS' && this.checkReturnVal()) {
                    this.confirm('저장하시겠습니까?', ()=> {
                        this.fnChanged();
                    })
                } else if(this.noCnfmStatus === 'CHCK' && this.checkFinalVal()) {
                    this.confirm('저장하시겠습니까?', ()=> {
                        this.fnChanged();
                    })
                }
            },
            fnChanged : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");                
                let url2 = '/sendApi/api/noCnfmMngt/noCnfmInfo/change';
                let param2 = {}
                if(this.noCnfmStatus === 'REGT') {
                    param2 = {                                        
                        noCnfmInfoId : this.noCnfmInfoId2,
                        noCnfmType : this.viewType,
                        issueDt : this.getToday(),
                        issueType : this.issueType,
                        actnOrg : this.actnOrg,
                        actnUser : this.ptnrId,
                        mainCodeId : this.search.box.mainCodeId,
                        midCodeId : this.search.box.midCodeId,
                        cause : this.search.box.cause,
                        causeDtl : this.search.box.causeDtl,
                        document : this.document,
                        title : this.title,
                        closeDt : this.closeDt,
                        noCnfmContent : this.noCnfmContent,
                        actnRqmt : this.actnRqmt,
                        tradeId : this.tradeId,
                    }
                } else if(this.noCnfmStatus === 'PRCS') {
                    param2 = {
                        noCnfmInfoId : this.noCnfmInfoId2,
                        replyDt : this.replyDt,
                        noCnfmCause : this.noCnfmCause,
                        recurrence : this.recurrence,
                        actnCarDtl : this.actnCarDtl,
                        actnPlan : this.actnPlan,
                        actnDtl : this.actnDtl
                    }
                } else if(this.noCnfmStatus === 'CHCK') {
                    param2 = {
                        noCnfmInfoId : this.noCnfmInfoId2,
                        cnfmDt : this.cnfmDt,
                        cnfmYn : this.cnfmYn,
                        cnfmDtl : this.cnfmDtl,                        
                    }
                }
                try {
                    if(param2.noCnfmInfoId !== '' && param2.noCnfmInfoId !== null && param2.noCnfmInfoId !== undefined) {
                        const { data } = await sendPostApi(url2, param2);
                        if(data.data === '0000') {
                            if(this.noCnfmStatus === 'REGT') {
                                this.isSaveRegt = true;
                                this.alert('저장되었습니다.');
                                //파일 삭제
                                if(this.secondRemoveFileId.length >0){
                                    requestOptions.headers['Accept-Language'] = "ko";
                                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    let url = '/sendApi/api/file/fileUnUse';
                                    let param = {
                                        fileType : "NoConfirmMngt",
                                        fileQltArcvIds : this.secondRemoveFileId
                                    };
                                    try{
                                        const res_data = await sendPostApi(url, param).then((result) => {
                                        this.lstFileRst = [];
                                        return result.data;
                                        }).catch((e) => {
                                            // console.log(e);
                                            return e.response.data;
                                        });
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                        return;
                                    }
                                }
                                //이미지 삭제
                                if(this.secondRemoveImgId.length >0){
                                    requestOptions.headers['Accept-Language'] = "ko";
                                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    let url = '/sendApi/api/file/fileUnUse';
                                    let param = {
                                        fileType : "NoConfirmMngtImg",
                                        fileQltArcvIds : this.secondRemoveImgId
                                    };
                                    try{
                                        const res_data = await sendPostApi(url, param).then((result) => {
                                        this.lstFileRst = [];
                                        return result.data;
                                        }).catch((e) => {
                                            // console.log(e);
                                            return e.response.data;
                                        });
                                        //console.log(res_data);
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                        return;
                                    }
                                }
                                //파일 저장
                                //console.log('삭제완료');
                                if(this.files != '' && typeof(this.files) != 'undefined'){
                                    
                                    requestFileOptions.headers['Accept-Language'] = "ko";
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    this.fileConnectId = this.noCnfmInfoId2;
                                    try{
                                        const res_data2 = await sendFileApi(this.fileConnectId, "NoConfirmMngt", this.files).then((result) => {
                                        return result.data;
                                        }).catch((e) => {
                                            console.error(e.response.data);
                                            return e.response.data;
                                        });
                                        let fileRst = res_data2.data; //저장된 데이터개수 받아오기
                                        if(fileRst == ''){
                                            this.updateYn = true;
                                            this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                            return;
                                        }
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                        return;
                                    }
                                }
                                //이미지 저장
                                if((this.img != '' && typeof(this.img) != 'undefined')||(this.copiedFileIds != '' && typeof(this.copiedFileIds) != 'undefined')){
                                    requestFileOptions.headers['Accept-Language'] = "ko";
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    this.fileConnectId = this.noCnfmInfoId2;
                                    try{
                                        const res_data3 = await sendFileApi(this.fileConnectId, "NoConfirmMngtImg", this.img, null, this.copiedFileIds).then((result) => {
                                        return result.data;
                                        }).catch((e) => {
                                            console.error(e.response.data);
                                            return e.response.data;
                                        });
                                        let fileRst2 = res_data3.data; //저장된 데이터개수 받아오기
                                        if(fileRst2 == ''){
                                            this.updateYn = true;
                                            this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                            return;
                                        }
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                        return;
                                    }
                                }
                            } else if(this.noCnfmStatus === 'PRCS') {
                                this.returnClass = '';
                                this.isSavePrcs = true;
                                if(!this.returnFalg) {
                                    this.alert('저장되었습니다.')
                                } 
                                //파일 삭제
                                if(this.secondRemoveFileId2.length >0){
                                    requestOptions.headers['Accept-Language'] = "ko";
                                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    let url = '/sendApi/api/file/fileUnUse';
                                    let param = {
                                        fileType : "NoConfirmMngt2",
                                        fileQltArcvIds : this.secondRemoveFileId2
                                    };
                                    try{
                                        const res_data = await sendPostApi(url, param).then((result) => {
                                        this.lstFileRst2 = [];
                                        return result.data;
                                        }).catch((e) => {
                                            // console.log(e);
                                            return e.response.data;
                                        });
                                        
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                        return;
                                    }
                                }
                                //이미지 삭제
                                if(this.secondRemoveImgId2.length >0){
                                    requestOptions.headers['Accept-Language'] = "ko";
                                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    let url = '/sendApi/api/file/fileUnUse';
                                    let param = {
                                        fileType : "NoConfirmMngtImg2",
                                        fileQltArcvIds : this.secondRemoveImgId2
                                    };
                                    try{
                                        const res_data = await sendPostApi(url, param).then((result) => {
                                        this.lstFileRst2 = [];
                                        return result.data;
                                        }).catch((e) => {
                                            // console.log(e);
                                            return e.response.data;
                                        });
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                        return;
                                    }
                                }
                                //파일 저장
                                //console.log('삭제완료');
                                if(this.files2 != '' && typeof(this.files2) != 'undefined'){
                                    requestFileOptions.headers['Accept-Language'] = "ko";
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    this.fileConnectId2 = this.noCnfmInfoId2;
                                    try{
                                        const res_data2 = await sendFileApi(this.fileConnectId2, "NoConfirmMngt2", this.files2).then((result) => {
                                        return result.data;
                                        }).catch((e) => {
                                            console.error(e.response.data);
                                            return e.response.data;
                                        });
                                        let fileRst = res_data2.data; //저장된 데이터개수 받아오기
                                        if(fileRst == ''){
                                            this.updateYn = true;
                                            this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                            return;
                                        }
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                        return;
                                    }
                                }
                                //이미지 저장
                                if((this.img2 != '' && typeof(this.img2) != 'undefined')||(this.copiedFileIds2 != '' && typeof(this.copiedFileIds2) != 'undefined')){
                                    requestFileOptions.headers['Accept-Language'] = "ko";
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    this.fileConnectId2 = this.noCnfmInfoId2;
                                    try{
                                        const res_data3 = await sendFileApi(this.fileConnectId2, "NoConfirmMngtImg2", this.img2, null, this.copiedFileIds2).then((result) => {
                                        return result.data;
                                        }).catch((e) => {
                                            console.error(e.response.data);
                                            return e.response.data;
                                        });
                                        let fileRst2 = res_data3.data; //저장된 데이터개수 받아오기
                                        if(fileRst2 == ''){
                                            this.updateYn = true;
                                            this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                            return;
                                        }
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                        return;
                                    }
                                }
                                if(this.returnFalg) {
                                    this.fnApprovaled();
                                } else {
                                    this.getNoConfirmData(this.noCnfmInfoId2)
                                }
                            } else if(this.noCnfmStatus === 'CHCK') {
                                this.approvalClass2 = '';
                                this.isSaveAprv = false;
                                if(!this.returnFalg) {
                                    this.isSaveAprv = true;
                                    this.alert('저장되었습니다.');
                                } else if(this.returnFalg) {
                                    this.fnApprovaled();
                                }
                            } 
                        }
                    }
                } catch (error) {
                    console.error(error.response)
                }
            },
            fnSave() {
                if(this.noConfirmType === 'write') {
                    if(this.checkWriteVal()) {
                        this.confirm('저장하시겠습니까?', this.fnSaved);
                    }
                } else {
                    // console.log("checkWriteVal Error");
                }
            },
            fnSaved : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/noCnfmMngt//noCnfmInfo/write';
                let param = {};
                this.siteMstrId = this.$cookies.get("siteMstrId");
                //if(this.noConfirmType === 'write') {
                    //if(this.checkWriteVal()) {
                        url = '/sendApi/api/noCnfmMngt/noCnfmInfo/write';
                        
                        param = {
                            siteMstrId : this.siteMstrId,
                            noCnfmType : this.viewType,
                            issueDt : this.getToday(),
                            issueType : this.issueType,
                            actnOrg : this.actnOrg,
                            actnUser : this.ptnrId,
                            mainCodeId : this.search.box.mainCodeId,
                            midCodeId : this.search.box.midCodeId,
                            cause : this.search.box.cause,
                            causeDtl : this.search.box.causeDtl,
                            document : this.document,
                            title : this.title,
                            closeDt : this.closeDt,
                            noCnfmContent : this.noCnfmContent,
                            actnRqmt : this.actnRqmt,
                            tradeId : this.tradeId,
                            selfQltySiteInfoId : this.selfQltySiteInfoId,
                            selfSiteChkRstId : this.selfSiteChkRstId,
                        };
                        try {
                            const { data } = await sendPostApi(url, param);
                            if(data.data == "0000" && data.resultData.noCnfmInfoId != "") {
                                const docSeqUrl = '/sendApi/api/docNum/selectDocNumSeq'
                                let docType = this.viewType;
                                if(docType === 'Punch') docType = 'PNCH';
                                const docSeqPayload = {
                                    siteMstrId: this.$cookies.get("siteMstrId"),
                                    codeType: 'NCFM',
                                    codeDtlType: docType,
                                    gjmcd: this.search.box.mainCodeId,
                                    gjscd: this.search.box.midCodeId,
                                    //aprvOptnType: 'ALLON',
                                    docType: '',
                                }
                                const options = {
                                    headers: {
                                        'Authorization': this.$cookies.get('Authorization'),
                                        'Content-Type': 'application/json',
                                        'Accept-Language': 'ko'
                                    }
                                }
                                axios.post(docSeqUrl, docSeqPayload, options)
                                    .then(response => {
                                        url = '/sendApi/api/noCnfmMngt/noCnfmInfo/change';
                                        param = {                                        
                                            docSeq: response.data,
                                            noCnfmInfoId : data.resultData.noCnfmInfoId,
                                        }
                                       
                                        axios.post(url, param, options).then(response => {
                                            this.alert("저장되었습니다.", ()=>{
                                                //this.noCnfmInfoId = data.resultData.noCnfmInfoId
                                                this.getNoConfirmData(param.noCnfmInfoId);
                                                this.noConfirmType = 'modify';
                                                this.isSaveRegt = true;
                                            });
                                            
                                        });
                                });
                                //파일 저장
                                //console.log('삭제완료');
                                if(this.files != '' && typeof(this.files) != 'undefined'){
                                    requestFileOptions.headers['Accept-Language'] = "ko";
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    this.fileConnectId = data.resultData.noCnfmInfoId;
                                    try{
                                        const res_data2 = await sendFileApi(this.fileConnectId, "NoConfirmMngt", this.files).then((result) => {
                                        return result.data;
                                        }).catch((e) => {
                                            return e.response.data;
                                        });
                                        let fileRst = res_data2.data; //저장된 데이터개수 받아오기
                                        if(fileRst == ''){
                                            this.updateYn = true;
                                            this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                            //this.$root.$emit('bv::show::modal', 'writeAlert');
                                            return;
                                        }
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                       // this.$root.$emit('bv::show::modal', 'writeAlert');
                                        return;
                                    }
                                }
                                //이미지 저장
                                if((this.img != '' && typeof(this.img) != 'undefined')||(this.copiedFileIds != '' && typeof(this.copiedFileIds) != 'undefined')){
                                    requestFileOptions.headers['Accept-Language'] = "ko";
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                    this.fileConnectId = data.resultData.noCnfmInfoId;
                                    try{
                                        const res_data3 = await sendFileApi(this.fileConnectId, "NoConfirmMngtImg", this.img, null, this.copiedFileIds).then((result) => {
                                        return result.data;
                                        }).catch((e) => {
                                            console.error(e.response.data);
                                            return e.response.data;
                                        });
                                        let fileRst2 = res_data3.data; //저장된 데이터개수 받아오기
                                        if(fileRst2 == ''){
                                            this.updateYn = true;
                                            this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                            //this.$root.$emit('bv::show::modal', 'writeAlert');
                                            return;
                                        }
                                    }catch(error){
                                        this.updateYn = true;
                                        this.alert('오류로 인해 저장이 완료되지 않았습니다.');
                                        //this.$root.$emit('bv::show::modal', 'writeAlert');
                                        return;
                                    }
                                }
                            }
                        } catch (error) {
                            console.error(error.response.data)
                        }
                    //} else {
                    //    console.log("checkWriteVal Error");
                    //}
                //}
            },
            fnNext : async function(status) {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");                
                let url = '/sendApi/api/noCnfmMngt/noCnfmInfo/change';
                let param = {}
                if(this.noCnfmStatus === 'REGT' && status === 'PRCS') {
                    this.confirm('발송하시겠습니까?', async () => {
                        param = {                                        
                            noCnfmInfoId : this.noCnfmInfoId2,
                            noCnfmStatus : status
                        }
                        try {
                            if(param.noCnfmInfoId !== '' && param.noCnfmInfoId !== null && param.noCnfmInfoId !== undefined) {
                                const { data } = await sendPostApi(url, param);
                                if(data.data === '0000') {
                                    this.alert('발송되었습니다.', () => {
                                        let param = {
                                            messageCode : 'A040', // sqms_알림리스트 2.알림리스트 시트 알림번호 
                                            userId : this.userId,
                                            projectId : this.projectId,
                                            projectName : this.projectName,
                                            //userIds : 수신인이 여러명일경우 추가  
                                            reciveUserId : this.ptnrId,
                                            docSeq :this.docSeq,
                                        }
                                        // console.log("@@@@ 부적합 발송 param :  %o",param);
                                        this.fn_sendMsg(param);
                                    })
                                }
                            }
                        } catch (error) {
                            console.error(error.response.data)
                        }
                    });
                    
                } else if(this.noCnfmStatus === 'CHCK' && this.cnfmYn == 'Y' && status === 'APRV') {
                    this.confirm('승인하시겠습니까?', async () => {
                        param = {                                        
                            noCnfmInfoId : this.noCnfmInfoId2,
                            noCnfmStatus : status
                        }
                        try {
                            if(param.noCnfmInfoId !== '' && param.noCnfmInfoId !== null && param.noCnfmInfoId !== undefined) {
                                const { data } = await sendPostApi(url, param);
                                if(data.data === '0000') {
                                    this.alert('승인되었습니다.', ()=> {
                                        let msgParam = {
                                            messageCode : msgCode, // sqms_알림리스트 2.알림리스트 시트 알림번호 
                                            userId : this.userId,
                                            projectId : this.projectId,
                                            //userIds : 수신인이 여러명일경우 추가  
                                            reciveUserId : this.ptnrId,
                                            docSeq :this.docSeq,
                                        }
                                    })
                                }
                            }
                        } catch (error) {
                            console.error(error.response.data)
                        }
                    });
                }            
            },
            async fn_sendMsg(msgParam) {
                let url = '/sendApi/api/messageMngt/message/send';
                try {
                    const { data } = await sendPostApi(url, msgParam);
                    //if(data.data === '0000') {
                        //this.alert('발송되었습니다.', () => {
                            this.getNoConfirmData(this.noCnfmInfoId2);
                            this.noConfirmType = 'modify';
                            //viewType ==='Punch'
                            if(this.viewType ==='Punch') {
                                this.closeModal();
                                //this.closeClear();
                            }
                        //})
                    //} else {
                    //    this.alert('알림 발송에 실패했습니다.')
                    //    return
                    //}
                } catch (error) {
                    console.error(error.response.data)
                }

            },
            checkWriteVal : function() {
                // if(commonFn.methods.isEmpty(this.issueType)&& this.viewType !== 'Punch') {
                //     this.alert("발행유형을 선택해주세요.");
                //     return false;
                // }
                if(commonFn.methods.isEmpty(String(this.ptnrId))) {
                    this.alert("조치업체/수신자를 선택해주세요.");
                    return false;
                }
                if(commonFn.methods.isEmpty(this.search.box.mainCodeId)) {
                    this.alert("공종을 선택해주세요.");
                    return false;
                }
                if(commonFn.methods.isEmpty(this.search.box.midCodeId)) {
                    this.alert("세부공종을 선택해주세요.");
                    return false;
                }
                // if(commonFn.methods.isEmpty(this.search.box.cause) && this.viewType !== 'Punch') {
                //     this.alert("원인을 선택해주세요.");
                //     return false;
                // }
                // if(commonFn.methods.isEmpty(this.search.box.causeDtl) && this.viewType !== 'Punch') {
                //     this.alert("원인 상세를 선택해주세요.");
                //     return false;
                // }
                if(commonFn.methods.isEmpty(this.title)) {
                    this.alert("제목을 입력해주세요.");
                    return false;
                }
                if(this.closeDt < this.getToday()) {
                    this.alert("종결요청일은 작성일로부터 이후 일자를 선택해주세요.");
                    return false;
                }
                if(commonFn.methods.isEmpty(this.noCnfmContent)) {
                    this.alert("부적합 내용을 입력해주세요.");
                    return false;
                }
                // if(commonFn.methods.isEmpty(this.actnRqmt) && this.viewType == 'CAR') {
                //     this.alert("시정조치 요구사항을 입력해주세요.");
                //     return false;
                // }
                
                if(this.img.length === 0 && this.lstImgRst.length === 0) {
                    this.alert('부적합 사진을 등록해주세요.');
                    return false;
                }
                return true;
            },
            checkReturnVal : function() {
                if(this.replyDt < this.issueDt) {
                    
                    this.alert("회신일은 작성일로부터 이후 일자를 선택해주세요.");
                    return false;
                }

                // if(commonFn.methods.isEmpty(this.noCnfmCause) && this.viewType == 'CAR') {
                //     this.alert("부적합 원인을 입력해주세요.");
                //     return false;
                // }
                // if(commonFn.methods.isEmpty(this.recurrence) && this.viewType == 'CAR') {
                //     this.alert("재발방지대책을 입력해주세요.");
                //     return false;
                // }
                // if(commonFn.methods.isEmpty(this.actnCarDtl) && this.viewType == 'CAR') {
                //     this.alert("시정조치내용을 입력해주세요.");
                //     return false;
                // }
                // if(commonFn.methods.isEmpty(this.actnPlan) && this.viewType == 'NCR') {
                //     this.alert("조치방안을 선택해주세요.");
                //     return false;
                // }
                if(commonFn.methods.isEmpty(this.actnDtl) && this.viewType != 'CAR') {
                    this.alert("조치 내용을 입력해주세요.");
                    return false;
                }
                if(this.lstImgRst2.length === 0 && this.img2.length === 0) {
                    this.alert('조치 사진을 등록해주세요.')
                    return false;
                }
                return true;
            },
            checkFinalVal : function() {
                if(commonFn.methods.isEmpty(this.cnfmDtl) && this.cnfmYn === 'N') {
                    this.alert("확인 내용을 입력해주세요.");
                    return false;
                }
                return true;
            },
            replyChange : async function(param) { //date-picker value change event
                this.replyDt = param;
            }, 
            cnfmChange : async function(param) { //date-picker value change event
                this.cnfmDt = param;
            },
            checkTab : function(index) {
                if(this.noConfirmType == 'write' && index === 0) {
                    this.popcurrentTab=index
                    return true;
                } else if(this.noConfirmType != 'write') {
                    this.popcurrentTab=index
                    return true;
                }
                return true;
            },
            partnerChoice : function(infoPartner){ //협력사 사원검색 후 event
                this.ptnrNm = infoPartner.userNm;
                this.ptnrId = infoPartner.userId;
                this.tradeNm = infoPartner.tradeNm;
                this.tradeId = infoPartner.tradeId;
                this.partnerInfo = infoPartner.tradeNm + ' / ' + infoPartner.userNm;
            },
            employeeChoice: function(infoEmployee) {
                this.ptnrNm = infoEmployee.userNm
                this.ptnrId = infoEmployee.userId;
                this.tradeNm = infoEmployee.workLocNm;
                this.tradeId = infoEmployee.workLocCd;
                this.partnerInfo = infoEmployee.workLocNm + ' / ' + infoEmployee.userNm;
            },
            getToday : function(){ 
                var today = new Date();
                var year = today.getFullYear();
                var month = ('0' + (today.getMonth() + 1)).slice(-2);
                var day = ('0' + today.getDate()).slice(-2);
                var dateString = year + '-' + month  + '-' + day;
                return dateString;
            },

            checkInUser(videMode) {
                if((this.noCnfmStatus === '' || this.noCnfmStatus === 'REGT') && this.inUser === this.userId) {
                    return true;
                }
                if(videMode === 'write' && this.noConfirmType === videMode) {
                    return true;
                }
                return false;
            },
            checkReUser(videMode) {
                if(this.noCnfmStatus === 'PRCS' && this.ptnrId === this.userId) {
                    return true;
                }
                return false;
            },
            checkEndUser(videMode) {
                if(this.noCnfmStatus === 'CHCK' && this.inUser === this.userId) {
                    return true;
                }
                return false;
            },
            closePop : function() {
                this.$root.$emit('bv::hide::modal', this.popId);
            },
            closeModal : function() {
                if(this.noCnfmStatus === '' && this.noCfrmType === 'write') {
                    this.confirm('작성중인 내용이 있습니다. 취소하시겠습니까?', ()=> {
                        this.$root.$emit('bv::hide::modal', 'PunchWrite');
                        this.closeClear();
                        this.$emit('fn-self-quality-result-punch', true);
                        this.$bvModal.hide('PunchWrite')
                    })
                } else {
                    this.$root.$emit('bv::hide::modal', 'PunchWrite');
                    this.closeClear();
                    this.$emit('fn-self-quality-result-punch', true);
                    this.$bvModal.hide('PunchWrite')
                }
               
            },
            fnApproval() {
                let chkFlag = false;
                if(this.noCnfmStatus === 'REGT' && this.checkWriteVal()) {
                    chkFlag = true; 
                    this.returnFalg = true;                   
                } else if(this.noCnfmStatus === 'CHCK' && this.cnfmYn == 'Y' && this.checkFinalVal()) {
                    chkFlag = true;  
                    this.returnFalg = false;
                } else if(this.noCnfmStatus === 'CHCK' && this.cnfmYn == 'N' && this.checkFinalVal()) {
                    chkFlag = true;  
                    this.returnFalg = true;
                } else if(this.noCnfmStatus === 'PRCS' && this.checkReturnVal()) {
                    chkFlag = true;  
                    this.returnFalg = true;
                }
                if(chkFlag) {
                    this.confirm('회신하시겠습니까?', ()=> {
                        this.fnChanged();
                        //this.fnApprovaled();
                    })
                }
                
            },
            fnApprovaled : async function(aprvInfoId) {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");                
                let url = '/sendApi/api/noCnfmMngt/noCnfmInfo/change';
                let param = {}
                if(this.noCnfmStatus === 'REGT') {
                    param = {                                        
                        noCnfmInfoId : this.noCnfmInfoId2,
                        aprvInfoId : aprvInfoId,
                        noCnfmStatus : 'APVL'
                    }
                } else if(this.noCnfmStatus === 'CHCK' && this.cnfmYn == 'Y') {
                    param = {
                        noCnfmInfoId : this.noCnfmInfoId2,
                        aprvInfoId2 : aprvInfoId,
                        noCnfmStatus : 'APVL2'
                    }
                } else if(this.noCnfmStatus === 'CHCK' && this.cnfmYn == 'N') {
                    param = {
                        noCnfmInfoId : this.noCnfmInfoId2,
                        noCnfmStatus : 'PRCS'
                    }
                } else if(this.noCnfmStatus === 'PRCS') {
                    param = {
                        noCnfmInfoId : this.noCnfmInfoId2,
                        noCnfmStatus : 'CHCK'
                    }
                }
                try {
                    if(param.noCnfmInfoId !== '' && param.noCnfmInfoId !== null && param.noCnfmInfoId !== undefined) {
                        const { data } = await sendPostApi(url, param);
                        if(data.data === '0000') {
                            if(this.noCnfmStatus === 'PRCS' || (this.noCnfmStatus === 'CHCK' && this.cnfmYn == 'N')) {
                                this.alert("회신되었습니다.", ()=>{
                                    let msgParam = {};
                                    if(this.noCnfmStatus === 'PRCS') {
                                        if(this.viewType === 'Punch') {
                                            msgParam['messageCode'] = 'A041'
                                        } else {
                                            msgParam['messageCode'] = 'A037'
                                        }
                                        msgParam['userId'] = this.ptnrId
                                        msgParam['projectId'] = this.projectId
                                        msgParam['reciveUserId'] = this.inUser
                                        msgParam['docSeq'] = this.docSeq
                                        this.fn_sendMsg(msgParam)
                                    } else if(this.noCnfmStatus === 'CHCK' && this.cnfmYn == 'N') {
                                        if(this.viewType === 'Punch') {
                                            msgParam['messageCode'] = 'A042'
                                        } else {
                                            msgParam['messageCode'] = 'A038'
                                        }
                                        msgParam['userId'] = this.userId
                                        msgParam['projectId'] = this.projectId
                                        msgParam['reciveUserId'] = this.ptnrId
                                        msgParam['docSeq'] = this.docSeq
                                        this.fn_sendMsg(msgParam)
                                    }
                                    
                                });
                            }
                            
                        }
                    }
                } catch (error) {
                    console.error(error.response.data)
                }
            
            },
            fn_setSourceApproval: function (payload) {   // 결재상신 성공시 리턴 callback
                if(payload.aprvInfoId !== '') {
                    //this.fnApproval(payload.aprvInfoId);
                    
                    //this.alert('결재가 상신되었습니다.', async=>{
                        this.fnAprvComp(payload.aprvInfoId)
                        //this.$root.$emit('bv::show::modal', this.popId);
                        this.$bvModal.hide('NoConfirmMngtModalApproveModal_approve')
                        this.$bvModal.hide('PunchWrite');
                        this.$emit('callback')
//                                    this.searchMySite();
                    //});
                }
            },
            // clickApproval () {
            //     if(this.noCnfmStatus  === 'REGT' || this.noCnfmStatus === 'CHCK') {
            //         this.approve.mainCodeId     = this.search.box.mainCodeId;
            //         this.approve.midCodeId      = this.search.box.midCodeId;
            //         this.approve.siteMstrId     = this.$cookies.get("siteMstrId");

            //         this.approve.requestId      = this.noCnfmInfoId2;
            //         this.approve.fileType       = 'NoConfirmMngt';
            //         this.approve.codeType       = 'NCFM';
            //         if(this.viewType === 'Punch') {
            //             this.approve.codeDtlType  = 'PNCH';
            //         } else {
            //             this.approve.codeDtlType  = this.viewType;
            //         } 
            //         this.approve.docSeq         = this.docSeq;
            //         // temporary
            //         if(this.viewType === 'CAR') {
            //               this.approve.docName        = "CAR(시정조치요구서)"
            //         } else if(this.viewType === 'NCR'){
            //               this.approve.docName        = "NCR(부적합보고서)"
            //         }
                  
            //         this.approve.inputTitle     = this.title;
            //         this.$bvModal.show('NoConfirmMngtModalApproveModal')
            //     }
                
            //     // popup 결재상신
            //     // result =  APRV_INFO_ID(결재정보id)
            //     // ㄴ> result
            //     // 임시 결재 정보 ID 대신 문서번호..
            //     // 자재공급원 결재 완료 처리.(param=>APRV_INFO_ID)                
            // },
            //결재상신
            async fnAprvComp(aprvInfoId){
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");                
                let url = '/sendApi/api/noCnfmMngt/noCnfmInfo/change';
                let param = {}
                if(this.noCnfmStatus === 'REGT') {
                    param = {                                        
                        noCnfmInfoId : this.noCnfmInfoId2,
                        aprvInfoId : aprvInfoId,
                        noCnfmStatus : 'APVL'
                    }
                } else if(this.noCnfmStatus === 'CHCK' && this.cnfmYn == 'Y') {
                    param = {
                        noCnfmInfoId : this.noCnfmInfoId2,
                        aprvInfoId2 : aprvInfoId,
                        noCnfmStatus : 'APVL2'
                    }
                }
                try {
                    if(param.noCnfmInfoId !== '' && param.noCnfmInfoId !== null && param.noCnfmInfoId !== undefined) {
                        const { data } = await sendPostApi(url, param);
                        if(data.data === '0000') {
                            if(this.noCnfmStatus === 'PRCS' || (this.noCnfmStatus === 'CHCK' && this.cnfmYn == 'N')) {
                                this.alert("결재가 상신되었습니다.", ()=>{
                                    this.getNoConfirmData(this.noCnfmInfoId2);
                                    this.noConfirmType = 'modify';
                                });
                            }
                            
                        }
                    }
                } catch (error) {
                    console.error(error.response.data)
                }
            
            },
            fileChanged(payload) {
                this.files = payload
            },
            fileRemoved(id) {
                this.secondRemoveFileId = id
            },
            imageChanged(payload){
                // this.img = payload
                this.img = payload.file;
                this.copiedFileIds = payload.copyIds;
            },
            imageRemoved(id) {
                this.secondRemoveImgId = id
            },
            fileChanged2(payload) {
                this.files2 = payload
            },
            fileRemoved2(id) {
                this.secondRemoveFileId2 = id
            },
            imageChanged2(payload){
                // this.img2 = payload
                this.img2 = payload.file;
                this.copiedFileIds2 = payload.copyIds;
            },
            imageRemoved2(id) {
                this.secondRemoveImgId2 = id
            },
            orgFileDown: function(type,index){//데이터 등록된 파일'
                if(!this.checkUser(this.userId, 'down')) {
                    return false;
                } else {
                    let fileCode = '';
                    let fileName = '';
                    if(type == 'file'){
                        fileCode = this.lstFileRst[index].fileQltArcvId;
                        fileName = this.lstFileRst[index].orgFileName;
                    }else if (type == 'img'){
                        fileCode = this.lstImgRst[index].fileQltArcvId;
                        fileName = this.lstImgRst[index].orgFileName;
                    }
                    let element = document.createElement('a');
                    element.setAttribute('href','/sendApi/api/fileCall/getMtMngtImgFile/'+fileCode);
                    element.setAttribute('download',fileName);
                    element.click();
                    element.remove();
                }
            },
            formatBytes(bytes, decimals = 0) {//바이트 계산
                if (bytes === 0) return '0 MB';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
            fn_inputCheck(evt){
                if(2000 >= evt.target.value.length){
                    this.cnfmDtl = evt.target.value;
                }
            },
            fnAprvDtl() {
                this.$bvModal.show('NoConfirm_AprvView')
            },
            fn_PartnerUserSearch() {
                this.$bvModal.show('NoConfirmMngtModalPatnerUserSearch')
            }
        }
   }
   
</script>