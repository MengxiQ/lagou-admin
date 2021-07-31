/**
 * 用户列表的路由
 * **/

import SMERouter from 'sme-router'
import {Users} from "../controller/UsersController";
import {IndexController} from "../controller/IndexController";
import {Postions} from "../controller/PostionsController";
import {SignIn} from "../controller/LoginController";

const router = new SMERouter('root-view') // #html里面的ID，将容器作为view容器

router.route('/lagou',(req, res, next) => {
    IndexController(req, res, next, router)
} )

router.route('/lagou/users', (req, res, next) => {
    Users(req, res, next, router)
})

router.route('/lagou/position', (req, res, next) => {
    Postions(req, res, next, router)
})

router.route('/login', (req, res, next) => {
    SignIn(req, res, next, router)
})

router.route('*', (req, res, next) => {
    res.redirect('/login');
})