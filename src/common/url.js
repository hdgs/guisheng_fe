export default {
    getUrlComponent(params) {
        var esc = encodeURIComponent
        return Object.keys(params)
            .map(k => esc(k) + "=" + esc(params[k]))
            .join("&")
    }
}