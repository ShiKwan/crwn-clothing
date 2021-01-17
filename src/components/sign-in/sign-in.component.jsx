import React from 'react';

import './sign-in.styles.scss';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

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
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart({email, password});
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({[name] : value});
    }

    render () {
        const { googleSignInStart } = this.props;
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
                        <CustomButton type='button' isGoogleSignIn onClick={googleSignInStart}> Sign In With Google</CustomButton>
                    </div>
                </form>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart(email, password)),
})
export default connect(null, mapDispatchToProps)(SignIn);