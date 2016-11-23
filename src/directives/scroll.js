let scrollCallback = function(callback) {
    if (document.body.scrollHeight < 1000) {
        return
    }
    if (document.body.scrollHeight - window.scrollY - 100 <= document.body.clientHeight) {
        callback()
    }
}

let callBackWarpped // 新变量 保存引用
export default {
    bind: function(el, binding, vnode) {
        callBackWarpped =  scrollCallback.bind({}, binding.value)
        window.addEventListener("scroll", callBackWarpped)
    },
    unbind: function() {
        window.removeEventListener("scroll", callBackWarpped)
    }
}