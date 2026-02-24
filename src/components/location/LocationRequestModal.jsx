import React, { useState } from 'react';

export function LocationRequestModal({ isOpen, onClose, familyMemberName = "Robert", relationship = "Son", riskLevel = "HIGH", riskScore = 78 }) {
    const [loading, setLoading] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handleResponse = (approved) => {
        setLoading(true);
        setTimeout(() => {
            if (approved) {
                alert("Mock: Location sharing enabled. Browser would now prompt for permissions.");
            } else {
                alert("Mock: Location sharing request declined.");
            }
            setLoading(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">
                    📍 Location Sharing Request
                </h2>

                <div className="mb-6">
                    <p className="text-gray-700 mb-3">
                        <strong>{familyMemberName} ({relationship})</strong> has requested access to your location due to health concerns.
                    </p>

                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-3">
                        <p className="text-sm text-yellow-800">
                            Your current risk level: <strong>{riskLevel} ({riskScore}/100)</strong>
                        </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <p className="text-sm text-gray-700">
                            <strong>How this works:</strong>
                        </p>
                        <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                            <li>Location is only captured when you use CogniCare.</li>
                            <li>It is <strong>not</strong> tracked continuously in the background.</li>
                            <li>You can disable this anytime in your Settings.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => handleResponse(true)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Enabling...' : 'Allow Location Sharing'}
                    </button>

                    <button
                        onClick={() => handleResponse(false)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
                        disabled={loading}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}
