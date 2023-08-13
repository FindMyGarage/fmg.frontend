import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/undraw_File_manager_re_ms29-removebg-preview.png"
import "./garage.css";
import { onGetData, getCookies } from "../../../apicalling";
const { useNotifications } = require("../../../../context/NotificationContext");

export default function NotFound() {

 const [data, setData] = React.useState({});
 const [username, setUsername] = React.useState("");
 const { createNotification } = useNotifications();

 const underConstruction = () => {
  createNotification("info", "This feature is under construction");
 };
 useEffect(() => {

  const data = getCookies();
  console.log(data);
  setUsername(data.name);

  const fetchData = async () => {
   // get data from url path last part
   const name = window.location.pathname.split("/").pop();

   // get data from api
   const garages = await onGetData("garages/all");


   // find garage with id

   const garage = garages.data.garages.find(garage => garage._id === name);

   console.log(garage);
   // set data
   setData(garage);

  }

  fetchData();

 }, []);


 return (
  <section>
   <div className="div-container">

    <div className="left-div">
     <div className="div-top">
      <h3>Manage Garage: {data.name}</h3>
      <Link to="/garage/dashboard"><a className="edit-btn">Back</a></Link>
     </div>
     <div className="div-row">
      <div className="div-cell">
       <p className="cell-head">
        Name
       </p>
       <p className="cell-content">{data.name}</p>
      </div>
      <div className="div-cell">
       <p className="cell-head">
        Location
       </p>
       <p className="cell-content">{data.locationCategory}</p>
      </div>
     </div>
     <div className="div-row">
      <div className="div-cell">
       <p className="cell-head">
        Latitude
       </p>
       <p className="cell-content">{data.locationX}</p>
      </div>
      <div className="div-cell">
       <p className="cell-head">
        Longitude
       </p>
       <p className="cell-content">{data.locationY}</p>
      </div>

     </div>
     <div className="div-row">

      {data.slots && <div className="div-cell">
       <p className="cell-head">
        Total Number of Slots
       </p>
       <p className="cell-content">{data.slots.length}</p>
      </div>}

      {/* return slots which have status available */}

      {data.slots && <div className="div-cell">
       <p className="cell-head">
        Available Slots
       </p>
       <p className="cell-content">{
        data.slots.filter((slot) => slot.status === "available").length
       }</p>
      </div>}

     </div>
     <div className="btn-container">
      <button className="button" onClick={underConstruction}>Edit</button>
     </div>
    </div>

    <div className="right-div">
     <div className="container">
      <div className="bard">
       <div className="profile-pic">
        <img src={image} alt="profile" />
       </div>
      </div>
     </div>
    </div>
   </div>

  </section >
 );
}