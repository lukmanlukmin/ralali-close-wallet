'use strict'
const axios = require('axios')
const { logger } = require('./logger')

const authenticate = (req, res, next) => {
	if (!req.headers.authorization) {
		res.status(401).send({
			authorized: false,
			message: 'Full Authentication is Required to Access This Resource.'
		})
	}else return axios.get("https://www.google.com/")
	.then(response => {
		if(response.status==200){
			console.log(response.status)
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