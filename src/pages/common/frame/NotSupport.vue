<template>
    <div class="tab_contents">
        <div class="error">
            <h3 class="title">서비스에 접속할 수 없습니다.</h3>
            <p class="desc">기술적인 문제로 일시적으로 접속되지 않았습니다.<br />잠시 후 다시 이용해주세요.</p>
            <div class="btn_area">
                <button type="button" @click="goToback" class="btn btn_lg btn_outline btn_darkgray">이전</button>
                <button type="button" @click="goToMain" class="btn btn_lg btn_outline btn_blue">메인</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Error_NotSupported',
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