"use client";

export default function BottomCard() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        background: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        boxShadow: "0 -5px 20px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ fontWeight: "bold" }}>Choose Ride</h2>

      <div style={{ marginTop: 10 }}>
        <div style={{ padding: 10, borderBottom: "1px solid #eee" }}>
          🚴 Bike • ₹45
        </div>
        <div style={{ padding: 10, borderBottom: "1px solid #eee" }}>
          🚗 Car • ₹120
        </div>
        <div style={{ padding: 10 }}>
          🚕 Auto • ₹70
        </div>
      </div>

      <button
        style={{
          marginTop: 15,
          width: "100%",
          padding: 15,
          background: "black",
          color: "white",
          borderRadius: 12,
          fontSize: 16,
        }}
      >
        🚀 Confirm Ride
      </button>
    </div>
  );
}
