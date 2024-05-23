import { createGlobalState } from "react-hooks-global-state";

interface AccountModalStore {
  accountModalStep: "select" | "import" | "importpk" | "importseed";
}

// Create a single global state object
const accountModalStore = {
  accountModalStep: "select",
} as AccountModalStore;

const { useGlobalState: useAccountModalStep, setGlobalState } = createGlobalState(accountModalStore);

export const setAccountModalStep = (step: AccountModalStore["accountModalStep"]) => {
  setGlobalState("accountModalStep", () => step);
};

// export const setDeployedAddress = (deployedAddress: string) => {
//   setGlobalState("deployedAddress", () => deployedAddress);
// };

export { useAccountModalStep };
