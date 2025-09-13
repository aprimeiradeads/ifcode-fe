import axios from "axios";
import type { Medicine } from "../types/api";

const API_BASE_URL = "https://ifcode-be.onrender.com";
const IMGBB_API_KEY = "0171520a82a6944b6f3640f3a789582f";

const API_MEDICINES_ENDPOINT = "/remedio/listar";
const API_MEDICINES_CREATE_ENDPOINT = "/remedio/cadastrar";



const addMedicine = async (medicine: Medicine): Promise<unknown> => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}${API_MEDICINES_CREATE_ENDPOINT}`,
			medicine,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			}
		);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error("Erro ao adicionar medicamento:", error);
		throw error;
	}
};

const getAllMedicines = async (): Promise<Medicine[]> => {
	try {
		const response = await axios.get(`${API_BASE_URL}${API_MEDICINES_ENDPOINT}`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		});
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar medicamentos:", error);
		throw error;
	}
};

const getMedicineById = async (id: string): Promise<Medicine | null> => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(
			`${API_BASE_URL}${API_MEDICINES_ENDPOINT}/${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					...(token ? { "Authorization": `Bearer ${token}` } : {})
				}
			}
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar medicamento por ID:", error);
		return null;
	}
};

const uploadImageToImgBB = async (imageFile: File): Promise<string> => {
	try {
		const formData = new FormData();
		formData.append("image", imageFile);
		formData.append("key", IMGBB_API_KEY);

		const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (response.data && response.data.data && response.data.data.url) {
			return response.data.data.url;
		} else {
			throw new Error("Resposta inválida da API do ImgBB");
		}
	} catch (error) {
		console.error("Erro ao fazer upload da imagem:", error);
		throw error;
	}
};

export { addMedicine, getAllMedicines, getMedicineById, uploadImageToImgBB };
