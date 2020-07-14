class Koa {
    constructor(context) {
        this.context = context;
        this.middlewares = [];
    }
    use(fn) {
        this.middleware.push(fn);
        return this;
    }

    listen(port) {
        let a = http.createSever()
    }
}

const app = new Koa();

app.use(middlewareA)
app.use(middlewareB)
app.use(middlewareC)


function middlewareA(ctx, next) {
    
    return this;
}