import React, { useState } from 'react';

const Reminders = () => {
  const [reminders] = useState([
    {
      id: 1,
      medicine: 'Aspirin',
      dosage: '81mg',
      time: '08:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      active: true,
      nextDue: '2025-01-13 08:00',
    },
    {
      id: 2,
      medicine: 'Metformin',
      dosage: '500mg',
      time: '08:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      active: true,
      nextDue: '2025-01-13 08:00',
    },
    {
      id: 3,
      medicine: 'Metformin',
      dosage: '500mg',
      time: '20:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      active: true,
      nextDue: '2025-01-13 20:00',
    },
    {
      id: 4,
      medicine: 'Vitamin D3',
      dosage: '1000 IU',
      time: '12:00',
      days: ['Mon', 'Wed', 'Fri'],
      active: false,
      nextDue: '2025-01-15 12:00',
    },
  ]);

  const toggleReminder = (id) => {
    console.log(`Toggling reminder ${id}`);
    // Here you would update the reminder status
  };

  const deleteReminder = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      console.log(`Deleting reminder ${id}`);
      // Here you would delete the reminder
    }
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          ⏰ Medicine Reminders
        </h1>
        <button className="btn-primary">
          ➕ Add New Reminder
        </button>
      </div>

      <div className="grid gap-6">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">⏰</span>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {reminder.medicine}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {reminder.dosage} at {formatTime(reminder.time)}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    reminder.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {reminder.active ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                      Days of Week
                    </p>
                    <div className="flex space-x-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <span
                          key={day}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            reminder.days.includes(day)
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  {reminder.active && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Next Due
                      </p>
                      <p className="text-lg text-gray-900">
                        {new Date(reminder.nextDue).toLocaleDateString()} at{' '}
                        {formatTime(reminder.time)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-3 ml-6">
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={reminder.active ? 'btn-secondary' : 'btn-primary'}
                >
                  {reminder.active ? '⏸️ Pause' : '▶️ Activate'}
                </button>
                <button className="btn-secondary">
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="btn-danger"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No reminders set
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Set up your first medicine reminder
          </p>
          <button className="btn-primary">
            ➕ Add Reminder
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card text-center bg-blue-50 border-blue-200">
          <div className="text-3xl mb-2">⏰</div>
          <div className="text-2xl font-bold text-blue-600">
            {reminders.filter(r => r.active).length}
          </div>
          <p className="text-gray-600">Active Reminders</p>
        </div>

        <div className="card text-center bg-green-50 border-green-200">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold text-green-600">
            {reminders.filter(r => 
              r.active && new Date(r.nextDue).toDateString() === new Date().toDateString()
            ).length}
          </div>
          <p className="text-gray-600">Due Today</p>
        </div>

        <div className="card text-center bg-yellow-50 border-yellow-200">
          <div className="text-3xl mb-2">⏸️</div>
          <div className="text-2xl font-bold text-yellow-600">
            {reminders.filter(r => !r.active).length}
          </div>
          <p className="text-gray-600">Paused</p>
        </div>
      </div>
    </div>
  );
};

export default Reminders;