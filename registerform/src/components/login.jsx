import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import LoginService from '../services/LoginService'
import * as Yup from 'yup'
import axios from 'axios';

const LOGIN_POST_URL ='http://localhost:8080/api/loginhelper/login' 
let isLoggedin = false;
const styles = {
  responsive: {
    maxWidth:"350px",
    width:"100%"
  }
}
export default function Login() {
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is mendatory')
      .max(32,'Password should be less than 32 characters')
      .matches(
        /[.*[A-Z].*]{0,}/,
        "Must Contain at least one Uppercase Character"
      )
      .matches(
        /[.*[a-z].*]{0,}/,
        "Must Contain at least one Lowercase Character"
      )
      .matches(
        /[.*[0-9].*]{0,}/,
        "Must Contain at least one Number Character"
      )
      .min(5, 'Password must be at 5 char long'),


    email: Yup.string()
      .required('Email is mendatory')
      .matches(
        /@/,
        "Must have @ "
      )
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please Enter a valid email"
      )
    //   .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  // function onSubmit(data) {
  //   // console.log(JSON.stringify(data, null, 4))
  //   console.log(data)
  //   LoginService.postRequestData(data);
  //   return false
  // }

    // const [email,setEmail] = useState('');  
    // const [password,setPassword] =useState('');
    
    const [respX,setRespX] =useState('');
    const navigate = useNavigate();
    // const navigateMethod=(event)=>{
    //   navigate("/angelprofile");
    // }
   
  
  
  const onSubmit= (angel)=> {
        // let angel = {
        //     email:email,
        //     password:password
        // }
        // console.log(angel);
       
     axios({
            method: 'post',
            url: LOGIN_POST_URL,
            data: {
                    email: angel.email,
                    password: angel.password
                    }
        }).then(res =>{
            console.log(" in "+res.data);
            if(res.data == "Login SuccessFull"){
              navigate("/angelprofile");
            }
            else{
              console.log(isLoggedin+"login is this")
              isLoggedin =true;
              console.log(isLoggedin+"login is this")
            }
            setRespX(res.data);
          })
          console.log( " out result "+respX);
          console.log("respx out"+respX)
          
          // navigate("/angelprofile");
          
      }
  return (
    <div >
        
        {isLoggedin && (
            <div className="col-4 mx-auto  mt-3 mb-0 alert alert-danger">
          Invalid Email/Password<br/>
          {/* If you are New User Register instead */}
        </div>)
          }

        <form 
        style={styles.responsive}
        onSubmit={handleSubmit(onSubmit)} 
        className="row gy-3 bg-light p-3 mx-auto mt-4 rounded  novalidate">

            <div className="form-group col-12 mb-3 mt-4">
                <h4>Login</h4>
            </div>


          <div className="form-group col-12">
            <label>Email</label>
            <input
              name="email"
              type="text"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter email"
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>


          <div className="form-group col-12">
            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter password"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-block" 
            // onClick={navigateMethod}
            >
              Login
            </button>
          </div>
        </form>
      </div>
  )
}