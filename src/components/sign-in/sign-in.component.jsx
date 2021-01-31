import React, { useState } from 'react';

import './sign-in.styles.scss';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [ userCredentials, setCredentials ] = useState({
        email: '',
        password : ''
    })

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(email, password);
        emailSignInStart({email, password});
    }

    const handleChange = event => {
        const { value, name } = event.target;
        console.log(event.target);
        setCredentials({...userCredentials, [name] : value});
    }


    return(
        <div className='sign-in'>
            <h2>
                Already have an account?
            </h2>
            <span> sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name='email' value={email} required type='email' label='email' handleChange={handleChange}/>
                <FormInput name='password' value={password} required type='password' label='password' handleChange={handleChange} />
                <div className='buttons'>
                    <CustomButton type='submit' value='Submit Form'> Sign In </CustomButton>
                    <CustomButton type='button' isGoogleSignIn onClick={googleSignInStart}> Sign In With Google</CustomButton>
                </div>
            </form>

        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart(email, password)),
})
export default connect(null, mapDispatchToProps)(SignIn);