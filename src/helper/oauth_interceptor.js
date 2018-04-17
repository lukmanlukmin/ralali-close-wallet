'use strict'
const axios = require('axios')
const { logger } = require('./logger')

const authenticate = (req, res, next) => {
    if(!req.headers.authorization) {
		res.status(401).send({
			authorized: false,
			message: 'Full Authentication is Required to Access This Resource.'
		})
	}else return axios.get("https://api.myjson.com/bins/bv5xb")
	.then(response => {
		if(response.status==200){
			req.user = response.data
			next()
		}else{
			// return res.status(403).send({
			// 	authorized: false,
			// 	message: 'You Dont Have Access To This Resource. Please Contact Administrator'
			// })
		}
	}).catch(err => {
		logger.error('Failed To Get Oauth Data. detail: '+JSON.stringify(err))
		return res.status(500).send({
			authorized: false,
			message: 'Internal Server Error. Failed To Authenticate.'
		})
	})
}

module.exports = {
	authenticate
}