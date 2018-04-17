'use strict'
const { currency,transaction } = require('../dao/db')
const { user } = require('../dao/api')
const { logger } = require('../helper/logger')
const math = require('mathjs')
const uuidv1 = require('uuid/v1')
const Promise = require('bluebird')

/**
	data(object) 
	-obligorId: integer,
	-beneficiaryId: integer,
	-transType: string,
	-amount: decimal,
	-currency: string,
	-info_1: string,
	-info_2: string
**/
const debit = (data) => {
	return translateCurrency = (data, currency.getCurrencyByTerm)
	.then(amountIdr => {
		if(!amount_idr){
			logger.warn('Currency Not Found. '+JSON.stringify(data))
			return 'Currency Not Found.'
		}else{
			return transaction.saveTransaction({
				trans_id: uuidv1(),
				trans_type: data.transType,
				obligor_id: data.obligorId,
				beneficiary_id: data.beneficiaryId,
				amount: data.amount,
				amount_currency: data.currency,
				amount_idr: amountIdr,
				info_1: data.info_1,
				info_2: data.info_2
			})
		}
	}).catch(err=>{
		logger.error('Failed Save Transaction. '+JSON.stringify(data))
		return false
	})
}

/**
	data(object) 
	-amount: decimal,
	-currency: string
**/
const translateCurrencyToIDR = (data, curencyFromDb) => {
	return curencyFromDb(data.currency)
	.then(currency=> (!currency) ? false : math.chain(currency.value).multiply(data.amount).done() )
	.catch(err=>{
		logger.error('Failed Get Currency. '+JSON.stringify(data))
		return false
	})
}

/**
	data(object) 
	-amount: decimal,
	-currency: string
**/
const translateCurrencyToCurency = (data, curencyFromDb) => {
	return curencyFromDb(data.currency)
	.then(currency=> (!currency) ? false : math.chain(data.amount).divide(currency.value).done() )
	.catch(err=>{
		logger.error('Failed Get Currency. '+JSON.stringify(data))
		return false
	})
}

/**
	data(object) 
	-dateStart: date(object),
	-dateEnd: date(object)
	-limit: integer
	-offset: integer
	-order: string
	userId integer
**/
const historyTransaction = (data, id, token) => {
	return transaction.getListTransaction(data, id)
	.then(dataList => reduceListTransaction(dataList, id))
	.then(dataList=>{
		const listUserId = dataList.reduce((arrayData, dataObj)=>{
			arrayData.push(dataObj.opposite_user.client_id)
			return arrayData
		}, [])
		return user.getListUserInfo(token, listUserId)
		.then(users=> reduceFinalListTransaction(dataList, users))
	})
}

const reduceListTransaction = (dataList, id) => {
	return dataList.reduce((arrayData, dataObj)=>{
		arrayData.push({
		    trans_id: dataObj.trans_id,
		    type: dataObj.type,
		    trans_date: dataObj.trans_date,
		    status: dataObj.status,
		    opposite_user: (dataObj.beneficiary.id==id)? dataObj.obligor : dataObj.beneficiary,
		    linked_trans_id: dataObj.linked_trans_id,
		    direction_status: (dataObj.beneficiary.id==id)? 'Debit' : 'Credit',
		    amount: dataObj.amount,
		    curency: dataObj.currency,
		    info_1: dataObj.info_1,
		    info_2: dataObj.info_2,
		    created_at: dataObj.created_at,
		    updated_at: dataObj.updated_at,
		})
		return arrayData
	}, [])
}

const reduceFinalListTransaction = (dataList, dataUser) => {
	return dataList.reduce((arrayData, dataObj)=>{
		arrayData.push({
		    trans_id: dataObj.trans_id,
		    type: dataObj.type,
		    trans_date: dataObj.trans_date,
		    status: dataObj.status,
		    opposite_user: dataUser[dataObj.opposite_user.client_id],
		    linked_trans_id: dataObj.linked_trans_id,
		    direction_status: dataObj.direction_status,
		    amount: dataObj.amount,
		    curency: dataObj.currency,
		    info_1: dataObj.info_1,
		    info_2: dataObj.info_2,
		    created_at: dataObj.created_at,
		    updated_at: dataObj.updated_at,
		})
		return arrayData
	}, [])
}

const getSummaryBallanceByUserId = () => {

}



/**
	-userId: integer
**/
// const getBalanceByUser = (id, token) => {
// 	const listTransaction = transaction.getListTransaction({
// 		limit:5,
// 		offset:0,
// 		order: 'DESC'
// 	}, id)
// 	.then(dataList => reduceListTransaction(dataList, id))
// 	const userDetail = user;
// 	const summary=transaction.getSummaryBallanceByUserId(id);
// 	// Promise.all([listTransaction, userDetail, summary]).then(function(values) {
// 	//   return {
// 	//   	userInfo:values[1],
// 	//   	listTransaksi:values[0],
// 	//   	summary
// 	//   }
// 	// })
// }


module.exports = {
	debit,
	translateCurrencyToIDR,
	translateCurrencyToCurency,
	historyTransaction,
	getSummaryBallanceByUserId
	// countBalanceUser
}