import axios from 'axios'

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

export var requestOptions = {
    headers: {
        "Content-Type": "application/json;",
        "Accept-Language" : "ko",
    }
};

export var requestFileOptions = {
    headers: {
        "Content-Type": "multipart/form-data",
        "Accept-Language" : "ko",
    }
};

export async function sendGetApi(callUrl, payload){
    var URL = callUrl;
    return await axios.get(URL,
        {
            params : payload,
            headers : requestOptions.headers
        }    
    )
}

export async function sendPostApi(callUrl, payload){
    var URL = callUrl;
    return await axios.post(URL, 
        payload, {headers : requestOptions.headers}
    )
}

export async function sendFileApi(fileConnectId, fileType, files = null, fileSubType = null,copiedFileIds = null ) {
    //var URL = callUrl;
    // console.log(files);
    const formData = new FormData();
    formData.append("fileConnectId", fileConnectId);
    formData.append("fileType", fileType);
    if (fileSubType) {formData.append("fileSubType", fileSubType)};
    if (copiedFileIds) {
        // console.log('copied',copiedFileIds.toString());
        formData.append("fileCopyIds", copiedFileIds.toString())
    };
    if(files){
        files.forEach((file) => formData.append("file", file));
    }
    // console.log(formData);    
    return await axios.post("/sendApi/api/fileUp/fileUploads", formData, {
        headers : requestFileOptions.headers
    })
    
}

export async function sendMultiFileApi(fileConnectId, fileType, files, fileSubType = null) {
    //var URL = callUrl;
    console.log(files);
    const formData = new FormData();
    formData.append("fileConnectId", fileConnectId);
    formData.append("fileType", fileType);
    if (fileSubType) formData.append("fileSubType", fileSubType);
    files.forEach((file) => formData.append("file", file));
    console.log(formData);    
    return await axios.post("/sendApi/api/fileUp/multiFileUploads", formData, {
        headers : requestFileOptions.headers
    })
    
}

export async function sendPutApi(callUrl, payload){
    var URL = callUrl;
    return await axios.put(URL,
        payload, {headers : requestOptions.headers}
        // {
        //     params : payload,
        //     headers : requestOptions.headers
        // }    
    )
}

// export default{
//     install(Vue){
//         Vue.prototype.$sendApi = function (callUrl, payload){
//         //Vue.prototype.$sendApi = function (callUrl, postData, succ, fail){
//             var URL = callUrl;
//             // console.log("URL = ", URL);
//             // requestOptions.params = postData;
//             axios.post(URL,
//                 {
//                     params : payload,
//                     headers : requestOptions.headers
//                 }    
//             ).then((result) => {
//                 //succ(result.data, this);
//                 console.log(result);
//                 return result.data;
//             }).catch(e => {
//                 //fail(e, this);
//                 return e;
//             });
//         }
//     }
// }