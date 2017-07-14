const send = require('koa-send');
const Koa = require('koa');
const Router = require('koa-router');
const userAgent = require('koa-useragent');
const path = require('path')
const swig = require('swig');
const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, "../dist/template")

app.use(userAgent);

router.get('/', function(ctx, next){
	console.log(ctx.userAgent)
    let template = swig.compileFile(path.resolve(templateRoot, "index.html"));
        ctx.body = template({})
});

router.get('/landing', function(ctx, next){
	console.log(ctx.userAgent)
    let template = swig.compileFile(path.resolve(templateRoot, "landing.html"));
        ctx.body = template({})
});

router.get('/search', function(ctx, next){
	console.log(ctx.userAgent)
    let template = swig.compileFile(path.resolve(templateRoot, "search.html"));
        ctx.body = template({})
});

router.get('/article/:id', function(ctx, next){
	console.log(ctx.userAgent)
    let template = swig.compileFile(path.resolve(templateRoot, "second.html"));
        ctx.body = template({})
});

router.get('/interaction/:Int', function(ctx, next){
	console.log(ctx.userAgent)
    let template = swig.compileFile(path.resolve(templateRoot, "second.html"));
        ctx.body = template({})
});

router.get('/news/:id', function(ctx, next){
	console.log(ctx.userAgent)
    let template = swig.compileFile(path.resolve(templateRoot, "second.html"));
        ctx.body = template({})
});

router.get('/pics/:id', function(ctx, next){
	console.log(ctx.userAgent)
    let template = swig.compileFile(path.resolve(templateRoot, "pictures.html"));
        ctx.body = template({})
});

router.get('/profile/:id', function(ctx, next){
	console.log(ctx.userAgent)
    let template = swig.compileFile(path.resolve(templateRoot, "profile.html"));
        ctx.body = template({})
});


router.get(/^\/$/, async (ctx) => {
     await send(ctx, ctx.path, {
         root: path.join(__dirname, "../dist")
     });
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');
