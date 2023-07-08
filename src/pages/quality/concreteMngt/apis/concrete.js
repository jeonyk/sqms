import axios from 'axios'

const config = {
    // IP: process.env.VUE_APP_SERVER_IP ? process.env.VUE_APP_SERVER_IP : 'http://localhost',
    // PORT: process.env.VUE_APP_SERVER_PORT ? process.env.VUE_APP_SERVER_PORT : '8080',
    options: {
        headers: {
            "Content-Type": "application/json;",
            "Accept-Language": "ko",
        }
    },
    material: {
        url: '/sendApi/api/quality/concreteMngt'
    }
}

export async function sendPostApi(callUrl, payload, options) {
    return await axios.post(
        `${config.material.url}${callUrl}`,
        payload,
        options ? options : config.options
    )
}

export default {
    
}