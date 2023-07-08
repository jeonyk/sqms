<!-- SubmenuComponent.vue -->
<template>
<div class="left_content">
    <div class="link_area">
        <div class="search_area">
            <input type="text" class="form_control" placeholder="검색">
            <button type="button" class="btn_search">검색</button>
        </div>
        <ul class="sub_1depth">
            <li class="on">
                <div class="title">
                    <a href="javascript:void(0)">공통</a>
                </div>
                <ul class="sub_2depth">
                    <li><a href="javascript:void(0)">토공 및 기초공사</a></li>
                    <li><a href="javascript:void(0)">철근콘크리트공사</a></li>
                    <li><a href="javascript:void(0)">철강구조물공사</a></li>
                    <li><a href="javascript:void(0)">가설기자재</a></li>
                    <li><a href="javascript:void(0)">기타</a></li>
                </ul>
            </li>
            <li>
                <div class="title">
                    <a href="javascript:void(0)">건축</a>
                </div>
                <ul class="sub_2depth">
                    <li><a href="javascript:void(0)">가설공사</a></li>
                    <li><a href="javascript:void(0)">토공사</a></li>
                    <li><a href="javascript:void(0)">흙막이공사</a></li>
                    <li><a href="javascript:void(0)">파일공사</a></li>
                    <li><a href="javascript:void(0)">철근공사</a></li>
                    <li><a href="javascript:void(0)">거푸집공사</a></li>
                    <li><a href="javascript:void(0)">콘크리트공사</a></li>
                    <li><a href="javascript:void(0)">PC공사</a></li>
                    <li><a href="javascript:void(0)">철골공사</a></li>
                    <li><a href="javascript:void(0)">기타공사</a></li>
                </ul>
            </li>
            <li>
                <div class="title">
                    <a href="javascript:void(0)">설비</a>
                </div>
                <ul class="sub_2depth">
                </ul>
            </li>
            <li>
                <div class="title">
                    <a href="javascript:void(0)">전기</a>
                </div>
                <ul class="sub_2depth">
                </ul>
            </li>
            <li>
                <div class="title">
                    <a href="javascript:void(0)">토목</a>
                </div>
                <ul class="sub_2depth">
                </ul>
            </li>
            <li>
                <div class="title">
                    <a href="javascript:void(0)">조경</a>
                </div>
                <ul class="sub_2depth">
                </ul>
            </li>
            <li>
                <div class="title">
                    <a href="javascript:void(0)">품질시스템</a>
                </div>
                <ul class="sub_2depth">
                </ul>
            </li>
        </ul>
        <div class="close_btn" @click="closeBtn"></div>
    </div>
</div>

</template>

<script>
export default {
    name: "TabListSearch",
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
            }else if(getElement.className == "tab_area"){
                getElement.classList.add('submenu_on')
            }
        },

    },
    mounted() {
        // left_content dropdown event
        function getEventTarget(e) {
            e = e || window.event;
            return e.target || e.srcElement; 
        }

        var ul = document.querySelector('.link_area .sub_1depth');
        ul.onclick = function(event) {
            var target = getEventTarget(event);
            if(target.parentElement.className == "title"){
                target.parentElement.parentElement.classList.toggle('on')
            }
        };
    },
};
</script>