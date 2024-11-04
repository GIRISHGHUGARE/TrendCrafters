import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import Axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post('http://localhost:5000/api/v1/auth/login', data);
      const result = response.data;
      console.log(result.name);
      if (result.message=="Logged in successfully") {
        toast.success("Login successfully");
        localStorage.setItem('user', JSON.stringify({ name: result.name, email: data.email }));
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Credentials")
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 border p-3 shadow bg-white mb-5">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="row-md-4 mt-2">
                <label className="text-center fs-5">Login</label>
              </div>
              <div className="row-md-4 mt-2">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address'
                    }
                  })}
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>
              <div className="row-md-4 mt-2">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long'
                    }
                  })}
                  required
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>
              <div className="col-12 mt-3">
                <button
                  className="btn btn-custom-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging In...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login