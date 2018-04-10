'use strict'
require('dotenv').load()
const { logger, expressLogger, expressLoggerError } = require('./src/helper/logger')
const express = require('express')
const OAuthServer = require('express-oauth-server')
const actuator = require('express-actuator')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const app = express()
const routePath = './src/router/api/v1'
const findFileRoute = dir => {
    let results = []
    const list = fs.readdirSync(dir)
    list.forEach(file => {
        file = dir + '/' + file
        let stat = fs.statSync(file)
        if (stat && stat.isDirectory()) results = results.concat(findFileRoute(file))
        else results.push(file)
    })
    return results
}

/* swagger definition */
const swaggerOption = {
    swaggerDefinition: {
        info: {
            title: 'Ralali Close Wallet API Specs',
            version: '1.0.0',
            description: 'Specification for Closed Wallet API typcially used for transactions, cancellations, refunds and cashback. This API is designed for use on the [Ralali, B2B marketplace](https://www.ralali.com/). Internally each account will have three accounts.  <br><br>- **Key Account** for holding users account balance   <br>- **Transition Account** for receiving fund as a seller. The balance will be held until goods are delivered   <br>- **Cashback Account** to credit account with discount or cashback <br><br> All transaction will be converted into (IDR) Indonesian Rupiah Curency',
            contact: {
                name: "Dev-Ralali",
                // url: "https://www.ralali.com/hubungikami",
                email: "dev@ralali.com"
            },
            license: {
                name: "Apache 2.0",
                url: "https://www.apache.org/licenses/LICENSE-2.0"
            },
        },
        basePath: '/api/v1',
        securityDefinitions: {
            wallet_auth: {
                type: "oauth2",
                authorizationUrl: "/oauth/dialog",
                flow: "implicit",
                scopes: {
                    "write:wallet": "modify wallet records for a authenticated user",
                    "read:wallet": "read records for validated user",
                    "write:user": "modify user profile",
                    "read:user": "read user profile details",
                    "write:transaction": "transaction modification",
                    "read:transaction": "transaction details",
                },
            },
            api_key: {
                type: "apiKey",
                name: "api_key",
                in: "header"
            }
        }
    },
    apis: ['./src/router/**/**.js'],
    
}
const swaggerSpec = swaggerJSDoc(swaggerOption)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, {}, '.topbar { display: none }'));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, customCss))
app.get('/api/v1/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

/* oauth definition */
app.oauth = new OAuthServer({
    model: require('./src/dao/oauth_dao')
})

/* set middleware */
// express logger
if(process.env.LOG_LEVEL_ROUTER=='error') app.use(expressLoggerError)
else app.use(expressLogger)
// actuator
app.use(actuator('/actuator'));

/* build router */
findFileRoute(routePath).forEach(absolutePath => require(absolutePath)(app))

/* create server */
const server = process.env.APP_ENV === 'local' ? require('http').createServer(app) : require('https').createServer({
    key: fs.readFileSync('ssl/wildcard.ralali.com.key'),
    cert: fs.readFileSync('ssl/wildcard.ralali.com.crt'),
    requestCert: true
}, app)

/* runing our server */
const PORT = process.env.PORT || process.env.APP_PORT || 3000
if (!module.parent) {
    server.listen(PORT, () => {
        console.log('Express Server Now Running. port:', PORT)
        logger.info('Express Server Now Running. port:', PORT)
    })
}
module.exports = app