import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import {HideLoading, ShowLoading} from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';
function ProtectedRoute({children, adminOnly = false}) {
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.alerts);
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const validateToken = async()=>{
        try {
            dispatch(ShowLoading());
            const response = await axios.post('/api/users/get-user-by-id', {},
                {headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                },
             });
             dispatch(HideLoading());
             if(response.data.success){
                dispatch(SetUser(response.data.data));
             }else{
                localStorage.removeItem("token");
                message.error(response.data.message);
                navigate("/login");
             }
        } catch (error) {
            dispatch(HideLoading());
            localStorage.removeItem("token");
            message.error(error.message);
            navigate("/login");
        }
    };
    
    useEffect(() => {
      if(localStorage.getItem('token')){
        validateToken();
      }else{
        navigate("/login");
      }
    }, []);

    // Handle admin-only routes
    if (adminOnly && user && !user.isAdmin) {
      // message.error("Access denied: Admins only");
      navigate("/User/UserHome"); // Redirect to home or another appropriate page
      return null;
    }
    
  return <div>{!loading && <DefaultLayout>{children}</DefaultLayout>}</div>
  
}

export default ProtectedRoute