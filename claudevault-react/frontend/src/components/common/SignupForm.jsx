import React from 'react';
import { useFormik } from 'formik';
import { signupSchema } from '../../validation/signupSchema';
import { useAuth } from '../../hooks/useAuth';

const SignupForm = ({ onSwitchToLogin }) => {
  const { register, loading } = useAuth();

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
      terms: false,
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const result = await register({
        full_name: values.full_name,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      });
      if (result.success) {
        onSwitchToLogin();
      }
    },
  });

  return (
    <form id="signup-form" className="auth-form" onSubmit={formik.handleSubmit}>
      <div className="input-group">
        <input 
          type="text" 
          id="signup-name" 
          name="full_name"
          placeholder=" " 
          value={formik.values.full_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="signup-name">Full Name</label>
      </div>
      <div className="input-group">
        <input 
          type="email" 
          id="signup-email" 
          name="email"
          placeholder=" " 
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="signup-email">Email</label>
      </div>
      <div className="input-group">
        <input 
          type="password" 
          id="signup-password" 
          name="password"
          placeholder=" " 
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="signup-password">Password</label>
        <div className="password-strength">
          <div className="strength-bar"></div>
        </div>
      </div>
      <div className="input-group">
        <input 
          type="password" 
          id="signup-confirm" 
          name="confirm_password"
          placeholder=" " 
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="signup-confirm">Confirm Password</label>
      </div>
      <label className="checkbox-label">
        <input 
          type="checkbox" 
          id="terms" 
          name="terms"
          checked={formik.values.terms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="checkmark"></span>
        I agree to the{' '}
        <a href="#" onClick={(e) => e.preventDefault()}>
          Terms
        </a>{' '}
        and{' '}
        <a href="#" onClick={(e) => e.preventDefault()}>
          Privacy Policy
        </a>
      </label>
      <button type="submit" className="btn-auth" disabled={loading || formik.isSubmitting}>
        {loading || formik.isSubmitting ? 'Creating Account...' : 'Create account'}
      </button>
      <p className="auth-switch">
        Already have an account?{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToLogin();
          }}
        >
          Sign in
        </a>
      </p>
    </form>
  );
};

export default SignupForm;
