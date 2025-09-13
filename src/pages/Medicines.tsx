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
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 40,
        border: '2px solid #888',
        borderRadius: 16,
        background: '#f9f9f9',
        fontSize: '1.5rem',
        lineHeight: 1.7,
      }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: 32 }}>Medicamentos</h2>
      <form
        onSubmit={handleAddOrUpdate}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <input
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ fontSize: '1.5rem', padding: '16px', borderRadius: 8, border: '1px solid #bbb' }}
          aria-label="Nome do medicamento"
        />
        <input
          placeholder="Dosagem"
          value={dosage}
          onChange={e => setDosage(e.target.value)}
          style={{ fontSize: '1.5rem', padding: '16px', borderRadius: 8, border: '1px solid #bbb' }}
          aria-label="Dosagem do medicamento"
        />
        <input
          placeholder="Horário"
          value={time}
          onChange={e => setTime(e.target.value)}
          type="time"
          style={{ fontSize: '1.5rem', padding: '16px', borderRadius: 8, border: '1px solid #bbb' }}
          aria-label="Horário do medicamento"
        />
        <button
          type="submit"
          style={{
            fontSize: '1.5rem',
            padding: '16px',
            borderRadius: 8,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            marginTop: 8,
          }}
        >
          {editId !== null ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
      <ul style={{ marginTop: 32, padding: 0, listStyle: 'none' }}>
        {medicines.map(med => (
          <li
            key={med.id}
            style={{
              marginBottom: 24,
              padding: 20,
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px #0001',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '1.4rem',
            }}
          >
            <span>
              <b style={{ fontSize: '1.6rem' }}>{med.name}</b> - {med.dosage} - {med.time}
            </span>
            <span>
              <button
                onClick={() => handleEdit(med.id)}
                style={{
                  fontSize: '1.2rem',
                  padding: '10px 18px',
                  borderRadius: 8,
                  background: '#ffb300',
                  color: '#222',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: 8,
                }}
                aria-label={`Editar ${med.name}`}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(med.id)}
                style={{
                  fontSize: '1.2rem',
                  padding: '10px 18px',
                  borderRadius: 8,
                  background: '#e53935',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: 8,
                }}
                aria-label={`Excluir ${med.name}`}
              >
                Excluir
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Medicines;
