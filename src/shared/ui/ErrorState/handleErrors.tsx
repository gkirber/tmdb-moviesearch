import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {errorToast} from "@/shared/ui/ErrorState/errorToast.ts";
import {
  isErrorWithProperty
} from "@/shared/ui/ErrorState/isErrorWithProperty.ts";

export const handleErrors = (error: FetchBaseQueryError) => {
  if (error) {
    switch (error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
      case "TIMEOUT_ERROR":
        errorToast(error.error);
        break;

      case 400:
      case 401:
      case 404:
      case 429:
        if (isErrorWithProperty(error.data, "status_message")) {
          errorToast(error.data.status_message);
        } else {
          errorToast(JSON.stringify(error.data));
        }
        break;

      default:
        if (error.status >= 500 && error.status < 600) {
          errorToast("Server error occurred. Try again later");
          break;
        }
        errorToast("Some error occurred");
    }
  }
};