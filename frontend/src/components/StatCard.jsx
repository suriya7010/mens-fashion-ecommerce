

import React from "react";
import "./StatCard.css";

function StatCard({ title, value, icon, accent }) {
  return (
    <div className={`stat-card accent-${accent}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <p className="stat-value">{value}</p>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );
}

export default StatCard;
