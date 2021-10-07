// import Decentragram from '../abis/Decentragram.json'
// import React, { Component ,  useState} from 'react';
// import Identicon from 'identicon.js';
//    import Web3 from 'web3';
//  import MainForm from './Main/MainForm';
// import styled from "styled-components";
// import Header from './Header';
//   import "bootstrap/dist/css/bootstrap.min.css";
// import MainFormFc from './Main/MainFormFc';
// import useEffect, { useAsyncEffect } from "use-async-effect";


// //Declare IPFS
// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

// const MainFc = ()=> {

    
//  useAsyncEffect(async isMounted => {
//    await loadWeb3();
//    await loadBlockchainData();
//  });
 
 

 

//    async function loadWeb3() {
//      if (window.ethereum) {
//        window.web3 = new Web3(window.ethereum);
//        await window.ethereum.enable();
//      } else if (window.web3) {
//        window.web3 = new Web3(window.web3.currentProvider);
//      } else {
//        window.alert(
//          "Non-Ethereum browser detected. You should consider trying MetaMask!"
//        );
//      }
//    }

//   async function loadBlockchainData() {
//     const web3 = window.web3
//     // Load account
//     const accounts = await web3.eth.getAccounts()
//      setState({ account: accounts[0] })
//     // Network ID
//     const networkId = await web3.eth.net.getId()
//     const networkData = Decentragram.networks[networkId]
//     if(networkData) {
//       const decentragram = new web3.eth.Contract(
//         Decentragram.abi,
//         networkData.address
//       );
//       setState({ decentragram });

//       const imagesCount = await decentragram.methods.imageCount().call();
//       setState({ imagesCount });

//       // Load images
//       // for (var i = imagesCount; i >= 10; i--) {
//       for (var i = 1; i >= imagesCount; i++) {
//         const image = await decentragram.methods.images(i).call();
//         console.log(image, "image ");
//      setState({
//           images: [...state.images, image]
//         });
//         // setState((state) => ({
//         //   images: [...state.images, image],
//         // }));
//       }
//       // Sort images. Show highest tipped images first
//       // setState({
//       //   images: state.images.sort((a, b) => b.tipAmount - a.tipAmount),
//       // });
//       setState({ loading: false });
//     } else {
//       window.alert('Dapps contract not deployed to detected network.')
//     }
//   }

//   const captureFile = event => {

//     event.preventDefault()
//     const file = event.target.files[0]
//     const reader = new window.FileReader()
//     reader.readAsArrayBuffer(file)

//     reader.onloadend = () => {
//        setState({ buffer: Buffer(reader.result) })
//       console.log('buffer',  state.buffer)
//     }
//   }

// const   uploadImage = description => {
//     console.log("Submitting file to ipfs...")

//     //adding file to the IPFS
//     ipfs.add( state.buffer, (error, result) => {
//       console.log('Ipfs result', result)
//       if(error) {
//         console.error(error)
//         return
//       }

//        setState({ loading: true })
//        state.decentragram.methods.uploadImage(result[0].hash, description).send({ from:  state.account }).on('transactionHash', (hash) => {
 
//         setState({ loading: false })

//       })
//     })
//   }

//  const  tipImageOwner = (id, tipAmount) => {
//      setState({ loading: true })
//      state.decentragram.methods.tipImageOwner(id).send({ from:  state.account, value: tipAmount }).on('transactionHash', (hash) => {
//        setState({ loading: false })
//     })
//   }
    
//    const [state, setState] = useState({
//      account: "",
//      decentragram: null,
//      imagesCount: null,
//      images: [],
//      loading: true,
//    });

//    console.log(state, "ehi");


 
//     return (
//       <div>
//         {state.loading ? (
//           <div id="loader" className="text-center mt-5">
//             <p>Loading...</p>
//           </div>
//         ) : (
//           <Container>
//             <Header account={ state.account} />
//             <MainFormFc
//               images={ state.images}
//               captureFile={ captureFile}
//               uploadImage={ uploadImage}
//               tipImageOwner={ tipImageOwner}
//             />
//           </Container>
//         )}
//       </div>
//     );
//   }
// const Container = styled.div`
//   grid-area: main;
// `;
// export default MainFc;

 
