import loginTpl from "../views/login.art";

export function SignIn(req, res, next,router){
    res.render(loginTpl());
    const submin = $('#submin');
    submin.on('click', (e) => {
        e.preventDefault();
        //! 通过jquery的seriesArry()方法可以获取到form表单的数据。注意要给input加name熟悉哦
        const form = $('#form').serializeArray();//获取表单数据
        // const form = {}
        // form.name = $('#name').val()
        // form.password = $('#password').val()
        console.log(form)
        // 登录请求
        router.go('/lagou')
    })
}

