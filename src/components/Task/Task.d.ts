import { Tarefa } from "../../utils/model/Tarefa";

export type TaskProps = {
  task: Tarefa;
  onTaskChange: (taskId: number) => void;
};
