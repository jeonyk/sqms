<template>
    <div>
    <!-- <Header /> -->
    <div class="inner">
        <grid-layout :layout.sync="layout"
            :col-num="colNum"
            :row-height="92"
            :is-draggable="draggable"
            :is-resizable="resizable"
            :vertical-compact="true"
            :use-css-transforms="true"
            :margin="[20, 20]"
        >
            <grid-item v-for="item in layout" :key="item.layoutCd"
               :x="item.x"
               :y="item.y"
               :w="item.w"
               :h="item.h"
               :i="item.layoutCd"
               drag-allow-from=".vue-draggable-handle"
               drag-ignore-from=".no-drag"
            >
                <!-- My Work -->
                <div v-if="item.layoutViewId == 'myWork'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>

                    <div class="desc">
                        <div class="multi_area mywork">
                            <div class="left_area">
                                <h3 class="small_title">
                                    오늘의 결재
                                </h3>

                                <ul class="lst_desc">
                                    <li v-for="(item, index) in myWorkAprv" :key="index">
                                        <p>{{item.codeName}}</p>
                                        <p>
                                            <a href="javascript:void(0);" @click="fn_aprvPage(item.codes)" :class="{warning: item.cnts == 0}">{{item.cnts}}</a>건
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div class="right_area">
                                <h3 class="small_title">
                                    나의 할 일
                                </h3>

                                <ul v-if="myWork.length > 0" class="lst_desc">
                                    <li v-for="(item, index) in myWork" :key="index">
                                        <p><a href="javascript:void(0);" @click="fn_myWorkPage(item.myWorkInfoId)" >{{item.title}}</a></p>
                                        <p><span>{{ $moment(item.inDttm).format('YY-MM-DD') }}</span></p>
                                    </li>
                                </ul>
                                <ul class="lst_desc" v-else>
                                    <li>조회된 일정이 없습니다.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 품질 지표 관리 -->
                <div v-if="item.layoutViewId == 'qlityIxMngt'" class="item">
                    <div class="title">
                        <h3><a href="javascript:void(0);">{{item.layoutNm}}</a></h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>

                    <div class="desc">
                        <div class="chart_area">
                           <div class="ibchart">
                              <p class="ibchart_title">벌점현황</p>
                              <div class="chart_data">
                                 <LineChart id="extnrDemInfoLinechart" :data="extnrDemInfoLinechartData" :options="qultyStatsLinechartOptions" class="linechart" ref="extnrDemInfoLinechart"></LineChart>
                              </div>
                           </div>
                           <div class="ibchart">
                              <p class="ibchart_title">PQI 점수</p>
                              <div class="chart_data">
                                 <LineChart id="pqiPointInfoLinechart" :data="pqiPointInfoLinechartData" :options="qultyStatsLinechartOptions" class="linechart" ref="pqiPointInfoLinechart"></LineChart>
                              </div>
                           </div>
                           <div class="ibchart">
                              <p class="ibchart_title">대외기관 지적건수</p>
                              <div class="chart_data">
                                 <BarChart id="extnrInsttInfoBarchart" :data="extnrInsttInfoBarchartData" :options="qultyStatsBarchartOptions" class="barchart" ref="extnrInsttInfoBarchart"></BarChart>
                              </div>
                           </div>
                           <div class="ibchart">
                              <p class="ibchart_title">BS점검 미조치율</p>
                              <div class="chart_data">
                                 <LineChart id="bsChckOpenInfoLinechart" :data="bsChckOpenInfoLinechartData" :options="qultyStatsLinechartOptions" class="linechart" ref="bsChckOpenInfoLinechart"></LineChart>
                              </div>
                           </div>
                           <div class="ibchart">
                              <p class="ibchart_title">CAR/NCR/Punch 미종결건수</p>
                              <div class="chart_data">
                                 <BarChart id="nonCnfrmOpenBarchart" :data="nonCnfrmOpenBarchartData" :options="qultyStatsBarchartOptions" class="barchart" ref="nonCnfrmOpenBarchart"></BarChart>
                              </div>
                           </div>
                        </div>
                     </div>
                </div>

                <!-- 프로젝트 정보 -->
                <div v-if="item.layoutViewId == 'prjctInfo'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc prjctInfo">
                        <div class="title_area" @click="fn_projectPage()">
                            <p class="name">{{prjctInfo.projectNm}}</p>
                            <p class="date">{{prjctInfo.csrtDt}}</p>
                        </div>
                        <!-- 내용 -->
                        <div class="table_normal_list">
                            <table>
                                <caption class="sr_only">프로젝트 정보</caption>
                                <colgroup>
                                    <col width="50%">
                                    <col width="50%">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>현장소장</th>
                                        <td>{{prjctInfo.csrtMngrNm ? prjctInfo.csrtMngrNm : '미배정' }}</td>
                                    </tr>
                                    <tr v-for="(item, index) in quailtyMngrList" :key="index">
                                        <th :rowspan="quailtyMngrList.length" v-if="index == 0">품질관리자</th>
                                        <td>{{item.memberName}}</td>
                                    </tr>
                                    <tr v-if="quailtyMngrList.length == 0">
                                        <th>품질관리자</th>
                                        <td>미배정</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <!-- 시험관리 -->
                <div v-if="item.layoutViewId == 'testMngt'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                    <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc testMngt">
                        <div class="table_normal_list">
                            <table>
                                <caption class="sr_only">제목</caption>
                                <colgroup>
                                <col width="33%">
                                <col width="33%">
                                <col width="*%">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>등록</th>
                                        <th>의뢰서 접수중</th>
                                        <th>결재완료</th>
                                    </tr>
                                    <tr v-for="(inItem , index) in testMngt" :key="`testMngt_${index}`">
                                        <td @click="fn_linkPage(item, 'TTRG')" style="cursor: pointer;">{{inItem.ttrgCnt}}</td>
                                        <td @click="fn_linkPage(item, 'RQRP')" style="cursor: pointer;">{{inItem.rqrpCnt}}</td>
                                        <td rowspan="3" @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                    </tr>
                                    <tr v-if="testMngt.length == 0">
                                        <td colspan="3">등록된 데이터가 없습니다.</td>
                                    </tr>
                                    <tr v-if="testMngt.length == 0">
                                        <th>시험중</th>
                                        <th>결재중</th>
                                        <th>-</th>
                                    </tr>
                                    <tr v-else>
                                        <th>시험중</th>
                                        <th>결재중</th>
                                    </tr>
                                    <tr v-for="(inItem , index) in testMngt" :key="index">
                                        <td @click="fn_linkPage(item, 'TTPR')" style="cursor: pointer;">{{inItem.ttprCnt}}</td>
                                        <td @click="fn_linkPage(item, 'RGPR')" style="cursor: pointer;">{{inItem.rgprCnt}}</td>
                                    </tr>
                                    <tr v-if="testMngt.length == 0">
                                        <td colspan="3">등록된 데이터가 없습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 자제 관리 -->
                <div v-if="item.layoutViewId == 'mtrilMngt'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc mtrilMngt">
                        <div class="lst_tabs">
                            <ul class="">
                                <li v-for="(inItem, index) in mtrilMngtTab.list" :class="{active: mtrilMngtTab.current === index}" :key="inItem">
                                    <a href="javascript:void(0);" @click="mtrilMngtTab.current = index">
                                        {{ inItem }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div v-show="mtrilMngtTab.current == 0">
                            <!-- 공급원현황 -->
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                    <col width="33%">
                                    <col width="*">
                                    <col width="33%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>등록</th>
                                            <th>결재중</th>
                                            <th>승인</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inItem , index) in mtrilMngtSuply" :key="index">
                                            <td @click="fn_linkPage(item, 'REGT')" style="cursor: pointer;">{{inItem.regtCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APVL')" style="cursor: pointer;">{{inItem.apvlCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                        </tr>
                                        <tr v-if="mtrilMngtSuply.length == 0">
                                            <td colspan="3">등록된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-show="mtrilMngtTab.current == 1">
                            <!-- 인수검사 -->
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                    <col width="33%">
                                    <col width="*">
                                    <col width="33%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>등록</th>
                                            <th>검사중</th>
                                            <th>승인</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inItem , index) in mtrilMngtUndtake" :key="index">
                                            <td @click="fn_linkPage(item, 'REGT')" style="cursor: pointer;">{{inItem.regtCnt}}</td> 
                                            <td @click="fn_linkPage(item, 'CHECK')" style="cursor: pointer;">{{inItem.ttrgCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                        </tr>
                                        <tr v-if="mtrilMngtUndtake.length == 0">
                                            <td colspan="3">등록된 데이터가 없습니다.</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-show="mtrilMngtTab.current == 2">
                            <!-- 공장검사 -->
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                    <col width="33%">
                                    <col width="*">
                                    <col width="33%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>등록</th>
                                            <th>검사중</th>
                                            <th>승인</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inItem , index) in mtrilMngtFctry" :key="index">
                                            <td @click="fn_linkPage(item, 'REGT')" style="cursor: pointer;">{{inItem.regtCnt}}</td>
                                            <td @click="fn_linkPage(item, 'CHECK')" style="cursor: pointer;">{{inItem.ttrgCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                        </tr>
                                        <tr v-if="mtrilMngtFctry.length == 0">
                                            <td colspan="3">등록된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
               </div>

               <!-- 콘크리트 관리 -->
               <div v-if="item.layoutViewId == 'cncrtMngt'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc cncrtMngt">
                        <div class="lst_tabs">
                            <ul class="">
                                <li v-for="(item, index) in cncrtMngtTab.list" :class="{active: cncrtMngtTab.current === index}" :key="item">
                                    <a href="javascript:void(0);" @click="cncrtMngtTab.current = index">
                                        {{ item }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div v-show="cncrtMngtTab.current == 0">
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="33%">
                                        <col width="33%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>타설 등록</th>
                                            <th>타설 중</th>
                                            <th>완료</th>
                                        </tr>
                                        <tr v-for="(inItem , index) in cncrtMngtPour" :key="`cncrtMngt_${index}`">
                                            <td @click="fn_linkPage(item, 'REGT')" style="cursor: pointer;">{{inItem.regtCnt}}</td>
                                            <td @click="fn_linkPage(item, 'POURRING')" style="cursor: pointer;">{{inItem.pourringCnt}}</td>
                                            <td rowspan="3" @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                        </tr>
                                        <tr v-if="cncrtMngtPour.length ==0">
                                            <td colspan="3">조회 된 데이터가 없습니다.</td>
                                        </tr>
                                        <tr v-if="cncrtMngtPour.length ==0">
                                            <th>타설 완료</th>
                                            <th>결재 중</th>
                                            <th>-</th>
                                        </tr>
                                        <tr v-else>
                                            <th>타설 완료</th>
                                            <th>결재 중</th>
                                        </tr>
                                        <tr v-for="(inItem , index) in cncrtMngtPour" :key="index">
                                            <td @click="fn_linkPage(item, 'POURCOMPL')" style="cursor: pointer;">{{inItem.pourComplCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APVL')" style="cursor: pointer;">{{inItem.apvlCnt}}</td>
                                        </tr>
                                        <tr v-if="cncrtMngtPour.length ==0">
                                            <td colspan="3">조회 된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-show="cncrtMngtTab.current == 1">
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="33%">
                                        <col width="33%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>등록</th>
                                            <th>검사</th>
                                            <th>지연</th>
                                        </tr>
                                        <tr v-for="(inItem , index) in cncrtMngtComp" :key="`cncrtMngt_${index}`">
                                            <td @click="fn_linkPage(item, 'REGT')" style="cursor: pointer;">{{inItem.regtCnt}}</td>
                                            <td @click="fn_linkPage(item, 'CHECK')" style="cursor: pointer;">{{inItem.checkCnt}}</td>
                                            <td rowspan="3" @click="fn_linkPage(item, 'RATE')" style="cursor: pointer;">{{inItem.rateCnt}}</td>
                                        </tr>
                                        <tr v-if="cncrtMngtComp.length ==0">
                                            <td colspan="3">조회 된 데이터가 없습니다.</td>
                                        </tr>
                                        <tr v-if="cncrtMngtComp.length ==0">
                                            <th>결재</th>
                                            <th>완료</th>
                                            <th>-</th>
                                        </tr>
                                        <tr v-else>
                                            <th>결재</th>
                                            <th>완료</th>
                                        </tr>
                                        <tr v-for="(inItem , index) in cncrtMngtComp" :key="index">
                                            <td @click="fn_linkPage(item, 'APVL')" style="cursor: pointer;">{{inItem.apvlCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                        </tr>
                                        <tr v-if="cncrtMngtComp.length ==0">
                                            <td colspan="3">조회 된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
               </div>

               <!-- 종합 Calender -->
               <div v-if="item.layoutViewId == 'gnrlzCldr'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                    </div>
                    <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc calendar">
                        <div class="multi_area">
                           <div class="calendar">
                              <FullCalendar :events="events" class="" :selectable="true" @selectedDate="selectedDate"></FullCalendar>
                           </div>
                           <div class="table_normal_list tableFixHead">
                              <table>
                                 <caption class="sr_only">제목</caption>
                                 
                                 <thead>
                                    <tr>
                                       <th>날짜</th>
                                       <th>일정</th>
                                       <th>시간</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr v-for="(item, idx) in gnrlzCldr" :key="idx">
                                       <td v-if="item.end === undefined || item.end === null || item.end === ''">{{ $moment(item.start).format('YYYY-MM-DD') }}</td>
                                       <td v-else>{{ $moment(item.viewStart).format('YYYY-MM-DD') }} ~ {{ $moment(item.viewEnd).format('YYYY-MM-DD') }}</td>
                                       <td class="al">{{ item.title }}</td>
                                       <td>{{ $moment(item.start).format('HH:mm') }}</td>
                                    </tr>
                                    <tr v-if="gnrlzCldr.length === 0">
                                        <td colspan="3">조회된 데이터가 없습니다</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                    </div>
               </div>

               <!-- 공지사항 -->
               <div v-if="item.layoutViewId == 'notice'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc notice">
                        <ul class="lst_notice">
                            <li v-for="(item , index) in notice" :key="index">
                                <!-- <p><a href="javascript:void(0);" class="ico_file" v-if="item.fileCnt"></a></p> -->
                                <!-- <p><a class="ico_file" v-if="item.fileCnt"></a></p> -->
                                <div :style="{'cursor': 'pointer'}" @click="fn_noticePage(item.noticeId)">
                                    <p class="txt_ellipsis">{{item.title}}</p>
                                    <p class="manager">{{item.inUserName}} {{item.jobTitle}}</p>
                                </div>
                                <div>{{item.regDt}}</div>
                            </li>
                            <li v-if="notice.length == 0">
                                <p></p>
                                <p>등록된 데이터가 없습니다.</p>
                            </li>
                        </ul>
                    </div>
               </div>
               
               <!-- 관련 사이트 -->
               <div v-if="item.layoutViewId == 'relateSite'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc">
                        <ul class="lst_link">
                            <!-- <li><a href="javascript:void(0);"><img src="../../assets/img/main/main_site_link1.png" alt=""></a></li> -->
                            <li><a href="javascript:void(0);" @click="fn_linkPage(item, 'Autoway')"><img src="../../assets/img/main/main_site_link2.png" alt=""></a></li>
                            <li><a href="javascript:void(0);" @click="fn_linkPage(item, 'Molit')"><img src="../../assets/img/main/main_site_link3.png" alt=""></a></li>
                            <li><a href="javascript:void(0);" @click="fn_linkPage(item, 'Standard')"><img src="../../assets/img/main/main_site_link4.png" alt=""></a></li>
                        </ul>
                        <ul class="lst_link">
                            <li><a href="javascript:void(0);" @click="fn_linkPage(item, 'KSA')"><img src="../../assets/img/main/main_site_link5.png" alt=""></a></li>
                            <li><a href="javascript:void(0);" @click="fn_linkPage(item, 'KCSC')"><img src="../../assets/img/main/main_site_link6.png" alt=""></a></li>
                            <li><a href="javascript:void(0);" @click="fn_linkPage(item, 'Law')"><img src="../../assets/img/main/main_site_link7.png" alt=""></a></li>
                        </ul>
                    </div>
                </div>

                <!-- 검측 관리 -->
                <div v-if="item.layoutViewId == 'inptMngt'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc inptMngt">
                        <div class="table_normal_list mt0">
                            <table>
                                <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="33%">
                                    <col width="33%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>검측등록</th>
                                        <th>시공사 검측 중</th>
                                        <th>결재 중(요청서)</th>
                                    </tr>
                                    <tr v-for="(inItem , index) in inptMngt" :key="`inptMngt_${index}`">
                                        <td @click="fn_linkPage(item, 'INRG')" style="cursor: pointer;">{{inItem.inrgCnt}}</td>
                                        <td @click="fn_linkPage(item, 'INVL')" style="cursor: pointer;">{{inItem.invlCnt}}</td>
                                        <td @click="fn_linkPage(item, 'INWT')" style="cursor: pointer;">{{inItem.inwtCnt}}</td>
                                    </tr>
                                    <tr v-if="inptMngt.length == 0">
                                        <td colspan="3">등록된 데이터가 없습니다.</td>
                                    </tr>
                                    
                                    <tr v-if="inptMngt.length == 0">
                                        <th>통보서 작성 중</th>
                                        <th>결재 중(통보서)</th>
                                        <th>완료</th>
                                    </tr>
                                    <tr v-else>
                                        <th>통보서 작성 중</th>
                                        <th>결재 중(통보서)</th>
                                        <th>완료</th>
                                    </tr>
                                    <tr v-for="(inItem , index) in inptMngt" :key="index">
                                        <td @click="fn_linkPage(item, 'SVWT')" style="cursor: pointer;">{{inItem.svwtCnt}}</td>
                                        <td @click="fn_linkPage(item, 'APVL')" style="cursor: pointer;">{{inItem.apvlCnt}}</td>
                                        <td @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                    </tr>
                                    <tr v-if="inptMngt.length == 0">
                                        <td colspan="3">등록된 데이터가 없습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 대외 점검 -->
                <div v-if="item.layoutViewId == 'extrnlChck'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc extrnlChck">
                        <!-- 내용 -->
                        <div class="table_normal_list">
                            <table>
                                <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="20%">
                                    <col width="19%">
                                    <col width="*">
                                    <col width="12%">
                                    <col width="11%">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>점검종류</th>
                                        <th>점검기관</th>
                                        <th>예정일</th>
                                        <th>총 지적건수</th>
                                        <th>확인서 건수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item , index) in extrnlChck" :key="index">
                                        <td>{{item.chckKndNm}}</td>
                                        <td>{{item.extrnlInsttNm}}</td>
                                        <td>{{item.chckPlanBgnde}} ~ {{item.chckPlanEndde}}</td>
                                        <td>{{item.poutCnt ? item.poutCnt : 0}}</td>
                                        <td>{{item.cnfrmnCnt ? item.cnfrmnCnt : 0}}</td>
                                    </tr>
                                    <tr v-if="extrnlChck.length == 0">
                                        <td colspan="5">등록된 데이터가 없습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 부적합 관리 -->
                <div v-if="item.layoutViewId == 'improptMngt'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc improptMngt">
                        <div class="lst_tabs mt0 pl0">
                            <ul class="">
                                <li v-for="(item, index) in improptMngtTab.list" :class="{active: improptMngtTab.current === index}" :key="item">
                                    <a href="javascript:void(0);" @click="improptMngtTab.current = index">
                                        {{ item }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div v-show="improptMngtTab.current == 0">
                            <!-- 내용 CAR -->
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="33%">
                                        <col width="33%">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>작성 중</th>
                                            <th>작성 결재 중</th>
                                            <th>처리 중</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inItem , index) in improptMngtCAR" :key="`improptMngt_${index}`">
                                            <td @click="fn_linkPage(item, 'REGT')" style="cursor: pointer;">{{inItem.regtCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APVL')" style="cursor: pointer;">{{inItem.apvlCnt}}</td>
                                            <td @click="fn_linkPage(item, 'PRCS')" style="cursor: pointer;">{{inItem.prcsCnt}}</td>
                                        </tr>
                                        <tr v-if="improptMngtCAR.length == 0">
                                            <td colspan="3">등록된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th>확인 중</th>
                                            <th>확인 결재 중</th>
                                            <th>완료</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inItem , index) in improptMngtCAR" :key="index">
                                            <td @click="fn_linkPage(item, 'CHCK')" style="cursor: pointer;">{{inItem.chckCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APVL2')" style="cursor: pointer;">{{inItem.apvl2Cnt}}</td>
                                            <td @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                        </tr>
                                        <tr v-if="improptMngtCAR.length == 0">
                                            <td colspan="3">등록된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-show="improptMngtTab.current == 1">
                            <!-- 내용 NCR -->
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="33%">
                                        <col width="33%">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>작성 중</th>
                                            <th>작성 결재 중</th>
                                            <th>처리 중</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inItem , index) in improptMngtNCR" :key="`improptMngt_${index}`">
                                            <td @click="fn_linkPage(item, 'REGT')" style="cursor: pointer;">{{inItem.regtCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APVL')" style="cursor: pointer;">{{inItem.apvlCnt}}</td>
                                            <td @click="fn_linkPage(item, 'PRCS')" style="cursor: pointer;">{{inItem.prcsCnt}}</td>
                                        </tr>
                                        <tr v-if="improptMngtNCR.length == 0">
                                            <td colspan="3">등록된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th>확인 중</th>
                                            <th>확인 결재 중</th>
                                            <th>완료</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inItem , index) in improptMngtNCR" :key="index">
                                            <td @click="fn_linkPage(item, 'CHCK')" style="cursor: pointer;">{{inItem.chckCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APVL2')" style="cursor: pointer;">{{inItem.apvl2Cnt}}</td>
                                            <td @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                        </tr>
                                        <tr v-if="improptMngtNCR.length == 0">
                                            <td colspan="3">등록된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-show="improptMngtTab.current == 2">
                            <!-- 내용 Punch -->
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="25%">
                                        <col width="25%">
                                        <col width="*">
                                        <col width="25%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>작성 중</th>
                                            <th>처리 중</th>
                                            <th>확인 중</th>
                                            <th>완료</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inItem , index) in improptMngtPunch" :key="`improptMngt_${index}`">
                                            <td @click="fn_linkPage(item, 'REGT')" style="cursor: pointer;">{{inItem.regtCnt}}</td>
                                            <td @click="fn_linkPage(item, 'PRCS')" style="cursor: pointer;">{{inItem.prcsCnt}}</td>
                                            <td @click="fn_linkPage(item, 'CHCK')" style="cursor: pointer;">{{inItem.chckCnt}}</td>
                                            <td @click="fn_linkPage(item, 'APRV')" style="cursor: pointer;">{{inItem.aprvCnt}}</td>
                                        </tr>
                                        <tr v-if="improptMngtPunch.length == 0">
                                            <td colspan="4">등록된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 자체 품질점검 -->
                <div v-if="item.layoutViewId == 'mtrilQlityChck'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc mtrilQlityChck">
                        <!-- 내용 -->
                        <div class="table_normal_list">
                            <table>
                                <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="25%">
                                    <col width="*">
                                    <col width="25%">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <!-- <th>상태</th> -->
                                        <th>점검유형</th>
                                        <th>제목</th>
                                        <th>점검일자</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item , index) in mtrilQlityChck" :key="index">
                                        <!-- <td>{{item.selfQltyStatus}}</td> -->
                                        <td>{{item.selfQltyTypeNm}}</td>
                                        <td>{{item.title}}</td>
                                        <td>{{item.checkDt}}</td>
                                    </tr>
                                    <tr v-if="mtrilQlityChck.length == 0">
                                        <td colspan="3">등록된 데이터가 없습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 작업자 동영상 교육 -->
                <div v-if="item.layoutViewId == 'opertorEdc'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc">
                        <!-- 내용 -->
                        준비중...
                    </div>
                </div>
                <div v-if="item.layoutViewId == 'sptEdcMngt'" class="item">
                    <!-- 현장 교육관리 -->
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc sptEdcMngt">
                        <!-- 내용 -->
                        <div class="table_normal_list">
                            <table>
                                <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="15%">
                                    <col width="20%">
                                    <col width="*">
                                    <col width="25%">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>공종</th>
                                        <th>대상</th>
                                        <th>교육과정명</th>
                                        <th>계획일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item , index) in sptEdcMngt" :key="index">
                                        <td>{{item.gjName}}</td>
                                        <td>{{item.eduTargetTypeName}}</td>
                                        <td>{{item.eduCourseName}}</td>
                                        <td>{{item.eduPlanDt}}</td>
                                    </tr>
                                    <tr v-if="sptEdcMngt.length == 0">
                                        <td colspan="4">등록된 데이터가 없습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            <!-- private String eduMngId;    -->
                    </div>
                </div>

                <!-- BS 점검 -->
                <div v-if="item.layoutViewId == 'bsChck'" class="item">
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc bsChck">
                        <div class="lst_tabs">
                            <ul class="">
                                <li v-for="(item, index) in bsChckTab.list" :class="{active: bsChckTab.current === index}" :key="item">
                                    <a href="javascript:void(0);" @click="bsChckTab.current = index">
                                        {{ item }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div v-show="bsChckTab.current == 0">
                            <!-- 협력업체별 현황 -->
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="*">
                                        <col width="40%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>협력업체</th>
                                            <th>잔여건수</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item , index) in bsChckPartnerCur" :key="index">
                                            <td>{{item.tradeNm}}</td>
                                            <td>{{item.bsRemnCnt}}</td>
                                        </tr>
                                        <tr v-if="bsChckPartnerCur.length == 0">
                                            <td colspan="2">등록된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-show="bsChckTab.current == 1">
                            <!-- BS 점검 - 공종별 현황 -->
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="*">
                                        <col width="25%">
                                        <col width="25%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>공종</th>
                                            <th>잔여건수</th>
                                            <th>결함처리율</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item , index) in bsChckWorkType" :key="index">
                                            <td>{{item.midName}}</td>
                                            <td>{{item.bsRemnCnt}}</td>
                                            <td>{{item.bsPrcsRate}}</td>
                                        </tr>
                                        <tr v-if="bsChckWorkType.length == 0">
                                            <td colspan="3">등록된 데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="item.layoutViewId == 'demCalc'" class="item">
                    <!-- 벌점 계산 -->
                    <div class="title">
                        <h3>{{item.layoutNm}}</h3>
                        <div class="right_area">
                            <button type="button" class="ico_refresh" v-on:click="fnRefresh(item.layoutViewId)"></button>
                            <button type="button" class="ico_move vue-draggable-handle"></button>
                            <button type="button" class="ico_remove" v-on:click="removeItem(item.layoutCd)"></button>
                        </div>
                        <!-- <div class="no-drag"></div> -->
                    </div>
                    <div class="desc">
                        <!-- 내용 -->
                        준비중...
                    </div>
                </div>

            </grid-item>
        </grid-layout>
    </div>
    <!-- <Footer /> -->
    <!-- 공지사항 팝업 -->
        <b-modal id="pop_notice" title="공지사항" hide-header hide-footer :hide-backdrop="noticePopupList.length == 0 ? true : false">
            <template #default>
            <div class="pop_container"  v-for="(item, index) in noticePopupList" :key="index">
                <div class="pop_header">
                    <h5>공지사항</h5>
                    <button type="button" class="btn_close" @click="fn_noticePopupclose(index, item, '0')"></button>
                </div>
                <div class="pop_body">
                    <span class="writer">등록일 : {{item.inDttm}}</span>
                    <span class="writer fr">등록자 : {{item.inUserName}}</span>
                    <div class="notice_detail">
                        <strong>{{item.title}}</strong>
                        <pre class="mt20">{{item.contents}}</pre> 
                    </div>
                </div>
                <div class="pop_footer" >
                    <span class="label_text" @click="fn_noticePopupclose(index, item, '1')">하루동안 열지 않기</span>
                    <b-button class="btn btn_md btn_outline btn_gray" @click="fn_noticePopupclose(index, item, '0')">닫기</b-button>
                </div>
            </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout";
import {requestOptions, sendPostApi }  from "../../apis/common";

import FullCalendar from '@/component/common/FullCalendar.vue';
import LineChart from "@component/chart/LineChart.vue";
import BarChart  from "@component/chart/BarChart.vue";
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";
import { mapGetters } from 'vuex';
import _ from 'lodash'
import axios from 'axios'
import commonUtil  from '@plugin/mixin/CommonUtil.js'
import { commonFn } from '@/script/commonFn.js';

let nowDate = new Date();
let nowYear = nowDate.getFullYear();

export default {
    name: 'DashBoard01',
    components: {
        GridLayout,
        GridItem,
        FullCalendar,
        LineChart,
        BarChart
    },
    mixins: [commonUtil],
    computed: {
        ...mapGetters({
            gnbMenuList:    'tabInfo/getMenuList',
            tabs:           'tabInfo/getTabs',
        })
    },
    data() {
        return {
            /* chart option */
            plugins: [ChartJSPluginDatalabels],            

            /* grid layout */
            layout: [
                // {"x":0,"y":0,"w":1,"h":4,"i":"0"},
                // {"x":1,"y":0,"w":3,"h":4,"i":"1"},

                // {"x":0,"y":1,"w":1,"h":3,"i":"2"},
                // {"x":1,"y":1,"w":1,"h":3,"i":"3"},
                // {"x":2,"y":1,"w":1,"h":3,"i":"4"},
                // {"x":3,"y":1,"w":1,"h":3,"i":"5"},

                // {"x":0,"y":2,"w":2,"h":4,"i":"6"},
                // {"x":2,"y":2,"w":1,"h":4,"i":"7"},
                // {"x":3,"y":2,"w":1,"h":4,"i":"8"},
            ],

            /* chart Data */
            chartData: {
                /* 대외점검 벌점현황 */
                extnrDemInfo : {
                    extnrDemLabl: [],
                    extnrDemData: [],
                },
                /* PQI 점수 */
                pqiPointInfo : {
                    pqiPointLabl: [],
                    pqiPointData: [],
                },
                /* 대외점검 대외기관 지적건수 */
                extnrInsttInfo : {
                    extnrInsttLabl: [],
                    extnrInsttData: [],
                },
                /* BS점검 미조치율 */
                bsChckOpenInfo : {
                    bsChckOpenLabl: [],
                    bsChckOpenData: [],
                },
                /* 부적합 CAR/NCR/Punch 미종결건수 */
                nonCnfrmOpenInfo : {
                    nonCnfrmOpenLabl: [],
                    nonCnfrmOpenData: [],
                },
            },

            /* chart 구성 */
            extnrDemInfoLinechartData: {
                labels: ['2017', '2018', '2019', '2020', '2021',],
                datasets: [
                    {
                        type: 'line',
                        label: '대외점검 벌점현황',
                        // data: [82.43, 80.98, 95.01, 97.75, 93.96,],
                        data: [],
                        backgroundColor: 'transparent',
                        borderColor: '#28A1E0',
                        pointRadius: 0,
                        lineTension: 0
                    },
                ]
            },

            pqiPointInfoLinechartData: {
                labels: ['2017', '2018', '2019', '2020', '2021',],
                datasets: [
                    {
                        type: 'line',
                        label: 'PQI 점수',
                        // data: [85.43, 79.98, 98.01, 90.75, 95.96,],
                        data: [],
                        backgroundColor: 'transparent',
                        borderColor: '#28A1E0',
                        pointRadius: 0,
                        lineTension: 0
                    },
                ]
            },

            bsChckOpenInfoLinechartData: {
                labels: ['2017', '2018', '2019', '2020', '2021',],
                datasets: [
                    {
                        type: 'line',
                        label: 'BS점검 미조치율',
                        // data: [85.43, 85.98, 75.01, 84.75, 86.96,],
                        data: [],
                        backgroundColor: 'transparent',
                        borderColor: '#28A1E0',
                        pointRadius: 0,
                        lineTension: 0
                    },
                ]
            },

            qultyStatsLinechartOptions: {
                layout: {
                    // padding: {
                    //     top: 40,
                    //     bottom: 20,
                    // }
                },
                tooltips: {
                    mode: 'label',
                    intersect: false,
                },
                plugins: {
                    datalabels: {
                        backgroundColor: "transparent",
                        textAlign: "center",
                        // align: 'end',
                        // anchor: 'end',
                        // offset: 0,
                        font: {
                            weight: "normal",
                            // weight: "bold",
                            size: 12,
                            color: "#555",
                        }
                    },
                },
                legend: {
                    // display: true,
                    // position: 'bottom',
                    // align: 'end',
                    display: false,
                    // labels:{
                    //     usePointStyle: true,
                    //     boxWidth: 6,
                    //     fontSize: 12,
                    // },
                    // reverse: true, // 범례 역순
                },
                scales: {
                    yAxes: [{
                        position: 'left',
                        ticks: {
                            beginAtZero: true,
                            // stepSize: 10,
                            // min: 0,
                            // max: 100
                        },
                        gridLines: {
                            display: true,
                            drawBorder: false,
                            // borderDash: [3, 2],
                            borderColor: '#dcdcdc'
                        }
                    },
                    ],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            },

            extnrInsttInfoBarchartData: {
                labels: ['2017', '2018', '2019', '2020', '2021'],
                datasets: [
                {
                        label: '대외점검 대외기관 지적건수',
                        // data: [12, 18, 5, 16, 21],
                        data: [],
                        backgroundColor: '#28A1E0',
                        borderWidth: 0,
                        barThickness : 12, 
                },
                ]
            },

            nonCnfrmOpenBarchartData: {
                labels: ['2017', '2018', '2019', '2020', '2021'],
                datasets: [
                {
                        label: '부적합 CAR/NCR/Punch 미종결 건수',
                        // data: [12, 18, 5, 16, 21],
                        data: [],
                        backgroundColor: '#28A1E0',
                        borderWidth: 0,
                        barThickness : 12, 
                },
                ]
            },

            qultyStatsBarchartOptions: {
                layout: {
                    padding: {
                        top: 20,
                        // bottom: 20,
                    }
                },
                plugins: {
                    datalabels: {
                            // display: false,
                            align: 'end',
                            anchor: 'end',
                            offset: -5,
                            color: '#28A1E0',
                            backgroundColor: "transparent",
                            textAlign: "center",
                            font: {
                                weight: "bold",
                                size: 12
                            }
                    },
                },
                scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            // stepSize: 5,
                            // min: 0,
                            // max: 25
                        },
                        gridLines: {
                            display: true,
                            drawBorder: false,
                            // borderDash: [3, 2],
                            borderColor: '#dcdcdc'
                        }
                }],
                xAxes: [{
                        gridLines: {
                            display: false
                        },
                }]
                },
                legend: {
                        display: false,
                        // position: 'bottom',
                        // align: 'end',
                },
                responsive: true,
                maintainAspectRatio: false
            },

            draggable: true,
            resizable: false,
            colNum: 4,
            index: 0,

            currentTab: 0, // 기본 current 값 지정 
            //tabs: ['미확인알림', '전체알림   '], // tab name
            
            myWorkAprv : [],            // My Work 오늘의 결재 
            myWork : [],            // My Work 나의 할 일           
            qlityIxMngt : [],       // 품질 지표 관리            
            prjctInfo : [],         // 프로젝트 정보 - 현장소장    
            quailtyMngrList : [],   // 프로젝트 정보 - 품질관리자
            testMngt : [],          // 시험관리            
            mtrilMngtSuply : [],    // 자재 관리-공급원현황
            mtrilMngtUndtake : [],  // 자재 관리-인수검사
            mtrilMngtFctry : [],    // 자재 관리-공장검사
            cncrtMngtPour : [],         // 콘크리트 관리-타설관리
            cncrtMngtComp : [],         // 콘크리트 관리-강도시험관리
            /* 종합 Calender */
            gnrlzCldr : [],
            events : [],

            notice : [],            // 공지사항
            relateSite : [],        // 관련 사이트
            inptMngt : [],          // 검측 관리
            extrnlChck : [],        // 대외 점검
            improptMngtCAR : [],       // 부적합 관리-CAR
            improptMngtNCR : [],       // 부적합 관리-NCR
            improptMngtPunch : [],     // 부적합 관리-Punch
            mtrilQlityChck : [],    // 자체 품질 점검
            opertorEdc : [],        // 작업자 동영상 교육
            sptEdcMngt : [],        // 현장 교육관리
            bsChckPartnerCur : [],  // BS 점검 - 협력업체별 현황
            bsChckWorkType : [],    // BS 점검 - 공종별 현황
            demCalc : [],           // 벌점 계산
            noticePopupList : [],   // 공지사항 팝업 list

            mtrilMngtTab : {
                current : 0,
                list : ['공급원현황', '인수검사', '공장검사'] // tab name
            },
            cncrtMngtTab : {
                current : 0,
                list : ['타설관리', '강도시험관리'] // tab name
            },
            improptMngtTab : {
                current : 0,
                list : ['CAR', 'NCR', 'Punch'] // tab name
            },
            bsChckTab : {
                current : 0,
                list : ['협력업체별', '공종별'] // tab name
            },

            // relateSite - siteLink
            siteLink: [
                {
                    name: 'Autoway',    // Autoway
                    link: 'https://autoway.hyundai.net/Login/GLogin.aspx/SetTflag'
                },
                {
                    name: 'KSA',    // KSA 한국 표준협회
                    link: 'https://www.ksa.or.kr/ksa_kr/index.do'
                },
                {
                    name: 'KCSC',   // 국가건설기준센터
                    link: 'https://kcsc.re.kr/Home/Index'
                },
                {
                    name: 'Molit',  // 국토교통부
                    link: 'http://www.molit.go.kr/portal.do'
                },
                {
                    name: 'Law',    // 법제처 국가법령정보센터
                    link: 'https://www.law.go.kr/'
                },
                {
                    name: 'Standard',    // e-나라표준인증
                    link: 'https://www.standard.go.kr/KSCI/portalindex.do'
                },
            ]
        }
    },
    created : async function() {
        // this.$gridlayout.load();
        this.index = this.layout.length;
        // 쿠키에 프로젝트 id가 담겨 있지 않을 경우, 프로젝트 선택 팝업 오픈
        
        // console.log("@@@ main userInfo : %o",this.$session.get('userInfo'));

        if(this.$session.get('userInfo').projectId == '' || this.$session.get('userInfo').projectId == null) {
        //if(this.$cookies.get('projectId') == '' || this.$cookies.get('projectId') == null) {
            // this.$root.$emit('bv::show::modal', 'CommonProjectSelect');


            // API 부분만 수정 - 확실하게 순서를 지키기 위해
            const url = '/sendApi/api/popup/newMySitesProject/list'
            const payload = {}
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            await axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)
                    if (response.status === 200 && response.data?.siteList) {
                        if (response.data.siteList.length > 1 || (response.data.siteList.length === 1 && response.data.siteList[0] === 'ALL_SITE')) {
                            this.$bvModal.show('NewProjectSelect')
                        } else if (response.data.siteList.length === 1 && response.data.siteList[0] !== 'ALL_SITE') {
                            const infoObj = {
                                projectId:  response.data.data[0].projectId,
                                projectNm:  response.data.data[0].projectNm,
                                siteId:     response.data.data[0].siteId,
                                siteNm:     response.data.data[0].siteNm,
                                siteMstrId: response.data.data[0].siteMstrId,
                                baseType:   response.data.data[0].baseType,
                                baseTypeNm: response.data.data[0].baseTypeNm,
                                csrtType:   response.data.data[0].csrtType,
                                csrtTypeNm: response.data.data[0].csrtTypeNm,
                            }

                            this.$store.dispatch('auth/setProjectInfo', infoObj)
                            this.$store.dispatch('ui/setProjectName', response.data.data[0].projectNm)

                            this.$cookies.set("projectId", response.data.data[0].projectId)
                            this.$cookies.set("siteId", response.data.data[0].siteId)
                            this.$cookies.set("siteMstrId", response.data.data[0].siteMstrId)
                            this.$cookies.set("projectName", response.data.data[0].projectNm)
                            // console.log('store',this.$store.getters['auth/getAuth']);
                            this.$session.set('userInfo', this.$store.getters['auth/getAuth'])
                            this.ozReportDoc()
                        } 

                    } else {
                        throw new Error('api-error')
                    }
                })
                .catch(error => {
                    console.error(error)
                })

                
            // requestOptions.headers['Accept-Language'] = "kr";
            // requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
            // let url = '/sendApi/api/popup/newMySitesProject/list';
            // let param = {};

            // const resData = await sendPostApi(url, param).then((result) => {
            //    return result.data;
            // }).catch((e) => {
            //    // console.log(e);
            //    return e.response.data;
            // });
            // // console.log('resData',resData);
            // // console.log('resData',resData.siteList.length);

            // if(resData.siteList.length>1 || (resData.siteList.length==1 && resData.siteList[0] == 'ALL_SITE')){
            //     this.$root.$emit('bv::show::modal', 'NewProjectSelect');
            // }else if(resData.siteList.length==1 && resData.siteList[0] != 'ALL_SITE'){
            //     let infoObj = {
            //         projectId : resData.data[0].projectId,
            //         projectNm : resData.data[0].projectNm,
            //         siteId : resData.data[0].siteId,
            //         siteNm : resData.data[0].siteNm,
            //         siteMstrId : resData.data[0].siteMstrId,

            //         // baseCd : resData.data[0].baseCd,
            //         baseType : resData.data[0].baseType,
            //         baseTypeNm : resData.data[0].baseTypeNm,
            //         csrtType : resData.data[0].csrtType,
            //         csrtTypeNm : resData.data[0].csrtTypeNm,
            //         // baseTypeName : resData.data[0].baseTypeNm,
            //         // gongsaTypeCd : resData.data[0].gongsaTypeCd,
            //         // gongsaTypeNm : resData.data[0].gongsaTypeNm,
            //     }


            //     this.$cookies.set("projectId", resData.data[0].projectId);
            //     this.$cookies.set("siteId", resData.data[0].siteId);
            //     this.$cookies.set("siteMstrId", resData.data[0].siteMstrId);
            //     this.$cookies.set("projectName", resData.data[0].projectNm);


            //     this.$store.dispatch('ui/setProjectName', infoObj.projectNm)
            //     this.$store.dispatch('auth/setProjectInfo', infoObj)
            //     // vue session에 추가
            //     this.$session.set('userInfo', this.$store.getters['auth/getAuth']);
            //     //vuex에 추가
            //     // this.$store.dispatch('auth/setProjectInfo',infoObj);
            // }

        }

        await this.mainSearch((result)=> {
            if(result){
                if(this.$store.getters['auth/getSiteMstrId']){
                    this.fn_selectNoticeList();
                }
                this.$store.dispatch('tabInfo/allTabClose');
                
                if (this.$route.params.next) {
                    this.goToPage(this.$route.params.next.url, true, this.$route.params.next.params)
                }
            }
        }); // User Layout
        
        // console.log("this.$store.getters['auth/getSiteMstrId'] : ",this.$store.getters['auth/getSiteMstrId']);
    },
    beforeDestroy() {
    },
    methods: {
        mainSearch : async function(callback) {
            /* 사용자의 layout정보 조회*/
            // let url = '/sendApi/api/common/appStore/userLayout/list';
            let url = '/sendApi/api/common/main/mainLayout/list';
            let param = {
            }

            await sendPostApi(url, param)
                     .then( async data => {
                        this.layout    = data.data.datas.dlLayout;
                        const resultCnt = this.layout.length; 
                        let checkCnt = 0;

                        for await (let data of this.layout){
                            this.fn_callLayoutData(data.layoutViewId, (result) => {
                                if(result){
                                    checkCnt ++;    
                                }

                                if(resultCnt === checkCnt){
                                    return callback(true);
                                }
                                else{
                                    return callback(false);
                                }
                            });
                        }
                     });
        },
        async ozReportDoc() {
            let url = '/sendApi/api/myWork/userMngt/OzReportInfoList/list';
            let param = {
                siteMstrId : this.$store.getters['auth/getSiteMstrId']
            }
            await sendPostApi(url, param).then((data) => {
                if(typeof data.data.datas.setUpOzInfo != 'undefined'){
                    let infoList = data.data.datas.setUpOzInfo.map(item => {return{
                        seq : item.seq ,
                        menuNm : item.menuNm ,
                        btnNm : item.btnNm ,
                        docNm : item.docNm ,
                        jspNm : item.jspNm ,
                    }})
                    this.$store.dispatch('auth/setOzTypeList', infoList);                  
                }
            });
        },
        fnRefresh : function (layoutViewId) {
            this.fn_callLayoutData(layoutViewId, () => {
                return;
            });
        },
        removeItem: function (val) {
               const index = this.layout.map(item => item.layoutCd).indexOf(val);

               this.layout.splice(index, 1);
        },
        fn_logout: function() {    // 로그아웃
                        
            // 쿠키 삭제
            this.$cookies.remove('Authorization');
            this.$cookies.remove('projectId');
            this.$cookies.remove('siteId');
            
            // vuex정보 초기화
            this.$store.dispatch('auth/setInitData');
            this.$store.dispatch('tabInfo/allTabClose');            

            this.$router.push({name: 'Login'});
        },
        fn_callLayoutData : async function(jobType, callback) {
            /* layout에 따른 정보 */
            let url = '/sendApi/api/common/main/' + jobType + '/list';
            let param = {
                    //siteMstrId : this.$cookies.get('siteMstrId'),
                    //projectId : this.$cookies.get('projectId'), 
                    siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                    projectId: this.$store.getters['auth/getProjectId'],
                    baseCd: this.$store.getters['auth/getBaseType'],
                    startDt: ((nowYear - 4) + '0101'),
                    endDt: (nowYear + '1231'),
            };

            // console.log("main param11 ==== %o", param);
            const resData = await sendPostApi(url, param)
                                    .then(data => {
                                        return data;
                                    });
            // switch jobType
            //   case 'myWork'
              
            if ( resData != null ) {
                // console.log("callLayout OK: %o", resData);

                if ( jobType == 'myWork' ) {
                    // My Work
                    this.myWorkAprv = resData.data.datas.aprvList;
                    this.myWork = resData.data.datas.workList;
                } else if ( jobType == 'qlityIxMngt' ) {
                    // 차트정보 초기화   
                    this.fn_clearChart();

                    // 품질 지표 관리 Chart Data
                    this.qlityIxMngt = resData.data.datas.dlData;
                    // console.log(this.qlityIxMngt);

                    // 품질 지표 관리 Chart Label
                    let labelYear = '';
                    for(let i=5; i > 0; i--) {
                        labelYear = (Number(nowYear) - i + 1);
                        this.chartData.extnrDemInfo.extnrDemLabl.push(labelYear);
                        this.chartData.pqiPointInfo.pqiPointLabl.push(labelYear);
                        this.chartData.extnrInsttInfo.extnrInsttLabl.push(labelYear);
                        this.chartData.bsChckOpenInfo.bsChckOpenLabl.push(labelYear);
                        this.chartData.nonCnfrmOpenInfo.nonCnfrmOpenLabl.push(labelYear);
                    }
                    // console.log("fn_callLayoutData :  %o", this.$refs.extnrDemInfoLinechart[0]);
                    // console.log("this.extnrDemInfoLinechartData.labels :  %o", this.extnrDemInfoLinechartData.labels);


                    for(let i=0; i < this.qlityIxMngt.dlExtnrDem.length; i++) {
                        for(let j=0; j < 5; j++) {
                            if(this.qlityIxMngt.dlExtnrDem[i].statsYear == this.chartData.extnrDemInfo.extnrDemLabl[j]) {
                                // this.chartData.extnrDemInfo.extnrDemLabl[j].push(this.qlityIxMngt.dlExtnrDem[i].statsYear);
                                // this.chartData.extnrDemInfo.extnrDemData[j] = this.qlityIxMngt.dlExtnrDem[i].statsData;
                                let tmp1 = this.qlityIxMngt.dlExtnrDem[i].statsData;
                                if(tmp1.indexOf('.')>=0 && tmp1.split('.')[1].length>2){
                                    tmp1 = (parseInt(this.qlityIxMngt.dlExtnrDem[i].statsData)).toFixed(2);
                                }
                                this.chartData.extnrDemInfo.extnrDemData[j] = tmp1;
                            }
                        }
                    }
                    this.extnrDemInfoLinechartData.labels             = this.chartData.extnrDemInfo.extnrDemLabl;
                    this.extnrDemInfoLinechartData.datasets[0].data   = this.chartData.extnrDemInfo.extnrDemData;

                    for(let i=0; i < this.qlityIxMngt.dlPqiPoint.length; i++) {
                        // console.log('baseCd',this.qlityIxMngt.dlPqiPoint[i].baseCd);
                        if(this.qlityIxMngt.dlPqiPoint[i].baseCd == "0"){
                            for(let j=0; j < 5; j++) {
                                if(this.qlityIxMngt.dlPqiPoint[i].maeplnmb1 == this.chartData.pqiPointInfo.pqiPointLabl[j]) {
                                    // this.chartData.pqiPointInfo.pqiPointLabl.push(this.qlityIxMngt.dlPqiPoint[i].maeplnmb1);
                                    // this.chartData.pqiPointInfo.pqiPointData[j] = this.qlityIxMngt.dlPqiPoint[i].totalpoint;
                                    let tmp2 = this.qlityIxMngt.dlPqiPoint[i].totalpoint;
                                    if(tmp2.indexOf('.')>=0 && tmp2.split('.')[1].length>2){
                                        tmp2 = (parseInt(this.qlityIxMngt.dlPqiPoint[i].totalpoint)).toFixed(2);
                                    }
                                    this.chartData.pqiPointInfo.pqiPointData[j] = tmp2;
                                } 
                            }
                        }
                    }
                    this.pqiPointInfoLinechartData.labels             = this.chartData.pqiPointInfo.pqiPointLabl;
                    this.pqiPointInfoLinechartData.datasets[0].data   = this.chartData.pqiPointInfo.pqiPointData;

                    for(let i=0; i < this.qlityIxMngt.dlExtnrInstt.length; i++) {
                        for(let j=0; j < 5; j++) {
                            if(this.qlityIxMngt.dlExtnrInstt[i].statsYear == this.chartData.extnrInsttInfo.extnrInsttLabl[j]) {
                                // this.chartData.extnrInsttInfo.extnrInsttLabl.push(this.qlityIxMngt.dlExtnrInstt[i].statsYear);
                                // this.chartData.extnrInsttInfo.extnrInsttData[j] = this.qlityIxMngt.dlExtnrInstt[i].statsData;
                                let tmp3 = this.qlityIxMngt.dlExtnrInstt[i].statsData;
                                if(tmp3.indexOf('.')>=0 && tmp3.split('.')[1].length>2){
                                    tmp3 = (parseInt(this.qlityIxMngt.dlExtnrInstt[i].statsData)).toFixed(2);
                                }
                                this.chartData.extnrInsttInfo.extnrInsttData[j] = tmp3;
                            }
                        }
                    }
                    this.extnrInsttInfoBarchartData.labels            = this.chartData.extnrInsttInfo.extnrInsttLabl;
                    this.extnrInsttInfoBarchartData.datasets[0].data  = this.chartData.extnrInsttInfo.extnrInsttData;


                    for(let i=0; i < this.qlityIxMngt.dlBsChckOpen.length; i++) {
                        for(let j=0; j < 5; j++) {
                            if(this.qlityIxMngt.dlBsChckOpen[i].statsYear == this.chartData.bsChckOpenInfo.bsChckOpenLabl[j]) {
                                // this.chartData.bsChckOpenInfo.bsChckOpenLabl.push(this.qlityIxMngt.dlBsChckOpen[i].statsYear);
                                // this.chartData.bsChckOpenInfo.bsChckOpenData[j] = this.qlityIxMngt.dlBsChckOpen[i].statsData;
                                let tmp4 = this.qlityIxMngt.dlBsChckOpen[i].statsData;
                                if(tmp4.indexOf('.')>=0 && tmp4.split('.')[1].length>2){
                                    tmp4 = (parseInt(this.qlityIxMngt.dlBsChckOpen[i].statsData)).toFixed(2);
                                }
                                this.chartData.bsChckOpenInfo.bsChckOpenData[j] = tmp4;
                            }
                        }
                    }
                    this.bsChckOpenInfoLinechartData.labels           = this.chartData.bsChckOpenInfo.bsChckOpenLabl;
                    this.bsChckOpenInfoLinechartData.datasets[0].data = this.chartData.bsChckOpenInfo.bsChckOpenData;

                    for(let i=0; i < this.qlityIxMngt.dlNonCfrmOpn.length; i++) {
                        for(let j=0; j < 5; j++) {
                            if(this.qlityIxMngt.dlNonCfrmOpn[i].statsYear == this.chartData.nonCnfrmOpenInfo.nonCnfrmOpenLabl[j]) {
                                // this.chartData.nonCnfrmOpenInfo.nonCnfrmOpenLabl.push(this.qlityIxMngt.dlNonCfrmOpn[i].statsYear);
                                // this.chartData.nonCnfrmOpenInfo.nonCnfrmOpenData[j] = this.qlityIxMngt.dlNonCfrmOpn[i].statsData;
                                let tmp5 = 0

                                if(!commonFn.methods.isEmpty(this.qlityIxMngt.dlNonCfrmOpn[i].issueCnt)){
                                    tmp5 += Number(this.qlityIxMngt.dlNonCfrmOpn[i].issueCnt)
                                }
                                
                                if(!commonFn.methods.isEmpty(this.qlityIxMngt.dlNonCfrmOpn[i].openCnt)){
                                    tmp5 += Number(this.qlityIxMngt.dlNonCfrmOpn[i].openCnt)
                                }
                                
                                this.chartData.nonCnfrmOpenInfo.nonCnfrmOpenData[j] = tmp5;
                            }
                        }
                    }
                    this.nonCnfrmOpenBarchartData.labels              = this.chartData.nonCnfrmOpenInfo.nonCnfrmOpenLabl;
                    this.nonCnfrmOpenBarchartData.datasets[0].data    = this.chartData.nonCnfrmOpenInfo.nonCnfrmOpenData;

                    // console.log("================= %o", this.extnrDemInfoLinechartData.datasets[0].data);
       
                    this.$refs.extnrDemInfoLinechart[0].renderChartData();
                    this.$refs.pqiPointInfoLinechart[0].renderChartData();
                    this.$refs.extnrInsttInfoBarchart[0].renderChartData();
                    this.$refs.bsChckOpenInfoLinechart[0].renderChartData();
                    this.$refs.nonCnfrmOpenBarchart[0].renderChartData();
                } else if ( jobType == 'prjctInfo' ) {
                    // 프로젝트 정보 
                    if( resData.data.datas.dlData.prjctInfo != null ){
                        this.prjctInfo = resData.data.datas.dlData.prjctInfo;  
                        this.quailtyMngrList = resData.data.datas.dlData.quailtyMngrList;  
                    }    
                        
                    
                } else if ( jobType == 'testMngt' ) {
                    // 시험관리          
                    this.testMngt = resData.data.datas.dlData;
                } else if ( jobType == 'mtrilMngt' ) {
                    // 자재 관리
                    this.mtrilMngtSuply     = resData.data.datas.dlData.dlMtrilSuply;   // 자재 관리-공급원현황
                    this.mtrilMngtUndtake   = resData.data.datas.dlData.dlMtrilUndtake; // 자재 관리-인수검사
                    this.mtrilMngtFctry     = resData.data.datas.dlData.dlMtrilFctry;   // 자재 관리-공장검사
                } else if ( jobType == 'cncrtMngt' ) {
                    // 콘크리트 관리
                    this.cncrtMngtPour = resData.data.datas.dlData.dlCncrtPour;
                    this.cncrtMngtComp  = resData.data.datas.dlData.dlCncrtComp;
                } else if ( jobType == 'gnrlzCldr' ) {
                    // 종합 Calender
                    this.gnrlzCldr = resData.data.datas.dlData;

                    if ( this.gnrlzCldr.length > 0 ){
                        let schdList = [];
        
                        for (let i = 0; i < this.gnrlzCldr.length; i++) {
                            let item = this.gnrlzCldr[i];
                            const inputObj = {
                                id : item.scdlId,
                                title : item.scdlTitle,
                                viewStart : item.scdlStartTm ? item.viewStartDt + "T" + item.scdlStartTm : item.viewStartDt,
                                viewEnd : item.scdlEndTm ? item.viewEndDt + "T" + item.scdlEndTm : item.viewEndDt,
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
                    } else {
                        this.events = [];
                    }
                                              
                    let today = this.$moment().format('YYYY-MM-DD')  // 초기값 오늘 기준 데이터 선택

                    this.gnrlzCldr = this.events.filter(item => {
                        // console.log(item.start);
                        return item.start.indexOf(today) !== -1;
                    });

                } else if ( jobType == 'notice' ) {
                    // 공지사항
                    this.notice = resData.data.datas.dlData;
                } else if ( jobType == 'relateSite' ) {
                    // 관련 사이트
                    this.relateSite = resData.data.datas.dlData;
                } else if ( jobType == 'inptMngt' ) {
                    // 검측 관리
                    this.inptMngt = resData.data.datas.dlData;
                } else if ( jobType == 'extrnlChck' ) {
                    // 대외 점검
                    this.extrnlChck = resData.data.datas.dlData;
                } else if ( jobType == 'improptMngt' ) {
                    // 부적합 관리
                    this.improptMngtCAR   = resData.data.datas.dlData.dlImproptCAR;
                    this.improptMngtNCR   = resData.data.datas.dlData.dlImproptNCR;
                    this.improptMngtPunch = resData.data.datas.dlData.dlImproptPunch;
                } else if ( jobType == 'mtrilQlityChck' ) {
                    // 자체 품질 점검
                    this.mtrilQlityChck = resData.data.datas.dlData;
                } else if ( jobType == 'opertorEdc' ) {
                    // 작업자 동영상 교육
                    this.opertorEdc = resData.data.datas.dlData;
                } else if ( jobType == 'sptEdcMngt' ) {
                    // 현장 교육관리
                    this.sptEdcMngt = resData.data.datas.dlData;
                } else if ( jobType == 'bsChck' ) {
                    // BS 점검
                    this.bsChckPartnerCur = resData.data.datas.dlData.dlPartnerCur; // 협력업체별 현황
                    this.bsChckWorkType = resData.data.datas.dlData.dlWorkType;   // 공종별 현황
                } else if ( jobType == 'demCalc' ) {
                    // 벌점 계산
                    this.demCalc = resData.data.datas.dlData;
                }
            }

            return callback(resData);
        },

        async fn_selectNoticeList(){

            const adminYn = this.$store.getters['auth/getGroupAuthInfoId'] == "GRAT_0000000009" ? '1' : '0';

            const userInfo = {
                ...this.$session.get('userInfo')
            }

            if(adminYn == '0' && !userInfo.userType){
                return;
            }

            let url = '/sendApi/api/community/notice/mainPopupList';

            let payload = {
                noticeType : adminYn == '1' ? "" : userInfo.userType,
                searchValue : this.$moment().format('YYYY-MM-DD')
            }

            const result = await sendPostApi(url, payload);

            if(result.status == '200' && result.data.data.length > 0){

                let checkData = result.data.data;
                let checkIndex = 0;
                let checkLength = 6; // 6개까지 노출
                let resultData = []

                for(let item of checkData){
                    const input = {
                        popupKey : this.$moment(item.inDttm).format('YYYY-MM-DD').replaceAll('-','') + item.noticeId.split("_")[1],
                        title : item.title,
                        inDttm : this.$moment(item.inDttm).format('YYYY-MM-DD'),
                        contents : item.contents,
                        inUserName : item.inUserName,
                        checked : false,
                    }
                    //키값 체크
                    if(!this.$cookies.isKey(input.popupKey)){
                        if(checkIndex !== checkLength){
                            resultData.push(input);
                            checkIndex ++;
                        }
                    }
                }

                this.noticePopupList = resultData;
                if(this.noticePopupList.length > 0){
                    this.$bvModal.show('pop_notice');
                }
            }
        },
        selectedDate(info) {
            /* 현장켈린더 날자 클릭 */
            // console.log(info);
            this.gnrlzCldr = this.events.filter(item => {
                // console.log(item.start);
                return item.start.indexOf(info.startStr) !== -1;
            });
        },

        //공지사항 팝업 닫기 
        //쿠키 체크
        fn_noticePopupclose : function(index, item, type) {
            if(type == '1'){
                this.$cookies.set(item.popupKey,'',(60 * 60 * 24));
            }
            this.noticePopupList.splice(index, 1);
            
            if(this.noticePopupList.length == 0){
                this.$root.$emit('bv::hide::modal', 'pop_notice');
            }
            
        },

        fn_clearChart: function () {
            /* 대외점검 벌점현황 */
            this.chartData.extnrDemInfo = {
                extnrDemLabl: [],
                extnrDemData: [],
            };
            /* PQI 점수 */
            this.chartData.pqiPointInfo = {
                pqiPointLabl: [],
                pqiPointData: [],
            };
            /* 대외점검 대외기관 지적건수 */
            this.chartData.extnrInsttInfo = {
                extnrInsttLabl: [],
                extnrInsttData: [],
            };
            /* BS점검 미조치율 */
            this.chartData.bsChckOpenInfo = {
                bsChckOpenLabl: [],
                bsChckOpenData: [],
            };
            /* 부적합 CAR/NCR/Punch 미종결건수 */
            this.chartData.nonCnfrmOpenInfo = {
                nonCnfrmOpenLabl: [],
                nonCnfrmOpenData: [],
            };

            this.extnrDemInfoLinechartData.labels             = [];
            this.pqiPointInfoLinechartData.labels             = [];
            this.extnrInsttInfoBarchartData.labels            = [];
            this.bsChckOpenInfoLinechartData.labels           = [];
            this.nonCnfrmOpenBarchartData.labels              = [];

            let labelYear = '';
            for(let i=5; i > 0; i--) {
                labelYear = (Number(nowYear) - i + 1);
                this.extnrDemInfoLinechartData.labels.push(labelYear);
                this.pqiPointInfoLinechartData.labels.push(labelYear);
                this.extnrInsttInfoBarchartData.labels.push(labelYear);
                this.bsChckOpenInfoLinechartData.labels.push(labelYear);
                this.nonCnfrmOpenBarchartData.labels.push(labelYear);
            }

            // console.log("fn_clearChart :  %o", this.$refs.extnrDemInfoLinechart[0]);
            // console.log("this.extnrDemInfoLinechartData.labels :  %o", this.extnrDemInfoLinechartData.labels);

            this.extnrDemInfoLinechartData.datasets[0].data   = [];
            this.pqiPointInfoLinechartData.datasets[0].data   = [];
            this.extnrInsttInfoBarchartData.datasets[0].data  = [];

            this.bsChckOpenInfoLinechartData.datasets[0].data = [];
            this.nonCnfrmOpenBarchartData.datasets[0].data    = [];

            this.$refs.extnrDemInfoLinechart[0].renderChartData();
            this.$refs.pqiPointInfoLinechart[0].renderChartData();
            this.$refs.extnrInsttInfoBarchart[0].renderChartData();

            this.$refs.bsChckOpenInfoLinechart[0].renderChartData();
            this.$refs.nonCnfrmOpenBarchart[0].renderChartData();
        },

        async fn_aprvPage(type){    // 오늘의 결재 페이지 이동
            let current = 0

            switch (type){
                case 'APRV_N': 
                     current = 1
                     break;
                case 'HELP_N': 
                     current = 2
                     break;
                case 'APRV_Y': 
                     current = 3
                     break;
                case 'APRV_R': 
                     current = 4
                     break;
                case 'SHARE_N': 
                     current = 5
                     break;
            } 

            const approval      = this.gnbMenuList
                                    .find(item => item.name === 'My Work')
                                    ?.children
                                    ?.find(item => item.menuMngtId === 'MUMI_0000000055')
            const approvalSheet = approval
                                    ?.children
                                    ?.find(item => item.menuMngtId === 'MUMI_0000000117') 

            if (approval && approvalSheet) {
                this.$parent.$refs.mainHeader.fn_clickToPath(approvalSheet, approval.name, { 'current': current })
            }
        },
        
        async fn_myWorkPage(id){ // 나의 할 일 페이지 이동
           
            const myJob      = this.gnbMenuList
                                    .find(item => item.name === 'My Work')
                                    ?.children
                                    ?.find(item => item.menuMngtId === 'MUMI_0000000054')
            const myJobSheet = myJob
                                    ?.children
                                    ?.find(item => item.menuMngtId === 'MUMI_0000000118') 

            if (myJob && myJobSheet) {
                this.$parent.$refs.mainHeader.fn_clickToPath(myJobSheet, myJob.name, { myWorkInfoId : id})
            }
        },

        fn_projectPage(){ // 프로젝트 정보 이동
            const project      = this.gnbMenuList
                                    .find(item => item.name === '현장정보 및 QA')
                                    ?.children
                                    ?.find(item => item.menuMngtId === 'MUMI_0000000016')
            if (project) {
                this.$parent.$refs.mainHeader.fn_clickToPath(project, project.name)
            }
        },

        async fn_noticePage(noticeId){ // 공지사항 이동
            const notice      = this.gnbMenuList
                                    .find(item => item.name === '커뮤니티')
                                    ?.children
                                    ?.find(item => item.menuMngtId === 'MUMI_0000000047')
            if (notice) {
                await this.$parent.$refs.mainHeader.fn_clickToPath(notice, notice.name, { 'noticeId' : noticeId})
                this.$router.push({ name: 'NoticeView',  params : { 'noticeId' : noticeId } })
            }
        },

        // page link 
        fn_linkPage: function (item, params) {
            switch(item.layoutViewId) {
                // 자재관리
                case 'mtrilMngt': {
                    const mtrilMngt = this.gnbMenuList
                                            .find(menu => menu.name === '품질활동')
                                            ?.children
                                            ?.find(menu => menu.menuMngtId === 'MUMI_0000000026')
                    switch(this.mtrilMngtTab.current) {
                        // 자재공급원승인
                        case 0: {
                            this.$store.dispatch('tabInfo/setMoveMenu', {
                                item: mtrilMngt.children.find(menu => menu.menuMngtId === 'MUMI_0000000070'),
                                upperName: mtrilMngt.name,
                                params: {
                                    status: params
                                },
                            })
                            break
                        }
                        // 인수검사
                        case 1: {
                            this.$store.dispatch('tabInfo/setMoveMenu', {
                                item: mtrilMngt.children.find(menu => menu.menuMngtId === 'MUMI_0000000069'),
                                upperName: mtrilMngt.name,
                                params: {
                                    testStatus: params
                                },
                            })
                            break
                        }
                        // 공장검사
                        case 2: {
                            this.$store.dispatch('tabInfo/setMoveMenu', {
                                item: mtrilMngt.children.find(menu => menu.menuMngtId === 'MUMI_0000000068'),
                                upperName: mtrilMngt.name,
                                params: {
                                    testStatus: params
                                },
                            })
                            break
                        }
                    }
                    break
                }

                // 시험관리
                case 'testMngt': {
                    const testMngt  = this.gnbMenuList
                                            .find(menu => menu.name === '품질활동')
                                            ?.children
                                            ?.find(menu => menu.menuMngtId === 'MUMI_0000000027')
                    this.$store.dispatch('tabInfo/setMoveMenu', {
                        item: testMngt.children.find(menu => menu.menuMngtId === 'MUMI_0000000066'),
                        upperName: testMngt.name,
                        params: {
                            resultProgrsStatus: params
                        },
                    })
                    break
                }

                // 콘크리트 관리
                case 'cncrtMngt': {
                    const cncrtMngt = this.gnbMenuList
                                            .find(menu => menu.name === '품질활동')
                                            ?.children
                                            ?.find(menu => menu.menuMngtId === 'MUMI_0000000025')
                    switch(this.cncrtMngtTab.current) {
                        case 0: {
                            this.$store.dispatch('tabInfo/setMoveMenu', {
                                item: cncrtMngt.children.find(menu => menu.menuMngtId === 'MUMI_0000000075'),
                                upperName: cncrtMngt.name,
                                params: {
                                    pourProgress: params
                                },
                            })
                            break
                        }
                        case 1: {
                            this.$store.dispatch('tabInfo/setMoveMenu', {
                                item: cncrtMngt.children.find(menu => menu.menuMngtId === 'MUMI_0000000074'),
                                upperName: cncrtMngt.name,
                                params: {
                                    strgTestStatus: params
                                },
                            })
                            break
                        }
                    }

                    break
                }

                // 검측 관리
                case 'inptMngt': {
                    const inptMngt  = this.gnbMenuList
                                            .find(menu => menu.name === '품질활동')
                                            ?.children
                                            ?.find(menu => menu.menuMngtId === 'MUMI_0000000023')
                    this.$store.dispatch('tabInfo/setMoveMenu', {
                        item: inptMngt.children.find(menu => menu.menuMngtId === 'MUMI_0000000072'),
                        upperName: inptMngt.name,
                        params: {
                            progrsSttus: params
                        },
                    })
                    break
                }

                // 부적합 관리
                case 'improptMngt': {
                    const improptMngt   = this.gnbMenuList
                                            .find(menu => menu.name === '품질활동')
                                            ?.children
                                            ?.find(menu => menu.menuMngtId === 'MUMI_0000000022')
                    this.$store.dispatch('tabInfo/setMoveMenu', {
                        item: improptMngt.children.find(menu => menu.menuMngtId === 'MUMI_0000000071'),
                        upperName: improptMngt.name,
                        params: {
                            noCnfmStatus: params,
                            noCnfmType: this.improptMngtTab.current === 0       ? 'CAR'
                                            : this.improptMngtTab.current === 1 ? 'NCR'
                                            : this.improptMngtTab.current === 2 ? 'Punch'
                                            : ''
                        },
                    })
                    break
                }

                // 관련 사이트
                case 'relateSite': {
                    window.open(this.siteLink.find(site => site.name === params)?.link)
                    break
                }

                default: 
                    break
            }
        },
    }
    
}
</script>
<style lang="scss" scoped>
   
</style>