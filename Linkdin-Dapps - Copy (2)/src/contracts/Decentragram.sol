pragma solidity ^0.5.0;

contract Decentragram {
  string public name = "Decentragram";



  //store post 
  uint public imageCount = 0;
mapping(uint => Image ) public images ;

struct Image {
  uint id;
  string hash;
  string description;
  uint tipAmount;
  address payable author;
}
event ImageCreated (
  uint id,
  string hash,
  string description,
  uint tipAmount,
  address payable author
);
event ImageTipped (
  uint id,
  string hash,
  string description,
  uint tipAmount,
  address payable author
);

  //Create Post 
  function uploadImage(string memory _imgHash , string memory _description ) public {
    
    //Make sure Image Hash exists
    require(bytes(_imgHash).length > 0);
    //Make sure Image description exists
    require(bytes(_description).length > 0);
   
   // Make sure uploader address exits
   require(msg.sender != address(0x0));





    //Increment image id
  imageCount ++;

    // Add Image contract
    images[imageCount] = Image( imageCount, _imgHash,_description , 0 , msg.sender);
    
    //Trigger an event
    emit ImageCreated( imageCount, _imgHash,_description , 0 , msg.sender);
    
  }

  //Tip post 
  function tipImageOwner(uint _id) public payable {

    //Make sure the id is valid
    require(_id > 0 && _id <= imageCount);
    //fetching the images
    Image memory _image = images[_id];
    
    //fetch the author 
    address payable _author = _image.author ;

    //tranfer money
    _author.transfer(1 ether);

   //pay the author by sendign them either
    address(_author).transfer(msg.value);

    //increment tip amount 
    _image.tipAmount = _image.tipAmount + msg.value;

    // update the image 
    images[_id] = _image;

    //trigger an event
    emit ImageTipped(_id,_image.hash,_image.description,_image.tipAmount,_author);


  }


}