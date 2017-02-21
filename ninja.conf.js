module.exports = {
	template: "swig", // whatever template engine you like
	mock: "/mock/mock.json", // dir for mock data
	webpack: true, // flag for using webpack or not
	proxy: {
		route: "/",
		origin: "http://120.24.4.254:8888/"
	},
	staticDir: "/static",
	templateDir: "/template",
}