import { Api } from '../../../../api/axios-config';
import { Environment } from '../../../environment';

export interface IDetalhePessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

export interface IListagemPessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

type TPessoaCount = {
    data: IListagemPessoa[];
    totalCount: number;
}


const getAll = async (page = 1, filter = ''): Promise<TPessoaCount | Error> => {
  try {
    const url = `/pessoas?_page=${page}&nomeCompleto_like=${filter}&_limit=${Environment.line_limit}`;
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

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const url = `/pessoas/${id}`;
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

const create = async (createData: Omit<IDetalhePessoa,'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>('/pessoas',createData);

    if(data) {
      return data.id;
    }

    return new Error('Erro ao salvar o registro');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao salvar o registro');
  }
};

const updateById = async (id: number, updateData: IDetalhePessoa): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`,updateData);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao apagar o registro');
  }
};


export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};