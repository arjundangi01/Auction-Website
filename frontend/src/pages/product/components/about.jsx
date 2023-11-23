import React, { useEffect, useState } from "react";

const About = ({
  _id,
  productName,
  createdAt,
  startBid,
  latestBid,
  startDate,
  endDate,
  description,
  productImage,
  soldBy,
  userName,
  profileImage,
}) => {
  const date = new Date(createdAt);
  const [time, setTime] = useState({});

  // Get the day and month names
  useEffect(() => {
    const date = new Date(createdAt);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    setTime({ day, month });
  }, [createdAt]);

  return (
    <main>
      <div>
        <h1 className="text-[2rem] font-bold ">Products Description</h1>
        <p>{description}</p>
      </div>
      <div className="mt-2">
        <h1 className="text-[2rem] font-bold ">Product Owner</h1>
        <div className="flex gap-20 items-center ">
          <div className="flex gap-5 items-center">
            <img className="w-10 rounded-[50%]" src={profileImage} alt="" />
            <p>{userName}</p>
          </div>
          <div>
            <p>
             Auction Created At {time.day} {time.month}{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
