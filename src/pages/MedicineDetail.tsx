import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Button, Typography, Box, Card, CardContent, Divider } from '@mui/material';
=======
import { Button, Typography, Box, Card, CardContent, Divider, Paper, Avatar } from '@mui/material';
>>>>>>> c78ab244cb67b5174ca3d2e2a33095120202e97a

// Mock data for medicines (similar to Home.tsx, but expanded for details)
const mockMedicines = [
  {
    id: '1',
    name: 'Paracetamol',
    description: 'Analgésico e antitérmico',
    dosage: '500mg',
    repetition: 'diario',
    repetitionInterval: 1,
    durationType: 'sempre',
    times: ['08:00', '20:00'],
  },
  {
    id: '2',
    name: 'Ibuprofeno',
    description: 'Anti-inflamatório',
    dosage: '200mg',
    repetition: 'diario',
    repetitionInterval: 2,
    durationType: 'quantidade',
    durationAmount: 10,
    times: ['12:00'],
  },
  {
    id: '3',
    name: 'Amoxicilina',
    description: 'Antibiótico',
    dosage: '500mg',
    repetition: 'diario',
    repetitionInterval: 1,
    durationType: 'data',
    durationEndDate: '2025-09-20',
    times: ['08:00', '18:00'],
  },
];

const MedicineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const medicine = mockMedicines.find(med => med.id === id);

  if (!medicine) {
    return (
<<<<<<< HEAD
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Medicamento não encontrado</Typography>
        <Button variant="contained" onClick={() => navigate('/home')}>
          Voltar para Home
        </Button>
=======
      <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f4f8fc', py: 6 }}>
        <Paper elevation={6} sx={{ maxWidth: 600, mx: 'auto', p: { xs: 2, sm: 4 }, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#e53935', fontWeight: 900, mb: 3 }}>
            Medicamento não encontrado
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/home')} sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            Voltar para Home
          </Button>
        </Paper>
>>>>>>> c78ab244cb67b5174ca3d2e2a33095120202e97a
      </Box>
    );
  }

  return (
<<<<<<< HEAD
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Detalhes do Medicamento
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            {medicine.name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {medicine.description && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Descrição:</strong> {medicine.description}
            </Typography>
          )}
          {medicine.dosage && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Dosagem:</strong> {medicine.dosage}
            </Typography>
          )}
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Repetição:</strong> {
              medicine.repetition === 'nao' ? 'Não repetir' :
              medicine.repetition === 'diario' ? `Diariamente${medicine.repetitionInterval ? ` (a cada ${medicine.repetitionInterval} dias)` : ''}` :
              medicine.repetition === 'semanal' ? 'Semanalmente' : 'Mensalmente'
            }
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Duração:</strong> {
              medicine.durationType === 'sempre' ? 'Sempre' :
              medicine.durationType === 'quantidade' ? `${medicine.durationAmount} vezes` :
              `Até ${new Date(medicine.durationEndDate!).toLocaleDateString()}`
            }
          </Typography>
          {medicine.times && medicine.times.length > 0 && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Horário(s):</strong> {medicine.times.join(', ')}
            </Typography>
          )}
        </CardContent>
      </Card>
      <Button variant="outlined" onClick={() => navigate('/home')}>
        Voltar para Home
      </Button>
=======
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f4f8fc', py: 6 }}>
      <Paper elevation={6} sx={{ maxWidth: 600, mx: 'auto', p: { xs: 2, sm: 4 }, borderRadius: 4 }} role="main" aria-label="Detalhes do medicamento">
        <Typography
          variant="h3"
          sx={{ fontSize: '2.2rem', mb: 4, textAlign: 'center', color: '#1976d2', letterSpacing: 1, fontWeight: 900, textShadow: '1px 1px 0 #fff' }}
        >
          <span role="img" aria-label="Remédio" style={{ marginRight: 12 }}></span>
          Detalhes do Medicamento
        </Typography>
        <Card sx={{ mb: 3, boxShadow: 2, borderRadius: 3, border: '2px solid #1976d2', bgcolor: '#fff' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48, fontWeight: 700, fontSize: 24 }}>💊</Avatar>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#003366' }}>
                {medicine.name}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {medicine.description && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Descrição:</strong> {medicine.description}
              </Typography>
            )}
            {medicine.dosage && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Dosagem:</strong> {medicine.dosage}
              </Typography>
            )}
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Repetição:</strong> {
                medicine.repetition === 'nao' ? 'Não repetir' :
                medicine.repetition === 'diario' ? `Diariamente${medicine.repetitionInterval ? ` (a cada ${medicine.repetitionInterval} dias)` : ''}` :
                medicine.repetition === 'semanal' ? 'Semanalmente' : 'Mensalmente'
              }
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Duração:</strong> {
                medicine.durationType === 'sempre' ? 'Sempre' :
                medicine.durationType === 'quantidade' ? `${medicine.durationAmount} vezes` :
                `Até ${new Date(medicine.durationEndDate!).toLocaleDateString()}`
              }
            </Typography>
            {medicine.times && medicine.times.length > 0 && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Horário(s):</strong> {medicine.times.join(', ')}
              </Typography>
            )}
          </CardContent>
        </Card>
        <Button variant="contained" color="primary" onClick={() => navigate('/home')} sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          Voltar para Home
        </Button>
      </Paper>
>>>>>>> c78ab244cb67b5174ca3d2e2a33095120202e97a
    </Box>
  );
};

export default MedicineDetail;
