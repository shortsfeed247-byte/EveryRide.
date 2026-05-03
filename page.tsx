"use client";

import MapComponent from "@/MapComponent";

export default function Dashboard() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      
      {/* MAP */}
      <div style={{ height: "70%" }}>
        <MapComponent />
      </div>

      {/* BOTTOM CARD */}
      <div style={{
        height: "30%",
        background: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        boxShadow: "0 -5px 20px rgba(0,0,0,0.1)"
      }}>
        <h2>EVERY RIDE</h2>
        <p>Nearby Drivers Available</p>

        <button style={{
          width: "100%",
          padding: 15,
          background: "black",
          color: "white",
          borderRadius: 10,
          marginTop: 10
        }}>
          🚀 Book Instant Ride
        </button>
      </div>

    </div>
  );
}
