<!--
  * 사진 보기 공통 팝업
 -->
<template>
  <b-modal
    id="photoViewModal"
    :title="title" 
    hide-backdrop
    size="lg"
    footer-bg-variant="transparent"
    v-if="isActive"
    v-model="isActive"
    @shown="init"
    @hide="close"
  >
    <div class="pop_container">
      <div class="lst_imgview">
        <swiper
          class="swiper"
          :options="swiperOption"
        >
          <swiper-slide
            v-for="(file, idx) in files"
            :key="`image_${idx}`"
          >
            <img
              :src="file.src"
              :alt="file.name"
            >
          </swiper-slide>
          <div
            class="swiper-pagination"
            slot="pagination"
          />
          <div
            class="swiper-button-prev"
            slot="button-prev"
          />
          <div
            class="swiper-button-next"
            slot="button-next"
          />
        </swiper>

        <ul>
          <li
            v-for="(file, idx) in files"
            :key="`image_name_${idx}`"
          >
            <a href="javascript:void(0);">
              <i class="ico_file file_jpg">{{ file.name }}</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <template #modal-footer>
      <b-button
        class="btn btn_md btn_outline btn_gray"
        @click="close"
      >
        닫기
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import API from '@/apis/'
import { swiper, swiperSlide } from 'vue-awesome-swiper' 
import 'swiper/css/swiper.css'

export default {
	name: 'PhotoViewModal',
	components: {
		swiper,
		swiperSlide
	},
	props: {
		title: {
			type: String,
			default: '사진 보기'
		},
		active: {
			type: Boolean,
			default: false
		},
		// files: {
		//     type: Array,
		//     default: () => []
		// },
		imageId: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			isActive: this.active || false,
			files: [],
			swiperOption: { 
				slidesPerView: 1, 
				spaceBetween: 0, 
				loop: false, 
				autoplay: false, 
				pagination: { 
					el: '.swiper-pagination',
					clickable: true
				}, 
				navigation: {
					nextEl: '.swiper-button-next', 
					prevEl: '.swiper-button-prev' 
				}
			} 
		}
	},
	watch: {
		active (newVal) {
			this.isActive = newVal
		}
	},
	methods: {
		/**
		 * 모달 > 닫기 이벤트
		 */
		close () {
			this.$emit('close')
		},
		async init () {
			if(!this.imageId) return
			await this.getImageFile(this.imageId)
		},
		/**
		 * API: 이미지 단건 조회
		 */
		async getImageFile (fileQltImgArcvId, seq) {
			try {
				const response = await API.concrete.getImageFile({
					fileQltImgArcvId,
					seq
				})
				if(response?.data) {
					return response
				}
			} catch (error) {
				console.error('이미지 단건 조회 에러: ', error)
			}
		}
	}
}
</script>