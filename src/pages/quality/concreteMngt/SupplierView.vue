<template>
  <div class="inner type2">
    <div class="table_normal_list align_center">
      <table>
        <caption class="sr_only" />
        <colgroup>
          <col width="10%">
          <col width="*">
          <col width="*">
          <col width="*">
        </colgroup>
        <thead>
          <tr>
            <th>No.</th>
            <th>공급업체명</th>
            <th>제조업체</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody v-if="supplyList.length != 0">
          <tr
            v-for="(list, index) in supplyList"
            :key="list.mtrlSpApprId"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ list.tradeNm }}</td>
            <td>{{ list.mnft }}</td>
            <td>{{ list.comment }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4" class="disabled">조회된 데이터가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import API from '@/apis/'

export default {
    name: 'SupplierView',
    components: { 
    },
    data() {
        return {
            footerBg: 'transparent',
            supplyList : [],
            supplyname: '',
            supplyabbreviation: '',
            comment:'',
            isGetList: false // 로딩 : 공급 업체 목록 조회
        }
    },
    async created (){
      await this.getSupplierList()
    },
    methods: {
		/**
		 * 공급 업체 목록 조회
		 */
		async getSupplierList () {
			try {
				this.isGetList = true
				const param = {
					projectId : this.$cookies.get("projectId"),
					siteId : this.$cookies.get("siteId"),
					siteMstrId : this.$store.getters['auth/getSiteMstrId']
				}

				const response = await API.concrete.getSupplierList(param)
				if(response?.data) this.supplyList = response.data
			} catch (error) {
					console.error('공급 업체 조회 에러: ', error)
			} finally {
				this.isGetList = false
			}
		}
    }
}
</script>