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
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Lembretes de Medicamentos</h2>
      <p>Agora: {now}</p>
      <ul style={{ marginTop: 20 }}>
        {alerts.map(alert => (
          <li key={alert.id} style={{ marginBottom: 10, color: alert.triggered ? 'gray' : 'black' }}>
            <b>{alert.medicine}</b> - {alert.time} {alert.triggered && '(Lembrete enviado)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
