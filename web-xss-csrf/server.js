



let express = require('express')

let app = new express()
let path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname))
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true })) // a = 1 & b=2  ==> {a:1, b:2}
let userList = [{
    username: 'test', password: '121', money: 10000
}, {
    username: 'test1', password: '222', money: 20
}]
let SESSION_ID = 'connect.sid'
let session = {}
app.post('/api/login', function (req, res) {
    let { username, password } = req.body
    let user = userList.find(user => user.username === username && user.password === password)
    console.log(user, 'username=')

    if (user) {
        // 服务器需要再用户登录后，给一个信息，  creator: 001
        let cardId = Math.random() + Date.now()
        res.cookie(SESSION_ID, cardId, { httpOnly: false }) // httpOnly
        session[cardId] = { user }

        res.json({
            code: 0,
            data: user,
            msg: '登录成功'
        })
    } else {
        res.json({
            code: 1,
            data: null,
            msg: '账号不存在或密码错误'
        })
    }
})

// 反射型  http://localhost:3000/welcome?type=<script>alert(docuemnt.cookie)</script>   只是当前这个登录这个人，其它人无所谓
// chrome 发现路径存在异常，会有xss 屏蔽功能(不都是)
// 一般情况下会设置cookie 在前端不可获取，并不是xss解决方案，只是降低受损的范围
// 诱导用户自己点开(一次性)
// 第一种方案使用 encodeURIComponent 进行转义
app.get('/welcome', function (req, res) {
    // res.send(`${req.query.type}`)
    res.send(`${encodeURIComponent(req.query.type)}`)

})

// 用户评论信息

let comments = [{ username: ' creator', content: '沙哈' },
{ username: ' lily', content: 'hahhahahaha' }]

app.get('/api/list', function (req, res) {
    res.json({
        code: 0, comments
    })
})

app.post('/api/addComment', function (req, res) {
    console.log(req.cookies, 'SESSION_ID: ', SESSION_ID)
    let r = session[req.cookies[SESSION_ID]] || {}
    let user = r.user
    console.log(session, req.cookies[SESSION_ID], r, '是否登陆')
    if (user) {
        comments.push({ username: user.username, content: req.body.content })
        res.json({
            code: 0
        })
    } else {
        res.json({
            code: 1,
            error: '用户未登录'
        })
    }
})
// xss 存储型，恶意的脚本存储到了服务器上，所有人访问时都会造成攻击，比反射型和DOM-Base 范围更大


app.get('/api/userInfo', function (req, res) {
    let r = session[req.cookies[SESSION_ID]] || {}
    let user = r.user
    if (user) {
        res.json({
            code: 0,
            user: {
                username: user.username,
                money: user.money
            }
        })
    } else {
        res.json({
            code: 1,
            error: '用户未登录'
        })
    }
})

app.post('/api/transfer', function (req, res) {
    let { target, money } = req.body
    let r = session[req.cookies[SESSION_ID]] || {}
    let user = r.user // 当前人



    let currentIndex = userList.findIndex(x => x.username === user.username) // 从源数据中查一次用户
    let currentUser = userList[currentIndex]
    let targetUser = userList.find(x => x.username === target)
    debugger
console.log(user, target, money, currentUser, targetUser, '钓鱼')
    if (targetUser && currentUser.money >= money) {
        targetUser.money += Number(money)
        currentUser.money -= Number(money)
        userList[currentIndex] = JSON.parse(JSON.stringify(currentUser))
        res.json({
            code: 0,
            data: '转账成功'
        })
    } else {
        res.json({
            code: 1,
            error: '查无此人，转账失败'
        })
    }
    // if (user) {
    //     userList.forEach(u => {
    //         if (u.username === user.username) {
    //             u.money -= money
    //         }
    //         if(u.username === target) {
    //             u.money += money
    //         }
    //     })
    // }
})
app.listen(3000)