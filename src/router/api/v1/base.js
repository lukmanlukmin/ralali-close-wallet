'use strict'

const base_path = '/api/v1/'
module.exports = (app) => {
    app.get(base_path, (req, res, next) => {
        res.send({
			status: 'Api is Running'
	    })
    })

    /**
   * @swagger
   * /test:
   *   post:
   *     description: Creates a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewUser'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/User'
   */
    app.post(base_path+'test', (req, res, next) => {
        res.send({
			status: 'Api is Running'
	    })
    })
    app.get(base_path+ 'secret', app.oauth.authenticate(), function(req, res) {
		res.send('Secret area');
	});

	app.get(base_path+ 'secret2', app.oauth.authorize(), function(req, res) {
		res.send('Secret area');
	});

	app.get(base_path+ 'secret3', app.oauth.token(), function(req, res) {
		res.send('Secret area');
	});
}
