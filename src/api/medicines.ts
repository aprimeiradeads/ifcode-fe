import axios from "axios";
import type { Medicine, ApiResponse } from "../types/api";

const API_BASE_URL = "https://ifcode-be.onrender.com";

const API_MEDICINES_ENDPOINT = "/remedio";
const API_MEDICINES_CREATE_ENDPOINT = "/remedio/cadastrar";



const addMedicine = async (medicine: Medicine): Promise<ApiResponse<Medicine>> => {
	try {
		const response = await axios.post<ApiResponse<Medicine>>(
			`${API_BASE_URL}${API_MEDICINES_CREATE_ENDPOINT}`,
			medicine,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			}
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao adicionar medicamento:", error);
		throw error;
	}
};

const getAllMedicines = async (): Promise<Medicine[]> => {
	try {
		const response = await axios.get<ApiResponse<Medicine[]>>(`${API_BASE_URL}${API_MEDICINES_ENDPOINT}`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		});
		return response.data.data;
	} catch (error) {
		console.error("Erro ao buscar medicamentos:", error);
		throw error;
	}
};

const getMedicineById = async (id: string): Promise<Medicine | null> => {
	try {
		const response = await axios.get<ApiResponse<Medicine>>(`${API_BASE_URL}${API_MEDICINES_ENDPOINT}/${id}`);
		return response.data.data;
	} catch (error) {
		console.error("Erro ao buscar medicamento por ID:", error);
		return null;
	}
};

export { addMedicine, getAllMedicines, getMedicineById };
