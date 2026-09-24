import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const [user, setuser] = useState([])
    const [email, setemail] = useState('')
    const [step, setstep] = useState(1)
    const [OTP, setOTP] = useState('')

    const navigate = useNavigate();

    const fetchData = async () => {
        const res = await axios('/public/Users.json')
        console.log(res.data);
        setuser(res.data)
    }

    // useEffect(()=>{
    //     let tockenData = localStorage.getItem("token")

    //     let existingUser = user.find((u)=> u?.token == tockenData)

    //     if(existingUser){
    //         navigate('/dashboard');
    //     }
    //     else{
    //         navigate('/login');
    //     }
    // },[user, navigate])

    useEffect(() => {
        fetchData()
    }, [])

    const sendOtp = async () => {
        let existingUser = user.find((u) => u?.email == email);
        console.log(existingUser);

        if (email == existingUser?.email) {
            setstep(2);
        } else {
            toast.warn("user not found")
        }
    }

    const verifyOtp = () => {
        let existingUser = user.find((u) => u?.email == email)

        if (existingUser.otp == OTP) {
            localStorage.setItem('token', existingUser.token);
            toast.success('Login Sucessfully');

            navigate('/dashboard')

        } else {
            toast.error('invalid OPT');
        }
    }
    return (
        <>
            <input type="email" placeholder='Enter Email' onChange={(e) => setemail(e.target.value)} /> <br /> <br />
            {
                step == 2 ?
                    <div>
                        <input type="text" placeholder='Enter OTP' onChange={(e) => setOTP(e.target.value)} />
                    </div> : ""
            }
            {
                step == 2 ? <button onClick={verifyOtp}>Verify OTP</button> : <button onClick={sendOtp}>Send OTP</button>
            }



        </>
    )
}

export default Login