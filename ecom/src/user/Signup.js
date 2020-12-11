import React, {useState} from 'react';
import Layout from '../core/Layout';
import {signup} from '../auth'
import { Link } from "react-router-dom"; 

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });

    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values,error:false, [name]: event.target.value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({name, email, password}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, name: "", email: "", password: "", error: "", success: true });
            }
        });
    }

    const SignUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange("name")} value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" onChange={handleChange("email")} value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" onChange={handleChange("password")} value={password}/>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return(
        <div>
            <Layout title="Signup" description="My React Ecommerce App" className="container col-md-6 offset-md-3">
                {showSuccess()}
                {showError()}
                {SignUpForm()}

            </Layout>
        </div>
    )
}

export default Signup;