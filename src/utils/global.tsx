import { createContext, useContext } from "react";

export type GlobalContent = {
  isEditingTask: boolean;
  setIsEditingTask: (c: boolean) => void;
  selectedTaskInput: string | null;
  setSelectedTaskInput: (c: string | null) => void;
  refetchtaskStatus: number;
  setRefectchTaskStatus: (c: number) => void;
  isLoading: boolean;
  setIsLoading: (c: boolean) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  isEditingTask: false,
  setIsEditingTask: () => {},
  selectedTaskInput: null,
  setSelectedTaskInput: () => {},
  refetchtaskStatus: 0,
  setRefectchTaskStatus: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
