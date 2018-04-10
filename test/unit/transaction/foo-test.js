'use strict'
var proxyquire =  require('proxyquire')
  , assert     =  require('assert')
  , pathStub   =  { };
 
// when no overrides are specified, path.extname behaves normally
var foo = proxyquire('./foo', { 'path': pathStub });

describe('[TDD] Transaction Test', () => {
  it('should return value from DB and converted', done => {
   assert.equal(foo.extnameAllCaps('file.txt'), '.TXT');
   console.log(foo.extnameAllCaps('file.txt'))
 
	// override path.extname
	pathStub.extname = function (file) { return 'Exterminate, exterminate the ' + file; };
	 
	// path.extname now behaves as we told it to
	assert.equal(foo.extnameAllCaps('file.txt'), 'EXTERMINATE, EXTERMINATE THE FILE.TXT');
   console.log(foo.extnameAllCaps('file.txt'))
	 
	// path.basename and all other path module methods still function as before
	assert.equal(foo.basenameAllCaps('/a/b/file.txt'), 'FILE.TXT');
    done()
  })  
})