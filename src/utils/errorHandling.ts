import axios from 'axios';

export const  handleAxiosError = (err: unknown): string => {
  let errorMessage = "Updating failed";
  if (axios.isAxiosError(err)) {
    if (err.response) {
      const backendErrors = err.response.data.error;
      errorMessage = backendErrors || "An unexpected error occurred.";
    } else if (err.request) {
      errorMessage = "Network error. Please check your connection and try again.";
    }
  }
  return errorMessage;
};
