import axios from "axios";
import {Message, MessageBox,Loading} from "element-ui";
import {getToken} from "@/utils/auth";
import {tansParams,blobValidate} from "@/utils/rental";
import errorCode from "@/utils/errorCode";
import saveAs from "file-saver"

let downloadLoadingInstance;

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
    timeout: 10000
})
/**
 * 请求拦截器
 */
service.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 让每个请求携带自定义token 请根据实际情况自行修改
    if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    // post请求
    if (config.method === 'post' || config.method === 'put') {
        const requestObj = {
            url: config.url,
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime()
        }
    }
    return config
}, error => {
    console.log(error)
})
/**
 * 响应拦截器
 */
service.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default'];
        // 二进制数据则直接返回
        if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
            return res.data
        }
        // 401响应码则跳转到登录页面
        if (code === 401) {
            store.dispatch('logout').then(() => {
                location.href = '/index';
            })
        } else if (code === 500) {
            Message({
                message: msg,
                type: 'error'
            })
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            Notification.error({
                title: msg
            })
            return Promise.reject('error')
        } else {
            return res.data
        }
    },
    error => {
        console.log('err' + error)
        let {message} = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })

// 通用下载方法
export function download(url, params, filename) {
    downloadLoadingInstance = Loading
        .service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", })
    return service.post(url, params, {
        transformRequest: [(params) => { return tansParams(params) }],
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'blob'
    }).then(async (data) => {
        const isLogin = await blobValidate(data);
        if (isLogin) {
            const blob = new Blob([data])
            saveAs(blob, filename)
        } else {
            const resText = await data.text();
            const rspObj = JSON.parse(resText);
            const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
            Message.error(errMsg);
        }
        downloadLoadingInstance.close();
    }).catch((r) => {
        console.error(r)
        downloadLoadingInstance.close();
    })
}

export default service


