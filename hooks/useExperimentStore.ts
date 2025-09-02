import { create } from 'zustand';

interface Experiment {
  id: string;
  title: string;
  description: string;
  date: string;
  results: string;
}

interface ExperimentState {
  experiments: Experiment[];
  addExperiment: (exp: Experiment) => void;
}

export const useExperimentStore = create<ExperimentState>(set => ({
  experiments: [],
  addExperiment: exp => set(state => ({ experiments: [...state.experiments, exp] })),
}));
