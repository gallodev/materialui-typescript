import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Campo não é válido',
    required: 'O campo é obrigatório',
  },
  string: {
    email: () => 'O campo precisa conter uma email válido',
    max: ({ max }: any) => `O campo pode ter no máximo ${max} caracteres`,
    min: ({ min }: any) => `O campo precisa ter pelo menos ${min} caracteres`,
    length: ({ length }: any) => `O campo precisa ter exatamente ${length} caracteres`,
  },
  date: {
    max: ({ max }: any) => `A data deve ser menor que ${max}`,
    min: ({ min }: any) => `A data deve ser maior que ${min}`,
  },
  number: {
    integer: () => 'O campo precisa ter um valor inteiro',
    negative: () => 'O campo precisa ter um valor negativo',
    positive: () => 'O campo precisa ter um valor positivo',
    moreThan: ({ more }: any) => `O campo precisa ter um valor maior que ${more}`,
    lessThan: ({ less }: any) => `O campo precisa ter um valor menor que ${less}`,
    min: ({ min }: any) => `O campo precisa ter um valor com mais de ${min} caracteres`,
    max: ({ max }: any) => `O campo precisa ter um valor com menos de ${max} caracteres`,
  },
  boolean: {},
  object: {},
  array: {},
});