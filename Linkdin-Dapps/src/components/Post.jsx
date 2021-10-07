import React,  { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Moment from "react-moment";
function Post() {
const [posts, setPosts] = useState([]);
 posts.map((post) => {
   console.log(post,NaN, ' ');
  })
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
  useEffect( async () => {
       await getData();
  }, []);
  return (
    <div >
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">user</th>
            <th scope="col">title</th>
            <th scope="col">image</th>
            <th scope="col">created at</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <th scope="row">{post.user_id}</th>
              <td scope="row">{post.title}</td>
              <td scope="row">{post.image}</td>
              <td scope="row">
                <Moment fromNow>{post.created_at}</Moment>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Post
