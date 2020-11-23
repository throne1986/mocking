import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { post, catchErrors } from '../../utils/api';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await post(`/auth/login`, { email, password, remember_me: rememberMe });
		
		} catch (err) {
			console.log('error')
		}
	}

	const labelStyle = {
		color: "#afb9c2",
		fontSize: "14px",
		fontWeight: "400",
		lineHeight: "28px"
	  };

	return (
		<div data-test="component-login" className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 auth__box">
			<h1 className="auth__header">Sign in</h1>
			<form data-testid="form" onSubmit={handleSubmit} className="login">
				<div className="form-group">
			     	<label style={labelStyle} htmlFor="email">email</label>
					<input name="email"  data-test="login-emil" id="email-input" type="email" value={email} placeholder="Business e-mail" className="form-control" onChange={e => setEmail(e.target.value)} />
					<small role="alert-email" data-testid="email-errors">{catchErrors(errors, 'email')}</small>
				</div>
					<div className="form-group">
					<label style={labelStyle} htmlFor="password">password</label>
					<input name="password" data-test="login-password" id="password-input" type="password" value={password} placeholder="Password" className="form-control" onChange={e => setPassword(e.target.value)} />
					<small role="alert-password" data-testid="password-errors">{catchErrors(errors, 'password')}</small>
				</div>

				<div className="form-group">
					<div className="checkbox checkbox-danger">
						<input type="checkbox" id="remember_me" name="remember_me" value={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
						<label htmlFor="remember_me">Remember me</label>
					</div>
				</div>

				<div className="form-group">
					<button type="submit" id="sign-in" data-testid="sign-in" className="btn btn-primary col-sm-12">Sign in</button>
				</div>

				<div className="form-group">
					<p className="text"><Link to="reset_password">Have you forgotten your password?</Link></p>
				</div>

				<div className="auth__redirect">
					<p>You don't have an account? <Link to="/register">Sign up</Link></p>
				</div>
			</form>
		</div>
	)
}

export default Login;