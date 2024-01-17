import React, { useState, useEffect } from 'react';

const FraudTable = () => {
  const [fraudData, setFraudData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5002/get_fraud_data', {
          method: 'POST',
        });
        const data = await response.json();

        console.log('Fetched data:', data);

        if (typeof data.fraud_data === 'string') {
          const dataArray = JSON.parse(data.fraud_data);
          setFraudData(dataArray);
        } else if (Array.isArray(data.fraud_data)) {
          setFraudData(data.fraud_data);
        } else {
          console.error('Invalid data format. Expected an array or object:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Fraud Data Table</h2>
      <div className="fraud-table-container">
      <table className="fraud-table">
        <thead>
          <tr>
            <th>TransactionID</th>
            <th>MerchantID</th>
            <th>CustomerID</th>
            <th>Location</th>
            <th>TransactionAmount</th>
            <th>TimeStamp</th>
            <th>Coordinates</th>
            <th>PostalCode</th>
            <th>Region</th>
            <th>Country</th>
            <th>Timezone</th>
            <th>IPOrganization</th>
          </tr>
        </thead>
        <tbody>
          {fraudData.map((fraud) => (
            <tr key={fraud.TransactionID}>
              <td>{fraud.TransactionID}</td>
              <td>{fraud.MerchantID}</td>
              <td>{fraud.CustomerID}</td>
              <td>{fraud.Location}</td>
              <td>{fraud.TransactionAmount}</td>
              <td>{fraud.TimeStamp}</td>
              <td>{fraud.Coordinates}</td>
              <td>{fraud.PostalCode}</td>
              <td>{fraud.Region}</td>
              <td>{fraud.Country}</td>
              <td>{fraud.Timezone}</td>
              <td>{fraud.IPOrganization}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  
    </div>
  );
};

export default FraudTable;