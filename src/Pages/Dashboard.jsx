import React, { useEffect } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    let token = localStorage.getItem("token");

    if(!token){
      navigate('/login')
    }
  })
  return (
    <>
    <DashboardLayout>


    </DashboardLayout>
    </>
  )
}

export default Dashboard