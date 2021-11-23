import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Moment from "react-moment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Post() {
  const [posts, setPosts] = useState([]);
  //  posts?.map((post) => {
  //    console.log(post,NaN, ' ');
  //   })
  const getData = async () => {
    await axios
      .get("http://localhost:8000/api/users/show_post")
      .then((res) => {
        const { data } = res;
        setPosts(data);
      })
      .catch((error) => {
        console.log(error, "datas error");
      });
  };
  useEffect(async () => {
    await getData();
  }, []);
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">user</th>
            <th scope="col">image</th>
            <th scope="col">created at</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post, index) => (
            <tr key={index}>
              <th scope="row">{post.user_id}</th>
              <td scope="row">{post.image}</td>
              <td scope="row">
                <Moment fromNow>{post.created_at}</Moment>
              </td>
              <td scope="row">
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="success">
                    View
                  </Button>
                  <Button variant="contained" color="success">
                    Edit
                  </Button>
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Post;
