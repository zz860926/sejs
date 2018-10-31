var posts = []

 function add(post) {
    const id = posts.push(post) - 1
    post.created_at = new Date()
    post.id = id
  }

var data1 = {"title":"1", "value":"456"}
var data2 = {"title":"2", "value":"456"}
var data3 = {"title":"3", "value":"456"}
add(data1)
add(data2)
posts.splice(0,1)
add(data3)
console.log("posts", posts)