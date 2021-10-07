// import React, { Component, useRef } from "react";
// import Identicon from "identicon.js";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MainFormFc = (props ) => {
//   console.log(props,NaN,' ');
//   const inputEl = useRef(null);
//      return (
//        <div className="container-fluid mt-5">
//          <div className="row">
//            <main
//              role="main"
//              className="col-lg-12 ml-auto mr-auto"
//              style={{ maxWidth: "500px" }}
//            >
//              <div className="content mr-auto ml-auto">
//                <p>&nbsp;</p>
//                <h2>Share Post</h2>
//                <form
//                  onSubmit={(event) => {
//                    event.preventDefault();
//                    const description = inputEl.current.focus();
//                    props.uploadImage(description);
//                  }}
//                >
//                  <input
//                    type="file"
//                    accept=".jpg, .jpeg, .png, .bmp, .gif"
//                    onChange={props.captureFile}
//                  />
//                  <div className="form-group mr-sm-2">
//                    <br></br>
//                    <input
//                      id="imageDescription"
//                      type="text"
//                      ref={inputEl}
//                      className="form-control"
//                      placeholder="Image description..."
//                      required
//                    />
//                  </div>
//                  <button
//                    type="submit"
//                    className="btn btn-primary btn-block btn-lg"
//                  >
//                    Post
//                  </button>
//                </form>
//                <p>&nbsp;</p>
            
//              </div>
//            </main>
//          </div>
//        </div>
//      );
//   }

// export default MainFormFc;
