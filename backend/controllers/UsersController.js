const {CreateUserModel, FindUserByNameModel, FindAllUserModel,DeleteUserByIdModel,UpdateUserModel} = require("../models/UsersModel");
const {HashPassword} = require("../utils/tools");
 const CreateUser = async (req,res,next) => { //创建一个异步函数
     res.setHeader('Content-Type','application/json; charset=utf-8')
     // * const {name,password,email,phone} = req.body
     /**如果要更强的扩展性，把前端转过来的数据直接存起来**/
     const UserData = req.body
     //用户名不能为空
     if(UserData.name === '' || UserData.name === null){
         res.status(500).render('fail', {data:'"请输入用户名"'});
     }
     //密码不能为空
     else if(UserData.password === '' || UserData.password === null){
         res.status(500).render('fail', {data:'"请输入密码"'});
     }
     //检查是否存在用户，通过则保存用户
     else {
         const findResult = await FindUserByNameModel(UserData.name) //返回查询到数据，查询不到返回null
         // console.log(findResult)
         if (findResult === null) {
             //密码加密
             await HashPassword(UserData.password).then(hash => {
                 //保存用户
                 UserData.password = hash
                 //* const result = CreateUserModel({ //等待promise
                 //     name,
                 //     password: hash,
                 //     email,
                 //     phone
                 // })
                 const result = CreateUserModel(UserData)

                 res.status(200).render('success', {data: '"用户保存成功"'})

             }).catch(err => {
                 res.status(500).render('fail', {data:'"密码加密失败"'})
             })

         } else {
             res.status(500).render('fail', {data:'"用户名已经存在"'})
         }
     }

}
 const UpdateUser = async (req,res,next) => { //创建一个异步函数
     res.setHeader('Content-Type','application/json; charset=utf-8')
     // * const {name,password,email,phone} = req.body
     /**如果要更强的扩展性，把前端转过来的数据直接存起来**/
     const UserData = req.body
     //用户名不能为空
     if(UserData.name === '' || UserData.name === null){
         res.status(500).render('fail', {data:'"请输入用户名"'});
     }
     //检查是否存在用户，通过则保存用户
     else {
            //更新密码为空，则认为不修改密码
            if(UserData.password === '' || UserData.password === null){
                //删除密码属性
                delete UserData.password
                save(UserData)
             }
            else {
                //密码加密
                await HashPassword(UserData.password).then(hash => {
                    //保存用户
                    UserData.password = hash
                    save(UserData)

                }).catch(err => {
                    res.status(500).render('fail', {data:'"密码加密失败"'})
                })
            }
            //抽离公共部分
            function save(data) {
                UpdateUserModel(data).then(result => {
                    console.log(result)
                }).catch()

                res.status(200).render('success', {data: '"用户保存成功"'})
            }

     }

}
const FindAllUser = async (req,res,next) => {
    res.setHeader('Content-Type','application/json; charset=utf-8')
    const findQuery = FindAllUserModel().then(data => {
        // console.log(data)
        res.render('success', {data:JSON.stringify(data)})
    }).catch(error => {

    }) //`query` 是 `Query` 的一个实例
    // console.log(findResult)




}
const DeleteUserById = (req,res,next) => {
    res.setHeader('Content-Type','application/json; charset=utf-8')
    const id = req.params.id
    console.log(id)
   DeleteUserByIdModel(id).then(data => {
       // console.log(data)  ==>res.render('success', {data: '"删除成功"'})
       res.render('success', {data: '"删除成功"'})
   }).catch(error => {
       res.status(500).render('fail',{data: '"删除失败"'})
   })



}
module.exports = {
    CreateUser,
    FindAllUser,
    DeleteUserById,
    UpdateUser
}