
export interface Usuario {
	id: string;
	nome: string;
	login: string;
	senha: string | null;
	celular: string;
}

export interface Medicine {
	id?: string;
	nome: string;
	descricao: string;
	fotoBase64?: string;
	usuario?: Usuario;
	dosagem: string;
	repeticao: string;
	repeticaoDias?: number;
	repeticaoSemana?: string;
	duracao: string;
	duracaoTempo?: number;
	duracaoDataFinal?: string;
}

