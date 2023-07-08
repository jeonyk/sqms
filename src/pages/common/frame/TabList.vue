<!-- SubmenuComponent.vue -->
<template>
<div class="left_content">
    <div class="check_area">
        <div class="ar">
            <button type="button" class="btn btn_sm btn_darkgray btn_all_check">전체선택</button>
        </div>
        <ul class="sub_1depth">
            <li class="on">
                <div class="title">
                    <a href="javascript:void(0)">공통</a>
                    <label class="input_check pop_notext">
                        <input type="checkbox" id="" name="">
                        <span class="label_text"></span>
                    </label>
                </div>
                <ul class="sub_2depth">
                    <li>
                        토목 및 기초공사
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                    <li>
                        철근콘크리트공사
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                    <li>
                        철강구조물공사
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                    <li>
                        가설기자재
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                    <li>
                        기타
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                </ul>
            </li>

            <li>
                <div class="title">
                    <a href="javascript:void(0)">공통</a>
                    <label class="input_check pop_notext">
                        <input type="checkbox" id="" name="">
                        <span class="label_text"></span>
                    </label>
                </div>
                <ul class="sub_2depth">
                    <li>
                        토목 및 기초공사
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                    <li>
                        철근콘크리트공사
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                    <li>
                        철강구조물공사
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                    <li>
                        가설기자재
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                    <li>
                        기타
                        <label class="input_check pop_notext">
                            <input type="checkbox" id="" name="">
                            <span class="label_text"></span>
                        </label>
                    </li>
                </ul>
            </li>

        </ul>
        <div class="close_btn" v-on:click="closeBtn"></div>
    </div>
</div>

</template>

<script>
export default {
    name: "TabSubmenu",
    data() {
        return {
        } 
    },
    methods: {
        // left_content show & hide event
        closeBtn: function(e) {
            var getElement = e.target.parentElement.parentElement.parentElement;
            if(getElement.className == "tab_area submenu_on"){
                getElement.classList.remove('submenu_on')
            }
        },

    },
    mounted() {
        // left_content dropdown event
        function getEventTarget(e) {
            e = e || window.event;
            return e.target || e.srcElement; 
        }

        var ul = document.querySelector('.check_area .sub_1depth');
        ul.onclick = function(event) {
            var target = getEventTarget(event);
            if(target.parentElement.className == "title"){
                target.parentElement.parentElement.classList.toggle('on')
            }
        };
    },
};
</script>