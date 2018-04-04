'use strict'

const base_path = '/api/v1/'
module.exports = (app) => {
    app.get(base_path, (req, res, next) => {
        res.send({
			status: 'Api is Running'
	    })
    })
    app.get(base_path+ 'secret', app.oauth.authenticate(), function(req, res) {
		res.send('Secret area');
	});
}
