// Schedules.js
import React, { useState } from 'react';

const _new_feature = () => {
  const portsOrCountries = [
    'Select a port or country',
    'New York, USA',
    'Vancouver, Canada',
    'Seoul, South Korea',
    'Shanghai, China',
    'Durres, Albania',
    // Add more options as needed
  ];
  const [activeTab, setActiveTab] = useState('Point-to-Point');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="schedules-container">
      <h2 className="heading">Schedules</h2>
      <span className="underline"></span>

      <div className="tab-container">
        <div className="tab-buttons">
          <button
            onClick={() => handleTabClick('Point-to-Point')}
            className={activeTab === 'Point-to-Point' ? 'active' : ''}
          >
            POINT-TO-POINT
          </button>
          <button
            onClick={() => handleTabClick('Vessel')}
            className={activeTab === 'Vessel' ? 'active' : ''}
          >
            VESSEL
          </button>
          <button
            onClick={() => handleTabClick('Arrivals/Departures')}
            className={activeTab === 'Arrivals/Departures' ? 'active' : ''}
          >
            ARRIVALS/DEPARTURES
          </button>
        </div>

        <div className="form-container">
          <div className="input-group">
            <i className="fas fa-ship"></i>
            {/* <input type="text" placeholder="From (ports or countries)" /> */}
            <select id="fromPort" className="form-input">
              {portsOrCountries.map((port, index) => (
                <option key={index} value={port}>
                  {port}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <i className="fas fa-calendar"></i>
            <input type="date" />
          </div>

          <div className="input-group exchange-icon">
            <i className="fas fa-exchange-alt"></i>
          </div>

          <div className="input-group">
            <i className="fas fa-map-marker-alt"></i>
            <input type="text" placeholder="To (ports or countries)" />
          </div>

          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default _new_feature;
