import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Divider, Card, CardContent, Avatar, Stack } from '@mui/material';

// Mock de medicamentos cadastrados
const mockMedicines = [
  {
    id: '1',
    name: 'Paracetamol',
    nextDate: new Date(), // hoje
    time: '08:00',
  },
  {
    id: '2',
    name: 'Ibuprofeno',
    nextDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // amanhã
    time: '12:00',
  },
  {
    id: '3',
    name: 'Amoxicilina',
    nextDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // depois de amanhã
    time: '18:00',
  },
];

function getDayLabel(date: Date) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const d = new Date(date);
  d.setHours(0,0,0,0);
  const diff = (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Amanhã';
  if (diff === 2) return 'Depois de amanhã';
  return d.toLocaleDateString();
}

const grouped = mockMedicines.reduce((acc, med) => {
  const label = getDayLabel(med.nextDate);
  if (!acc[label]) acc[label] = [];
  acc[label].push(med);
  return acc;
}, {} as Record<string, typeof mockMedicines>);

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Meus Medicamentos
      </Typography>
      {Object.keys(grouped).map(day => (
        <Box key={day} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2, color: '#1976d2', fontWeight: 700 }}>{day}</Typography>
          <Stack spacing={2}>
            {grouped[day].map(med => (
              <Card
                key={med.id}
                sx={{
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 6, background: '#f0f7ff' },
                  borderRadius: 3,
                  border: '1.5px solid #1976d2',
                }}
                onClick={() => navigate(`/medicines/${med.id}`)}
                elevation={2}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48, fontWeight: 700, fontSize: 24 }}>
                    💊
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#003366' }}>{med.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Horário: {med.time}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Divider sx={{ mt: 3 }} />
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/medicines')}
        sx={{ mt: 2 }}
      >
        Cadastrar novo medicamento
      </Button>
    </Box>
  );
};

export default Home;
