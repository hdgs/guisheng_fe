module.exports = {
    template: "swig", // whatever template engine you like
    mock: "/mock/mock.json", // dir for mock data
    webpack: true, // flag for using webpack or not
    // proxy: {
    //     route: "/api",
    //     origin: "http://119.23.35.1:8888/"
    // },
    staticDir: "/static",
    templateDir: "/template",
}