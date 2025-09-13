import React, { useState, useEffect } from 'react';

interface Alert {
  id: number;
  medicine: string;
  time: string;
  triggered: boolean;
}

const initialAlerts: Alert[] = [
  // Example data, in a real app this would come from medicines or backend
  { id: 1, medicine: 'Remédio A', time: '08:00', triggered: false },
  { id: 2, medicine: 'Remédio B', time: '14:00', triggered: false },
];

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [now, setNow] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setAlerts(alerts => alerts.map(a => {
      if (!a.triggered && a.time === now) {
        // In a real app, you might use notifications or sound here
        window.alert('Hora de tomar: ' + a.medicine);
        return { ...a, triggered: true };
      }
      return a;
    }));
  }, [now]);

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
      <h2 style={{ fontSize: '2.5rem', marginBottom: 32 }}>Lembretes de Medicamentos</h2>
      <p style={{ fontSize: '1.4rem', marginBottom: 24 }}>Agora: <b>{now}</b></p>
      <ul style={{ marginTop: 32, padding: 0, listStyle: 'none' }}>
        {alerts.map(alert => (
          <li
            key={alert.id}
            style={{
              marginBottom: 24,
              padding: 20,
              background: alert.triggered ? '#eee' : '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px #0001',
              color: alert.triggered ? 'gray' : 'black',
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>
              <b style={{ fontSize: '1.6rem' }}>{alert.medicine}</b> - {alert.time}
              {alert.triggered && <span style={{ marginLeft: 12, fontSize: '1.2rem' }}>(Lembrete enviado)</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
