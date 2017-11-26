module.exports = {
  getComments(req, res){
  	if(req.store.posts[req.params.postId]==undefined){
  		console.log(`Comments with postId: ${req.params.postId} does not exits `)
  		return res.sendStatus(400)
  	}
  	let comments = req.store.posts[req.params.postId].comments
  	res.status(200).send(comments)
    
  }, 
  addComment(req, res){
  	if(!req.body.text.trim() || req.store.posts[req.params.postId]==undefined){
  		console.log(`A post with postId: ${req.params.postId} does not exits `)
  		return res.sendStatus(400)
  	}
	  	let obj = {
	  		text: req.body.text	
	  	}
	  	let postId = req.params.postId
		let commentId = req.store.posts[req.params.postId].comments.length
		req.store.posts[postId].comments.push(obj)
		res.status(201).send({commentId: commentId})  
  },
  updateComment(req, res){
  	if(!req.body.text.trim() || req.store.posts[req.params.postId]==undefined){
  		console.log(`A post with postId: ${req.params.postId} does not exits `)
  		return res.sendStatus(400)
  	}
  	Object.assign(req.store.posts[req.params.postId].comments[req.params.commentId], req.body)
	   console.log('updated', req.store.posts[req.params.postId].comments[req.params.commentId])
	   res.sendStatus(204)
    
  },
  removeComment(req, res){
  	if(req.store.posts[req.params.postId]==undefined){
  		console.log(`A post with postId: ${req.params.postId} does not exits `)
  		return res.sendStatus(400)
  	}else if(req.store.posts[req.params.postId].comments[req.params.commentId]==undefined){
  		console.log(`The comment with commentId: ${req.params.commentId} does not exits `)
  		return res.sendStatus(400)
  	}

  	req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
  	res.sendStatus(204)
    
  }  
}