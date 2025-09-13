import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Card, CardContent, Divider } from '@mui/material';

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
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Medicamento não encontrado</Typography>
        <Button variant="contained" onClick={() => navigate('/home')}>
          Voltar para Home
        </Button>
      </Box>
    );
  }

  return (
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
    </Box>
  );
};

export default MedicineDetail;
