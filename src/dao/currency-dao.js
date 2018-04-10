'use strict'
const model = require('../model')
const { logger } = require('../helper/logger')


const getCurrencyByTerm = (currency) => {
	return model.currency_idr.findOne({
		where : {
			currency
		}
	})
}

const getCurrencyById = (id) => {
	return model.currency_idr.findOne({
		where : {
			id
		}
	})
}

module.exports = {
	getCurrencyByTerm,
	getCurrencyById
}