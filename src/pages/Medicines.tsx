import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import type { Medicine } from "../types/api";

const Medicines: React.FC = () => {
	const navigate = useNavigate();
	const [medicines, setMedicines] = useState<Medicine[]>([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [dosage, setDosage] = useState("");
	const [repetition, setRepetition] = useState<
		"nao" | "diario" | "semanal" | "mensal"
	>("nao");
	const [repetitionInterval, setRepetitionInterval] = useState("1"); // para "a cada X dias"
	const [durationType, setDurationType] = useState<
		"sempre" | "quantidade" | "data"
	>("sempre");
	const [durationAmount, setDurationAmount] = useState("");
	const [durationEndDate, setDurationEndDate] = useState("");
	const [times, setTimes] = useState<string[]>([""]);
	const [editId, setEditId] = useState<string | null>(null);

	const handleAddOrUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name) return;
		const med: Medicine = {
			id: editId ? editId : Date.now().toString(),
			name,
			description,
			dosage,
			repetition,
			repetitionInterval:
				repetition === "diario"
					? Number(repetitionInterval)
					: undefined,
			durationType,
			times: times.filter((t) => t),
		};
		if (durationType === "quantidade") {
			med.durationAmount = Number(durationAmount);
		} else if (durationType === "data") {
			med.durationEndDate = durationEndDate;
		}
		if (editId !== null) {
			setMedicines(medicines.map((m) => (m.id === editId ? med : m)));
			setEditId(null);
		} else {
			setMedicines([...medicines, med]);
		}
		setName("");
		setDescription("");
		setDosage("");
		setRepetition("nao");
		setRepetitionInterval("1");
		setDurationType("sempre");
		setDurationAmount("");
		setDurationEndDate("");
		setTimes([""]);
	};

	const handleEdit = (id: string) => {
		const med = medicines.find((m) => m.id === id);
		if (med) {
			setName(med.name);
			setDescription(med.description);
			setDosage(med.dosage || "");
			setRepetition(med.repetition);
			setRepetitionInterval(
				med.repetitionInterval ? med.repetitionInterval.toString() : "1"
			);
			setDurationType(med.durationType);
			setDurationAmount(
				med.durationAmount ? med.durationAmount.toString() : ""
			);
			setDurationEndDate(med.durationEndDate || "");
			setTimes(med.times && med.times.length > 0 ? med.times : [""]);
			setEditId(id);
		}
	};

	const handleDelete = (id: string) => {
		setMedicines(medicines.filter((m) => m.id !== id));
		if (editId === id) setEditId(null);
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
					<TextField
						label="Nome do medicamento"
						variant="outlined"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						fullWidth
						style={{ marginBottom: 8 }}
					/>
					<TextField
						label="Descrição"
						variant="outlined"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						fullWidth
						style={{ marginBottom: 8 }}
					/>
					<TextField
						label="Dosagem"
						variant="outlined"
						placeholder="Ex: 1 comprimido, 10ml, 20 gotas"
						value={dosage}
						onChange={(e) => setDosage(e.target.value)}
						fullWidth
						style={{ marginBottom: 8 }}
					/>
					<Select
						value={repetition}
						onChange={(e) =>
							setRepetition(
								e.target.value as
									| "nao"
									| "diario"
									| "semanal"
									| "mensal"
							)
						}
						fullWidth
						displayEmpty
						style={{ marginBottom: 8 }}
					>
						<MenuItem value="nao">Não repetir</MenuItem>
						<MenuItem value="diario">Diariamente</MenuItem>
						<MenuItem value="semanal">Semanalmente</MenuItem>
						<MenuItem value="mensal">Mensalmente</MenuItem>
					</Select>
					{repetition === "diario" && (
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
								value={repetitionInterval}
								onChange={(e) =>
									setRepetitionInterval(e.target.value)
								}
								inputProps={{ min: 1 }}
								style={{ width: 100 }}
							/>
							<span style={{ fontSize: "1.2rem" }}>dias</span>
						</div>
					)}
					<Select
						value={durationType}
						onChange={(e) =>
							setDurationType(
								e.target.value as
									| "sempre"
									| "quantidade"
									| "data"
							)
						}
						fullWidth
						style={{ marginBottom: 8 }}
					>
						<MenuItem value="sempre">Sempre</MenuItem>
						<MenuItem value="quantidade">Número de vezes</MenuItem>
						<MenuItem value="data">Até data</MenuItem>
					</Select>
					{durationType === "quantidade" && (
						<TextField
							type="number"
							label="Quantidade de vezes"
							variant="outlined"
							value={durationAmount}
							onChange={(e) => setDurationAmount(e.target.value)}
							inputProps={{ min: 1 }}
							fullWidth
							style={{ marginBottom: 8 }}
						/>
					)}
					{durationType === "data" && (
						<TextField
							type="date"
							label="Data final"
							variant="outlined"
							value={durationEndDate}
							onChange={(e) => setDurationEndDate(e.target.value)}
							InputLabelProps={{ shrink: true }}
							fullWidth
							style={{ marginBottom: 8 }}
						/>
					)}
					<label
						style={{
							fontWeight: "bold",
							marginBottom: 2,
							fontSize: "1.3rem",
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
				<ul
					style={{
						marginTop: 36,
						padding: 0,
						listStyle: "none",
						width: "100%",
					}}
					aria-label="Lista de medicamentos cadastrados"
				>
					{medicines.map((med) => (
						<li
							key={med.id}
							style={{
								marginBottom: 28,
								padding: "22px 18px",
								background: "#fff",
								borderRadius: 16,
								boxShadow: "0 4px 16px #0002",
								display: "flex",
								flexDirection: "column",
								gap: 12,
								fontSize: "1.25rem",
								wordBreak: "break-word",
								border: "2px solid #1976d2",
							}}
							tabIndex={0}
							aria-label={`Medicamento: ${med.name}`}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									gap: 12,
								}}
							>
								<span
									role="img"
									aria-label="Remédio"
									style={{ fontSize: "2rem" }}
								>
									💊
								</span>
								<b
									style={{
										fontSize: "1.5rem",
										color: "#003366",
										fontWeight: 900,
									}}
								>
									{med.name}
								</b>
							</div>
							<div
								style={{
									fontSize: "1.1rem",
									color: "#222",
									marginTop: 2,
									lineHeight: 2,
								}}
							>
								{med.description && (
									<>
										<b>Descrição:</b> {med.description}{" "}
										<br />
									</>
								)}
								{/* Dosagem */}
								{med.dosage && (
									<>
										<b>Dosagem:</b> {med.dosage} <br />
									</>
								)}
								{/* Repetição */}
								<b>Repetição:</b>{" "}
								{med.repetition === "nao"
									? "Não repetir"
									: med.repetition === "diario"
									? `Diariamente${
											med.repetitionInterval
												? ` (a cada ${med.repetitionInterval} dias)`
												: ""
									  }`
									: med.repetition === "semanal"
									? "Semanalmente"
									: "Mensalmente"}{" "}
								<br />
								{/* Duração */}
								{med.durationType === "sempre" && (
									<>
										<b>Duração:</b> Sempre <br />
									</>
								)}
								{med.durationType === "quantidade" &&
									med.durationAmount && (
										<>
											<b>Duração:</b> {med.durationAmount}{" "}
											vezes <br />
										</>
									)}
								{med.durationType === "data" &&
									med.durationEndDate && (
										<>
											<b>Duração até:</b>{" "}
											{new Date(
												med.durationEndDate
											).toLocaleDateString()}{" "}
											<br />
										</>
									)}
								{med.times && med.times.length > 0 && (
									<>
										<b>Horário(s):</b>{" "}
										{med.times.join(", ")} <br />
									</>
								)}
								{/* id_user removido */}
							</div>
							<div
								style={{
									display: "flex",
									gap: 18,
									marginTop: 10,
								}}
							>
								<button
									onClick={() => handleEdit(med.id)}
									style={{
										fontSize: "1.2rem",
										padding: "12px 22px",
										borderRadius: 10,
										background: "#ffb300",
										color: "#222",
										border: "none",
										cursor: "pointer",
										fontWeight: "bold",
										letterSpacing: 1,
										transition: "background 0.2s",
										display: "flex",
										alignItems: "center",
										gap: 8,
									}}
									aria-label={`Editar ${med.name}`}
								>
									<span role="img" aria-label="Editar"></span>{" "}
									Editar
								</button>
								<button
									onClick={() => handleDelete(med.id)}
									style={{
										fontSize: "1.2rem",
										padding: "12px 22px",
										borderRadius: 10,
										background: "#e53935",
										color: "#fff",
										border: "none",
										cursor: "pointer",
										fontWeight: "bold",
										letterSpacing: 1,
										transition: "background 0.2s",
										display: "flex",
										alignItems: "center",
										gap: 8,
									}}
									aria-label={`Excluir ${med.name}`}
								>
									<span
										role="img"
										aria-label="Excluir"
									></span>{" "}
									Excluir
								</button>
							</div>
						</li>
					))}
				</ul>
			</Paper>
		</Box>
	);
};

export default Medicines;
