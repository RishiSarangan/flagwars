import React, { useState } from 'react';
import './App.css'; // Import your CSS file

const App = () => {
  const [teamNumber, setTeamNumber] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (event) => {
    setTeamNumber(event.target.value);
  };

  const handleSubmit = () => {
    // Make a cURL request to the Google Sheets API
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1htzgArSyLu9kyl6Ed1SB4v_w5jiAn8oof7icfOzc1l8/values/B${teamNumber}:D${teamNumber}`;
    const accessToken = 'ya29.a0AfB_byCt7uerR2_Q9SkUvMCj2nl09wsDpC03roOdsLuevQQl_nkxCBw9dTXDCfIaTtS4DyO04msFIqI-31A-h4qkZhAdYEFnUqgk_14YKKWrtkCMXwce44Ss5-YZuh7gM7arUOJv1GTnFCK4qkC_AJPmwa7omdAFVxofaCgYKAcgSAQ8SFQHGX2Mies2zYazvshCEoA6Kd1zRzw0171';
    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Store the response data in state
        setResponseData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  return (
    <div className="app-container">
      <h1 className="heading">Flag <br></br>Wars</h1>
      <p className="sub-heading">Brought to you by Team Technoinformals</p>
      <div className="input-container">
      <label htmlFor="teamNumber">Enter Your Team Number:</label>
      <input
        type="text"
        id="teamNumber"
        value={teamNumber}
        onChange={handleInputChange}
      />
    </div>
    <button className="submit-button" onClick={handleSubmit}>Submit</button>
    <div className='responses'>
      {responseData && (
        <div>
          <p>Values from Google Sheets API Response:</p>
          <div>
            {responseData.values[0].map((value, index) => (
              <span key={index}>{value} </span>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;