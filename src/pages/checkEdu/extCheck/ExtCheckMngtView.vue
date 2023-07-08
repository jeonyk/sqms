<template>
    <section id="ExtCheckMngtView" class="tab_contents">
        <div class="tab_area">
            <div class="inner type2">
                <h2 class="sub_title">
                    {{ '대외 점검 관리 > 대외점검 등록' }}
                    <div class="fr" v-if="$router.currentRoute.path.split('/').pop() !== 'allSite'">
                        <!-- 등록 -->
                        <button 
                            v-if="fn_disabled() && !basicInfo.editable && userWritable"
                            type="button" 
                            class="btn btn_md btn_outline btn_darkgray"
                            :disabled="false"
                            @click="confirm('등록하시겠습니까?' ,fn_save)"
                        > 
                            {{ '등록'}} 
                        </button>
                        <button 
                            v-if="fn_disabled() && !basicInfo.editable"
                            type="button" 
                            class="btn btn_md btn_outline btn_gray"
                            @click="$router.push({name: 'ExtCheckMngtSheet'})"
                        > 
                            {{'취소'}} 
                        </button>


                        <!-- 상세 -->
                        <button 
                            v-if="!fn_disabled() && poutMatter.list.filter(item => item.status !== 'Deleted').length === 0 && userChangable"
                            type="button" 
                            class="btn btn_md btn_outline btn_darkgray"
                            :class="{disabled: defaultInfo.finlCmpltYn === 'Y' }"
                            @click="fn_exterminate"
                        > 
                            <!-- @click="" -->
                            {{'최종완료'}} 
                        </button>
                        <button 
                            v-if="!fn_disabled() && userChangable"
                            type="button" 
                            class="btn btn_md btn_outline btn_darkgray"
                            :class="{disabled: defaultInfo.finlCmpltYn === 'Y' || poutDcsnDiv === 1}"
                            @click="basicInfo.editable = true"
                        > 
                            {{'수정'}} 
                        </button>
                        <button 
                            v-if="!fn_disabled() && userUnusable"
                            type="button" 
                            class="btn btn_md btn_outline btn_gray"
                            :class="{disabled: defaultInfo.finlCmpltYn === 'Y' || poutDcsnDiv === 1}"
                            @click="fn_remove"
                        > 
                            {{'삭제'}} 
                        </button>
                        <button 
                            v-if="!fn_disabled()"
                            type="button" 
                            class="btn btn_md btn_outline btn_gray"
                            @click="$router.push({name: 'ExtCheckMngtSheet'})"
                        > 
                            {{'목록'}} 
                        </button>

                        <!-- 수정 -->
                        <button 
                            v-if="fn_disabled() && basicInfo.editable && userChangable"
                            type="button" 
                            class="btn btn_md btn_outline btn_darkgray"
                            @click="confirm('수정하시겠습니까?' ,fn_save)"
                        > 
                            {{ '수정'}} 
                        </button>
                        <button 
                            v-if="fn_disabled() && basicInfo.editable && userUnusable"
                            type="button" 
                            class="btn btn_md btn_outline btn_gray"
                            @click="confirm('취소하시겠습니까?' , () => { basicInfo.editable = false; fn_initialize();})"
                        > 
                            {{'취소'}} 
                        </button>

                    </div>
                </h2>
                <div class="data_num">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td class="fr p0">
                                    <a href="javasccript:void(0);" @click="fn_downloadRule"><i class="ico_file file_pdf"> {{'[별표 8] 건설공사 등의 벌점관리기준(제87조제5항 관련)(건설기술 진흥법 시행령).pdf'}} </i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

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
                                <th> {{'현장명'}} </th>
                                <td colspan="3">
                                    <!-- 수정 필요함 -->
                                    {{ basicInfo.siteNm ? `[${basicInfo.siteId}] ${basicInfo.siteNm}` : `` }}
                                </td>
                            </tr>
                            <tr>
                                <th> {{'프로젝트명'}} </th>
                                <td colspan="3">
                                    <!-- 수정 필요함 -->
                                    {{ basicInfo.projectId ? `[${basicInfo.projectId}] ${basicInfo.projectNm}` : `` }}
                                </td>
                            </tr>
                            <tr>
                                <!-- 수정 필요함 -->
                                <th> {{ '본부' }} </th>
                                <td> {{ basicInfo.baseTypeNm }} </td>
                                <th> {{ '공사 유형' }} </th>
                                <td> {{ basicInfo.csrtTypeNm }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div class="button_box">
                    <strong> 1. {{ '기본정보' }} </strong>
                </div>
                <div class="table_normal_list" :class="{ 'table_write': true }">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="15%">
                            <col width="15%">
                            <col width="*">
                            <col width="15%">
                            <col width="15%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span :class="{ 'emp_red': fn_disabled() }"> {{ '점검일' }} </span></th>
                                <td colspan="2" v-if="fn_disabled()">
                                    <datepicker-range
                                        v-model="defaultInfo.chckde"
                                        :input-style="{'max-width': '100%'}"
                                        format="YYYYMMDD"
                                    />
                                        <!-- replaceable -->
                                        <!-- :disabled="extrnlChckId ? true : false" -->
                                </td>
                                <td colspan="2" v-else>
                                    {{ defaultInfo.chckde[0] ? `${defaultInfo.chckde[0]} ~ ${defaultInfo.chckde[1]}` : '' }}
                                </td>
                                <th><span :class="{ 'emp_red': fn_disabled() }"> {{ '점검종류' }} </span></th>
                                <td colspan="2">
                                    <select 
                                        v-if="fn_disabled()"
                                        v-model="defaultInfo.chckKnd"
                                        class="form_control" 
                                    >
                                        <option value="" disabled> {{'선택'}} </option>
                                        <option
                                            v-for="item in advancedInfo.chckKnd"
                                            :key="item.codeVal"
                                            :value="item.codeVal"
                                            :title="item.codeNameKr"
                                            >
                                            {{ item.codeNameKr }}
                                        </option>
                                    </select>
                                    <template v-else>
                                        <!-- {{ advancedInfo.chckKnd.find(knd => knd.codeVal === defaultInfo.chckKnd)?.codeNameKr }} -->
                                        {{ defaultInfo.chckKndNm }}
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <th><span :class="{ 'emp_red': fn_disabled() }"> {{ '대표 점검 기관' }} </span></th>
                                <td colspan="5" >
                                    <div class="btn_wrap" v-if="fn_disabled()">
                                        <input 
                                            v-model="defaultInfo.extrnlInstt.extrnlInsttNm" 
                                            type="text" 
                                            class="form_control" 
                                            readonly 
                                            @click="$bvModal.show('ExtCheckMngtView_SearchInstitution')"
                                        />
                                        <button 
                                            type="button" 
                                            class="btn btn_sm btn_darkblue btn_radius"
                                            @click="$bvModal.show('ExtCheckMngtView_SearchInstitution')"
                                        > 
                                            {{ '검색' }} 
                                        </button>
                                    </div>
                                    <div v-else>
                                        {{ defaultInfo.extrnlInstt.extrnlInsttNm }}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><span :class="{ 'emp_red': fn_disabled()}"> {{ '점검자' }} </span></th>
                                <td colspan="5">
                                    <div class="btn_wrap" v-if="fn_disabled()">
                                        <input 
                                            v-model="defaultInfo.insctr.insctrNmDtls" 
                                            type="text" 
                                            class="form_control"
                                            style="width: 620px;"
                                            readonly
                                            @click="$bvModal.show('ExtCheckMngtView_SearchChecker')"
                                        />
                                        <button
                                            type="button"
                                            class="btn_reset"
                                            style="padding-right: 90px; padding-top: 5px;"
                                            :disabled="defaultInfo.extrnlInstt.extrnlInsttId === null || defaultInfo.extrnlInstt.extrnlInsttId === ''"
                                            @click="defaultInfo.insctr.insctrNmDtls = ''; defaultInfo.insctr.insctrIdDtls = ''; defaultInfo.insctr.insctrId = []; "
                                        >
                                            {{'초기화'}}
                                        </button>
                                        <button 
                                            type="button" 
                                            class="btn btn_sm btn_darkblue btn_radius"
                                            :disabled="defaultInfo.extrnlInstt.extrnlInsttId === null || defaultInfo.extrnlInstt.extrnlInsttId === ''"
                                            @click="$bvModal.show('ExtCheckMngtView_SearchChecker')"
                                        > 
                                            {{ '검색' }} 
                                        </button>
                                    </div>
                                    <div v-else>
                                        {{ defaultInfo.insctr.insctrNmDtls }}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><span :class="{ 'emp_red': fn_disabled() }"> {{ '상세 점검 목적' }} </span></th>
                                <td v-if="fn_disabled()" colspan="5">
                                    <textarea
                                        cols="30"
                                        rows="10"
                                        class="form_control"
                                        v-model="defaultInfo.chckPurpsCn"
                                        :maxlength="500"
                                    />
                                        <!-- :value="defaultInfo.chckPurpsCn"
                                        @keyup="($event) => {defaultInfo.chckPurpsCn = $event.target.value}" -->
                                    <p class="table_message ar mt0">{{ defaultInfo.chckPurpsCn.length}} / {{ 500 }}</p>
                                                                           
                                        <!-- :maxlength="" -->
                                </td>
                                <td v-else colspan="5">
                                    <pre class="form_control">{{ defaultInfo.chckPurpsCn }}</pre>
                                </td>
                            </tr>
                            <tr>
                                <th rowspan="4">
                                    <div>
                                        <!-- v-html="'본사 출장<br>지원 요청'" -->
                                        <span
                                            v-html="'본사 출장<br>지원 요청'"
                                            style="display: inline-block;vertical-align: middle;"
                                        >
                                        </span>
                                        <label class="input_check pop_notext">
                                            <input v-model="hedofcSportRequst.hedofcSportRequstYn" type="checkbox" :disabled="!fn_disabled() || (this.extrnlChckId && this.basicInfo.editable && hedofcSportRequst.hedofcSportRequstYnOrigin)" />
                                            <span class="label_text"></span>
                                        </label>
                                    </div>
                                </th>
                                <td><strong>{{'출장기간'}}</strong></td>
                                <td colspan="4">
                                    <datepicker-range
                                        v-if="fn_disabled()"
                                        v-model="hedofcSportRequst.date"
                                        :disabled="!hedofcSportRequst.hedofcSportRequstYn || (this.extrnlChckId && this.basicInfo.editable && hedofcSportRequst.hedofcSportRequstYnOrigin)"
                                        :input-style="{'max-width': '50%'}"
                                        format="YYYYMMDD"
                                    />
                                        <!-- replaceable                 -->
                                    <div v-else>
                                        {{ hedofcSportRequst.hedofcSportRequstYn && hedofcSportRequst.date[0] ? `${hedofcSportRequst.date[0]} ~ ${hedofcSportRequst.date[1]}` : `` }}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><strong> {{'수신자 (HEC)'}} </strong></td>
                                <td colspan="4">
                                    <div class="btn_wrap" v-if="fn_disabled()">
                                        <input 
                                            :value="(hedofcSportRequst.rcverId !== null && hedofcSportRequst.rcverId  !== '') ? `${hedofcSportRequst.recptnDeptNm} / ${hedofcSportRequst.rcverJobNm} / ${hedofcSportRequst.rcverNm}` : ''"
                                            type="text" 
                                            class="form_control"  
                                            @click="$bvModal.show('ExtCheckMngtView_EmployeeSearch')"
                                            :disabled="!hedofcSportRequst.hedofcSportRequstYn || (this.extrnlChckId && this.basicInfo.editable && hedofcSportRequst.hedofcSportRequstYnOrigin)"
                                            readonly
                                        />
                                           <!-- v-model="receiver.info"  -->
                                        <button 
                                            type="button" 
                                            class="btn btn_sm btn_darkblue btn_radius"
                                            :disabled="!hedofcSportRequst.hedofcSportRequstYn || (this.extrnlChckId && this.basicInfo.editable && hedofcSportRequst.hedofcSportRequstYnOrigin)"
                                            @click="$bvModal.show('ExtCheckMngtView_EmployeeSearch')"
                                        > 
                                            {{ '검색' }} 
                                        </button>                                        
                                    </div>
                                    <div v-else>
                                        {{ (hedofcSportRequst.rcverId !== null && hedofcSportRequst.rcverId  !== '') ? `${hedofcSportRequst.recptnDeptNm} / ${hedofcSportRequst.rcverJobNm} / ${hedofcSportRequst.rcverNm}` : '' }}
                                    </div>
                                </td>
                            </tr>
                            <!-- <tr>
                                <td><strong> {{'제목'}} </strong></td>
                                <td v-if="fn_disabled()" colspan="4">
                                    <input 
                                        v-model="hedofcSportRequst.sportRequstTitle"
                                        type="text" 
                                        class="form_control"
                                        :maxlength="100"
                                        :disabled="!hedofcSportRequst.hedofcSportRequstYn || (this.extrnlChckId && this.basicInfo.editable && hedofcSportRequst.hedofcSportRequstYnOrigin)" 
                                    />
                                    <p class="table_message ar mt0">{{ hedofcSportRequst.sportRequstTitle.length}} / {{ 100 }}</p>
                                </td>
                                <td v-else colspan="4">
                                    <div>
                                        {{ hedofcSportRequst.sportRequstTitle }}
                                    </div>
                                </td>
                            </tr> -->
                            <tr>
                                <td><strong> {{'요청사항'}} </strong></td>
                                <td v-if="fn_disabled()" colspan="4">
                                    <textarea 
                                        v-model="hedofcSportRequst.sportRequstCn" 
                                        class="form_control" 
                                        :maxlength="500"
                                        :disabled="!hedofcSportRequst.hedofcSportRequstYn || (this.extrnlChckId && this.basicInfo.editable && hedofcSportRequst.hedofcSportRequstYnOrigin)"
                                    />
                                    <p class="table_message ar mt0">{{ hedofcSportRequst.sportRequstCn.length}} / {{ 500 }}</p>
                                </td>
                                <td v-else colspan="4"><pre>{{ hedofcSportRequst.sportRequstCn }}</pre></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong> 2. {{ '지적사항' }} </strong>
                    <div v-if="fn_disabled()">
                        <span class="table_message"> {{'※ Data 수집, 타 현장 공유 & 점검자별 분석을 위하여 구두 지적 사항도 작성 부탁드립니다.'}} </span>
                    </div>
                </div>

                <div v-if="fn_disabled()" class="button_box mt10">
                    <!-- <button type="button" class="btn btn_sm btn_darkblue" @click="isPout = !isPout"> {{ `지적사항 ${isPout ? '있음' : '없음'}` }} </button> -->
                    <div class="lst_tabs_round single">
                        <ul>
                            <li :class="{active : poutMatter.poutMatterYn}">
                                <a href="javascript:void(0);" @click="poutMatter.poutMatterYn = !poutMatter.poutMatterYn">{{'지적사항 있음'}}</a>
                            </li>
                            <li :class="{active : !poutMatter.poutMatterYn}">
                                <a href="javascript:void(0);" @click="poutMatter.poutMatterYn = !poutMatter.poutMatterYn">{{'지적사항 없음'}}</a>
                            </li>
                        </ul>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkblue" @click="fn_addPout" :disabled="!poutMatter.poutMatterYn">{{'추가'}}</button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_delPout" :disabled="!poutMatter.poutMatterYn">{{'삭제'}}</button>
                        </div>
                    </div>
                </div>
                <b-overlay
                    :show="!poutMatter.poutMatterYn"
                    :opacity="0.3"
                    :variant="'dark'"
                    spinner-type="none"
                >
                    <div 
                        v-if="poutMatter.list.length > 0"
                        class="table_normal_list" 
                        :class="{ 'table_write': fn_disabled() }"
                    >
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="7%" v-if="fn_disabled()">
                                <col width="7%">
                                <col width="15%">
                                <col width="*">
                                <col width="15%">
                                <col width="12%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th class="ac" v-if="fn_disabled()">
                                        <label class="input_check pop_notext">
                                            <input 
                                                v-model="poutMatter.isAllChecked"
                                                type="checkbox"
                                                @change="poutMatter.list.forEach(info => { info.isChecked = poutMatter.isAllChecked })"
                                            />
                                            <span class="label_text" />
                                        </label>
                                    </th>
                                    <th class="ac"> NO </th>
                                    <th colspan="4"> {{'지적사항 상세 내역'}} </th>
                                    
                                </tr>
                            </thead>
                            <!-- poutDtl.poutMatterSeq => seq값  -->
                            <tbody 
                                v-for="(poutDtl, index) in poutMatter.list"
                                :key="index"
                                v-show="!(poutDtl.status === 'Deleted')"
                            >
                                <tr>
                                    <td v-if="fn_disabled()" rowspan="8" class="ac">
                                        <label class="input_check pop_notext">
                                            <input 
                                                v-model="poutDtl.isChecked" 
                                                type="checkbox" 
                                                @change="fn_changedPoutCheck"
                                            />
                                            <span class="label_text" />
                                        </label>
                                    </td>
                                    <td rowspan="8" class="ac"> {{ index+ 1 }} </td>

                                    <th> <span :class="{'emp_red': fn_disabled() }">{{'지적사항'}}</span> </th>
                                    <td>
                                        <select 
                                            v-if="fn_disabled()" 
                                            v-model="poutDtl.poutMatterType" 
                                            class="form_control form_md"
                                            @change="poutDtl.dem = ''"
                                        >
                                            <option value="" disabled> {{'선택'}} </option>
                                            <option
                                                v-for="item in advancedInfo.poutMatterType"
                                                :key="item.codeVal"
                                                :value="item.codeVal"
                                                :title="item.codeNameKr"
                                            >
                                                {{ item.codeNameKr }}
                                                <!-- {{ item.codeNameKr.length > 17 ? item.codeNameKr.substr(0, 17) + '...' : item.codeNameKr }} -->
                                            </option>
                                        </select>
                                        <!-- <select 
                                            v-if="fn_disabled()" 
                                            v-model="poutDtl.dem" 
                                            class="form_control small ml10"
                                        >
                                            <option value="" disabled> {{'선택'}} </option>
                                            <option
                                                v-for="item in advancedInfo.dem.filter(item => item.groupCode === poutDtl.poutMatterType)"
                                                :key="item.codeVal"
                                                :value="item.codeVal"
                                            >
                                                {{ item.codeNameKr }}
                                            </option>

                                        </select> -->
                                        <template v-else>
                                            <!-- {{`${poutDtl.poutMatterTypeNm} / ${poutDtl.dem}`}} -->
                                            {{ poutDtl.poutMatterTypeNm }}
                                        </template>
                                    </td>
                                    <th> <span :class="{'emp_red': fn_disabled() }">{{'벌점'}}</span> </th>
                                    <td>
                                        <select 
                                            v-if="fn_disabled()" 
                                            v-model="poutDtl.dem" 
                                            class="form_control small ml10"
                                        >
                                            <option value="" disabled> {{'선택'}} </option>
                                            <option
                                                v-for="item in advancedInfo.dem.filter(item => item.groupCode === poutDtl.poutMatterType)"
                                                :key="item.codeVal"
                                                :value="item.codeVal"
                                            >
                                                {{ item.codeNameKr }}
                                            </option>

                                        </select>
                                        <template v-else>
                                            {{ poutDtl.dem }}
                                        </template>
                                    </td>
                                </tr>
                                <tr>
                                    <th> <span :class="{'emp_red': fn_disabled() }">{{'분야/대상 공종'}}</span> </th>
                                    <td v-if="fn_disabled()" colspan="3">
                                        <select 
                                            v-model="poutDtl.cntrwkKnd" 
                                            class="form_control large"
                                            @change="poutDtl.cntrwkKndDtl = ''"
                                        >
                                            <option value="" disabled> {{'선택'}} </option>
                                            <option
                                                v-for="item in advancedInfo.mainCode"
                                                :key="item.mainCodeId"
                                                :value="item.mainCodeId"
                                                :title="item.mainName"
                                            >
                                                {{ item.mainName }}
                                            </option>
                                        </select>
                                        <select v-model="poutDtl.cntrwkKndDtl" class="form_control large ml10">
                                            <option value="" disabled> {{'선택'}} </option>
                                            <option
                                                v-for="item in advancedInfo.midCode.filter(item => item.mainCodeId === poutDtl.cntrwkKnd)"
                                                :key="item.midCodeId"
                                                :value="item.midCodeId"
                                                :title="item.midName"
                                            >
                                                {{ item.midName }}
                                            </option>
                                        </select>
                                    </td>
                                    <td v-else colspan="3">
                                        {{`${poutDtl.cntrwkKndNm} / ${poutDtl.cntrwkKndDtlNm}` }}
                                    </td>
                                </tr>
                                <tr>
                                    <th> <span :class="{'emp_red': fn_disabled() }">{{'점검자'}}</span> </th>
                                    <td v-if="fn_disabled()">
                                        <select v-model="poutDtl.insctrId" class="form_control large">
                                            <option value="" disabled> {{'선택'}} </option>
                                            <option
                                                v-for="(item, index) in defaultInfo.insctr.insctrId"
                                                :key="index"
                                                :value="item.insctrId"
                                            >
                                                <!-- :value="item.insctrId | item.insctrNm" -->
                                                {{ item.insctrNm }}
                                            </option>
                                        </select>
                                    </td>
                                    <td v-else>
                                        {{`${poutDtl.insctrNm}`}}
                                    </td>
                                    <th>  <span :class="{'emp_red': fn_disabled() }">{{'확인서 작성 여부'}}</span>  </th>
                                    <td v-if="fn_disabled()">
                                        <label class="input_radio" :for="`cnfrmnWritngYn_Y_${index}`">
                                            <input
                                                v-model="poutDtl.cnfrmnWritngYn"
                                                type="radio"
                                                :id="`cnfrmnWritngYn_Y_${index}`"
                                                value="Y"
                                                />
                                            <span class="label_text">{{'YES'}}</span>
                                        </label>
                                        <label class="input_radio" :for="`cnfrmnWritngYn_N_${index}`">
                                            <input
                                                v-model="poutDtl.cnfrmnWritngYn"
                                                type="radio" 
                                                :id="`cnfrmnWritngYn_N_${index}`"
                                                value="N"
                                                />
                                            <span class="label_text">{{'NO'}}</span>
                                        </label>
                                    </td>
                                    <td v-else>
                                        {{ poutDtl.cnfrmnWritngYn === 'Y' ? 'YES' : 'NO' }}
                                    </td>
                                </tr>
                                <tr>
                                    <th> <span :class="{'emp_red': fn_disabled() }">{{'제목'}}</span> </th>
                                    <td v-if="fn_disabled()" colspan="3">
                                        <input 
                                            v-model="poutDtl.title" 
                                            type="text" 
                                            class="form_control"
                                            :maxlength="100"
                                        />
                                        <p class="table_message ar mt0">{{ poutDtl.title ? poutDtl.title.length : 0 }} / {{ 100 }}</p>
                                    </td>
                                    <td v-else colspan="3">
                                        {{ poutDtl.title }}
                                    </td>
                                </tr>
                                <tr>
                                    <th> <span :class="{'emp_red':fn_disabled()}">{{'상세 내용'}}</span> </th>
                                    <td v-if="fn_disabled()" colspan="3">
                                        <textarea
                                            v-model="poutDtl.chckPoutMatterCn"
                                            class="form_control"
                                            :maxlength="2000"
                                        />
                                        <p class="table_message ar mt0">{{ poutDtl.chckPoutMatterCn ? poutDtl.chckPoutMatterCn.length : 0 }} / {{ 2000 }}</p>
                                    </td>
                                    <td v-else colspan="3">
                                        <pre class="form_control">{{poutDtl.chckPoutMatterCn}}</pre>
                                    </td>
                                </tr>
                                <tr >
                                    <th> <span :class="{'emp_red':fn_disabled()}">{{'조치 사항'}}</span> </th>
                                    <td v-if="fn_disabled()" colspan="3">
                                        <textarea
                                            v-model="poutDtl.chckManagtCn"
                                            class="form_control"
                                            :maxlength="2000"
                                        />
                                        <p class="table_message ar mt0">{{ poutDtl.chckManagtCn ? poutDtl.chckManagtCn.length : 0 }} / {{ 2000 }}</p>
                                    </td>
                                    <td v-else colspan="3">
                                        <pre class="form_control">{{poutDtl.chckPoutMatterCn}}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <th> <span :class="{'emp_red':fn_disabled()}">{{'조치 전 사진'}}</span> </th>
                                    <td colspan="3">
                                        <LstImg
                                            :lst-file-rst="poutDtl.poutImg.fileRegistered"
                                            :files="poutDtl.poutImg.files"
                                            :copied-file-ids="poutDtl.poutImg.copiedFileIds"
                                            :second-remove-file-id="poutDtl.poutImg.requestForDelete"
                                            @file-changed="(payload) => {fn_setFileConnectId(payload, poutDtl, 'pout'); poutDtl.poutImg.files = payload.file; poutDtl.poutImg.copiedFileIds = payload.copyIds;}"
                                            @file-removed="(payload) => {poutDtl.poutImg.requestForDelete = payload}"
                                            @return-reset="poutDtl.poutImg.resetCopyYn=false"
                                            :uploadable="fn_disabled()"
                                            :copyable="fn_disabled()"
                                            :downloadable="userDownloadable"
                                            :reset-copy-yn="poutDtl.poutImg.resetCopyYn"
                                            :accept-extn="['png', 'gif', 'jpeg', 'jpg', 'bmp']"
                                            :limit-total-file-size="1024*1024*300"
                                            countable
                                            :file-type="'extCheckMngtViewQltyPicturePop'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th> <span :class="{'emp_red':fn_disabled()}">{{'조치 후 사진'}}</span> </th>
                                    <td colspan="3">
                                        <LstImg
                                            :lst-file-rst="poutDtl.rsltImg.fileRegistered"
                                            :files="poutDtl.rsltImg.files"
                                            :copied-file-ids="poutDtl.rsltImg.copiedFileIds"
                                            :second-remove-file-id="poutDtl.rsltImg.requestForDelete"
                                            @file-changed="(payload) => {fn_setFileConnectId(payload, poutDtl, 'rslt'); poutDtl.rsltImg.files = payload.file; poutDtl.rsltImg.copiedFileIds = payload.copyIds; }"
                                            @file-removed="(payload) => {poutDtl.rsltImg.requestForDelete = payload}"
                                            @return-reset="poutDtl.rsltImg.resetCopyYn=false"
                                            :uploadable="fn_disabled()"
                                            :copyable="fn_disabled()"
                                            :reset-copy-yn="poutDtl.rsltImg.resetCopyYn"
                                            :downloadable="userDownloadable"
                                            :accept-extn="['png', 'gif', 'jpeg', 'jpg', 'bmp']"
                                            :limit-total-file-size="1024*1024*300"
                                            countable
                                            :file-type="'extCheckMngtViewQltyPicturePop2'"
                                        />
                                        <!-- :accept-extn="['pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'hwpx', 'png', 'gif', 'jpeg', 'jpg', 'bmp', 'txt']" -->
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <!-- <div v-else>
                        지적사항 없음
                    </div> -->
                </b-overlay>

                <p v-if="fn_disabled()" class="table_message mt20">{{'※ 확인서를 포함한 관련 자료를 등록해주세요.'}}</p>
                <LstFile
                    :lst-file-rst="poutMatter.attachments.fileRegistered"
                    :files="poutMatter.attachments.files"
                    :second-remove-file-id="poutMatter.attachments.requestForDelete"
                    @file-changed="(payload) => {poutMatter.attachments.files = payload}"
                    @file-removed="(payload) => {poutMatter.attachments.requestForDelete = payload}"
                    :uploadable="fn_disabled()"
                    :downloadable="userDownloadable"
                    :limit-total-file-size="1024*1024*300"
                    :accept-extn="['pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'hwpx', 'png', 'gif', 'jpeg', 'jpg', 'bmp', 'txt']"
                    />
                    <!-- :limit-file-count="20" -->

                <div class="button_box">
                    <strong> 3. {{ '점검자 평가' }} </strong>
                </div>
                <b-overlay 
                    :show="false"
                    :opacity="0.3"
                    :variant="'dark'"
                    :spinner-type="'none'"
                >
                    <div 
                        v-for="(checker, index) in defaultInfo.insctr.insctrId"
                        :key="index"
                        class="table_normal_list table_write"
                    >
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="15%">
                                <col width="25%">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th> {{'점검자'}} </th>
                                    <th> {{'내용'}} </th>
                                    <th> {{'평가 5점 : 아주 우호적 ↔ 1점 : 아주 비우호적'}} </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="4" class="ac"> {{checker.insctrNm}} </td>
                                    <td> 1. {{'자사에 대한 우호도'}} </td>
                                    <td class="ac" v-if="fn_disabled()">
                                        <label 
                                            v-for="item in Array(5).fill().map((item, idx) => idx+1).reverse()"
                                            :key="item"
                                            class="input_radio"
                                            :for="`mmnyFrndsp_${index}_${item}`"
                                        >
                                            <input 
                                                v-model="checker.mmnyFrndsp"
                                                type="radio" 
                                                :id="`mmnyFrndsp_${index}_${item}`"
                                                :value="item"
                                            />
                                            <span class="label_text">{{`${item}점`}}</span>
                                        </label>
                                    </td>
                                    <td v-else>
                                        {{`${checker.mmnyFrndsp}점`}}
                                    </td>
                                </tr>
                                <tr>
                                    <td> 2. {{'점검에 대한 적극성'}} </td>
                                    <td class="ac" v-if="fn_disabled()">
                                        <label 
                                            v-for="item in Array(5).fill().map((item, idx) => idx+1).reverse()"
                                            :key="item"
                                            class="input_radio" 
                                            :for="`chckIntatv_${index}_${item}`"
                                        >
                                            <input 
                                                v-model="checker.chckIntatv"
                                                type="radio" 
                                                :id="`chckIntatv_${index}_${item}`"
                                                :value="item"
                                                />
                                            <span class="label_text">{{`${item}점`}}</span>
                                        </label>
                                    </td>
                                    <td v-else>
                                        {{`${checker.chckIntatv}점`}}
                                    </td>
                                </tr>
                                <tr>
                                    <td> 3. {{'지적 내용에 대한 협의 가능성'}} </td>
                                    <td class="ac" v-if="fn_disabled()">
                                        <label 
                                            v-for="item in Array(5).fill().map((item, idx) => idx+1).reverse()"
                                            :key="item"
                                            class="input_radio" 
                                            :for="`dscssPosbl_${index}_${item}`"
                                        >
                                            <input 
                                                v-model="checker.dscssPosbl"
                                                type="radio" 
                                                :id="`dscssPosbl_${index}_${item}`"
                                                :value="item"
                                                />
                                            <span class="label_text">{{`${item}점`}}</span>
                                        </label>
                                    </td>
                                    <td v-else>
                                        {{`${checker.dscssPosbl}점`}}
                                    </td>
                                </tr>
                                <tr>
                                    <td> 4. {{'전반적인 성향에 대한 의견 작성'}} </td>
                                    <td v-if="fn_disabled()">
                                        <textarea 
                                            v-model="checker.opinionCn"
                                            class="form_control"
                                            :maxlength="500"
                                            :placeholder="'입력해주세요'"
                                        />
                                        <p class="table_message ar mt0">{{ checker.opinionCn ? checker.opinionCn.length : 0 }} / {{ 500 }}</p>
                                    </td>
                                    <td v-else>
                                         <pre class="form_control">{{checker.opinionCn}}</pre>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </b-overlay>
            </div>
        </div>

        <search-institution
            :ref-id="`ExtCheckMngtView_SearchInstitution`"
            :extrnl-instt-id="defaultInfo.extrnlInstt.extrnlInsttId"
            @set="fn_setInstitution"
        />
        <search-checker
            :ref-id="`ExtCheckMngtView_SearchChecker`"
            :extrnl-instt-id="defaultInfo.extrnlInstt.extrnlInsttId"
            :insctr-id="defaultInfo.insctr.insctrId"
            @set="fn_setChecker"
        />

        <employee-search
            :empl-pop-id="`ExtCheckMngtView_EmployeeSearch`"
            :site-mstr-id="basicInfo.siteMstrId ? basicInfo.siteMstrId : $store.getters['auth/getSiteMstrId']"
            @fn-employee-choice="fn_setReceiver"
            additional-searchable
        />
    </section>
</template>

<script>

import axios from 'axios'
// import _ from 'lodash'

import DatepickerRange from '@component/common/DatePickerRange.vue'
import LstFile from '@/pages/common/popup/LstFile'
import LstImg from '@/pages/common/popup/LstImg'
import SearchInstitution from '@modal/checkEdu/SearchInstitution.vue'
import SearchChecker from '@modal/checkEdu/SearchChecker.vue'
import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'
import _ from 'lodash'

import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

import { mapGetters } from 'vuex'

export default {
    name: 'ExtCheckMngtView',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        DatepickerRange,
        LstFile,
        LstImg,
        SearchInstitution,
        SearchChecker,
        EmployeeSearch,
    },
    watch: {
        'defaultInfo.chckKnd': {
            handler: function (newValue) {
                this.defaultInfo.chckKndNm = this.advancedInfo.chckKnd.find(knd => knd.codeVal === newValue)?.codeNameKr
            },
            deep: true
        },
        // promiseList: {
        //     handler: function (newValue) {
        //         console.log('promiseList: %o', newValue)
        //     },
        //     deep: true
        // },
    },
    computed: {
        ...mapGetters({
            userId:         'auth/getUserId',
            siteId :        'auth/getSiteId',
            siteNm :        'auth/getSiteNm',
            projectId :     'auth/getProjectId',
            projectNm :     'auth/getProjectNm',
            // baseTypeCd:     'auth/getBaseTypeCd',    // getBaseType
            // baseTypeName:   'auth/getBaseTypeName',  // getBaseTypeNm
            // gongsaType:     'auth/getGongsaTypeCd',  // getCsrtType
            // gongsaTypeNm:   'auth/getGongsaTypeNm',  // getCsrtTypeNm

            baseType:       'auth/getBaseType',
            baseTypeNm:     'auth/getBaseTypeNm',
            csrtType:       'auth/getCsrtType',
            csrtTypeNm:     'auth/getCsrtTypeNm',
            

            siteMstrId:     'auth/getSiteMstrId',

            // Id 여부에 따라서
            extrnlChckId:   'getExtCheckExtrnlChckId',
            poutDcsnDiv:    'getExtCheckPoutDcsnDiv',
        }),
        userWritable: {
            get: function () {
                return this.checkUser(this.userId, 'write')
            },
        },
        userUnusable: {
            get: function () {
                return this.checkUser(this.userId, 'unuse')
            },
        },
        userChangable: {
            get: function () {
                return this.checkUser(this.userId, 'change')
            },
        },
        userDownloadable: {
            get: function () {
                return this.checkUser(this.userId, 'down')
            },
        },
    },
    mounted: function () {
        this.fn_fetchAdvancedInfo()
        
        this.fn_initialize()
        
    },
    methods: {
        fn_initialize: function () {
            this.basicInfo = {
                siteId:         '',
                siteNm:         '',
                projectId:      '',
                projectNm:      '',
                // baseTypeCd:     '',
                // baseTypeName:   '',
                // gonsaType:      '',
                // gongsaTypeNm:   '',

                baseType:       '',
                baseTypeNm:     '',
                csrtType:       '',
                csrtTypeNm:     '',

                editable:       false
            }
            this.defaultInfo = {
                chckde:         [],
                chckKnd:        '',
                chckKndNm:      '',
                extrnlInstt: {
                    extrnlInsttNm: '',
                    extrnlInsttId: '',
                },
                insctr: {
                    insctrId: [],
                    insctrNmDtls: '',
                    insctrIdDtls: '',
                },
                chckPurpsCn: '',
            }
            this.hedofcSportRequst = {
                hedofcSportRequstYn : false,
                date: [null, null],
                sportRequstTitle: '',
                sportRequstCn: '',

                rcverId: '',
                rcverNm: '',
                rcverEmail: '',
                recptnDeptCd: '',
                recptnDeptNm: '',
                rcverJobNm: '',
            }

            this.poutMatter = {
                poutMatterYn: false,
                
                isAllChecked: false,
                list: [],

                attachments: {
                    poutFileConnectId: '',
                    fileRegistered: [],
                    files: [],
                    requestForDelete: [],
                }
            }

            if (this.extrnlChckId) {
                // add
                this.fn_fetch()
            } else {
                // registered
                this.basicInfo.siteId           = this.siteId
                this.basicInfo.siteNm           = this.siteNm
                this.basicInfo.projectId        = this.projectId
                this.basicInfo.projectNm        = this.projectNm
                // this.basicInfo.baseType         = this.baseType
                // this.basicInfo.baseTypeName     = this.baseTypeName
                // this.basicInfo.gongsaType       = this.gongsaType
                // this.basicInfo.gongsaTypeNm     = this.gongsaTypeNm
                this.basicInfo.baseType         = this.baseType
                this.basicInfo.baseTypeNm       = this.baseTypeNm
                this.basicInfo.csrtType         = this.csrtType
                this.basicInfo.csrtTypeNm       = this.csrtTypeNm


                /** 빈값 처리 */
                this.fn_addPout()
            }
        },
        fn_fetchAdvancedInfo: function () {
            const masterCode = {
                url: '/sendApi/api/common/masterCode/list',
                payload: {
                    siteMstrId: this.$cookies.get('siteMstrId'),
                }
            }
            const mainMidCode = {
                url: '/sendApi/api/common/mainMidCode/list',
                payload: {
                }
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios
                .all([
                    axios.post(masterCode.url,  {...masterCode.payload, groupCode: 'MNGT_TYPE'}, options),
                    axios.post(masterCode.url,  {...masterCode.payload, groupCode: 'POUT_MATTER_TYPE'}, options),
                    axios.post(masterCode.url,  {...masterCode.payload, upperGroupCode: 'POUT_MATTER_TYPE'}, options),
                    axios.post(masterCode.url,  {...masterCode.payload, groupCode: 'CHCK_KND'}, options),
                    axios.post(mainMidCode.url, {...mainMidCode.payload, codeType: 'EXTN'}, options),

                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.mngtType          = response[0].data.data
                    this.advancedInfo.poutMatterType    = response[1].data.data
                    this.advancedInfo.dem               = response[2].data.data
                    this.advancedInfo.chckKnd           = response[3].data.data
                    this.advancedInfo.mainCode          = response[4].data.dlMainCode
                    this.advancedInfo.midCode           = response[4].data.dlMidCode
                }))
                .catch(error => {
                    console.error(error)
                })
        },
        fn_disabled: function () {
            return !this.extrnlChckId || this.basicInfo.editable
        },
        fn_addPout: function () {
            /** Temporary */
            this.poutMatter.list.push({
                isChecked: false,

                poutMatterType: '',
                poutMatterTypeNm: '',
                dem: '',
                cntrwkKnd: '',
                cntrwkKndNm: '',
                cntrwkKndDtl: '',
                cntrwkKndDtlNm: '',

                insctrId: '',
                insctrNm: '',

                cnfrmnWritngYn: 'Y',
                
                chckPoutMatterCn: '',
                chckManagtCn: '',
                poutPhotoFileConnectId: '',
                rsltPhotoFileConnectId: '',

                poutImg: {
                    // fileConnectId: '',
                    fileRegistered: [],
                    files: [],
                    requestForDelete: [],
                    copiedFileIds : [],
                    resetCopyYn:false,
                },
                rsltImg: {
                    // fileConnectId: '',
                    fileRegistered: [],
                    files: [],
                    requestForDelete: [],
                    copiedFileIds : [],
                    resetCopyYn:false,
                },

                status: 'Added',

            })
        },
        fn_delPout: function () {
            // replace - filtered data
            // this.poutMatter.list = this.poutMatter.list.filter(item => !item.isChecked )
            this.poutMatter.list.forEach(item => {
                if (item.isChecked) {
                    item.status = 'Deleted'
                }
            })
            this.poutMatter.isAllChecked = false
        },
        fn_setInstitution: function (payload) {
            // console.log(payload)
            this.defaultInfo.extrnlInstt.extrnlInsttId = payload.extrnlInsttId
            this.defaultInfo.extrnlInstt.extrnlInsttNm = payload.extrnlInsttNm

            this.defaultInfo.insctr.insctrNmDtls = ''
            this.defaultInfo.insctr.insctrIdDtls = ''
            this.defaultInfo.insctr.insctrId = [];

        },
        fn_setChecker: function (payload) {
            this.defaultInfo.insctr.insctrNmDtls    = payload.selected.map(item => item.insctrNm).join(', ')
            this.defaultInfo.insctr.insctrIdDtls    = payload.selected.map(item => item.insctrId).join(', ')
            this.defaultInfo.insctr.insctrId        = payload.selected.map(item => {
                                                            return {
                                                                insctrId: item.insctrId,
                                                                insctrNm: item.insctrNm,

                                                                mmnyFrndsp: 5,
                                                                chckIntatv: 5,
                                                                dscssPosbl: 5,
                                                            }
                                                        })


            // maybe initialize user
            const deletedList = payload.deleted.map(item => String(item.insctrId))
            this.poutMatter.list.forEach(item => {
                if (deletedList.includes(String(item.insctrId))) item.insctrId = ''
            })


        },
        fn_setReceiver: function (payload) {
            this.hedofcSportRequst.rcverId      = payload.userId
            this.hedofcSportRequst.rcverNm      = payload.userNm
            this.hedofcSportRequst.recptnDeptCd = payload.workLocCd
            this.hedofcSportRequst.recptnDeptNm = payload.workLocNm
            this.hedofcSportRequst.rcverJobNm   = payload.jobTitle
            this.hedofcSportRequst.rcverEmail   = payload.email

        },
        fn_changedPoutCheck: function () {
            let validate = false
            this.poutMatter.list.some(item => {
                if(!item.isChecked) {
                    validate = true
                    return false
                }
            })
            this.poutMatter.isAllChecked = !validate
        },
        fn_setFileConnectId: function (payload, object, type) {
            if( !object[`${type}PhotoFileConnectId`] && (payload.file.length > 0 || payload.copyIds.length > 0 ) ) {
                this.fn_fetchPhotoSeq(type, response => {
                    object[`${type}PhotoFileConnectId`] = response.data
                })
            }
        },
        fn_set: function () {
            
        },
        fn_save: function () {
            // validate - error
            

            // defaultInfo
            // console.log(this.defaultInfo.chckde)
            if (this.defaultInfo.chckde === [null, null] || this.defaultInfo.chckde.length === 0 || this.defaultInfo.chckde === []) {
                this.alert('1. 기본정보 - 점검일을 선택해주세요')
                return
            }
            if (!this.fn_isNotEmpty(this.defaultInfo.chckKnd)) {
                this.alert('1. 기본정보 - 점검종류를 선택해주세요')
                return
            }
            if (!this.fn_isNotEmpty(this.defaultInfo.extrnlInstt.extrnlInsttId)) {
                this.alert('1. 기본정보 - 점검기관를 선택해주세요')
                return
            }
            if (!this.fn_isNotEmpty(this.defaultInfo.extrnlInstt.extrnlInsttId)) {
                this.alert('1. 기본정보 - 점검기관를 선택해주세요')
                return
            }
            if (!this.fn_isNotEmpty(this.defaultInfo.insctr.insctrIdDtls) ) {
                this.alert('1. 기본정보 - 점검자를 선택해주세요')
                return
            }
            if (!this.fn_isNotEmpty(this.defaultInfo.chckPurpsCn)) {
                this.alert('1. 기본정보 - 상세 점검 목적를 선택해주세요')
                return
            }

            if (this.hedofcSportRequst.hedofcSportRequstYn) {
                if(this.hedofcSportRequst.date.some(date => date == null)) {
                    this.alert('1. 기본정보 - 본사 출장 지원 요청 - 출장 기간을 선택해주세요')
                    return 
                }
                if(!this.fn_isNotEmpty(this.hedofcSportRequst.rcverId)) {
                    this.alert('1. 기본정보 - 본사 출장 지원 요청 - 수신자를 선택해주세요')
                    return 
                }
                // if(!this.fn_isNotEmpty(this.hedofcSportRequst.sportRequstTitle)) {
                //     this.alert('1. 기본정보 - 본사 출장 지원 요청 - 제목을 선택해주세요')
                //     return 
                // }
                if(!this.fn_isNotEmpty(this.hedofcSportRequst.sportRequstCn)) {
                    this.alert('1. 기본정보 - 본사 출장 지원 요청 - 요청사항을 선택해주세요')
                    return 
                }
            }

            // poutMatter
            if (this.poutMatter.poutMatterYn) {
                let validate = false
                this.poutMatter.list
                    .filter(pout => pout.status != 'Deleted')
                    .some((pout, index) => {

                        if (!this.fn_isNotEmpty(pout.poutMatterType)) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 지적사항을 선택해주세요`)
                            return true
                        }
                        if (!this.fn_isNotEmpty(pout.dem)) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 벌점을 선택해주세요`)
                            return true
                        }
                        if (!this.fn_isNotEmpty(pout.cntrwkKnd)) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 분야를 선택해주세요`)
                            return true
                        }
                        if (!this.fn_isNotEmpty(pout.cntrwkKnd)) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 대상 공종을 선택해주세요`)
                            return true
                        }
                        if (!this.fn_isNotEmpty(pout.insctrId)) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 점검자를 선택해주세요`)
                            return true
                        }
                        if (!this.fn_isNotEmpty(pout.cnfrmnWritngYn)) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 확인서 작성 여부를 선택해주세요`)
                            return true
                        }
                        if (!this.fn_isNotEmpty(pout.title)) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 제목을 선택해주세요`)
                            return true
                        }
                        if (!this.fn_isNotEmpty(pout.chckPoutMatterCn)) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 상세 내용을 선택해주세요`)
                            return true
                        }
                        if (!this.fn_isNotEmpty(pout.chckManagtCn)) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 조치사항을 선택해주세요`)
                            return true
                        }
                        if (pout.poutImg.fileRegistered.length + pout.poutImg.files.length + pout.poutImg.copiedFileIds.length === 0) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 조치 전 사진을 넣어주세요`)
                            return true
                        }
                        if (pout.rsltImg.fileRegistered.length + pout.rsltImg.files.length + pout.rsltImg.copiedFileIds.length === 0) {
                            validate = true
                            this.alert(`2. 지적사항 - No.${index+1} - 조치 후 사진을 넣어주세요`)
                            return true
                        }
                    })
                    if (validate) return true
                }

            /** 3번항목 validate */
                // 점검자 평가 - 의견작성 null 변경 
                this.defaultInfo.insctr.insctrId.forEach((insctr, index) => {
                    insctr.opinionCn = insctr.opinionCn ? insctr.opinionCn : ''
                })

            // if (this.defaultInfo.insctr.insctrId.length > 0) {
            //     let validate = false
            //     this.defaultInfo.insctr.insctrId.some((insctr, index) => {
            //         if (!this.fn_isNotEmpty(insctr.mmnyFrndsp)) {
            //             validate = true
            //             this.alert(`3. 점검자 평가 - No.${index+1} - '자사에 대한 우호도'을 선택해주세요`)
            //             return true
            //         }
            //         if (!this.fn_isNotEmpty(insctr.chckIntatv)) {
            //             validate = true
            //             this.alert(`3. 점검자 평가 - No.${index+1} - '점검에 대한 적극성'을 선택해주세요`)
            //             return true
            //         }
            //         if (!this.fn_isNotEmpty(insctr.dscssPosbl)) {
            //             validate = true
            //             this.alert(`3. 점검자 평가 - No.${index+1} - '지적 내용에 대한 협의'을 선택해주세요`)
            //             return true
            //         }
            //         if (!this.fn_isNotEmpty(insctr.opinionCn)) {
            //             validate = true
            //             this.alert(`3. 점검자 평가 - No.${index+1} - '전반적인 성향에 대한 의견 작성'을 작성해주세요`)
            //             return true
            //         }
            //     })
            //     if (validate) return true
            // }

            // regist process - imgConnectedId - data - file


            // new Setup

            
            
            new Promise(resolve => {
                this.fn_setData(response => {
                    resolve(response)
                })
            })
            .then(response => {
                // saveImg
                this.poutMatter.list.forEach((item) => {

                    // delete files
                    if (item.poutPhotoFileConnectId && item.poutImg.requestForDelete.length > 0) {
                        this.fn_delFile(item.poutImg.requestForDelete, 'ExtCheck')
                    }

                    if (item.rsltPhotoFileConnectId && item.rsltImg.requestForDelete.length > 0) {
                        this.fn_delFile(item.rsltImg.requestForDelete, 'ExtCheck')
                    }

                    if (item.poutPhotoFileConnectId && (item.poutImg.files.length > 0 || item.poutImg.copiedFileIds.length > 0)) {
                        this.fn_setFiles(item.poutPhotoFileConnectId, item.poutImg.files, 'ExtCheck', item.poutImg.copiedFileIds)
                    }

                    if (item.rsltPhotoFileConnectId && (item.rsltImg.files.length > 0 || item.rsltImg.copiedFileIds.length > 0)) {
                        this.fn_setFiles(item.rsltPhotoFileConnectId, item.rsltImg.files, 'ExtCheck', item.rsltImg.copiedFileIds)
                    }
                })

                if (this.poutMatter.attachments.requestForDelete.length > 0) {
                    this.fn_delFile(this.poutMatter.attachments.requestForDelete, 'ExtCheck')
                }

                if (this.poutMatter.attachments.files.length > 0) {

                    const poutFileConnectId     = this.fn_isNotEmpty(this.poutMatter.attachments.poutFileConnectId)
                                                    ? this.poutMatter.attachments.poutFileConnectId
                                                    : this.fn_isNotEmpty(response.data.dmExtrnChckInfo.poutFileConnectId)
                                                        ? response.data.dmExtrnChckInfo.poutFileConnectId
                                                        : this.fn_isNotEmpty(response.data.dmExtrnChckInfo.extrnlChckId)
                                                            ? `POU_${response.data.dmExtrnChckInfo.extrnlChckId}`
                                                            : `POU_${this.extrnlChckId}`

                    
                    this.fn_setFiles(poutFileConnectId, this.poutMatter.attachments.files, 'ExtCheck')
                }
            })
            .then(() => {
                // console.log('here?')
                this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                this.alert('저장이 완료되었습니다.', () => {
                    this.$router.push({name: 'ExtCheckMngtSheet'})
                    // this.fn_initialize()
                })
            })
        },
        fn_setFiles: function (fileConnectId, files, fileType, copiedFileIds, callback) {
            const url = '/sendApi/api/fileUp/fileUploads'

            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }
            const formData = new FormData()
            formData.append('fileConnectId', fileConnectId)
            formData.append('fileType', fileType)
            if(copiedFileIds){
                formData.append('fileCopyIds',copiedFileIds.toString())
            }
            files.forEach(file => formData.append('file', file))
            
            axios.post(url, formData, options)
                .then(response => {
                    if(response.status === 200 ) {
                        if (callback) return callback()
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_delFile: function (fileChkEduArcvIds, fileType = 'ExtCheck', callback) {
            const url = '/sendApi/api/file/fileUnUse'
            const payload = {
                fileChkEduArcvIds: fileChkEduArcvIds,
                fileType: fileType,
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200 ) {
                        if (callback) return callback()
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_getFiles: function (fileConnectId, fileType = 'ExtCheck', callback) {
            const url = '/sendApi/api/file/upFileList'
            const payload = {
                fileConnectId: fileConnectId,
                fileType: fileType
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (callback) return callback(response.data.data)
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_fetchPhotoSeq: function (type = 'pout', callback) {
            const url = {
                pout: '/sendApi/api/extrnlChck/extrnlChckPoutPhotoSeq/write',
                rslt: '/sendApi/api/extrnlChck/extrnlChckRsltPhotoSeq/write'
                
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url[type], {}, options )
                .then(response => {
                    if (callback ) {
                        return callback(response)
                    } else {
                        return response
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        // temporary
        fn_setData: function (callback) {
            /**
             * AdvancedInfo File Id Prefix
             *  - 계획 첨부파일     ID 접두어:   'PLN_'
             *  - 점검결과 첨부파일 ID 접두어:   'POU_'
             *  - 확정결과 첨부파일 ID 접두어:   'DSN_'
             *  - 지원요청 첨부파일 ID 접두어:   'REQ_'
             *  - 심의위원회 첨부파일 ID 접두어: 'DLB_'
             */

            /**
             *  date-type   : null,
             *  string-type : empty-string('') 
             * 
             */
            const url   = this.extrnlChckId 
                            ? '/sendApi/api/extrnlChck/extrnlChckInfo/change'
                            : '/sendApi/api/extrnlChck/extrnlChckInfo/write'

            const payload = {
                dmExtrnChckInfo: {

                    extrnlChckId:           this.extrnlChckId ? this.extrnlChckId : '',
                    projectId:              this.basicInfo.projectId,
                    chckPlanBgnde:          this.defaultInfo.chckde[0],
                    chckPlanEndde:          this.defaultInfo.chckde[1],
                    extrnlInsttId:          this.defaultInfo.extrnlInstt.extrnlInsttId,
                    insctrIdDtls:           this.defaultInfo.insctr.insctrIdDtls,
                    insctrNmDtls:           this.defaultInfo.insctr.insctrNmDtls,
                    chckKnd:                this.defaultInfo.chckKnd,
                    chckPurpsCn:            this.defaultInfo.chckPurpsCn,
                    planFileConnectId:      '', 
                    frstChckde:             this.defaultInfo.chckde[0],
                    chckde:                 this.defaultInfo.chckde[0],
                    chckCn:                 '',
                    partclrMatterCn:        '',
                    poutFileYn:             this.poutMatter.attachments.fileRegistered.length + this.poutMatter.attachments.files.length > 0 ? 'Y' : 'N',
                    poutFileConnectId:      this.fn_isNotEmpty(this.poutMatter.attachments.poutFileConnectId) ? this.poutMatter.attachments.poutFileConnectId : (this.fn_isNotEmpty(this.extrnlChckId) ? `POU_${this.extrnlChckId}` : ''),
                    dcsnFileYn:             'N',
                    dcsnFileConnectId:      '',
                    poutMatterYn:           this.poutMatter.poutMatterYn ? 'Y' : 'N',
                    hedofcSportRequstYn:    this.hedofcSportRequst.hedofcSportRequstYn ? 'Y' : 'N',
                    sportRequstBgnde:       this.hedofcSportRequst.hedofcSportRequstYn ? this.hedofcSportRequst.date[0]             : null,
                    sportRequstEndde:       this.hedofcSportRequst.hedofcSportRequstYn ? this.hedofcSportRequst.date[1]             : null,
                    recptnDeptCd:           this.hedofcSportRequst.hedofcSportRequstYn ? this.hedofcSportRequst.recptnDeptCd        : '',
                    recptnDeptNm:           this.hedofcSportRequst.hedofcSportRequstYn ? this.hedofcSportRequst.recptnDeptNm        : '',
                    rcverId:                this.hedofcSportRequst.hedofcSportRequstYn ? this.hedofcSportRequst.rcverId             : '',
                    rcverNm:                this.hedofcSportRequst.hedofcSportRequstYn ? this.hedofcSportRequst.rcverNm             : '',
                    rcverEmail:             this.hedofcSportRequst.hedofcSportRequstYn ? this.hedofcSportRequst.rcverEmail          : '',
                    sportRequstTitle:       this.hedofcSportRequst.hedofcSportRequstYn ? this.hedofcSportRequst.sportRequstTitle    : '',
                    sportRequstCn:          this.hedofcSportRequst.hedofcSportRequstYn ? this.hedofcSportRequst.sportRequstCn       : '',
                    progrsState:            '',
                    resultSportRequstYn:    '',
                    resultDlbrtCmitYn:      '',
                    demLastDcsnYn:          '',

                },
                dlPoutMatter: this.poutMatter.poutMatterYn
                                                    ? this.poutMatter.list.map((item) => {
                                                        if (item.status !== 'Deleted') {
                                                            item.status             = this.fn_isNotEmpty(item.poutMatterSeq)
                                                                                        ? 'Changed'
                                                                                        : 'Added'
                                                        }
                                                        item.projectId              = this.basicInfo.projectId
                                                        item.extrnlInsttId          = this.defaultInfo.extrnlInstt.extrnlInsttId
                                                        item.demYn                  = 'Y'
                                                        item.dcsnOfldcYn            = ''
                                                        item.dcsnDocRecptnDe        = null
                                                        item.poutType               = ''
                                                        item.dcsnDocDem             = ''
                                                        item.dcsnResultManagtTrget  = ''
                                                        item.dcsnResultManagtCn     = ''
                                                        item.demDcsnYn              = ''
                                                        item.lastDem                = ''
                                                        item.demDcsnDe              = null

                                                        // if (imgSeqList[2*index])    item.poutPhotoFileConnectId = imgSeqList[2*index]
                                                        // if (imgSeqList[2*index+1])  item.dcsnPhotoFileConnectId = imgSeqList[2*index+1]
                                                        // item.poutMatterSeq = index
                                                        // insctrId
                                                        // poutMatterType
                                                        // cntrwkKnd
                                                        // cntrwkKndDtl
                                                        // dem
                                                        // cnfrmnWritngYn
                                                        // title
                                                        // chckPoutMatterCn
                                                        // chckManagtCn
                                                        
                                                        return item
                                                    })
                                                    : [],
                dlExtrnInsctr: this.defaultInfo.insctr.insctrId
                                                    .map((item, index) => {
                                                        item.chckInYn   = this.poutMatter.list.filter(pout => String(pout.insctrId) === String(item.insctrId)).length > 0 ? 'Y' : 'N'
                                                        if (this.fn_isNotEmpty(item.insctrSeq)) {
                                                            item.status     = item.status !== 'Deleted' ? 'Changed' : 'Deleted'
                                                        } else {
                                                            item.status     = item.status !== 'Deleted' ? 'Added' : 'Deleted'
                                                            item.insctrSeq  = index
                                                        }
                                                        // if (item.status !== 'Deleted')  {
                                                        //     item.status     = this.fn_isNotEmpty(item.insctrSeq)
                                                        //                         ? 'Changed'
                                                        //                         : 'Added'
                                                        // }
                                                        // item.insctrSeq  = this.fn_isNotEmpty(item.insctrSeq)
                                                        //                     ? item.insctrSeq 
                                                        //                     : index
                                                        return item
                                                    }),
                dlInsctrEvlList: this.defaultInfo.insctr.insctrId
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }
            // console.log(payload)

            axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)
                    /** 통합 알림 처리 */
                    if (!this.extrnlChckId) {
                        this.fn_getUserInfo((dlUser) => {
                            // 점검 등록시 알림
                            this.fn_sendMessage({
                                messageCode:    'A044',
                                reciveUserIds:   dlUser.map(item => item.userId)
                            })

                            // if (payload.dlPoutMatter.filter(item => item.cnfrmnWritngYn === 'Y').length > 0) {
                            //     this.fn_sendMessage({
                            //         messageCode:    'A047',
                            //         reciveUserIds:   dlUser.map(item => item.userId)
                            //     })
                            // }
                        })

                        if(this.hedofcSportRequst.hedofcSportRequstYn && !this.hedofcSportRequst.hedofcSportRequstYnOrigin) {
                            // hedofcSportRequst.rcverId
                            this.fn_sendMessage({
                                messageCode:    'A045',
                                reciveUserId:   this.hedofcSportRequst.rcverId
                            })
                        }

                        // if (payload.dlPoutMatter.filter(item => item.cnfrmnWritngYn === 'Y').length > 0) {
                        //     this.fn_sendMessage({
                        //         messageCode:    'A047',
                        //         reciveUserId:   this.hedofcSportRequst.rcverId
                        //     })
                        // }
                    }

                    if (callback) callback(response)
                    // if (response?.status === 200) {
                    //     // this.alert('저장이 완료되었습니다.')
                    // } else {
                    //     this.alert('저장에 실패했습니다.')
                    // }

                    // this.$router.push({ name: 'ExtCheckMngtSheet'})
                })
                .catch(error => {
                    console.error(error)
                })

            
        },
        // temporary
        fn_fetch: function () {
            const url = '/sendApi/api/extrnlChck/extrnlChckPoutMatter/view'
            const payload = {
                extrnlChckId: this.extrnlChckId
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)

                    this.basicInfo.projectId                        = response.data.dmExtrnChckInfo.projectId
                    this.basicInfo.projectNm                        = response.data.dmExtrnChckInfo.projectNm
                    this.basicInfo.publicType                       = response.data.dmExtrnChckInfo.publicType
                    this.basicInfo.publicTypeNm                     = response.data.dmExtrnChckInfo.publicTypeNm
                    this.basicInfo.baseType                         = response.data.dmExtrnChckInfo.baseType
                    this.basicInfo.baseTypeNm                       = response.data.dmExtrnChckInfo.baseTypeNm
                    this.basicInfo.csrtType                         = response.data.dmExtrnChckInfo.csrtType
                    this.basicInfo.csrtTypeNm                       = response.data.dmExtrnChckInfo.csrtTypeNm
                    this.basicInfo.mngtType                         = response.data.dmExtrnChckInfo.mngtType
                    this.basicInfo.mngtTypeNm                       = response.data.dmExtrnChckInfo.mngtTypeNm
                    this.basicInfo.siteNm                           = response.data.dmExtrnChckInfo.siteNm
                    this.basicInfo.siteId                           = response.data.dmExtrnChckInfo.siteId
                    this.basicInfo.siteMstrId                       = response.data.dmExtrnChckInfo.siteMstrId
                    // this.basicInfo.gongsaTypeNm                     = response.data.dmExtrnChckInfo.gongsaTypeNm

                    this.defaultInfo.chckKnd                        = response.data.dmExtrnChckInfo.chckKnd
                    this.defaultInfo.chckde                         = [response.data.dmExtrnChckInfo.chckPlanBgnde.replaceAll('-',''), response.data.dmExtrnChckInfo.chckPlanEndde.replaceAll('-','')]
                    this.defaultInfo.chckPurpsCn                    = response.data.dmExtrnChckInfo.chckPurpsCn

                    this.defaultInfo.extrnlInstt.extrnlInsttId      = response.data.dmExtrnChckInfo.extrnlInsttId
                    this.defaultInfo.extrnlInstt.extrnlInsttNm      = response.data.dmExtrnChckInfo.extrnlInsttNm
                    this.defaultInfo.insctr.insctrIdDtls            = response.data.dmExtrnChckInfo.insctrIdDtls
                    this.defaultInfo.insctr.insctrNmDtls            = response.data.dmExtrnChckInfo.insctrNmDtls

                    this.defaultInfo.finlCmpltYn                    = response.data.dmExtrnChckInfo.finlCmpltYn                    

                    this.hedofcSportRequst.hedofcSportRequstYn      = response.data.dmExtrnChckInfo.hedofcSportRequstYn === 'Y' ? true : false
                    this.hedofcSportRequst.date                     = [response.data.dmExtrnChckInfo.sportRequstBgnde?.replaceAll('-',''), response.data.dmExtrnChckInfo.sportRequstEndde?.replaceAll('-','')]
                    this.hedofcSportRequst.rcverId                  = response.data.dmExtrnChckInfo.rcverId
                    this.hedofcSportRequst.rcverNm                  = response.data.dmExtrnChckInfo.rcverNm
                    this.hedofcSportRequst.recptnDeptCd             = response.data.dmExtrnChckInfo.recptnDeptCd
                    this.hedofcSportRequst.recptnDeptNm             = response.data.dmExtrnChckInfo.recptnDeptNm
                    this.hedofcSportRequst.rcverEmail               = response.data.dmExtrnChckInfo.rcverEmail
                    this.hedofcSportRequst.sportRequstTitle         = response.data.dmExtrnChckInfo.sportRequstTitle
                    this.hedofcSportRequst.sportRequstCn            = response.data.dmExtrnChckInfo.sportRequstCn
                    
                    this.hedofcSportRequst.hedofcSportRequstYnOrigin= response.data.dmExtrnChckInfo.hedofcSportRequstYn === 'Y' ? true : false

                    this.poutMatter.attachments.poutFileConnectId   = response.data.dmExtrnChckInfo.poutFileConnectId
                    this.poutMatter.poutMatterYn                    = response.data.dmExtrnChckInfo.poutMatterYn === 'Y' ? true : false
                    

                    // this.defaultInfo.insctr.insctrId                = response.data.dlInsctrEvl
                    // this.defaultInfo.insctr.insctrId                = response.data.dlExtrnInsctr
                    
                    this.defaultInfo.insctr.insctrId                = response.data.dlExtrnInsctr.map((item, index) => {
                                                                            const dlExtrnInsctr = _.cloneDeep(item)
                                                                            Object.keys(dlExtrnInsctr).forEach(key => {
                                                                                if(!dlExtrnInsctr[key]) delete dlExtrnInsctr[key]
                                                                            })

                                                                            const dlInsctrEvl = _.cloneDeep(response.data.dlInsctrEvl[index])
                                                                            Object.keys(dlInsctrEvl).forEach(key => {
                                                                                if(!dlInsctrEvl[key]) delete dlInsctrEvl[key]
                                                                            })

                                                                            return {
                                                                                ...dlExtrnInsctr,
                                                                                ...dlInsctrEvl,
                                                                            }
                                                                        })

                    this.poutMatter.list                            = response.data.dlPoutMatter.map((pout) => {
                                                                                            pout.cntrwkKndNm    = this.advancedInfo.mainCode.find(item => item.mainCodeId === pout.cntrwkKnd)?.mainName
                                                                                            pout.cntrwkKndDtlNm = this.advancedInfo.midCode.find(item => item.midCodeId === pout.cntrwkKndDtl)?.midName

                                                                                            pout.poutImg = {
                                                                                                fileRegistered: [],
                                                                                                files: [],
                                                                                                requestForDelete: [],
                                                                                                copiedFileIds:[],
                                                                                            }
                                                                                            pout.rsltImg = {
                                                                                                fileRegistered: [],
                                                                                                files: [],
                                                                                                requestForDelete: [],
                                                                                                copiedFileIds:[],
                                                                                            }
                                                                                            return pout
                                                                                        })

                    

                })
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    this.poutMatter.list.forEach(item => {
                        // if (item.)
                        if (item.poutPhotoFileConnectId) {
                            this.fn_getFiles(item.poutPhotoFileConnectId, 'ExtCheck', files => {
                                item.poutImg.fileRegistered = files
                            })
                        }
                        if (item.rsltPhotoFileConnectId) {
                            this.fn_getFiles(item.rsltPhotoFileConnectId, 'ExtCheck', files => {
                                item.rsltImg.fileRegistered = files
                            })
                        }
                    })

                    if (this.poutMatter.attachments.poutFileConnectId) {
                        this.fn_getFiles(this.poutMatter.attachments.poutFileConnectId, 'ExtCheck', (files) => {
                            this.poutMatter.attachments.fileRegistered = files
                        })
                    }
                })
        },
        fn_isNotEmpty: function (obj) {
            // return !(obj === null || obj === undefined || String(obj).trim() === '')
            return !(obj === null || obj === undefined || String(obj).trim() === '')
        },
        fn_downloadRule: function () {
            // const fileId = 'FEDU_00000000000182'
            // const url = '/sendApi/api/file/singleFileDownload'

            // const payload = {
            //     fileId: fileId
            // }

            // axios.post(url, payload, {
            //     headers: {
            //         'Accept-Language': 'ko',
            //         'Authorization': this.$cookies.get("Authorization"),
            //     },
            //     responseType: 'blob'
            // }).then(response => {
            //     const blob = new Blob([response.data])
            //     const fileName = '[별표 8] 건설공사 등의 벌점관리기준(제87조제5항 관련)(건설기술 진흥법 시행령).pdf'

            //     // Internet Explorer
            //     if (typeof window.navigator.msSaveBlob !== 'undefined') {
            //         window.navigator.msSaveOrOpenBlob(blob, fileName)
            //     // Other Browsers
            //     } else {
            //         const objectUrl = window.URL.createObjectURL(blob);
            //         const link = document.createElement('a')

            //         link.style.cssText = 'display:none'
            //         link.href = objectUrl
            //         link.setAttribute('download', fileName)

            //         if (typeof link.download === 'undefined') {
            //             link.setAttribute('target', '_blank')
            //         }

            //         document.body.appendChild(link)
            //         link.click()
            //         link.remove()
            //         window.URL.revokeObjectURL(objectUrl)

            //     }
            // }).catch(error => {
            //     console.error(error)
            //     throw new Error(error)
            // })
            const url = '/sendApi/api/file/guideFileDownload'
               const payload = {
                  codeVal: 'DEM_RULE'
               }
               const options = {
                  headers: {
                     'Authorization': this.$cookies.get('Authorization'),
                     'Content-Type': 'multipart/form-data; charset=utf-8;',
                     'Accept-Language': 'ko'
                  },
                  responseType: 'blob'
               }
               axios.post(url, payload, options)
                  .then(response => {
                     const blob = new Blob([response.data])
                     const fileName = '[별표 8] 건설공사 등의 벌점관리기준(제87조제5항 관련)(건설기술 진흥법 시행령).pdf'

                     // Internet Explorer
                     if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        window.navigator.msSaveOrOpenBlob(blob, fileName)
                     // Other Browsers
                     } else {
                        const objectUrl = window.URL.createObjectURL(blob);
                        const link = document.createElement('a')

                        link.style.cssText = 'display:none'
                        link.href = objectUrl
                        link.setAttribute('download', fileName)

                        if (typeof link.download === 'undefined') {
                           link.setAttribute('target', '_blank')
                        }

                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        window.URL.revokeObjectURL(objectUrl)
                     }
                  })
        },
        fn_remove: function () {
            this.confirm('삭제하시겠습니까?', () => {
                const url = '/sendApi/api/extrnlChck/extrnlChckInfo/unuse'
                const payload = {
                    extrnlChckId: this.extrnlChckId
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }
    
                axios.post(url, payload, options)
                    .then(() => {
                        this.alert('삭제되었습니다.', () => {
                            this.$router.push({name: 'ExtCheckMngtSheet'})
                        })
                    })
            })
        },
        /* 최종완료 처리 */
        fn_exterminate: function () {

            this.confirm('최종완료 하시겠습니까?', () => {
                const url ='/sendApi/api/extrnlChck/extrnlExtrnlChckFinlExterminate/update'
                const payload = {
                    extrnlChckId: this.extrnlChckId,
                    finlCmpltYn:  'Y',
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.post(url, payload, options)
                    .then(response => {
                        if (response.status === 200) {
                            this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                            this.alert('최종완료되었습니다.', () => {
                                this.fn_fetch()
                            })
                        } else {
                            throw new Error('fn_exterminate')
                        }
                    })
                    .catch(() => {
                        this.alert('최종완료에 실패했습니다.')
                    })

            })




        },

        /** 통합메세지 처리 */
        fn_sendMessage: function (_payload) {
            const url       = '/sendApi/api/messageMngt/message/send'
            const payload   = {
                                messageCode:    ''    ,
                                userId:         this.userId,
                                projectId:      this.projectId,
                                projectName:    this.projectNm,
                                // siteMstrId:     this.siteMstrId,
                                siteMstrId:     this.basicInfo.siteMstrId || this.siteMstrId,
                                // reciveUserId:
                                // reciveuserIds:
                                // docSeq:         this.docSeq,

                                ..._payload,
                            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(() => {
                    // console.log(response)
                })
        },
        fn_getUserInfo: function (callback) {
            const url = '/sendApi/api/myWork/userMngt/userMngt/list'
            const payload = {
                groupAuthDtlId: 'GADT_0000000001'
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200) {
                        if (callback) {
                            return callback(response.data.datas.dlUser)
                        }
                    }
                })
                .catch(error => {
                    console.error(error)
                })

        },


        
    },
    data: function () {
        return {
                    

            /** 사전정보 */
            advancedInfo: {
                mngtType: [],
                poutMatterType: [],
                chckKnd: [],
                dem: [],
                mainCode: [],
                midCode: [],
            },

            /** 상단 기본정보 */
            basicInfo: {
                siteId: '',
                siteNm: '',
                projectId: '',
                projectNm: '',
                // baseTypeCd: '',
                // baseTypeName: '',
                // gonsaType: '',
                // gongsaTypeNm: '',

                baseType: '',
                baseTypeNm: '',
                csrtType: '',
                csrtTypeNm: '',

                editable: false
            },

            // 1. 기본정보
            defaultInfo : {
                chckde: [null, null],
                chckKnd: '',
                chckKndNm: '',
                extrnlInstt: {
                    extrnlInsttNm: '',
                    extrnlInsttId: '',
                },
                insctr: {
                    insctrId: [],
                    insctrNmDtls: '',
                    insctrIdDtls: '',
                },
                chckPurpsCn: '',
                
                finlCmpltYn: 'N',       // 최종완료여부
            },

            // 1-1. 지원요청
            hedofcSportRequst: {
                hedofcSportRequstYn : false,
                date: [null, null],
                sportRequstTitle: '',
                sportRequstCn: '',

                rcverId: '',
                rcverNm: '',
                rcverEmail: '',
                recptnDeptCd: '',
                recptnDeptNm: '',
                rcverJobNm: '',
            },

            // 2. 지적사항
            poutMatter: {
                poutMatterYn: false,
                
                isAllChecked: false,
                list: [],

                attachments: {
                    poutFileConnectId: '',
                    fileRegistered: [],
                    files: [],
                    requestForDelete: [],
                }
            },

        }
    }
    
}

</script>
