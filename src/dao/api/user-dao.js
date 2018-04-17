'use strict'
const axios = require('axios')
const { logger } = require('../../helper/logger')
const Promise = require('bluebird')

const getUserByToken = (tokenString) => {
    return axios.get("https://api.myjson.com/bins/iid1b", { 'x-access-token' : tokenString })
	.then(response => {
		if(response.status==200)
			if(response.data.success!==undefined) 
				return response.data.success.user_data
		logger.warn('Failed To Fetch User. detail: '+response)
		return false
	}).catch(err => {
		logger.error('Failed To Get User Data. detail: '+JSON.stringify(err))
		return false
	})
}

const getUserById = (tokenString,id) => {
    return axios.get("https://api.myjson.com/bins/iid1b", { 'x-access-token' : tokenString })
	.then(response => {
		if(response.status==200)
			if(response.data.success!==undefined) 
				return response.data.success.user_data
		logger.warn('Failed To Fetch User. detail: '+response)
		return false
	}).catch(err => {
		logger.error('Failed To Get User Data. detail: '+JSON.stringify(err))
		return false
	})
}

const getListUserInfo = (tokenString, userIdList) => {
	let promises = [];
	for(let id in userIdList) promises.push(getUserById(tokenString, id))
	return Promise.all(promises)
	.then(data=>{
		return data.reduce((map, obj)=>{
			if(obj) map[obj.id] = obj;
		    return map;
		}, {})
	}).catch(err=>{
		logger.error('Failed To Get User Data. detail: '+JSON.stringify(err))
		return false
	});
}

module.exports = {
	getUserByToken,
	getUserById,
	getListUserInfo
}