import React from "react";

const DashBoard = () => {
  return (
    <div className="dashboard">
      <div className="dash-container">
        <div className="dash-content">
          <div>WELCOME RAJASTHAN POLICE</div>
          <div>WELCOME RAJASTHAN POLICE</div>
        </div>
      </div>
      <div className="container">
      <div className="box1">
        <div className="fraud_numbers"></div>
        <div className="category_numbers"></div>
        <div className="states_numbers"></div>
        <div className="amount_numbers"></div>
      </div>
      <div className="box2">Line Chart</div>
      <div className="box3">Map</div>
    </div>
    </div>
  );
};

export default DashBoard;