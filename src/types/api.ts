interface User {
	token: string;
}

interface Medicine {
	id?: string;
	name: string;
	description: string;
	dosage: string;
	repetition: "nao" | "diario" | "semanal" | "mensal";
	repetitionInterval?: number; // para "a cada X dias"
	durationType: "sempre" | "quantidade" | "data";
	durationAmount?: number;
	durationEndDate?: string;
	times: string[];
}

interface ApiResponse<T> {
	data: T;
	status: number;
}

export type { User, Medicine, ApiResponse };
