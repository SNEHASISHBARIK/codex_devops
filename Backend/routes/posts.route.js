import express from 'express'
const postrouter = express.Router()
import {islogin} from '../middlewares/islogin.js'


// Components :
import {
    allposts,
    create_post,
    postid,
    update_post,
    delete_post
} from '../components/post.logic.js'


postrouter.get('/posts', islogin ,allposts)
postrouter.get('/posts/:id' ,islogin ,postid)
postrouter.post('/posts', islogin ,create_post)
postrouter.patch('/posts/:id',islogin,update_post)
postrouter.delete('/posts/:id',islogin,delete_post)

export default postrouter