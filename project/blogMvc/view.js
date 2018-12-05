var V = module.exports = {}

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
      }
  
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
    <button><a href="/login">登入</a></button>
  </body>
  </html>
  `
}

V.list = function (posts,block) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a href="/post/${post._id}">讀取貼文</a></p>
    </li>
    `)
  }
  let content = `
  <h1>貼文列表</h1>
  <p>您總共有 <strong>${posts.length}</strong> 則貼文!</p>
  <div style="display:${block}">
    <p><a href="/post/new">創建新貼文</a></p>
  </div>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.layout('貼文列表', content)
}

V.new = function () {
  return V.layout('新增貼文', `
  <h1>新增貼文</h1>
  <p>創建一則新貼文</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

V.show = function (post,block) {
  return V.layout(post.title, `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    <div style="display:${block}">
    <a href="/post/${post._id}/edit">edit</a>
    <a href="/post/${post._id}/delete">delete</a>
    </div>
    <a href="/">back</a>
  `)
}

V.edit = function (post) {
  return V.layout('編輯貼文', `
  <h1>編輯貼文</h1>
  <p>編輯貼文</p>
  <form action="/post/${post._id}/editwell" method="post">
    <p><input type="text" placeholder="Title" name="title" value="${post.title}"></p>
    <p><textarea placeholder="Contents" name="body">${post.body}</textarea></p>
    <p><input type="submit" value="編輯完成"></p>
  </form>
  <button><a href="/post/${post._id}">back</a></button>
  `)
}

V.login = function () {
  return`
  <form action="/loginIn" method="post">
            賬號：<input type="text" name="acc" placeholder="賬號">
            密碼：<input type="password" name="pwd" placeholder="密碼">
            <input type="submit" value="登入" name="Login">
        </form>
        <a href="/">back</a>
  `
}
