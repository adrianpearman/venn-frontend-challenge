import { z } from "zod";

import { canadianPhoneSchema } from "@/components/SignUpForm/formSchema/canadianPhoneNumberSchema";
import { corporationCodeSchema } from "@/components/SignUpForm/formSchema/corporationCodeSchema";

// Would generally have a named schema for each form in an application (i.e. Sign Up Form -> SignUpFormSchema). Since there is only one form in the project, i'll name this as formSchema
export const formSchema = z.object({
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  corporationNumber: corporationCodeSchema,
  phone: canadianPhoneSchema,
});
