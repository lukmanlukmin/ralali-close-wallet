'use strict'
const model = require('../model')
const { logger } = require('../helper/logger')




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
	return model.transactions.find({
		where : {
			$or: [
				{ obligor_id: id }, 
				{ beneficiary_id: id }
			],
			created_at: {
            	$between: [data.startDate, data.endDate]
           	}
		},
		limit: data.limit, 
		offset: data.offset
	})
};

module.exports = {
	saveTransaction,
	getListTransaction
}