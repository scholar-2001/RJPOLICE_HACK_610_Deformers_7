import React, { useState } from "react";
import axios from "axios";
import img_now from "../assets/user_customer.png";

const ConsumerData = () => {
  const [customerID, setCustomerId] = useState("");
  const [consumerData, setConsumerData] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/customer_data", {
        customer_id: customerID,
      });

      setConsumerData(response.data.consumer_data);
      setShowImage(true); // Show image when consumerData is available
    } catch (error) {
      console.error("Error fetching consumer data:", error.message);
    }
  };

  return (
    <div className="customer_data">
      <div className="customer">
        <div className="title">Customer Data</div>
        <div className="values">
          <label htmlFor="customerID">Enter Customer ID:</label>
          <input
            type="text"
            id="customerID"
            value={customerID}
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      {showImage && (
        <div className="customer_image" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <img src={img_now} alt="" />
        </div>
      )}
      {consumerData && (
        <div className="tabular">
          <table>
            <thead>
              <tr>
                {Object.keys(consumerData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consumerData.map((data, index) => (
                <tr key={index}>
                  {Object.values(data).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConsumerData;