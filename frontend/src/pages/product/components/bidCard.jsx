import React, { useEffect, useState } from 'react'
import { getDate } from '../../../utils/date'

const BidCard = ({ userImage, userName, bidAmount, createdAt }) => {
    const [time,setTime] = useState({})
    useEffect(() => {
        const { day, month } = getDate(createdAt)
        setTime({day,month})
    },[])
  return (
    <div className="flex items-center gap-5 mb-3 border-b-[1px] border-black pb-2 justify-between">
    <div className="flex items-center gap-3">
      <img className="w-10 rounded-[50%]" src={userImage} alt="" />
      <p className="text-[1.2rem]" >{userName}</p>
    </div>
    <div className='flex gap-6' >
      <p className="text-[1.2rem]"> Bid Amount : ₹{bidAmount}</p>
      <p className="text-[1.2rem]"> Bid Created At :  {time.day} {time.month} </p>
    </div>
  </div>
  )
}

export default BidCard