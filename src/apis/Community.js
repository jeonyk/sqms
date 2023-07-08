import axios from 'axios'
import VueCookies from 'vue-cookies';

// const URL = 'http://61.251.164.137:8080'
const URL = '/sendApi/api'
const COMMUNITY_URL = '/community'
const SITE_INFO_URL = '/siteInfo'

const hd = {
  "Content-Type": "application/json",
  "Accept-Language": "ko",
  'Authorization': VueCookies.get("Authorization")
}
const siteMstrId = VueCookies.get("siteMstrId")


export default {
  //공지사항 list 조회
  selectNoticeList: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/notice/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  
  //공지사항 등록
  writeNotice: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/notice/write`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //공지사항 상세 조회
  selectNoticeView: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/notice/view`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //공지사항 수정
  changeNotice: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/notice/change`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //공지사항 삭제
  deleteNotice: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/notice/unuse`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자료실 list 조회
  selectDataArchiveList: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/dataArchive/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  
  //자료실 등록
  writeDataArchive: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/dataArchive/write`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자료실 상세 조회
  selectDataArchiveView: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/dataArchive/view`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자료실 수정
  changeDataArchive: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/dataArchive/change`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자료실 삭제
  deleteDataArchive: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/dataArchive/unuse`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자료실 - 마스터 코드 code, spec 3depth 조회
  codeSpecMasterCodeList: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/dataArchive/codeSpecList`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }, 
  

  //자유게시판 list 조회
  selectFreeBoardList: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/freeBoard/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  
  //자유게시판 등록
  writeFreeBoard: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/freeBoard/write`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자유게시판 상세 조회
  selectFreeBoardView: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/freeBoard/view`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자유게시판 수정
  changeFreeBoard: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/freeBoard/change`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자유게시판 삭제
  deleteFreeBoard: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/freeBoard/unuse`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자유게시판 뎃글 list 조회
  selectBoardCommentList: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/boardComment/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자유게시판 댓글 등록
  writeBoardComment: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/boardComment/write`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자유게시판 댓글 수정
  changeBoardComment: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/boardComment/change`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자유게시판 댓글 삭제
  deleteBoardComment: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/boardComment/unuse`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },


  //문서양식 변경요청 list 조회
  selectDocChangeList: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/docChange/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  
  //문서양식 변경요청 등록
  writeDocChange: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/docChange/write`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //문서양식 변경요청 상세 조회
  selectDocChangeView: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/docChange/view`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //문서양식 변경요청 수정
  changeDocChange: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/docChange/change`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //문서양식 변경요청 삭제
  deleteDocChange: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/docChange/unuse`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //문서양식 변경요청 댓글 list 조회
  selectDocCommentList: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/docComment/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //자유게시판 댓글 등록
  writeDocComment: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/docComment/write`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //문서양식 변경요청 댓글 수정
  changeDocComment: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/docComment/change`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //문서양식 변경요청 댓글 삭제
  deleteDocComment: async (payload) => {
    try {
      const data = await axios.post(URL + COMMUNITY_URL + `/docComment/unuse`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  //커뮤니티 파일 다운로드
  fn_communityFileDownload(fileId, fileInfo){

    const url = '/sendApi/api/file/singleFileDownload'

    const payload = {
        fileId: fileId
    }
    axios.post(url, payload, {
        headers: {
            'Accept-Language': 'ko',
            'Authorization': VueCookies.get("Authorization"),
            'Content-Type': 'multipart/form-data; charset=utf-8;',
        },
        responseType: 'blob'
    }).then(response => {
        if (response.status === 200 ) {
            const blob = new Blob([response.data])
            const fileName = fileInfo.orgFileName

            // Internet Explorer
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                window.navigator.msSaveOrOpenBlob(blob, fileName)
            // Other Browsers
            } else {
                const objectUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a')

                link.style.cssText = 'display:none'
                link.href = objectUrl
                link.setAttribute('download', fileName)

                if (typeof link.download === 'undefined') {
                    link.setAttribute('target', '_blank')
                }

                document.body.appendChild(link)
                link.click()
                link.remove()
                window.URL.revokeObjectURL(objectUrl)
            }
        } else {
            throw new Error('fileSingleDownload')
        }
    }).catch(() => {
      
    })
  }

}