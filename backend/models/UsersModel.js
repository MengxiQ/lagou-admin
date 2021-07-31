const UsersModel = require('../utils/db')
const FindAllUserModel = () => {
    return UsersModel.find({}) //返回query
    // Query 实例有一个 .then(data).catch(error) 函数，用法类似 promise。
}
const FindUserByNameModel = (name) => {
    return UsersModel.findOne({'name': name})  //返回promise
}
const CreateUserModel = (user) => {
    const users = new UsersModel(user)
    return users.save() //返回query
}
const DeleteUserByIdModel = (id) => {
    return UsersModel.deleteOne({'_id':id})
}
const UpdateUserModel = (data) => {
   return UsersModel.findById(data._id, (error, user) => {
       // 根据ID查询到该用户
       // 用set方法覆盖式更新
        return user.set(data).save() //返回一个query
    })

}
module.exports = {
    CreateUserModel,
    FindUserByNameModel,
    FindAllUserModel,
    DeleteUserByIdModel,
    UpdateUserModel
}


