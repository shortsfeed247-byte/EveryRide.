"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{padding:20, fontFamily:"sans-serif"}}>
      
      <h1 style={{fontSize:28, fontWeight:"bold"}}>EVERY RIDE</h1>
      <p style={{color:"#666"}}>Book your ride instantly</p>

      <div style={{
        marginTop:20,
        padding:20,
        borderRadius:12,
        background:"#f5f5f5"
      }}>
        <p>📍 Pickup Location</p>
        <input placeholder="Enter pickup" style={{width:"100%", padding:10, marginTop:5}}/>

        <p style={{marginTop:10}}>📍 Drop Location</p>
        <input placeholder="Enter destination" style={{width:"100%", padding:10, marginTop:5}}/>
      </div>

      <button 
        onClick={() => router.push("/user/dashboard")}
        style={{
          marginTop:20,
          width:"100%",
          padding:15,
          background:"black",
          color:"white",
          borderRadius:10,
          fontSize:16
        }}
      >
        🚀 Book Ride
      </button>

    </div>
  );
}
