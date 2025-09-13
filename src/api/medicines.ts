import axios from "axios";
import type { Medicine } from "../types/api";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";
const API_MEDICINES_ENDPOINT = "/medicines";

const getMedicines = async (): Promise<Medicine[]> => {
	try {
		const response = await axios.get<Medicine[]>(
			`${API_BASE_URL}${API_MEDICINES_ENDPOINT}`
		);
		return response.data;
	} catch (error) {
		// Melhorar o tratamento de erros
		console.error("Erro ao buscar medicamentos:", error);
		throw error;
	}
};

const addMedicine = async (medicine: Medicine): Promise<Medicine> => {
	try {
		const response = await axios.post<Medicine>(
			`${API_BASE_URL}${API_MEDICINES_ENDPOINT}`,
			medicine
		);
		return response.data;
	} catch (error) {
		// Melhorar o tratamento de erros
		console.error("Erro ao adicionar medicamento:", error);
		throw error;
	}
};

export { getMedicines, addMedicine };
