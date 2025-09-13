import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import { addMedicine } from "../api/medicines";
import type { Medicine } from "../types/api";

const Medicines: React.FC = () => {
    const navigate = useNavigate();
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dosagem, setDosagem] = useState("");
    const [repeticao, setRepeticao] = useState<string>("nao");
    const [repeticaoDias, setRepeticaoDias] = useState("1");
    const [repeticaoSemana, setRepeticaoSemana] = useState("");
    const [duracao, setDuracao] = useState<string>("sempre");
    const [duracaoTempo, setDuracaoTempo] = useState("");
    const [duracaoDataFinal, setDuracaoDataFinal] = useState("");
    const [times, setTimes] = useState<string[]>([""]);
    const [editId, setEditId] = useState<string | null>(null);

    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleAddOrUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome) return;
        const med: Medicine = {
            nome: nome || "",
            descricao: descricao || "",
            fotoUrl: undefined,
            dosagem: dosagem || "",
            repeticao: repeticao || "",
            repeticaoDias: repeticao === "diario" ? Number(repeticaoDias) : undefined,
            repeticaoSemana: repeticao === "semanal" ? repeticaoSemana : "",
            duracao: duracao || "",
            duracaoTempo: duracao === "quantidade" ? Number(duracaoTempo) : undefined,
            duracaoDataFinal: duracao === "data" ? duracaoDataFinal : "",
        };
        if (editId !== null) {
            setMedicines(medicines.map((m) => (m.id === editId ? med : m)));
            setEditId(null);
        } else {
            addMedicine(med)
                .then(() => {
                    setAlert({ type: "success", message: "Medicamento salvo com sucesso!" });
                    navigate("/home");
                })
                .catch((err) => {
                    console.log(med);
                    setAlert({ type: "error", message: "Erro ao salvar medicamento." });
                    console.error(err);
                });
        }
        setNome("");
        setDescricao("");
        setDosagem("");
        setRepeticao("nao");
        setRepeticaoDias("1");
        setRepeticaoSemana("");
        setDuracao("sempre");
        setDuracaoTempo("");
        setDuracaoDataFinal("");
    };

    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                bgcolor: "#f4f8fc",
                py: 6,
            }}
        >
            {alert && (
                <Alert
                    severity={alert.type}
                    onClose={() => setAlert(null)}
                    sx={{ position: "fixed", top: 24, left: 0, right: 0, maxWidth: 400, mx: "auto", zIndex: 9999 }}
                >
                    {alert.message}
                </Alert>
            )}
            <Paper
                elevation={6}
                sx={{
                    maxWidth: 600,
                    mx: "auto",
                    p: { xs: 2, sm: 4 },
                    borderRadius: 4,
                }}
                role="main"
                aria-label="Cadastro e lista de medicamentos"
            >
                <h2
                    style={{
                        fontSize: "2.5rem",
                        marginBottom: 32,
                        textAlign: "center",
                        color: "#1976d2",
                        letterSpacing: 1,
                        fontWeight: 900,
                        textShadow: "1px 1px 0 #fff",
                    }}
                >
                    <span
                        role="img"
                        aria-label="Remédio"
                        style={{ marginRight: 12 }}
                    ></span>
                    Medicamentos
                </h2>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/home")}
                    style={{ marginBottom: 24, fontWeight: "bold" }}
                >
                    Voltar para Home
                </Button>
                <Box
                    component="form"
                    onSubmit={handleAddOrUpdate}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        bgcolor: "#fff",
                        borderRadius: 3,
                        p: { xs: 2, sm: 3 },
                        boxShadow: 2,
                        border: "2px solid #1976d2",
                    }}
                    autoComplete="off"
                    aria-label="Formulário de cadastro de medicamento"
                >
                    <label style={{ fontWeight: "bold", marginBottom: 2, fontSize: "1.15rem" }}>
                        Nome do medicamento
                    </label>
                    <TextField
                        label="Nome do medicamento"
                        variant="outlined"
                        placeholder="Ex: Dipirona"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        fullWidth
                        style={{ marginBottom: 8 }}
                    />
                    <label style={{ fontWeight: "bold", marginBottom: 2, fontSize: "1.15rem" }}>
                        Descrição
                    </label>
                    <TextField
                        label="Descrição"
                        variant="outlined"
                        placeholder="Ex: Para dor de cabeça"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        fullWidth
                        style={{ marginBottom: 8 }}
                    />
                    <label style={{ fontWeight: "bold", marginBottom: 2, fontSize: "1.15rem" }}>
                        Dosagem
                    </label>
                    <TextField
                        label="Dosagem"
                        variant="outlined"
                        placeholder="Ex: 1 comprimido, 10ml, 20 gotas"
                        value={dosagem}
                        onChange={(e) => setDosagem(e.target.value)}
                        fullWidth
                        style={{ marginBottom: 8 }}
                    />
                    <label style={{ fontWeight: "bold", marginBottom: 2, fontSize: "1.15rem" }}>
                        Repetição
                    </label>
                    <Select
                        value={repeticao}
                        onChange={(e) => setRepeticao(e.target.value)}
                        fullWidth
                        displayEmpty
                        style={{ marginBottom: 8 }}
                    >
                        <MenuItem value="nao">Não repetir</MenuItem>
                        <MenuItem value="diario">Diariamente</MenuItem>
                        <MenuItem value="semanal">Semanalmente</MenuItem>
                        <MenuItem value="mensal">Mensalmente</MenuItem>
                    </Select>
                    {repeticao === "diario" && (
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                marginBottom: 8,
                                alignItems: "center",
                            }}
                        >
                            <span style={{ fontSize: "1.2rem" }}>A cada</span>
                            <TextField
                                type="number"
                                label="Intervalo (dias)"
                                variant="outlined"
                                placeholder="Ex: 2"
                                value={repeticaoDias}
                                onChange={(e) => setRepeticaoDias(e.target.value)}
                                inputProps={{ min: 1 }}
                                style={{ width: 100 }}
                            />
                            <span style={{ fontSize: "1.2rem" }}>dias</span>
                        </div>
                    )}

                    <label style={{ fontWeight: "bold", marginBottom: 2, fontSize: "1.15rem" }}>
                        Duração
                    </label>
                    <Select
                        value={duracao}
                        onChange={(e) => setDuracao(e.target.value)}
                        fullWidth
                        style={{ marginBottom: 8 }}
                    >
                        <MenuItem value="sempre">Sempre</MenuItem>
                        <MenuItem value="quantidade">Número de vezes</MenuItem>
                        <MenuItem value="data">Até data</MenuItem>
                    </Select>
                    {duracao === "quantidade" && (
                        <TextField
                            type="number"
                            label="Quantidade de vezes"
                            variant="outlined"
                            placeholder="Ex: 10"
                            value={duracaoTempo}
                            onChange={(e) => setDuracaoTempo(e.target.value)}
                            inputProps={{ min: 1 }}
                            fullWidth
                            style={{ marginBottom: 8 }}
                        />
                    )}
                    {duracao === "data" && (
                        <TextField
                            type="date"
                            label="Data final"
                            variant="outlined"
                            placeholder="Ex: 2025-12-31"
                            value={duracaoDataFinal}
                            onChange={(e) => setDuracaoDataFinal(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            style={{ marginBottom: 8 }}
                        />
                    )}
                    <label
                        style={{
                            fontWeight: "bold",
                            marginBottom: 2,
                            fontSize: "1.15rem",
                        }}
                    >
                        Horário(s) para tomar
                    </label>
                    {times.map((time, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                marginBottom: 6,
                            }}
                        >
                            <TextField
                                type="time"
                                label={`Horário ${idx + 1}`}
                                variant="outlined"
                                placeholder="Ex: 08:00"
                                value={time}
                                onChange={(e) => {
                                    const newTimes = [...times];
                                    newTimes[idx] = e.target.value;
                                    setTimes(newTimes);
                                }}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                            {times.length > 1 && (
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setTimes(
                                            times.filter((_, i) => i !== idx)
                                        )
                                    }
                                    color="error"
                                    variant="outlined"
                                    style={{ minWidth: 40 }}
                                    aria-label="Remover horário"
                                >
                                    ➖
                                </Button>
                            )}
                            {idx === times.length - 1 && (
                                <Button
                                    type="button"
                                    onClick={() => setTimes([...times, ""])}
                                    color="primary"
                                    variant="outlined"
                                    style={{ minWidth: 40 }}
                                    aria-label="Adicionar novo horário"
                                >
                                    +
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        type="submit"
                        variant="contained"
                        color={editId !== null ? "warning" : "primary"}
                        fullWidth
                        style={{
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            marginTop: 12,
                        }}
                        aria-label={
                            editId !== null
                                ? "Atualizar medicamento"
                                : "Adicionar medicamento"
                        }
                    >
                        {editId !== null ? "Atualizar" : "Adicionar"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Medicines;
