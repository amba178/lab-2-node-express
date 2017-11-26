

module.exports = {
    getPosts(req, res) {
    	 res.status(200).send(req.store.posts)
    },
    addPost(req, res) {
    	if(!req.body.name || !req.body.url || !req.body.text.trim()) return res.sendStatus(400)
	  	let obj = {
	  		name: req.body.name,
	  		url: req.body.url,
	  		text: req.body.text,
	  		comments: []
	  	}
		let postId = req.store.posts.length 
		req.store.posts.push(obj)
		res.status(201).send({postId: postId})

    },
    updatePost(req, res){
       if(req.store.posts[req.params.postId] == undefined) return res.sendStatus(400)
       Object.assign(req.store.posts[req.params.postId], req.body)
	   console.log('updated', req.store.posts[req.params.postId])
	   res.sendStatus(204)
  		
  	},
    removePost(req, res){
    	req.store.posts.splice(req.params.postId, 1)
    	console.log('deleted', req.store.posts)
    	res.send(204)
    }

}
