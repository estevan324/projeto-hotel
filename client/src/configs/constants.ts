export const navLinks = [
  {
    label: "Quartos",
    url: "/",
  },
];

export const ERROR_MESSAGES = {
  min: (min: number) => `O valor precisa ser no mínimo ${min}`,
  minChar: (min: number) => `O texto precisa ter no mínimo ${min} caracteres`,
  mustBeNumber: (field: string) => `${field} precisa ser um número`,
  mustBeDate: (field: string) => `${field} precisa ser uma data`,
  required: (field: string) => `${field} é obrigatório`,
};
