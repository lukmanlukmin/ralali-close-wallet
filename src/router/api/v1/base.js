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
   * /authenticate:
   *   get:
   *     security:
   *      - Authorization: []
   *     description: sample end point
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: sample value
   */
	app.get(base_path+ 'authenticate', function(req, res) {
		res.send('Secret area');
	});
}
