import { z } from "zod";

export const corporationCodeSchema = z
  .string()
  .regex(/^\d{9}$/, "Must be a 9-digit number");
