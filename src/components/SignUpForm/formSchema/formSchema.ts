import { z } from "zod";

import { canadianPhoneSchema } from "@/components/SignUpForm/formSchema/canadianPhoneNumberSchema";
import { corporationCodeSchema } from "@/components/SignUpForm/formSchema/corporationCodeSchema";

// Would generally have a named schema for each form in an application (i.e. Sign Up Form -> SignUpFormSchema). Since there is only one form in the project, i'll name this as formSchema
export const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name cannot be blank")
    .max(50, "First Name cannot be larger than 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name cannot be blank")
    .max(50, "Last Name cannot be larger than 50 characters"),
  corporationNumber: corporationCodeSchema,
  phone: canadianPhoneSchema,
});
