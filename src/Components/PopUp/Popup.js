import React, { useEffect, useState } from "react";
import "./Popup.css"; // Import CSS file for styling

function Popup() {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`popup-container ${showPopup ? "show" : "hide"}`}>
      <div className="popup-content">
        <img src="https://explore-balkans.com/wp-content/uploads/2022/03/see-rural-balknas-980x653.jpeg" />
        <div className="popup-text">
          <p>Добредојдовте во светот на вкусовите!</p>
        </div>
      </div>
    </div>
  );
}

export default Popup;
