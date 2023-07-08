<template>
    <b-overlay
        :show="loading"
        :variant="'dark'"
        :opacity="0.5"
        :z-index="100000"
        style="transition: opacity 1.5s ease-in"
        no-wrap
        fixed
    >
        <template #overlay>
            <div class="text-center">
                <img
                    :src="require('@assets/img/layout/loading_spinner_bg.svg')"
                    alt="loading..."
                />
            </div>
        </template>
    </b-overlay>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
    name: 'GloablOverlay',
    computed: {
        ...mapGetters({
            loading: 'etc/getLoading'
        })
    }
}

</script>
