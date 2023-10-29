import { Tarefa } from "../../utils/model/Tarefa";

export type DeleteTaskDialogProps = {
  task: Tarefa;
  cancelCallback: () => void;
  deleteCallback: () => void;
  openedDialog: boolean;
};
