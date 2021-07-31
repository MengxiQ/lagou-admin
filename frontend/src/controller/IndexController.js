/**
 * 页面菜单和导航的跳转逻辑
 * **/

import indexTpl from "../views/index.art";
export function IndexController(req, res, next, router){
    //判断是否登录，没有登录跳转到/login
    // console.log(res.subRoute())
    //二级路由
    next(indexTpl({subRouter: res.subRoute()}))
    const items = $('.nav-link');
    for (let i = 0; i < items.length; i++) {
        $(items[i]).on('click', (event) => {
            event.preventDefault(); //一定要记得阻止默认事件！！！。不然路由不跳转
            const path = $(items[i]).attr('to');
            if (path !== undefined) {
                // console.log(path);
                router.go('/lagou'+path);
            }
        })
    }
}