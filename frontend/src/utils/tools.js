/**
 * 工具方法
**/

//显示操作结果提示
export function showAlert(className,description,iconName="fa-check-circle"){
    //用到了图标库fontawesome-free
    //iconName:
    //success:fa-check-circle
    //error:fa-times
    //info:fa-info-circle

    let element = $(`
        <div id="alert" style="display:none;position: absolute;z-index: 10000;width: 100%;height: auto; text-align: center;padding: 10px;">
        <div class="alert `+ className +`" role="alert" style="display: inline-block" >
        <i class="fas `+iconName+`"></i>
         `+description+`
        </div>
        </div>
        `)
    $('body').before(element)
    $('#alert').fadeIn(100)
    setTimeout(()=> {
        $('#alert').fadeOut(200)
        setTimeout(()=> {
            $('#alert').remove()
        },200)
    },1000)
}