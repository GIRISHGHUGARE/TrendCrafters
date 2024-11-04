import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import Axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post('http://localhost:5000/api/v1/auth/signup', data);
      const result = response.data;
      console.log(result);
      if (result.message=="User registered successfully") {
        toast.success("Login successfully");
        localStorage.setItem('user', JSON.stringify({ name: result.name, email: data.email }));
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Input")
      console.error(error.message);
    } 
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-4 border p-3 shadow bg-white mb-5">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="row-md-4">
                <label className="text-center fs-5">Register</label>
              </div>
              <div className="row-md-4 mt-1">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  {...register('name', { required: true })}
                  required
                />
                {errors.name && <div className="invalid-feedback">Name is required</div>}
              </div>
              <div className="row-md-4 mt-1">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                  required
                />
                {errors.email && <div className="invalid-feedback">Invalid email address</div>}
              </div>
              <div className="row-md-4 mt-1 ">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  {...register('password', { required: true, minLength: 8 })}
                  required
                />
                {errors.password && <div className="invalid-feedback">Password must be at least 8 characters long</div>}
              </div>
              <div className="col-12 mt-2">
                <div className="form-check">
                  <input
                    className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                    type="checkbox"
                    value=""
                    id="terms"
                    {...register('terms', { required: true })}
                  />
                  <label className="form-check-label" htmlFor="terms">
                    Agree to terms and conditions
                  </label>
                  {errors.terms && <div className="invalid-feedback">You must agree to terms and conditions</div>}
                </div>
              </div>
              <div className="col-12 mt-2">
                <button
                  className="btn btn-custom-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;