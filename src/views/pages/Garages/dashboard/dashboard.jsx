import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onGetData, onPostData, getCookies } from "../../../apicalling";
import "./dashboard.css"; // Import the provided CSS file
import image from "../../../assets/images/garage.jpg";
const { useNotifications } = require("../../../../context/NotificationContext");

export default function NotFound() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [locationCategory, setLocationCategory] = useState("prime");
  const [chargePerHour, setChargePerHour] = useState(0);
  const [slots, setSlots] = useState(0);
  const { createNotification } = useNotifications();
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    const fetchGarages = async () => {
      const data = await onGetData("garages/all");
      console.log(data);
      setGarages(data.data.garages);
    };
    fetchGarages();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleLatChange = (e) => {
    setLat(e.target.value);
  };

  const handleLongChange = (e) => {
    setLong(e.target.value);
  };

  const handleLocationCategoryChange = (e) => {
    setLocationCategory(e.target.value);
  };

  const handleChargePerHourChange = (e) => {
    setChargePerHour(e.target.value);
  };

  const handleSlotsChange = (e) => {
    setSlots(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cookies = getCookies();
      const slotArray = [];

      for (let i = 0; i < slots; i++) {
        const slot = {
          name: name + "-A" + (i + 1),
          type: "car",
          chargePerHour: chargePerHour,
        };
        slotArray.push(slot);
      }

      const garage = {
        name: name,
        address: address,
        locationX: lat,
        locationY: long,
        locationCategory: locationCategory,
        slots: slotArray,
        images: ["https://res.cloudinary.com/dcew0uqhb/image/upload/v1691917298/2208_HD_GarageTrends_asgaq9_pue3up.png"],
      }

      const data = await onPostData("garages/new", garage);

      if (data.error) {
        createNotification("error", data.error);
      } else {
        createNotification("success", "Garage created successfully");
        window.location.reload();
      }
    } catch (err) {
      createNotification("error", err.response.data.message);
    }
  };

  return (
    <section>
      <div className="top-part">
        <h1>All Garages</h1>
      </div>
      <div className="main-container">
        <div className="right-div">
          <div className="wrapper">
            <h2>Create New Garage</h2>
            <form onSubmit={handleSubmit}>
              <h4>Enter Garage Details</h4>
              <div className="input_group">
                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Name of Garage"
                    required
                    className="name"
                    onChange={handleNameChange}
                  />
                  <i className="fas fa-car icon" aria-hidden="true"></i>
                </div>
              </div>
              {/* Other input fields... */}
              {/* these include latitude, longitude and address */}
              <div className="input_group">
                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    className="name"
                    onChange={handleAddressChange}
                  />
                  <i className="fas fa-map-marker-alt icon" aria-hidden="true"></i>
                </div>
              </div>

              <div className="input_group">
                <div className="input_box">
                  <input
                    type="number"
                    placeholder="Latitude"
                    required
                    className="name"
                    onChange={handleLatChange}
                  />
                  <i className="fas fa-globe icon" aria-hidden="true"></i>
                </div>
                <div className="input_box">
                  <input
                    type="number"
                    placeholder="Longitude"
                    required
                    className="name"
                    onChange={handleLongChange}
                  />
                  <i className="fas fa-globe icon" aria-hidden="true"></i>
                </div>
              </div>
              <select
                name="locationCategory"
                id="locationCategory"
                value={locationCategory}
                onChange={handleLocationCategoryChange}
              >
                <option value="prime">Prime</option>
                <option value="normal">Normal</option>
                <option value="outskirt">Outskirt</option>
              </select>
              <div className="input_group">
                <div className="input_box">
                  <input
                    type="number"
                    placeholder="Slots"
                    required
                    className="name"
                    onChange={handleSlotsChange}
                  />
                  <i className="fas fa-car icon" aria-hidden="true"></i>
                </div>
                <div className="input_box">
                  <input
                    type="number"
                    placeholder="Charge Per Hour"
                    required
                    className="name"
                    onChange={handleChargePerHourChange}
                  />
                  <i className="fas fa-money-bill icon" aria-hidden="true"></i>
                </div>
              </div>
              <div className="input_group">
                <div className="input_box">
                  <button type="submit">Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="left-div">
          <div className="garage-card-container">
            {garages &&
              garages.map((garage, i) => (
                <div className="garage-card" key={i}>
                  {console.log(garage.images[0])}
                  <img src={garage.images[0]} alt="Garage" style={{ width: "100%" }} />
                  <h2>{garage.name}</h2>
                  <div className="content-container">
                    <div className="content-row">
                      <p className="title">
                        <i className="fas fa-map-marker-alt"></i> Location :
                      </p>
                      <p className="data">{garage.address}</p>
                    </div>
                    <div className="content-row">
                      <p className="title">
                        <i className="fas fa-globe"></i> Latitude :
                      </p>
                      <p className="data">{garage.locationX}</p>
                    </div>
                    <div className="content-row">
                      <p className="title">
                        <i className="fas fa-globe"></i> Longitude :
                      </p>
                      <p className="data">{garage.locationY}</p>
                    </div>
                    <div className="content-row">
                      <p className="title">
                        <i className="fas fa-car"></i> Free Slots :
                      </p>
                      <p className="data">
                        {garage.slots.filter((slot) => slot.status === "available").length}
                      </p>
                    </div>
                  </div>
                  <p>
                    <Link to={"/garage/" + garage._id}>
                      <button>Manage</button>
                    </Link>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
