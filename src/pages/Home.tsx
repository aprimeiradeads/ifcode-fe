import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";


import { useEffect, useState } from "react";
import { getAllMedicines } from "../api/medicines";
import type { Medicine } from "../types/api";


function getDayLabel(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const diff = (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Amanhã";
  if (diff === 2) return "Depois de amanhã";
  return d.toLocaleDateString();
}


const groupByNextDate = (medicines: Medicine[]) => {
  const grouped: Record<string, Medicine[]> = {};
  medicines.forEach((med) => {
    // Supondo que o backend retorna um campo 'times' e não 'nextDate', pegamos o próximo horário futuro
    let nextDate = med.durationEndDate || new Date().toISOString();
    if (med.times && med.times.length > 0) {
      // Apenas para exibir, não é exato, pois depende da lógica de repetição
      nextDate = new Date().toISOString();
    }
    const label = getDayLabel(nextDate);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(med);
  });
  return grouped;
};


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllMedicines()
      .then((data) => {
        setMedicines(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar medicamentos.");
        setLoading(false);
      });
  }, []);

  const grouped = groupByNextDate(medicines);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        bgcolor: "#f4f8fc",
        py: 6,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
        }}
        role="main"
        aria-label="Página inicial de medicamentos"
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: "2.5rem",
            marginBottom: 4,
            textAlign: "center",
            color: "#1976d2",
            letterSpacing: 1,
            fontWeight: 900,
            textShadow: "1px 1px 0 #fff",
          }}
        >Meus Medicamentos
        </Typography>
        {loading && <Typography>Carregando...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && Object.keys(grouped).length === 0 && (
          <Typography>Nenhum medicamento cadastrado.</Typography>
        )}
        {!loading && !error && Object.keys(grouped).map((day) => (
          <Box key={day} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ mt: 2, mb: 2, color: "#1976d2", fontWeight: 700 }}
            >
              {day}
            </Typography>
            <Stack spacing={2}>
              {grouped[day].map((med) => (
                <Card
                  key={med.id}
                  sx={{
                    cursor: "pointer",
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: 6, background: "#f0f7ff" },
                    borderRadius: 3,
                    border: "2px solid #1976d2",
                  }}
                  onClick={() => navigate(`/medicines/${med.id}`)}
                  elevation={2}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#1976d2",
                        width: 48,
                        height: 48,
                        fontWeight: 700,
                        fontSize: 24,
                      }}
                    >
                      💊
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#003366" }}
                      >
                        {med.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {med.times && med.times.length > 0 ? `Horários: ${med.times.join(", ")}` : null}
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
          onClick={() => navigate("/medicines")}
          fullWidth
          sx={{ mt: 2, fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Cadastrar novo medicamento
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
