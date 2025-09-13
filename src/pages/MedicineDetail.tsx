import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Card, CardContent, Divider, Paper, Avatar } from '@mui/material';


import { useEffect } from 'react';
import { getMedicineById } from '../api/medicines';
import type { Medicine } from '../types/api';


const MedicineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getMedicineById(id)
        .then((data) => {
          setMedicine(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  function handleEdit(medicineId: string) {
    window.location.href = `/medicines/${medicineId}/edit`;
  }

  async function handleDelete(medicineId: string) {
    if (window.confirm('Tem certeza que deseja excluir este medicamento?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://ifcode-be.onrender.com/remedio/${medicineId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
        });
        if (!response.ok) throw new Error('Erro ao excluir medicamento');
        setAlert({ type: 'success', message: 'Medicamento excluído com sucesso!' });
        setTimeout(() => navigate('/home'), 1500);
      } catch (err) {
        console.log(err);
        setAlert({ type: 'error', message: 'Erro ao excluir medicamento.' });
      }
    }
  }


  if (loading) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f4f8fc', py: 6 }}>
        <Paper elevation={6} sx={{ maxWidth: 600, mx: 'auto', p: { xs: 2, sm: 4 }, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 900, mb: 3 }}>
            Carregando...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!medicine) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f4f8fc', py: 6 }}>
        <Paper elevation={6} sx={{ maxWidth: 600, mx: 'auto', p: { xs: 2, sm: 4 }, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#e53935', fontWeight: 900, mb: 3 }}>
            Medicamento não encontrado
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/home')} sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            Voltar para Home
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f4f8fc', py: 6 }}>
      {alert && (
        <Box sx={{ position: 'fixed', top: 24, left: 0, right: 0, maxWidth: 400, mx: 'auto', zIndex: 9999 }}>
          <Alert severity={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        </Box>
      )}
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
              {medicine.fotoUrl ? (
                <Avatar src={medicine.fotoUrl} sx={{ width: 48, height: 48 }} />
              ) : (
                <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48, fontWeight: 700, fontSize: 24 }}>💊</Avatar>
              )}
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#003366' }}>
                {medicine.nome}
              </Typography>
              <Button
                variant="outlined"
                color="warning"
                sx={{ ml: 2 }}
                onClick={() => medicine.id && handleEdit(medicine.id)}
                disabled={!medicine.id}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ ml: 1 }}
                onClick={() => medicine.id && handleDelete(medicine.id)}
                disabled={!medicine.id}
              >
                Excluir
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {medicine.descricao && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Descrição:</strong> {medicine.descricao}
              </Typography>
            )}
            {medicine.dosagem && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Dosagem:</strong> {medicine.dosagem}
              </Typography>
            )}
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Repetição:</strong> {
                medicine.repeticao === 'diario' ? `Diariamente${medicine.repeticaoDias ? ` (a cada ${medicine.repeticaoDias} dias)` : ''}` :
                medicine.repeticao === 'semanal' ? `Semanalmente${medicine.repeticaoSemana ? ` (${medicine.repeticaoSemana})` : ''}` :
                'Mensalmente'
              }
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Duração:</strong> {
                medicine.duracao === 'sempre' ? 'Sempre' :
                medicine.duracao === 'quantidade' ? `${medicine.duracaoTempo} vezes` :
                medicine.duracao === 'data' && medicine.duracaoDataFinal ? `Até ${new Date(medicine.duracaoDataFinal).toLocaleDateString()}` : ''
              }
            </Typography>
          </CardContent>
        </Card>
        <Button variant="contained" color="primary" onClick={() => navigate('/home')} sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          Voltar para Home
        </Button>
      </Paper>
    </Box>
  );
};

export default MedicineDetail;
