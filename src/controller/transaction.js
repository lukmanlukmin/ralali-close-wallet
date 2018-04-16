'use strict'
const { currency,transaction } = require('../dao')
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
const debit = (data, transactionDB) => {
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
	userId integer
**/
const historyTransaction = (data, id) => {
	return transaction.getListTransaction(data, id)
	.then(dataList=>{
		return dataList.reduce((arrayData, dataObj)=>{
			arrayData.push({
			    trans_id: dataObj.trans_id,
			    trans_type: dataObj.trans_type,
			    trans_date: dataObj.trans_date,
			    linked_txn_id: dataObj.linked_txn_id,
			    status: (dataObj.beneficiary_id==id)? 'Debit' : 'Credit',
			    amount: dataObj.amount,
			    amount_currency: dataObj.amount_currency,
			    created_at: dataObj.created_at,
			    updated_at: dataObj.updated_at,
			    amount_idr: dataObj.amount_idr
			})
			return arrayData
		}, [])
	})
}

/**
	-userId: integer
**/
const getBalanceByUser = id => {
	const listTransaction = transaction.getListTransaction({
		limit:5,
		offset:0
	}, id, 'DESC')
	.then(dataList=>{
		return dataList.reduce((arrayData, dataObj)=>{
			arrayData.push({
			    trans_id: dataObj.trans_id,
			    trans_type: dataObj.trans_type,
			    trans_date: dataObj.trans_date,
			    linked_txn_id: dataObj.linked_txn_id,
			    status: (dataObj.beneficiary_id==id)? 'Debit' : 'Credit',
			    amount: dataObj.amount,
			    amount_currency: dataObj.amount_currency,
			    created_at: dataObj.created_at,
			    updated_at: dataObj.updated_at,
			    amount_idr: dataObj.amount_idr
			})
			return arrayData
		}, [])
	})
	const userDetail;
	const summary=transaction.getSummaryBallanceByUserId(id);
	Promise.all([listTransaction, userDetail, summary]).then(function(values) {
	  return {
	  	userInfo:values[1],
	  	listTransaksi:values[0],
	  	summary
	  }
	})
}

const countBalanceUser = id => transaction.getSummaryBallanceByUserId(id)

module.exports = {
	debit,
	translateCurrencyToIDR,
	translateCurrencyToCurency,
	historyTransaction,
	countBalanceUser
}