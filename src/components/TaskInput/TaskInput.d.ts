import { Categoria, Tarefa } from "../../utils/model/Categoria";

export type TaskInputProps = {
  category: Categoria;
  task?: Tarefa;
  cancelTask: () => void;
  submitTask: () => void;
};
