import { toast } from "react-toastify";

export const showInfoToast = (message) => {
  toast.info(message);
};

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};
