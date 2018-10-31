const M = module.exports = {}

const posts = []
var id = 0
M.add = function (post) {
  posts.push(post)
  post.created_at = new Date()
  post.id = id
  id++
}

M.edit = function (id, post) {
  for(let p of posts){
    if(p.id == id) {   
      console.log(p.title) 
      p.title= post.title
      p.body= post.body
      p.created_at = new Date()
    }
  }
}

M.delete = function (id) {
   for(var i=0; i<posts.length;i++){
     if(posts[i].id == id) posts.splice(i,1)
   }
}

M.get = function (id) {
  for(let post of posts){
    if(post.id == id) return post
  }
}

M.list = function () {
  return posts
}
