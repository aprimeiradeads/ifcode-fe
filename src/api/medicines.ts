import axios from "axios";
import type { Medicine, ApiResponse } from "../types/api";

const API_BASE_URL = "https://ifcode-be.onrender.com";
const API_MEDICINES_ENDPOINT = "/remedio/cadastrar";


const addMedicine = async (medicine: Medicine): Promise<ApiResponse<Medicine>> => {
	try {
		const response = await axios.post<ApiResponse<Medicine>>(
			`${API_BASE_URL}${API_MEDICINES_ENDPOINT}`,
			medicine,
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		console.log(medicine);
		return response.data;
	} catch (error) {
		console.error("Erro ao adicionar medicamento:", error);
		throw error;
	}
};

export { addMedicine };
