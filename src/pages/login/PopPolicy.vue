<template>
    <!-- 로그인 페이지>약관동의 (팝업) -->
    <b-modal id="pop_policy" title="약관 동의"
        hide-backdrop size="lg" static
        :footer-bg-variant="footerBg" @shown="resetAll">
        <template #default>
            <div class="pop_container">
                <p>현대엔지니어링 SQMS 이용을 위해 아래의 개인정보수집 및 이용, 이용약관에 대한 안내를 읽고<br />동의하여 주시기 바랍니다.</p>
                <h3 class="title">이용약관 (필수)</h3>
                <div class="terms_area">
                    <!-- <h4></h4> -->
                    <h5 class="pt0">제 1조 명칭</h5>
                    <p>본 시스템의 명칭은 "SQMS"(이하'시스템')이라 칭한다.</p>
                    
                    <h5>제 2조 소재지</h5>
                    <p>본 시스템은 경기도 파주시 현대차그룹 데이터센터 내에 위치한다.</p>
                    <h5>제 3조 목적</h5>
                    <p>이 약관은 현대엔지니어링(주)가 제공하는 SQMS 서비스의 이용과 관련하여<br />회사와 이용자의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 한다.</p>
                    <h5>제 4조 운영</h5>
                    <p>1. 본 시스템의 운영시간은 연중무휴 1일 24시간을 원칙으로 한다. 다만, 업무상 또는 기술상의 이유로 서비스가 일시 중지될 수 있고, 또한 정기점검 등 운영상의 목적으로 서비스가 일시 중지될 수 있다.  이러한 경우 사전 또는 사후에 이를 공지한다.</p>
                    <h5>제 5조 민원인의 등록 및 대상 </h5>
                    <p>
                        1. 본 시스템의 이용 대상은 본 사이트에 접속 승인을 받은 자로 한다.<br />
                        2. 본 시스템은 회원가입 절차가 필요 없다. 다만, 업무처리 과정 및 조치결과를 확인하기 위해서는 민원인의 최소 정보가 필요하다.
                    </p>
                    <h5>제 6조 민원인 자격의 상실</h5>
                    <p>
                        다음의 경우에는 민원인 자격이 상실된다.<br />
                        1. 민원인 정보를 위/변조하여 민원신청한 민원인<br />
                        2. 본 시스템의 약관이 정한 규정을 위반하였을 경우
                    </p>
                    <h5>제 7조 민원인의 의무</h5>
                    <p>
                        1. 민원인은 본 약관을 성실하게 준수하여야 한다.<br />
                        2. 민원인은 본 시스템 이용 시 업무와 연관된 사람이 시스템을 통해 업무 내용 확인 및 처리가 가능하도록 신청내용을 최대한 자세히 작성해야 한다.
                    </p>
                    <h5>제 8조 개정</h5>
                    <p>본 시스템의 운영상 부득이 필요하다고 인정할 때에는 본 약관을 개정 또는 변경할 수 있고 그 효력은 이용자 전원에게 적용된다.</p>
                    <h5>제 9조 관습</h5>
                    <p>본 약관에 명시되지 않은 사항에 관하여는 일반적인 관례에 따른다.</p>
                    <h5>제 10조 효력발생</h5>
                    <p>본 약관은 <span class="color_warning">2022. 10. 1</span>부터 적용된다.</p>
                </div>
                <div class="check_area">
                    <label class="input_radio" for="rdoSolar1">
                        <input type="radio" id="rdoSolar1" name="birthday_type1" value="Y" v-model="agreeFrst">
                        <span class="label_text">동의합니다.</span>
                    </label>
                    <label class="input_radio ml30" for="rdoSolar2">
                        <input type="radio" id="rdoSolar2" name="birthday_type1" value="N" v-model="agreeFrst">
                        <span class="label_text">동의하지 않습니다. <em>(동의하지 않을 경우 이용할 수 없습니다.)</em></span>
                    </label>
                </div>
                <h3 class="title">개인정보수집 및 이용안내 (필수)</h3>
                <div class="terms_area">
                    <p class="pt0">
                        '현대엔지니어링'은 (이하 '회사'는) 「개인정보보호법」에 따라 정보주체의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 정보주체의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.<br />
                        회사는 개인정보처리방침을 개정하는 경우 홈페이지(<span class="color_warning">URL 추후 제공</span>)를 통하여 공지할 것입니다.<br />
                        본 방침은 <span class="color_warning">2022년 10월 1일부터</span> 시행됩니다.
                    </p>
                    <h4>1. 개인정보의 처리 목적	</h4>
                    <p>
                        회사는 다음의 목적으로 필요에 의한 최소한의 개인정보를 처리하고 있습니다.
                    </p>
                    <ul>
                        <li>
                            가. 민원사무 처리
                            <p>민원인의 민원사항 확인, 사실확인을 위한 연락·통지, 처리결과 통보 등을 목적으로 개인정보를 처리합니다.</p>
                        </li>
                    </ul>
                    <h4>2. 처리하는 개인정보의 항목</h4>
                    <ul>
                        <li>
                            가. 필수항목 : 
                            <p>- 민원신청 : 성명, 휴대전화번호</p>
                        </li>
                        <li>
                            나. 선택항목 : 없음
                        </li>
                        <li>
                            다. 수집방법 : <span class="color_warning">SQMS 관리시스템</span> 
                        </li>
                    </ul>

                    <h4>3. 개인정보의 처리 및 보유 기간</h4>
                    <ul>
                        <li>
                            가. 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용기간 내에서 개인정보를 처리, 보유합니다.
                        </li>
                        <li>
                            나. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                            <p>
                                -보유근거 : 민원신청, VOC 또는 분쟁에 관한 기록
                                -보유기간 : 민원처리완료 시점으로부터 30일 후 삭제
                            </p>
                        </li>
                    </ul>

                    <h4>4. 개인정보처리 위탁</h4>
                    <ul>
                        <li>
                            가. 회사가 개인정보의 처리를 위탁하는 경우에는 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 이용약관 또는 위탁계약에 구성하고 있습니다.<br />
                            현재 원활한 서비스 제공과 관련하여 필수적인 개인정보제공 및 처리위탁 업체는 아래와 같습니다.

                            <div class="table_normal_list mt10">
                                <table>
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="180">
                                        <col width="180">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>위탁업무</th>
                                            <th>수탁업체</th>
                                            <th>위탁의 범위</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>민원업무처리시스템 관리</td>
                                            <td>현대오토에버㈜</td>
                                            <td>민원업무처리시스템 서버 및 운영관리</td>
                                        </tr>
                                        <tr>
                                            <td>민원신청 업무처리 관리</td>
                                            <td class="color_warning">현대엔지니어링㈜</td>
                                            <td>민원신청에 대한 조치 및 처리 업무</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                        <li>
                            나. 회사는 정보주체정보 처리를 위탁받은 업체가 개인정보 보호와 관련하여 제반의 조치를 취하도록 하며 만약 정보주체정보를 위탁받은 업체가 고의 또는 과실로 인하여 회사 회원에게 손해를 입한 경우 그에 대한 모든 책임을 부담합니다.
                        </li>
                        <li>다. 다만, 아래의 경우에는 예외로 합니다.
                            <p>- 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</p>
                        </li>
                    </ul>

                    <h4>5. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 </h4>
                    <p>정보주체는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.</p>
                    <ul>
                        <li>가. 정보주체는 언제든지 개인정보 열람, 정정, 삭제, 처리정지 등의 요구 권리를 행사할 수 있습니다.</li>
                        <li>나. '가'항에 따른 권리 행사는 개인정보 보호법 시행령에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 이에 대해 지체 없이 조치하겠습니다.</li>
                        <li>다. '가'항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>
                        <li>라. 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제3항 및 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</li>
                        <li>마. 개인정보보호법 제36조 제1항 및 제2항에 따라, 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인 정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없고, 개인정보의 정정 또는 삭제에 관하여 다른 법령에 특별한 절차가 규정되어 있는 경우에는 그 절차에 따라 정정 또는 삭제되어야 합니다.</li>
                        <li>사. 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</li>
                    </ul>

                    <h4>6. 개인정보의 파기	</h4>
                    <p>원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.<br/>파기의 절차, 시점 및 방법은 다음과 같습니다.</p>
                    <ul>
                        <li>
                            가. 파기절차
                            <p>정보주체가 입력한 정보는 목적 달성 후 지체없이 그 개인정보를 파기하도록 하고 있고, 다만 다른 법령에 따라 보존하여야 하는 경우에는 해당 개인정보를 다른 개인정보와 분리하여 저장 및 관리하고 있습니다.</p>
                        </li>
                        <li>나. 파기시점
                            <p>
                                이용목적이 달성된 후 내부방침 및 기타관련 법령에 의한 정보보호 방침에 의해 삭제되거나 파기합니다.	<br />
                                1) 민원처리완료 시점으로부터 30일 후 삭제되거나 파기합니다.
                            </p>
                        </li>
                        <li>다. 파기방법
                            <p>
                                1) 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.<br />
                                2) 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
                            </p>
                        </li>
                    </ul>

                    <h4>7. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항</h4>
                    <ul>
                        <li>
                            가. 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
                        </li>
                        <li>나. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 정보주체의 컴퓨터 브라우저에게 보내는 소량의 정보이며 정보주체들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
                            <p>
                                -쿠키의 사용 목적 : 정보주체가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어,보안접속 여부, 등을 파악하여 정보주체에게 최적화된 정보 제공을 위해 사용됩니다. <br />
                                -쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. <br />
                                -쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
                            </p>
                        </li>
                    </ul>

                    <h4>8. 개인정보 보호책임자</h4>
                    <p>개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                    <div class="table_normal_list mt10">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="45%">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>개인정보보호관리자</th>
                                    <th>개인정보보호담당자</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>성명 : 나동익</td>
                                    <td>성명 : 이승엽</td>
                                </tr>
                                <tr>
                                    <td>직급 : 팀장</td>
                                    <td>직급 : 매니저</td>
                                </tr>
                                <tr>
                                    <td>연락처 : 02-2134-3575</td>
                                    <td>연락처 : 02-2134-3572</td>
                                </tr>
                                <tr>
                                    <td>이메일 :  ndi3957@hec.co.kr</td>
                                    <td>이메일 : syl@hec.co.kr</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>정보주체께서는 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호관리자 및 담당자에게 문의하실 수 있습니다.</p>

                    <h4>9. 개인정보의 안전성 확보 조치</h4>
                    <p>개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.</p>
                    <ul>
                        <li>가. 내부관리계획의 수립 및 시행
                            <p>개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</p>
                        </li>
                        <li>나. 개인정보 취급 직원의 최소화 및 교육
                            <p>개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.</p>
                        </li>
                        <li>다. 개인정보에 대한 접근 제한
                            <p>개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</p>
                        </li>
                        <li>라. 접속기록의 보관 및 위변조 방지
                            <p>개인정보처리시스템에 접속한 기록을 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.</p>
                        </li>
                        <li>마. 개인정보의 암호화
                            <p>정보주체의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.</p>
                        </li>
                        <li>바. 해킹 등에 대비한 기술적 대책
                            <p>해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</p>
                        </li>
                        <li>사. 문서보안을 위한 잠금장치 사용
                            <p>개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.</p>
                        </li>
                        <li>아. 비인가자에 대한 출입 통제
                            <p>개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.</p>
                        </li>
                    </ul>

                    <h4>10. 정보주체의 권익침해에 대한 구제방법</h4>
                    <p>아래의 기관은 회사와는 별개의 기관으로서, 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.</p>
                    <ul>
                        <li>개인정보 침해신고센터 (한국인터넷진흥원 운영)
                            <p>
                                - 소관업무 : 개인정보 침해사실 신고, 상담 신청<br />
                                - 홈페이지 : privacy.kisa.or.kr<br />
                                - 전화 : (국번없이) 118<br />
                                - 주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터
                            </p>
                        </li>
                        <li>개인정보 분쟁조정위원회
                            <p>
                                - 소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)<br />
                                - 홈페이지 : www.kopico.go.kr<br />
                                - 전화 : (국번없이) 1833-6972<br />
                                - 주소 : (03171)서울특별시 종로구 세종대로 209 정부서울청사 4층
                            </p>
                        </li>
                        <li>대검찰청 사이버범죄수사단 : 02-3480-3573 (www.spo.go.kr)</li>
                        <li>경찰청 사이버안전국 : 182 (http://cyberbureau.police.go.kr)</li>
                    </ul>
                </div>
                <div class="check_area">
                    <label class="input_radio" for="rdoSolar3">
                        <input type="radio" id="rdoSolar3" name="birthday_type2" value="Y" v-model="agreeScnd">
                        <span class="label_text">동의합니다.</span>
                    </label>
                    <label class="input_radio ml30" for="rdoSolar4">
                        <input type="radio" id="rdoSolar4" name="birthday_type2" value="N" v-model="agreeScnd">
                        <span class="label_text">동의하지 않습니다. <em>(동의하지 않을 경우 이용할 수 없습니다.)</em></span>
                    </label>
                </div>
                <!-- <h3 class="title">개인정보 처리 위탁 동의 (필수)</h3>
                <div class="terms_area">
                    <p class="pt0">
                        '현대엔지니어링'은 (이하 '회사'는) 「개인정보보호법」에 따라 정보주체의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 정보주체의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.<br />
                        회사는 개인정보처리방침을 개정하는 경우 홈페이지(<span class="color_warning">URL 추후 제공</span>)를 통하여 공지할 것입니다.<br />
                        본 방침은 <span class="color_warning">2022년 10월 1일부터</span> 시행됩니다.
                    </p>
                    <p>
                        회사는 개인정보처리방침을 개정하는 경우 홈페이지(http://www.hec.co.kr) 를 통하여 공지할 것입니다.
                    </p>
                    <p>
                        본 방침은부터 2022년 01월 01일부터 시행됩니다.
                        이전의 개인처리방침은 위에서 확인할 수 있습니다.
                    </p>
                    <h4>1. 개인정보의 처리목적</h4>
                    <p>
                        회사는 다음의 목적으로 필요에 의한 최소한의 개인정보를 처리하고 있습니다.
                    </p>
                </div>
                <div class="check_area">
                    <label class="input_radio" for="rdoSolar1">
                        <input type="radio" id="rdoSolar5" name="birthday_type3" value="Y" v-model="agreeThrd">
                        <span class="label_text">동의합니다.</span>
                    </label>
                    <label class="input_radio ml30" for="rdoSolar2">
                        <input type="radio" id="rdoSolar6" name="birthday_type3" value="N" v-model="agreeThrd">
                        <span class="label_text">동의하지 않습니다. <em>(동의하지 않을 경우 이용할 수 없습니다.)</em></span>
                    </label>
                </div> -->
                <div class="all_area">
                    <label class="input_check form_lg">
                        <input type="checkbox" id="" name="" v-model="agreeAll" @click="checkAgreement">
                        <span class="label_text">이용약관, 개인정보수집이용에 모두 동의합니다.</span>
                    </label>
                </div>
            </div>
        </template>
        <template #modal-footer="{ hide }"> 
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="insertAgreement">확인</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
        </template>
    </b-modal>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import {requestOptions, sendPostApi }  from '../../apis/common';

export default { 
    name: 'PopPolicy',
    mixins: [MsgBoxMixins],
    components: { 

    }, 
    data() { 
        return {
            footerBg: 'transparent',
            agreeFrst: '',
            agreeScnd:'',
            agreeThrd:'',

            agreeAll:false,         //모두동의선택
        }
    },
    props:{
        id:{
            type:String,
            default: '',
        },
        type:{
            type:String,
            default:'',
        }
    },
    mounted(){

    },
    created(){

    },
    watch:{
        agreeFrst:function(){
            if(this.agreeFrst == 'Y' && this.agreeScnd == 'Y'){
                this.agreeAll = true;
            }else{
                this.agreeAll = false;
            }
        },
        agreeScnd:function(){
            if(this.agreeFrst == 'Y' && this.agreeScnd == 'Y'){
                this.agreeAll = true;
            }else{
                this.agreeAll = false;
            }
        },
        // agreeThrd:function(){
        //     if(this.agreeFrst == 'Y' && this.agreeScnd == 'Y' &&this.agreeThrd == 'Y'){
        //         this.agreeAll = true;
        //     }else{
        //         this.agreeAll = false;
        //     }
        // },
    },
    methods:{
        checkAgreement:function(){
            // console.log(this.agreeAll);
            if(!this.agreeAll){
                this.agreeFrst = 'Y';
                this.agreeScnd = 'Y';
                // this.agreeThrd = 'Y';
            }else{
                this.agreeFrst = 'N';
                this.agreeScnd = 'N';
                // this.agreeThrd = 'N';
            }
        },
        resetAll:function(){
            this.agreeFrst = '';
            this.agreeScnd = '';
            this.agreeThrd = '';
            this.agreeAll = false;
        },
        insertAgreement: async function(){
            if(this.agreeFrst !='Y' || this.agreeScnd != 'Y'){
                this.alert('필수항목 약관에 모두 동의해주세요.');
                return;
            }else{
                let url = '/sendApi/api/login/agreement/write';
                let param = {
                    "userId":this.id, 
                    "userType":this.type, 
                    // "userPath":this.userPath,
                    "agreeFrst":'Y',
                    "agreeScnd":'Y',
                    // "agreeThrd":'Y',
                };
                const insertRst = await sendPostApi(url, param).then((result) => {
                    return result;
                }).catch((e) => {
                    // console.log(e);
                    return e.response;
                });
                // console.log('insertRst',insertRst);
                if(insertRst.data.count>0){
                    // console.log('dd');
                    this.$emit('insert-success',true);
                }else{
                    this.alert('오류로 인해 저장되지 않았습니다.');
                }
            }
        }
    }
}
</script>