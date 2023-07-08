<template>
  <div :id="refId" class="left_content">
    <div class="check_area">
      <div class="ar" >
        <!-- <button 
            v-if="useCheckBox"
            type="button" 
            class="btn btn_sm btn_darkgray btn_all_check"
            @click="selectAll"
        >
          전체선택
        </button> -->

        <!-- <button
            v-if="!useCheckBox"
            type="button"
            class="btn btn_sm btn_darkgray btn_all_check"
            @click="clickAll"
        >
            전체보기
        </button> -->
      </div>

      <ul class="sub_1depth">
        <!-- v-for="(data, index) in categoryData"
        :key="data.mainCodeId" -->
        <li :ref="`categoryData_${index}`"
            :class="{'on': index === 0 }"
            v-for="(data, index) in categoryData"
            :key="data.mainCodeId">
            <div class="title" @click="clickToggleSubmenu(index)">
                <a href="javascript:void(0);">
                    {{ useCheckBox? data.mainName : 'ㅤ'}}
                </a>
                <a v-if="!useCheckBox"
                    :style="{ background: 'none', paddingLeft: '0px', marginLeft: '-10px' }"
                    href="javascript:void(0);"
                    >
                    <!-- @click="clickCategory(data, $event)" -->
                    {{data.mainName}}
                </a>
                <label class="input_check pop_notext" v-if="useCheckBox">
                    <input type="checkbox" v-model="data.isChecked" @change="upperCheckBoxChagned(index)" />
                    <span class="label_text"></span>
                </label>
                <div class="right_area" v-if="editMode && data.totalCnt">
                    <span class="state" :class="{ red: data.inCnt === 0, yellow: data.inCnt > 0, green: data.inCnt === data.totalCnt }"></span>
                </div>
            </div>
            <ul class="sub_2depth">
                <li v-for="(inner, innerIdx) in data.midCodeList"
                    :key="inner.midCodeId">
                    <a href="javascript:void(0);"
                        @click="clickCategory(inner, $event)" :class="{ on: !noInitEmit ? inner.first : innerIdx === 0 && index === 0  }">
                        {{ inner.midName}}
                    </a>
                    <label class="input_check pop_notext" v-if="useCheckBox">
                        <input type="checkbox"
                            v-model="inner.isChecked"
                            @change="lowerCheckBoxChanged(index)" />
                        <span class="label_text"></span>
                    </label>
                    <div class="right_area" v-if="editMode && inner.totalCnt">
                        <span class="state" :class="{ red: inner.inCnt === '0', yellow: inner.inCnt > 0, green: inner.inCnt === inner.totalCnt }"></span>
                    </div>
                </li>
            </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

let _vm = null;

