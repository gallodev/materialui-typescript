import { Api } from '../../../../api/axios-config';
import { Environment } from '../../../environment';

export interface IDetalheCidade {
    id: number;
    nome: string;
}

export interface IListagemCidade {
    id: number;
    nome: string;
}

type TCidadeCount = {
    data: IListagemCidade[];
    totalCount: number;
}


const getAll = async (page = 1, filter = ''): Promise<TCidadeCount | Error> => {
  try {
    const url = `/cidades?_page=${page}&nome_like=${filter}&_limit=${Environment.line_limit}`;
    const { data, headers } = await Api.get(url);

    if(data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.line_limit),
      };
    }
    return new Error('Erro ao listar os registros');
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao listar os registros');
  }
};

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const url = `/cidades/${id}`;
    const { data } = await Api.get(url);

    if(data) {
      return data;
    }

    return new Error(`Erro ao consultar o registro: ${id}`);
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao consultar o registro');
  }
};

const create = async (createData: Omit<IDetalheCidade,'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>('/cidades',createData);

    if(data) {
      return data.id;
    }

    return new Error('Erro ao salvar o registro');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao salvar o registro');
  }
};

const updateById = async (id: number, updateData: IDetalheCidade): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${id}`,updateData);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao apagar o registro');
  }
};


export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};