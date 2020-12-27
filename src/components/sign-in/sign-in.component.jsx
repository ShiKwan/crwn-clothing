import React from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email : '',
            password : ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({
                email: '',
                password: ''
            })
        } catch (err) {
            console.log(err);
        }

    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({[name] : value});
    }

    render () {
        return(
            <div className='sign-in'>
                <h2>
                    Already have an account?
                </h2>
                <span> sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' value={this.state.email} required type='email' label='email' handleChange={this.handleChange}/>
                    <FormInput name='password' value={this.state.password} required type='password' label='password' handleChange={this.handleChange} />
                    <div className='buttons'>
                        <CustomButton type='submit' value='Submit Form'> Sign In </CustomButton>
                        <CustomButton isGoogleSignIn onClick={signInWithGoogle}> Sign In With Google</CustomButton>
                    </div>
                </form>

            </div>
        )
    }
}

export default SignIn;