import React from 'react';
import PropTypes from 'prop-types';  // Import PropTypes

const DisasterList = ({ disasters, onSave }) => (
  <div>
    <h3 className="text-lg font-bold mb-2">Disasters</h3>
    {disasters.length === 0 ? (
      <p>No disasters found</p>
    ) : (
      <ul>
        {disasters.map((disaster, index) => (
          <li key={index} className="mb-2 p-4 border border-gray-200 rounded">
            <p><strong>Type:</strong> {disaster.text}</p>
            <p><strong>Category:</strong> {disaster.category}</p>
            <button
              onClick={() => onSave(disaster)}
              className="bg-green-500 text-white p-2 rounded mt-2"
            >
              Save
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// Define prop types for the component
DisasterList.propTypes = {
  disasters: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default DisasterList;
