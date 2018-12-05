const M = module.exports = {}


M.add = function (post,user) {
  const p = post
  p.created_at = new Date()
  p.user = user
  return p
}

M.block = function(user,post){
  if(!post && user !==""){
    return "block"
  }else{
    if(post && post[0].user !== ""){
      if (post[0].user === user) {return "block"}
      else {return "none"}
    }else{
      return "none"
    }
  }
}

/*
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
*/