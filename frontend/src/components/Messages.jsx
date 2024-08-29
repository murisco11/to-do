import React from 'react'
import '../index.css'

const Messages = ({ errors = [], success = [] }) => {
  return (
    <div>
      {errors.length > 0 && (
        <div className="error">
          {errors.map((error, index) => (
            <React.Fragment key={index}>
              {error}<br />
            </React.Fragment>
          ))}
        </div>
      )}

      {success.length > 0 && (
        <div className="success">
          {success.map((msg, index) => (
            <React.Fragment key={index}>
              {msg}<br />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default Messages
