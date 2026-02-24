import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet's default icon can be broken in React. This is the standard fix.
// Note: This simplified fix might not work with all bundlers.
// The spec had a 'require'-based fix which is for CommonJS. We are in a Vite/ESM project.
// A more robust solution involves importing the images and setting the URL.
// For this mock, a simple fix or even a broken icon is acceptable.
try {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
} catch (e) {
    console.error("Could not apply Leaflet icon fix", e);
}


function formatCaptureTrigger(trigger) {
  const triggers = {
    'app_opened': 'App opened',
    'game_completed': 'Game completed',
    'manual_request': 'Manual request',
    'permission_granted': 'Permission granted'
  };
  return triggers[trigger] || trigger;
}


export function LocationStatusCard({ userName, locationData, permissionStatus }) {
  const [showMap, setShowMap] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const handleRequestAccess = () => {
    setRequesting(true);
    // In a real app, this would call a service.
    setTimeout(() => {
        alert(`Location access request sent to ${userName}`);
        setRequesting(false);
    }, 1000);
  };

  if (!permissionStatus.enabled) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span>📍</span>
          Location Tracking
        </h3>
        <div className="bg-gray-50 rounded p-4 mb-4">
          <p className="text-gray-600 text-sm mb-3">
            Location tracking is not currently enabled for {userName}.
          </p>
          <p className="text-gray-500 text-xs">
            You can request access to monitor their location for safety purposes.
          </p>
        </div>
        <button
          onClick={handleRequestAccess}
          disabled={requesting}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          {requesting ? 'Sending Request...' : 'Request Location Access'}
        </button>
      </div>
    );
  }

  if (!locationData) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span>📍</span>
          Location Status
        </h3>
        <div className="bg-yellow-50 rounded p-4">
          <p className="text-yellow-800 text-sm">
            Location sharing is enabled, but no location has been captured yet.
          </p>
          <p className="text-yellow-600 text-xs mt-2">
            Location will be updated when {userName} uses CogniCare.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>📍</span>
        Location Status
      </h3>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">Last Known Location</p>
            <p className="font-medium text-gray-900">{locationData.address || 'Address unavailable'}</p>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
            Active
          </span>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="text-sm font-medium">{locationData.capturedAgo}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Accuracy</p>
            <p className="text-sm font-medium">±{Math.round(locationData.accuracy)}m</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
          Captured when: {formatCaptureTrigger(locationData.captureTrigger)}
        </div>
      </div>
      <button
        onClick={() => setShowMap(!showMap)}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded mb-3"
      >
        {showMap ? 'Hide Map' : 'View on Map'}
      </button>
      {showMap && (
        <div className="h-64 rounded overflow-hidden border border-gray-300">
          <MapContainer
            center={[locationData.latitude, locationData.longitude]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[locationData.latitude, locationData.longitude]}>
              <Popup>
                <div>
                  <strong>{userName}</strong><br/>
                  {locationData.address}<br/>
                  <span className="text-xs text-gray-600">
                    {locationData.capturedAgo}
                  </span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-3 italic">
        Location is only captured when {userName} uses CogniCare, not continuously.
      </p>
    </div>
  );
}
