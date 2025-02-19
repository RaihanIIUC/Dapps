import Decentragram from '../abis/Decentragram.json'
import React, { Component } from 'react';
import Identicon from 'identicon.js';
   import Web3 from 'web3';
 import MainForm from './Main/MainForm';
import styled from "styled-components";
import Header from './Header';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class Main extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();

    await axios
      .get("http://localhost:8000/api/users/show_post")
      .then((posts) => {
        const { data } = posts;
        console.log(data, "data");
      })
      .catch((error) => {
        console.log(error, "datas error");
      });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Decentragram.networks[networkId];
    if (networkData) {
      const decentragram = new web3.eth.Contract(
        Decentragram.abi,
        networkData.address
      );
      this.setState({ decentragram });
      const imagesCount = await decentragram.methods.imageCount().call();
      this.setState({ imagesCount });
      // Load images
      for (var i = imagesCount; i > 0; i--) {
        const image = await decentragram.methods.images(i).call();
        this.setState({
          images: [...this.state.images, image],
        });
      }
      // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a, b) => b.tipAmount - a.tipAmount),
      });
      this.setState({ loading: false });
    } else {
      window.alert("Dapps contract not deployed to detected network.");
    }
  }

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  async uploadImage(description) {
    console.log("Submitting file to ipfs...");

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("Ipfs result", result);
      if (error) {
        console.error(error);
        return;
      }

      this.setState({ loading: true });
      this.state.decentragram.methods
        .uploadImage(result[0].hash, description)
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          // window.location.reload();
          this.setState({ loading: false });

          axios
            .post("http://localhost:8000/api/users/add_post", {
              user_id: this.state.account,
              title: description,
              image: result[0].hash,
            })
            .then((response) => {
              console.log(response, null);
            })
            .catch((error) => {
              console.log(error, undefined, "errro");
            });
 
        });

 
    });
      
    console.log("hello we are now in last part");
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true });
    this.state.decentragram.methods
      .tipImageOwner(id)
      .send({ from: this.state.account, value: tipAmount })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      decentragram: null,
      images: [],
      loading: true,
    };

    this.uploadImage = this.uploadImage.bind(this);
    this.tipImageOwner = this.tipImageOwner.bind(this);
    this.captureFile = this.captureFile.bind(this);
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <Container>
            <Header account={this.state.account} />
            <MainForm
              images={this.state.images}
              captureFile={this.captureFile}
              uploadImage={this.uploadImage}
              tipImageOwner={this.tipImageOwner}
            />
          </Container>
        )}
      </div>
    );
  }
}
const Container = styled.div`
  grid-area: main;
`;
export default Main;

 
