/**
 *用户列表业务逻辑
 * **/

import ContentHeader from "../views/ContentHeader.art";
import usersTpl from "../views/users/users.art";
import UserEdit from "../views/users/users-edit.art"
import {CreateUser, DeleteUser, FindAllUser, UpdateUser} from "../api/UsersApi";
import {showAlert} from "../utils/tools";

export function Users(req, res, next,router){
    // 初始化：闭包,立即执行函数
    (function init() {
        list()
    })()
    //获取用户列表，并渲染页面
    async function list() { //异步函数
        let UsersData = null
        await FindAllUser().then(response => { //等promise执行完，才往下执行
            UsersData = response.data
            res.render(
                ContentHeader({title: '用户管理', breadcrumbs: ['Home','用户管理']}) +
                usersTpl({form: UserEdit({}),ModalTitle: '添加用户',UsersData:UsersData})
            )
        }).catch(error => {
            console.log(error)
        })
        // 必须渲染出来才能拿到dom,所以用到异步函数，不能让外面的代码同步执行
        ClickEdit()
        ClickDelete()
        ClickCreate()
        //清理表单数据
        ClearForm()
    }
    //清理表单数据和按钮绑定的事件
    function ClearForm(){
        //监听表单关闭
        $('#EditModal').on('hidden.bs.modal', function (event) {
            // do something...
            $('#name').val(null)
            $('#email').val(null)
            $('#phone').val(null)
            $('#password').val(null)

            //清除保存按钮的点击事件
            $('#save').off('click')
        })
    }
    //点击添加
    function ClickCreate() {
        $('#create').on('click', (e) => {
            $('#EditModal').modal('show')
            ClickSave(false)
        })

    }
    //点击保存
    function ClickSave(IsUpdate= false,user = null) {
        //更新
        if(IsUpdate){
            $('#save').on('click',(e) => {
                const data = $('#UserForm').serializeArray()
                data.push({
                    name: '_id',
                    value: user._id
                })
                console.log(data)
                UpdateUser(data).then((res)=> {
                    showAlert('alert-success',res.data,'fa-check-circle')
                    $('#EditModal').modal('hide')
                    list()
                }).catch((error) => {
                    showAlert('alert-danger',JSON.parse(error.responseText).data,'fa-times')
                })
            })
        }
        //创建
        else {
            $('#save').on('click',(e) => {
                const data = $('#UserForm').serializeArray()
                CreateUser(data).then((res)=> {
                    showAlert('alert-success',res.data,'fa-check-circle')
                    $('#EditModal').modal('hide')
                    list()
                }).catch((error) => {
                    showAlert('alert-danger',JSON.parse(error.responseText).data,'fa-times')
                })
            })
        }

    }
    //点击编辑
    function ClickEdit() {
        const edits = $('.edit')
        for(let i = 0; i < edits.length; i++) {
            $(edits[i]).on('click', (e) => {
                //模板渲染的时候，包实例数据放在按钮scope中
                let scope = JSON.parse($(edits[i]).attr('scope'))
                $('#name').val(scope.name)
                $('#email').val(scope.email)
                $('#phone').val(scope.phone)
                e.preventDefault()
                $('#EditModal').modal('show')
                ClickSave(true,scope)
            })
        }

    }
    //点击删除
    function ClickDelete(){
        const deletes = $('.delete')
        for(let i = 0; i < deletes.length; i++) {
            $(deletes[i]).on('click', (e) => {
                e.preventDefault()
                //模板渲染的时候，包实例数据放在按钮scope中
                let scope = JSON.parse($(deletes[i]).attr('scope'))
                DeleteUser(scope._id).then(res => {
                    showAlert('alert-success',res.data,'fa-check-circle')
                    list()
                }).catch(error => {
                    showAlert('alert-danger',JSON.parse(error.responseText).data,'fa-times')
                })

            })
        }
    }


}
