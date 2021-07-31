/**
 * 封装请求方式，方便以后更换请求库，只需要修改这个文件。
 * **/
const baseurl = 'http://127.0.0.1:3000'
export function POST(url,data){

    return new Promise((resolve, reject) => {
        $.ajax({
            url:baseurl+url,
            // url,
            type:'post',
            data,
            success:function (res) {
                resolve(res)
            },
            error: function (e) {
                reject(e)
            }

        })
    })

}
export function PUT(url,data){

    return new Promise((resolve, reject) => {
        $.ajax({
            url:baseurl+url,
            // url,
            type:'put',
            data,
            success:function (res) {
                resolve(res)
            },
            error: function (e) {
                reject(e)
            }

        })
    })

}
export function GET(url,query){
    // const baseurl = 'http://127.0.0.1:3000/'
    return new Promise((resolve, reject) => {
        $.ajax({
            // url:baseurl+url,
            url: baseurl + url,
            type: 'get',
            query,
            success:function (res) {
                resolve(res)
            },
            error: function (e) {
                reject(e)
            }

        })
    })

}
export function DELETE(url){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseurl + url,
            type:'delete',
            success: (e) => {
                resolve(e)
            },
            reject: (e)=> {
                reject(e)
            }
        })
    })

}