import { createGlobalState } from "react-hooks-global-state";

interface ModalStepStore {
  accountModalStep: "select" | "create" | "import" | "importpk" | "importseed";
  pkBackupModalStep: "reveal" | "copy"
}

// Create a single global state object
const modalStepStore = {
  accountModalStep: "select",
  pkBackupModalStep: "reveal",
} as ModalStepStore;

const { useGlobalState: useModalStep, setGlobalState } = createGlobalState(modalStepStore);

export const setAccountModalStep = (step: ModalStepStore["accountModalStep"]) => {
  setGlobalState("accountModalStep", () => step);
};

export const setpkBackupModalStep = (step: ModalStepStore["pkBackupModalStep"]) => {
  setGlobalState("pkBackupModalStep", () => step);
};

export { useModalStep };
