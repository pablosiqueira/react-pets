import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'
import Head from 'next/head';

const LoginRegisterArea = props => {
    const [isLogin,setIsLogin] = useState(true)
    const changeLoginState = (value) => {
        setIsLogin(value)
    }

    return(
        <>
            <Head>
                <title>Login/Register</title>
            </Head>
            {isLogin && <LoginForm onChangeLoginState={changeLoginState}/>}
            {!isLogin && <RegisterForm onChangeLoginState={changeLoginState}/>}
        </>
    )
}

export default LoginRegisterArea