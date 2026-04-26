"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🟢 Green icon
const pickupIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
    });

    // 🔴 Red icon
    const dropIcon = new L.Icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        iconSize: [32, 32],
        });

        function ClickHandler({ setPickup, setDrop, pickup }) {
          useMapEvents({
              click(e) {
                    if (!pickup) {
                            setPickup(e.latlng);
                                  } else {
                                          setDrop(e.latlng);
                                                }
                                                    },
                                                      });
                                                        return null;
                                                        }

                                                        export default function MapComponent() {
                                                          const [pickup, setPickup] = useState(null);
                                                            const [drop, setDrop] = useState(null);

                                                              return (
                                                                  <MapContainer
                                                                        center={[28.6139, 77.2090]}
                                                                              zoom={13}
                                                                                    style={{ height: "100vh", width: "100%" }}
                                                                                        >
                                                                                              <TileLayer
                                                                                                      attribution="&copy; OpenStreetMap contributors"
                                                                                                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                                                                    />

                                                                                                                          <ClickHandler
                                                                                                                                  setPickup={setPickup}
                                                                                                                                          setDrop={setDrop}
                                                                                                                                                  pickup={pickup}
                                                                                                                                                        />

                                                                                                                                                              {pickup && <Marker position={pickup} icon={pickupIcon} />}
                                                                                                                                                                    {drop && <Marker position={drop} icon={dropIcon} />}
                                                                                                                                                                        </MapContainer>
                                                                                                                                                                          );
                                                                                                                                                                          }