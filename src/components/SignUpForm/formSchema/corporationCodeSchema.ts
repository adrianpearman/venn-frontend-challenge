import { z } from "zod";

let abortController: AbortController | null = null;
let validateRequestID: ReturnType<typeof setTimeout>;

/**
 * Performs a 500ms debounced request to validate whether provided corporate code is valid
 *
 * @param {string} corporationCode - provided corporation code
 */

const debouncedCorporateCodeValidation = (corporationCode: string) => {
  if (corporationCode.length < 9) {
    return false;
  }

  clearTimeout(validateRequestID);

  if (abortController) {
    abortController.abort();
  }

  return new Promise<boolean>((resolve) => {
    validateRequestID = setTimeout(async () => {
      abortController = new AbortController();
      try {
        const res = await fetch(
          `https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${corporationCode}`,
          {
            signal: abortController.signal,
          },
        );
        const data = await res.json();
        resolve(data.valid === true);
      } catch (err) {
        resolve(err instanceof DOMException && err.name === "AbortError");
      }
    }, 500);
  });
};

export const corporationCodeSchema = z
  .string()
  .regex(/^\d{9}$/, "Must be a 9-digit number")
  .min(3)
  .refine(debouncedCorporateCodeValidation, {
    message: "Invalid corporation number provided",
  });
