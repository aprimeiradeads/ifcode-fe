import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    birthDate: '1950-05-15',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Daughter',
      phone: '+1 (555) 987-6543',
    },
    primaryDoctor: {
      name: 'Dr. Smith',
      specialty: 'Family Medicine',
      phone: '+1 (555) 111-2222',
    },
    preferences: {
      notifications: true,
      reminderSound: true,
      textSize: 'large',
      theme: 'light',
    },
  });

  const handleChange = (section, field, value) => {
    if (section) {
      setProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Here you would save to your backend
    console.log('Saving profile:', profile);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        👤 My Profile
      </h1>

      {/* Personal Information */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Personal Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange(null, 'name', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange(null, 'email', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange(null, 'phone', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Birth Date
            </label>
            <input
              type="date"
              value={profile.birthDate}
              onChange={(e) => handleChange(null, 'birthDate', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          🚨 Emergency Contact
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={profile.emergencyContact.name}
              onChange={(e) => handleChange('emergencyContact', 'name', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Relationship
            </label>
            <input
              type="text"
              value={profile.emergencyContact.relationship}
              onChange={(e) => handleChange('emergencyContact', 'relationship', e.target.value)}
              className="form-input"
              placeholder="e.g., Daughter, Son, Spouse"
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={profile.emergencyContact.phone}
              onChange={(e) => handleChange('emergencyContact', 'phone', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Primary Doctor */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          👨‍⚕️ Primary Doctor
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Doctor Name
            </label>
            <input
              type="text"
              value={profile.primaryDoctor.name}
              onChange={(e) => handleChange('primaryDoctor', 'name', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Specialty
            </label>
            <input
              type="text"
              value={profile.primaryDoctor.specialty}
              onChange={(e) => handleChange('primaryDoctor', 'specialty', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={profile.primaryDoctor.phone}
              onChange={(e) => handleChange('primaryDoctor', 'phone', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          ⚙️ Preferences
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              <p className="text-gray-600">Receive reminder notifications</p>
            </div>
            <button
              onClick={() => handleChange('preferences', 'notifications', !profile.preferences.notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                profile.preferences.notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profile.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Reminder Sound</h3>
              <p className="text-gray-600">Play sound with reminders</p>
            </div>
            <button
              onClick={() => handleChange('preferences', 'reminderSound', !profile.preferences.reminderSound)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                profile.preferences.reminderSound ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profile.preferences.reminderSound ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Text Size</h3>
            <select
              value={profile.preferences.textSize}
              onChange={(e) => handleChange('preferences', 'textSize', e.target.value)}
              className="form-input max-w-xs"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </div>
          
          <div className="py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Theme</h3>
            <select
              value={profile.preferences.theme}
              onChange={(e) => handleChange('preferences', 'theme', e.target.value)}
              className="form-input max-w-xs"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="btn-primary"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;