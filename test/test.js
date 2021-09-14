const { assert } = require('chai')
const Web3 = require('web3');
// const Contract = artifacts.require("Contract");
const Decentragram = artifacts.require('./Decentragram.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Decentragram', ([deployer, author, tipper]) => {
  let decentragram

  before(async () => {
    decentragram = await Decentragram.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await decentragram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await decentragram.name()
      assert.equal(name, 'Decentragram')
    })
  })
 describe('images', async () => {
   let result ,imageCount ;
   const hash = 'abc123';

    before(async () => {
    result = await decentragram.uploadImage(hash, 'Image Description' ,{ from : author })
    imageCount = await decentragram.imageCount();
  })


   it('creates images', async()=> {
     //success 
     assert.equal(imageCount, 1);
     const event = result.logs[0].args   
     assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct');
     assert.equal(event.hash, hash, 'Hash is correct');
     assert.equal(event.description,"Image Description","Description is correct");
     assert.equal(event.tipAmount ,'0', 'tip amount is correct');
     assert.equal(event.author, author , 'author is correct');


     //Failure : image must have hash 
    await decentragram.uploadImage('','Image description',{from :author}).should.be.rejected;     
  

     //Failure : image must have description  
    await decentragram.uploadImage('Image hase','',{from :author}).should.be.rejected;     
  
  
  
  })

  it('lists images',async() =>{
    const image = await decentragram.images(imageCount);
    assert.equal(image.id.toNumber(),imageCount.toNumber(),'id is correct');
    assert.equal(image.hash,hash,'Hash is correct');
    assert.equal(image.description,'Image Description','description is correct');
    assert.equal(image.tipAmount,'0','tip amount is correct');
    assert.equal(image.author,author,'author is correct');
  })

  it('allows users to tip images',async () => {

    //Track the author balance before purchase 
    let oldAuthorBalance 
    oldAuthorBalance = await Web3.eth.getBalance(author);
    oldAuthorBalance = new Web3.utils.BN(oldAuthorBalance);

    result =  await decentragram.tipImageOwner(imageCount,{from : tipper, value :Web3.utils.toWei('1','Ether')})

         //success 
      const event = result.logs[0].args; 
     assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct');
     assert.equal(event.hash, hash, 'Hash is correct');
     assert.equal(event.description,"Image Description","Description is correct");
     assert.equal(event.tipAmount ,'1000000000000000', 'tip amount is correct');
     assert.equal(event.author, author , 'author is correct');


     //Check the author received funds 
       let newAuthorBalance 
    newAuthorBalance = await Web3.eth.getBalance(author);
    newAuthorBalance = new Web3.utils.BN(newAuthorBalance);


    
        let tipImageOwner 
    tipImageOwner = await Web3.utils.toWei('1','Ether');
    tipImageOwner = new Web3.utils.BN(tipImageOwner);

    const expectedBalance = oldAuthorBalance.add(tipImageOwner)

    assert.equal(newAuthorBalance.toString(), expectedBalance.toString);

    //Failure : Tries to tip a image that does not exits
    await decentragram.tipImageOwner(99,{from: tipper,value: Web3.utils.toWei('1','Either')}).should.be.rejected;
  
  });
 })
})