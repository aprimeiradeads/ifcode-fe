import React, { useState } from 'react';

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    prescribedBy: '',
    purpose: '',
    stockLevel: '',
    reminderTimes: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReminderTimeChange = (index, value) => {
    const newTimes = [...formData.reminderTimes];
    newTimes[index] = value;
    setFormData(prev => ({
      ...prev,
      reminderTimes: newTimes
    }));
  };

  const addReminderTime = () => {
    setFormData(prev => ({
      ...prev,
      reminderTimes: [...prev.reminderTimes, '']
    }));
  };

  const removeReminderTime = (index) => {
    const newTimes = formData.reminderTimes.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      reminderTimes: newTimes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Medicine data:', formData);
    alert('Medicine added successfully!');
    // Reset form
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      prescribedBy: '',
      purpose: '',
      stockLevel: '',
      reminderTimes: [''],
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          ➕ Add New Medicine
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Aspirin"
                  required
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Dosage *
                </label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., 81mg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Frequency *
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Four times daily">Four times daily</option>
                  <option value="Every other day">Every other day</option>
                  <option value="Weekly">Weekly</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Stock Level
                </label>
                <input
                  type="number"
                  name="stockLevel"
                  value={formData.stockLevel}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Number of pills"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Medical Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Prescribed by
                </label>
                <input
                  type="text"
                  name="prescribedBy"
                  value={formData.prescribedBy}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Dr. Smith"
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Purpose/Condition
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Heart health"
                />
              </div>
            </div>
          </div>

          {/* Reminder Times */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Reminder Times
            </h2>
            
            <div className="space-y-4">
              {formData.reminderTimes.map((time, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => handleReminderTimeChange(index, e.target.value)}
                    className="form-input flex-1"
                  />
                  {formData.reminderTimes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeReminderTime(index)}
                      className="btn-danger"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addReminderTime}
                className="btn-secondary"
              >
                ➕ Add Another Time
              </button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              💾 Save Medicine
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => window.history.back()}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;