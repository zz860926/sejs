const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const Koa = require('koa')
const app = (module.exports = new Koa())
let db,collection
var user = ""


app.use(logger())
app.use(koaBody())

router
  .get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .get('/post/:id/edit', edit)
  .get('/post/:id/delete', del)
  .get('/login', login)
  .post('/loginIn', loginIn)
  .post('/post', create)
  .post('/post/:id/editwell', editwell)
  

app.use(router.routes())

async function mongodbs () {
  db = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/blogs')
  collection = db.collection("posts")
}

async function login (ctx) {
  ctx.body = await V.login()
}

async function loginIn (ctx) {
  var post = ctx.request.body
  console.log("post", post)
  var account = await db.collection('user').find({"acc":post.acc}).toArray()
  console.log("account",account,account.length)
  if(account.length != 0){
    if(post.pwd == account[0].pwd){
      user = post.acc
      console.log("user=%s",user)
      mongodbs()
      ctx.redirect('/')
    }
    else{
      ctx.redirect('/login')
    }
  }else{
    ctx.redirect('/login')
  }
}

async function list (ctx) {
  var result = await collection.find().toArray()
  ctx.body = await V.list(result,M.block(user))
}

async function add (ctx) {
  ctx.body = await V.new()
}

async function show (ctx) {
  const id = ctx.params.id
  post = await collection.find({"_id":ObjectId(id)}).toArray()
  console.log("post",post[0])
  if (!post[0]) ctx.throw(404, 'invalid post id')
  //console.log("edit", edit)
  ctx.body = await V.show(post[0],M.block(user,post))
}

async function edit (ctx) {
  const id = ctx.params.id
  const post = await collection.find({"_id":ObjectId(id)}).toArray()
  if (!post[0]) ctx.throw(404, 'invalid post id')
  ctx.body = await V.edit(post[0])
}

async function create (ctx) {
  const post = ctx.request.body
  await collection.insertOne(M.add(post,user))
  ctx.redirect('/')
}

async function editwell (ctx) {
  const id = ctx.params.id
  const whereStr = {"_id":ObjectId(id)} //查詢條件
  const updateStr = ctx.request.body
  await collection.updateOne(whereStr,M.add(updateStr,user))
  ctx.redirect("/post/"+id)
}

async function del (ctx) {
  const id = ctx.params.id
  await collection.deleteOne({"_id":ObjectId(id)})
  ctx.redirect('/')
}

if (!module.parent) {
  app.listen(3000)
  mongodbs()
  console.log('Server run at http://localhost:3000')
}