export default {
  name: "TreeCategoryTab",
  props: {
    refId: {
        type: String,
        default: 'TestTreeCategoryTab',
    },
    useCheckBox: {
      type: Boolean,
      default: false,
    },
    categoryData: {
        type: Array,
        default: () => {
            return []
        }
    },
    editMode: {
        type: Boolean,
        default: false
    },
    currentTab: {
        type: Number,
        default: 0
    },
    noInitEmit: {
        type: Boolean,
        default: false
    }
  },
  watch: {
      categoryData: {
          handler () {
                if (!this.noInitEmit) {
                    let returnParam = new Object();
                    
                    //console.log("@@@@ categoryData : %o",this.categoryData);
    
                    // 기본 공종/ 세부공종 설정
                    this.categoryData.some((item , index) => {                    
                        if(index == 0){                        
                            // 첫번째 메인 코드 
                            returnParam.mainCodeId = item.mainCodeId
                        }
    
                        item.midCodeList.some((inner, innerIndex) => {                        
                            if (innerIndex == 0) {
                                //첫번째 미드 코드
                                returnParam.midCodeId = inner.midCodeId
                                inner.first = true;
                                return true;
                            }
                        })
    
                        return true;
                    })
                  
                    this.$emit('changed-checked-list', returnParam);

                }
          },
          deep: true
      },
      currentTab: {
        handler () {
            let lnb = document.querySelectorAll('.left_content')[this.currentTab];
            // console.log(this.currentTab)
            if(lnb) {
                this.calcHeight();
                // window.addEventListener('resize', _vm.calcHeight);
                // window.addEventListener('scroll', _vm.calcHeight);
            }
        },
        deep: true
      }
  },
  created () {
    _vm = this;
  },
  deactivated() {
    window.removeEventListener('resize', _vm.calcHeight);
    window.removeEventListener('scroll', _vm.calcHeight);
  },
  beforeDestroy () {
    window.removeEventListener('resize', _vm.calcHeight);
    window.removeEventListener('scroll', _vm.calcHeight);
  },
  mounted() {
    let lnb = document.querySelectorAll('.left_content')[this.currentTab];
    if(lnb) {
        this.calcHeight();
        window.addEventListener('resize', _vm.calcHeight);
        window.addEventListener('scroll', _vm.calcHeight);
    }
  },
  methods: {
        selectAll () {
            let notChecked = true
            this.categoryData.forEach(data => {
                if (data.isChecked) {
                    notChecked = false
                }
                data.midCodeList.forEach(inner => {
                    if (inner.isChecked) {
                        notChecked = false
                    }
                })
            })

            this.categoryData.forEach(data => {
                data.isChecked = notChecked
                data.midCodeList.forEach(inner => {
                    inner.isChecked = notChecked
                })
            })
        },
        clickAll () {
            let tg = document.querySelectorAll(`div[id^="${this.refId}"] .sub_2depth > li > a`);
            tg.forEach(item => {
                item.classList.remove('on');
            });
            
            this.$emit('changed-checked-list', [])
        },
        clickToggleSubmenu (index) {
            const element = this.$refs[`categoryData_${index}`][0]
            // const element = this.$refs[`categoryData_li_${index}`]
            // console.log(this.$refs[`categoryData_${index}`][0])
        
            if (element.className === "on") {
                element.classList.remove('on')
            } else {
                element.classList.add('on')
            }

        },
        clickToggleButton (e) {
                const getElement = e.target.parentElement.parentElement.parentElement;
                if (getElement.className == "tab_area submenu_on"){
                    getElement.classList.remove('submenu_on')
                } else {
                    getElement.classList.add('submenu_on')
                }
        },
        clickCategory (item, evt) {
            let tg = document.querySelectorAll(`div[id^="${this.refId}"] .sub_2depth > li > a`);

            // console.log(document.querySelectorAll(` div[id^="${this.refId}"] .sub_2depth > li > a`))
            tg.forEach(item => {
                item.classList.remove('on');
            });
            evt.target.classList.add('on');
            if(!this.useCheckBox) {
                this.$emit('changed-checked-list', item)
            }
            //   console.log(item)
        },
        upperCheckBoxChagned (index) {
            this.categoryData[index].midCodeList.forEach(inner => {
                inner.isChecked = this.categoryData[index].isChecked
            })
        },
        lowerCheckBoxChanged (index) {
            let allChecked = true
            this.categoryData[index].midCodeList.forEach(inner => {
                if(!inner.isChecked) {
                    allChecked = false
                }
            })

            this.categoryData[index].isChecked = allChecked
            
        },

        calcHeight() {
            let winH = window.innerHeight;
            let winW = window.innerWidth;
            let lnb = document.querySelectorAll('.left_content')[this.currentTab];
            let ft = document.getElementById('footer');
            let lnbHt = null;
            
            if(winW < 1900) {
                lnbHt = winH - lnb.getBoundingClientRect().top - ft.clientHeight - 17;
            } else {
                lnbHt = winH - lnb.getBoundingClientRect().top - ft.clientHeight;
            }
            
            lnb.style.height = lnbHt + 'px'
        },
  }
};
</script>

<style lang="scss" scoped>
.ar {
    margin-bottom: 10px;
}
.sub_1depth {
    margin: 0 !important;
}
</style>