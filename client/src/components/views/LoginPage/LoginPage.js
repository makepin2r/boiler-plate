import React, {useState} from 'react'
import Axios from 'axios';
import {useDispatch} from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value); 
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value); 
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 새로고침 방지

        // axios를 이용해 state에 있는 값을 서버로 보내 로그인 대조
        let body = {
            email: Email,
            password: Password
        }

        //redux dispatch -> action 상태
        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess){
                props.history.push('/') // 페이지 이동하는 방식
            } else {
                alert('error');
            }
        })
    }

    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{display:'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            > 
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage

