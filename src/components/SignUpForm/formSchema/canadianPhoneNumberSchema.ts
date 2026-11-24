import { z } from "zod";
// decided to lean on a js library vs having to manually validate each inputted phone number
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const canadianPhoneSchema = z
  .string()
  .trim()
  .transform((val, ctx) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(val, "CA");

    if (
      !parsedPhoneNumber ||
      !parsedPhoneNumber.isValid() ||
      parsedPhoneNumber.country !== "CA"
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid Canadian phone number",
      });
      return z.NEVER;
    }

    return parsedPhoneNumber.number;
  });
