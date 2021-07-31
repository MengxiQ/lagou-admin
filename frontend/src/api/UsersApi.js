/**
 * 抽离项目api请求，方便以后修改后端URL和对请求方式进行修改
 * **/

import {POST, GET, DELETE, PUT} from "./request";

export function CreateUser(data){
    return POST(
        '/api/users',
        data
    )
}
export function UpdateUser(data){
    return PUT(
        '/api/users',
        data
    )
}
export function FindAllUser(){
    return GET(
        '/api/users',
         ''
    )
}
export function DeleteUser(id){
    return DELETE (
        '/api/users/'+id
    )
}