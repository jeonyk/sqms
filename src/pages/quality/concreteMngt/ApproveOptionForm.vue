<!--
  * 콘크리트 관리 > 초기 Setting > 결재옵션
  * 시험 관리 쪽 결재옵션 긁어왔습니다.
 -->
<template>
  <div class="inner">
    <div class="button_box">
      <h2>결재방식 선택</h2>
      <button
        type="button"
        class="btn btn_sm btn_darkblue"
        @click="$bvModal.show('applyApprovalMethodConfirm')"
      >
        저장
      </button>
    </div>

    <div class="table_normal_list opt_payment">
      <table>
        <caption class="sr_only" />
        <colgroup>
          <col width="137">
          <col width="*">
        </colgroup>
        <tbody>
          <tr
            v-for="(item, index) in approveOptions"
            :key="index"
          >
            <td>
              <label
                class="input_radio"
                :for="`approvalMethod_${index}`"
              >
                <input
                  type="radio"
                  v-model="current"
                  :id="`approvalMethod_${index}`"
                  :value="index"
                >
                <span class="label_text"> {{ item.key }}</span>
              </label>
            </td>
            <td>
              {{ item.content }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <pop-alert
      msg="선택하신 결재방식을 적용하시겠습니까?"
      pop-id="applyApprovalMethodConfirm"
      :btn-name="{first : '확인', second: '취소'}"
      @first-btn-fn="savePaymentOption()"
      @second-btn-fn="$bvModal.hide('applyApprovalMethodConfirm')"
      confirm-use
    />
    <pop-alert
      msg="적용 실패했습니다."
      pop-id="failApprovalAlert"
      :btn-name="{first : '확인'}"
      @first-btn-fn="$bvModal.hide('failApprovalAlert')"
    />
  </div>
</template>

<script>
import { sendPostApi } from '@/apis/common'
import PopAlert from '@/pages/common/popup/PopAlert.vue'
export default {
    name: 'ApproveOptionForm',
    components: {
        PopAlert
    },
    data:() => ({
        approveOptions: [
            {
                key: '온라인',
                content: '전체 결재 라인 온라인 결재',
                value: 'FULL'
            },
            {
                key: '50% 온라인',
                content: 'HEC 내부만 온라인 결재',
                value: 'HALF'
            },
            {
                key: '오프라인',
                content: '결재 서류 출력 후 결재. 단, 결재완료 후 최종승인 처리 필요',
                value: 'OFF'
            }
        ],
        current: ''
    }),
    async created () {
        await this.getPaymentOption()
    },
    methods: {
        async getPaymentOption() {  // 결재 옵션 불러오기
            try {
                const url = '/sendApi/api/apvlOptn/approvalOptionView';
                const payload = {
                    codeType : 'CCRT',
                    siteMstrId : this.$cookies.get('siteMstrId')
                }
                const response = await sendPostApi(url, payload, {
                    headers: {
                        "Content-Type": "application/json;",
                        "Accept-Language": "ko",
                        'Authorization': this.$cookies.get("Authorization")
                    }
                })

                let paymentType = response.data.data.aprvOptnType
                switch (paymentType) {
                    case 'FULL':
                        this.current = 0
                        break;
                    case 'HALF':
                        this.current = 1
                        break;
                    case 'OFF':
                        this.current = 2
                        break;
                }
            } catch (error) {
                console.log(error.response)
        }
    },
        async savePaymentOption() { // 결재 옵션 저장
            try {
                const url = '/sendApi/api/apvlOptn/approvalOptionChange'

                const payload = {
                    codeType : 'CCRT',
                    siteMstrId : this.$cookies.get('siteMstrId'),
                    aprvOptnType : this.approveOptions[this.current].value
                }
                const response = await sendPostApi(url, payload, {
                    headers: {
                        "Content-Type": "application/json;",
                        "Accept-Language": "ko",
                        'Authorization': this.$cookies.get("Authorization")
                    }
                })
            } catch (error) {
                console.log(error.response)
                this.$bvModal.show('failApprovalAlert')
            } finally {
                this.$bvModal.hide('applyApprovalMethodConfirm')
            }
        }
    }
}
</script>