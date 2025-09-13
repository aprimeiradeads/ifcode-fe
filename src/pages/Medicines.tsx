import React, { useState } from 'react';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  time: string;
}

const Medicines: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage || !time) return;
    if (editId !== null) {
      setMedicines(medicines.map(m => m.id === editId ? { id: editId, name, dosage, time } : m));
      setEditId(null);
    } else {
      setMedicines([...medicines, { id: Date.now(), name, dosage, time }]);
    }
    setName('');
    setDosage('');
    setTime('');
  };

  const handleEdit = (id: number) => {
    const med = medicines.find(m => m.id === id);
    if (med) {
      setName(med.name);
      setDosage(med.dosage);
      setTime(med.time);
      setEditId(id);
    }
  };

  const handleDelete = (id: number) => {
    setMedicines(medicines.filter(m => m.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Medicamentos</h2>
      <form onSubmit={handleAddOrUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Dosagem" value={dosage} onChange={e => setDosage(e.target.value)} />
        <input placeholder="Horário" value={time} onChange={e => setTime(e.target.value)} type="time" />
        <button type="submit">{editId !== null ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <ul style={{ marginTop: 20 }}>
        {medicines.map(med => (
          <li key={med.id} style={{ marginBottom: 10 }}>
            <b>{med.name}</b> - {med.dosage} - {med.time}
            <button onClick={() => handleEdit(med.id)} style={{ marginLeft: 8 }}>Editar</button>
            <button onClick={() => handleDelete(med.id)} style={{ marginLeft: 4 }}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Medicines;
