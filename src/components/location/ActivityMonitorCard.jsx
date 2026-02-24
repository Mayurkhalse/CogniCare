import React from 'react';

function formatTimeAgo(dateString) {
  // This is a simplified version. In a real app, use a library like date-fns.
  return "3 hours ago";
}

function formatDayOfWeek(dateString) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(dateString);
  // Get the day in UTC to avoid timezone issues
  return days[date.getUTCDay()];
}

export function ActivityMonitorCard({ userName, activityData }) {
  if (!activityData) {
    return <div>Loading activity...</div>;
  }

  const { lastAppOpen, playedToday, currentStreak, weeklyPattern, alerts } = activityData;

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>📊</span>
        Activity Status
      </h3>

      {alerts.alertTriggered && (
        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
          <p className="text-red-800 font-medium text-sm">
            ⚠️ No activity in {alerts.noActivityDays} days
          </p>
          <p className="text-red-600 text-xs mt-1">
            {userName} hasn't opened CogniCare.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600 mb-1">Last Active</p>
          <p className="font-semibold text-gray-900">
            {formatTimeAgo(lastAppOpen)}
          </p>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600 mb-1">Played Today</p>
          <p className="font-semibold">
            {playedToday ? (
              <span className="text-green-600">✓ Yes</span>
            ) : (
              <span className="text-orange-600">⚠️ Not yet</span>
            )}
          </p>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600 mb-1">Current Streak</p>
          <p className="font-semibold text-gray-900 flex items-center gap-1">
            {currentStreak} days
            {currentStreak >= 7 && <span>🔥</span>}
          </p>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600 mb-1">Weekly Engagement</p>
          <p className="font-semibold text-gray-900">
            {weeklyPattern.filter(d => d.active).length}/7 days
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Last 7 Days</p>
        <div className="flex gap-1">
          {weeklyPattern.map((day, index) => (
            <div
              key={index}
              className={`flex-1 h-12 rounded flex flex-col items-center justify-center ${
                day.active
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-gray-100 border border-gray-300'
              }`}
              title={`Date: ${day.date}`}
            >
              <span className="text-xs text-gray-600">
                {formatDayOfWeek(day.date)}
              </span>
              <span className="text-xs font-medium">
                {day.active ? '✓' : '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
