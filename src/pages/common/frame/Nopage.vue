<template>
    <div class="tab_contents">
        <div class="error">
            <h3 class="title">페이지를 찾을 수 없습니다.</h3>
            <p class="desc">요청하신 페이지가 제거되었거나 또는 이름이 변경되었을수 있습니다.<br />잠시 후 다시 이용해주세요.</p>
            <div class="btn_area">
                <button type="button" v-on:click="goToback" class="btn btn_lg btn_outline btn_darkgray">이전</button>
                <button type="button" v-on:click="goToMain" class="btn btn_lg btn_outline btn_blue">메인</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Error_NotFound',
        methods: {
            goToback(){
                this.$router.go(-1);
            },
            goToMain(){
                this.$store.dispatch('tabInfo/allTabClose');
                this.$router.push("/main");
            }

        },
        
   }
</script>