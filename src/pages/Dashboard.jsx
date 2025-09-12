import React from 'react';

const Dashboard = () => {
  const todayReminders = [
    { id: 1, medicine: 'Aspirin', time: '8:00 AM', taken: false },
    { id: 2, medicine: 'Blood Pressure Med', time: '12:00 PM', taken: true },
    { id: 3, medicine: 'Vitamin D', time: '6:00 PM', taken: false },
  ];

  const upcomingRefills = [
    { id: 1, medicine: 'Aspirin', daysLeft: 3 },
    { id: 2, medicine: 'Metformin', daysLeft: 7 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-xl text-gray-600">
          Here's your medicine overview for today
        </p>
      </div>

      {/* Today's Reminders */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          📅 Today's Reminders
        </h2>
        <div className="space-y-4">
          {todayReminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                reminder.taken
                  ? 'bg-green-50 border-green-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">
                  {reminder.taken ? '✅' : '💊'}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {reminder.medicine}
                  </h3>
                  <p className="text-lg text-gray-600">{reminder.time}</p>
                </div>
              </div>
              {!reminder.taken && (
                <button className="btn-primary">
                  Mark as Taken
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Refills */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          🔄 Upcoming Refills
        </h2>
        <div className="space-y-4">
          {upcomingRefills.map((refill) => (
            <div
              key={refill.id}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">💊</span>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {refill.medicine}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {refill.daysLeft} days remaining
                  </p>
                </div>
              </div>
              <button className="btn-secondary">
                Order Refill
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card text-center">
          <div className="text-4xl mb-4">➕</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Add New Medicine
          </h3>
          <p className="text-gray-600 mb-4">
            Add a new medicine to your list
          </p>
          <button className="btn-primary w-full">
            Add Medicine
          </button>
        </div>
        
        <div className="card text-center">
          <div className="text-4xl mb-4">⏰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Set Reminders
          </h3>
          <p className="text-gray-600 mb-4">
            Manage your medicine reminders
          </p>
          <button className="btn-primary w-full">
            View Reminders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;