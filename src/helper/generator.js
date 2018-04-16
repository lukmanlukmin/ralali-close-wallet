'use strict'
const uuidv1 = require('uuid/v1')
const uuidv4 = require('uuid/v4')

const getRandomStringUUID = () => (uuidv4()+uuidv1()).replace(/[^a-zA-Z0-9]/g, '')

module.exports = {
	getRandomStringUUID
}