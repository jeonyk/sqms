<template>
  <b-modal
    :id="id"
    title="시험장비 선택" 
    hide-backdrop
    size="lg"
    footer-bg-variant="transparent"
    @show="init"
  >
    <template #default>
      <div class="pop_container">
        <div class="lookup_box multi_line align_center">
          <table>
            <caption class="sr_only" />
            <colgroup>
              <col width="6%">
              <col width="24%">
            </colgroup>
            <tbody>
              <tr>
                <th>계측기명</th>
                <td>
                  <input
                    v-model="searchDevice"
                    type="text"
                    class="form_control w100"
                    placeholder="입력해주세요"
                    @keyup.enter="search()"
                  >
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      class="btn_reset"
                      @click="e => {
                        searchDevice = ''
                        search()
                      }"
                    >
                      초기화
                    </button>
                    <button
                      type="button"
                      class="btn btn_sm btn_darkblue btn_radius btn_search"
                      @click="search()"
                    >
                      검색
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="inner" >
          <sqms-grid
            :data="data"
            :cfg="{NoVScroll:false}"
            :columns="columns"
            :inputStyle="{'height':'250px'}"
            @click="selectRow"
            @dbClick="saveEquip"
          />
        </div>
      </div>
    </template>
    <template #modal-footer="{ hide }">
      <b-button
        class="btn btn_md btn_outline btn_darkgray"
        @click="saveEquip()"
      >
        선택
      </b-button>
      <b-button
        class="btn btn_md btn_outline btn_gray"
        @click="hide('forget')"
      >
        닫기
      </b-button>
    </template>
  </b-modal>
</template>

<script>
    import API from '@/apis/'
    export default {
        name: 'SelectTestEquipModal',
        props: {
            id: {
                type: String,
                default: 'SelectTestEquipModal'
            },
            initDeviceName: {
                type: [Number, String],
                default: ''
            },
            remain: {    // 검교정 상태
                type: Number,
                default: 0
            },
            status: {    // 보유 / 반출 상태
                type: String,
                default: ''
            }
        },
        watch: {
          initDeviceName() {
            this.init()
          }
        },
        methods: {
            async init () {
                // this.searchDevice = this.initDeviceName
                await this.getTestDeviceList()

                if(this.data?.length) this.selectedRow = this.data[0]
            },
            /**
             * 시험장비 목록 조회 메서드
             */
            async search () {
                await this.getTestDeviceList()
            },
            /**
             * API 시험장비 조회
             */
            async getTestDeviceList (deviceNm = this.searchDevice) {
              const payload = {
                useYn : this.useYn,
                deviceNm : deviceNm,
                remain : this.remain,
                status : this.status
              }
                try {
                    const response = await API.testDevice.getTestDeviceList(payload)
                    if(response?.data) {
                        this.data = response.data.map(item => {
                          return {
                            ...item,
                            useYn : item.useYn === 'Y'? '보유' : '' 
                          }
                        })
                    }

                } catch (error) {
                    console.error('시험장비 리스트 조회 에러: ', error)
                }
            },
            selectRow (evt) {
                evt.sheet.focus(evt.row)

                const selected = evt.sheet.getRowValue(evt.row)
                this.selectedRow = selected
            },
            saveEquip (evt) {
                if(evt){
                  evt.sheet.focus(evt.row)
                  const selected = evt.sheet.getRowValue(evt.row)
                  if(!selected.testDeviceInfoId || !selected.deviceNm){
                    return;
                  }
                  this.selectedRow = selected
                }
                this.$emit('save', this.selectedRow)
                this.$bvModal.hide(this.id)
            }
        },
        data: () => ({
            selectedRow: null,
            columns: [
                { Name: 'confinalNm', Header: [{ Value: '공종' }], RelWidth: 15, CanEdit: false },
                { Name: 'deviceNm', Header: [{ Value: '계측기명' }], RelWidth: 15, CanEdit: false },
                { Name: 'holdingCompany', Header: [{ Value: '보유업체' }], RelWidth: 15, CanEdit: false },
                { Name: 'correctTerm', Header: [{ Value: '교정주기' }], RelWidth: 15, CanEdit: false },
                { Name: 'useYn', Header: [{ Value: '보유/반출 상태' }], RelWidth: 15, CanEdit: false },
                { Name: 'deviceId', Visible: '0' },
                { Name: 'testDeviceInfoId', Visible: '0' }
            ],
            data: [],
            searchDevice: '',
            useYn : 'Y'
        })
    }
</script>