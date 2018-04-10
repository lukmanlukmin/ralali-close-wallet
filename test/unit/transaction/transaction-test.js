'use strict'

require('dotenv').load()
var proxyquire =  require('proxyquire')
var assert = require('assert')
const Promise = require('bluebird')


describe('[TDD] Transaction Test', (done) => {
  it('should return value from DB and converted', done => {
    const data = {}
    var transactionStub   =  { }
    var transactionService = proxyquire('./../../../src/controller/transaction', { '../dao': transactionStub });
    transactionStub.transaction.getListTransaction = (data, id) => new Promise(function(resolve, reject) {
      resolve([{
        trans_id: '12345-12345-12334',
        trans_type: 'Order',
        trans_date: '2018-04-04 09:09:09',
        linked_txn_id: data.linked_txn_id,
        beneficiary_id: 2,
        obligor_id: 1,
        amount: 20000,
        amount_currency: 'IDR',
        created_at: '2018-04-04 09:09:09',
        updated_at: '2018-04-04 09:09:09',
        amount_idr: 20000
      }]);
    })
    
    transactionService.historyTransaction(data, 1)
    .then(result=>{
      console.log(result)
      // assert.equal(1,1)
      done()
    })
  })

  it('should return value from DB and converted', done => {
    const data = {}
    var transactionStub   =  { }
    var transactionService = proxyquire('./../../../src/controller/transaction', { '../dao': transactionStub });
    transactionStub.transaction.getListTransaction = (data, id) => new Promise(function(resolve, reject) {
      resolve([{
        trans_id: '12345-12345-12334',
        trans_type: 'Order',
        trans_date: '2018-04-04 09:09:09',
        linked_txn_id: data.linked_txn_id,
        beneficiary_id: 2,
        obligor_id: 1,
        amount: 20000,
        amount_currency: 'IDR',
        created_at: '2018-04-04 09:09:09',
        updated_at: '2018-04-04 09:09:09',
        amount_idr: 20000
      },
      {
        trans_id: '12345-12345-12334',
        trans_type: 'Order',
        trans_date: '2018-04-04 09:09:09',
        linked_txn_id: data.linked_txn_id,
        beneficiary_id: 2,
        obligor_id: 1,
        amount: 20000,
        amount_currency: 'IDR',
        created_at: '2018-04-04 09:09:09',
        updated_at: '2018-04-04 09:09:09',
        amount_idr: 20000
      }]);
    })
    
    transactionService.historyTransaction(data, 1)
    .then(result=>{
      console.log(result)
      // assert.equal(1,1)
      done()
    })
  })  
})