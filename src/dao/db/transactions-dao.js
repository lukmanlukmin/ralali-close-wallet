'use strict'
const model = require('../../model')
const { logger } = require('../../helper/logger')
const math = require('mathjs')




const saveTransaction = (data) => {
	return model.transactions.build({
		access_token : token.accessToken,
	    access_token_expires_on: token.accessTokenExpiresOn,
	    client_id: client.id,
	    refresh_token: token.refreshToken,
	    refresh_token_expires_on: token.refreshTokenExpiresOn,
	    user_id: user.id
	}).save()
	.catch(ex=>{
		logger.error(ex)
		return false;
	})
};

const getListTransaction = (data, id) => {
	let where = {
		$or: [
			{ obligor_id: id }, 
			{ beneficiary_id: id }
		]
	}
	if(data.startDate!==undefined && data.endDate!==undefined)
	where.created_at = {
    	$between: [data.startDate, data.endDate]
   	}
   	data.order = (data.order==undefined)? 'ASC' : data.order
	return model.transactions.find({
		where,
		limit: data.limit, 
		offset: data.offset,
		order: [
			['id', data.order]
		]
	})
};

const getBallanceByUserId = id => {
	const queryString = 'select (select sum(amount) from transactions where obligor_id='+id+') AS debit, (select sum(amount) from transactions where beneficiary_id='+id+') AS credit'
    return model.sequelize.query(queryString, { type: Sequelize.QueryTypes.SELECT})
	.then(data=>{
 		return {
 			credit: data.credit,
	 		debit: data.debit,
	 		balance: math.chain(data.debit).subtract(data.credit).done()
 		}
 	})
}

module.exports = {
	saveTransaction,
	getListTransaction,
	getBallanceByUserId
}