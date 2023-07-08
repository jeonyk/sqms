<template>
  <div class="tab_contents">
    <Breadcrumb :currentPath="$route.fullPath" />
    <div class="lst_tabs">
      <ul class="">
        <li
          v-for="(tab, index) in tabs"
          :class="{active:currentTab===index}"
          :key="index"
        >
          <a
            href="javascript:void(0);"
            @click="currentTab=index"
          >{{ tab }}</a>
        </li>
      </ul>
    </div>
    <div
      class="tab_area"
      v-if="currentTab == 0"
    >
      <supplier-view />
    </div>
    <!-- 공급업체 -->

    <div
      class="tab_area"
      v-else-if="currentTab == 1"
    >
      <specific-foml-sheet />
    </div>
    <!-- 시방배합 -->

    <div
      class="tab_area"
      v-else-if="currentTab == 2"
    >
      <pour-option-write-form />
    </div>
    <!-- 타설옵션 -->

    <div
      class="tab_area"
      v-else-if="currentTab == 3"
    >
      <test-device-info-form />
    </div>
    <!-- 추가정보 -->

    <div
      class="tab_area"
      v-else-if="currentTab == 4"
    >
    <!-- Numbering -->
      <numbering
        :title="'콘크리트'"
        code-type="CCRT"
        code-dtl-type="CONC"
        :except-list="['GJGCD', 'GJMCD', 'GJSCD']"
        :key="'CONC'"
      />
    </div>
    <div
      class="tab_area"
      v-else-if="currentTab == 5"
    >
      <!-- <approve-option-form /> -->
      <approval-option code-type="CCRT" />
    </div>
    <!-- 결재옵션 -->
  </div>
</template>

<script>
import SupplierView from '@/pages/quality/concreteMngt/SupplierView.vue'
import SpecificFomlSheet from '@/pages/quality/concreteMngt/SpecificFomlSheet.vue'
import PourOptionWriteForm from '@/pages/quality/concreteMngt/PourOptionWriteForm.vue'
import TestDeviceInfoForm from '@/pages/quality/concreteMngt/TestDeviceInfoForm.vue'
// import ApproveOptionForm from '@/pages/quality/concreteMngt/ApproveOptionForm.vue'
import Numbering from "@material/component/Numbering"
import ApprovalOption from "@material/component/ApprovalOption"
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
export default {
    name: 'SelectCurrentTab',
    components: { 
        SupplierView, 
        SpecificFomlSheet,
        PourOptionWriteForm,
      TestDeviceInfoForm,
      // ApproveOptionForm,
      ApprovalOption,
      Numbering,
      Breadcrumb,
    },
    data() {
        return {
            footerBg: 'transparent',
            tabs: ['공급업체', '시방배합', '타설옵션', '추가정보', 'Numbering', '결재옵션'],
            currentTab: 0, // 기본 current 값 지정 
        }
    }
}
</script>