
import axios from 'axios';
import {LoadProfile} from '../../services/ProfileServices';
import * as ActionTypes from '../ActionTypes';


export const LoadProfileAction = () => {
    return (dispatch) => {
        
        dispatch({type: ActionTypes.LOADING});

        LoadProfile().then((res) => {
             
            if(res.hasOwnProperty('success') && res.success === true){
                
                dispatch({type: ActionTypes.LOAD_PROFILE_SUCCESS,res});
            }else if(res.hasOwnProperty('success') && res.success === false){
                dispatch({type: ActionTypes.LOAD_PROFILE_ERROR,res});
            }
            
        }, error => {
            dispatch({type : ActionTypes.CODE_ERROR, error})
        })
    }
}


export const postAddAction = (post) => {
  console.log(post,'from postadd=>');
  
  return async (dispatch, getState) => {
   
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/add_post",
        {
          user_id : post.account,
           title : post.title,
          image: post.image,
  
        });
    console.log(response, null, NaN, ' ');
    } catch (error) {
      console.log(error, null, ' ');
    }
  };
};
