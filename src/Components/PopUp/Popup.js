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
        <img src="https://www.rakijagrill.com/wp-content/uploads/2019/11/shutterstock_1502599004-1.jpg" />
        <div className="popup-text">
          <p>Добредојдовте во светот на вкусовите!</p>
        </div>
      </div>
    </div>
  );
}

export default Popup;
