import React, { useState } from 'react';

const MedicineList = () => {
  const [medicines] = useState([
    {
      id: 1,
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      stockLevel: 28,
      prescribedBy: 'Dr. Smith',
      purpose: 'Heart health',
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      stockLevel: 15,
      prescribedBy: 'Dr. Johnson',
      purpose: 'Diabetes management',
    },
    {
      id: 3,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      stockLevel: 45,
      prescribedBy: 'Dr. Smith',
      purpose: 'Blood pressure',
    },
    {
      id: 4,
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      stockLevel: 60,
      prescribedBy: 'Dr. Williams',
      purpose: 'Bone health',
    },
  ]);

  const getStockColor = (stock) => {
    if (stock <= 7) return 'text-red-600 bg-red-50 border-red-200';
    if (stock <= 14) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          💊 My Medicines
        </h1>
        <button className="btn-primary">
          ➕ Add New Medicine
        </button>
      </div>

      <div className="grid gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">💊</span>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {medicine.name}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {medicine.dosage} • {medicine.frequency}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Purpose
                    </p>
                    <p className="text-lg text-gray-900">{medicine.purpose}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Prescribed by
                    </p>
                    <p className="text-lg text-gray-900">{medicine.prescribedBy}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Stock Level
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-lg font-medium border ${getStockColor(medicine.stockLevel)}`}>
                      {medicine.stockLevel} pills
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3 ml-6">
                <button className="btn-secondary">
                  ✏️ Edit
                </button>
                <button className="btn-primary">
                  ⏰ Set Reminder
                </button>
                <button className="btn-danger">
                  🗑️ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {medicines.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💊</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No medicines yet
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Start by adding your first medicine
          </p>
          <button className="btn-primary">
            ➕ Add Medicine
          </button>
        </div>
      )}
    </div>
  );
};

export default MedicineList;