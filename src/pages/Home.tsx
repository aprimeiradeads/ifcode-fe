import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";


import { useEffect, useState } from "react";
import { getAllMedicines } from "../api/medicines";
import type { Medicine } from "../types/api";




const Home: React.FC = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllMedicines()
      .then((data) => {
        if (data.length === 0) {
          setMedicines([]);
          setLoading(false);
          return;
        }
        setMedicines(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar medicamentos.");
        setLoading(false);
      });
  }, []);



  if (!loading && !error && medicines.length === 0) {
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
          <Typography>Nenhum medicamento cadastrado.</Typography>
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
  }

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
        {!loading && !error && medicines.length === 0 && (
          <Typography>Nenhum medicamento cadastrado.</Typography>
        )}
        {!loading && !error && (
          <Stack spacing={2}>
            {medicines.map((med) => (
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
                  {med.fotoUrl ? (
                    <Avatar src={med.fotoUrl} sx={{ width: 48, height: 48 }} />
                  ) : (
                    <Avatar sx={{ bgcolor: "#1976d2", width: 48, height: 48, fontWeight: 700, fontSize: 24 }}>
                      💊
                    </Avatar>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#003366" }}>
                      {med.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {med.descricao}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dosagem: {med.dosagem}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Repetição: {med.repeticao}
                      {med.repeticaoDias ? `, a cada ${med.repeticaoDias} dias` : ""}
                      {med.repeticaoSemana ? `, dias: ${med.repeticaoSemana}` : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Duração: {med.duracao}
                      {med.duracaoTempo ? `, tempo: ${med.duracaoTempo}` : ""}
                      {med.duracaoDataFinal ? `, até: ${med.duracaoDataFinal}` : ""}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
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
