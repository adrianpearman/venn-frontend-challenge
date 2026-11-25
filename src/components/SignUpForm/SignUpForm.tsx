import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormGroup } from "@/components/FormGroup";
import { formSchema } from "@/components/SignUpForm/formSchema";
import { submitSignUpFormEndpoint } from "@/utils/consts";

type FormData = z.infer<typeof formSchema>;

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      corporationNumber: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onFormSubmit = async (data: FormData) => {
    try {
      const requestBody = {
        corporationNumber: data.corporationNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      };

      const request = await fetch(submitSignUpFormEndpoint, {
        body: JSON.stringify(requestBody),
        method: "POST",
      });

      if (!request.ok) {
        throw new Error(`Error submitting request. Status: ${request.status}`);
      }

      const result = await request.json();
      return result;
    } catch (error) {
      // Here we would need to properly handle showing to the user that there is a server error.
      // Could do a toast message or UI element
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-around bg-gray-200">
      <div className="flex flex-col w-[70%] gap-5 bg-white p-6 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl">Onboarding Form</h1>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="flex gap-4">
            <FormGroup
              errorMsg={errors.firstName && errors.firstName.message}
              formClassName="flex-1"
              inputId="first_name"
              label="First Name"
              placeholder="First Name"
              registration={register("firstName")}
            />
            <FormGroup
              errorMsg={errors.lastName && errors.lastName.message}
              formClassName="flex-1"
              inputId="last_name"
              label="Last Name"
              placeholder="Last Name"
              registration={register("lastName")}
            />
          </div>
          <FormGroup
            errorMsg={errors.phone && errors.phone.message}
            inputId="phone_number"
            label="Phone Number"
            placeholder="Phone Number"
            registration={register("phone")}
          />
          <FormGroup
            errorMsg={
              errors.corporationNumber && errors.corporationNumber.message
            }
            inputId="corporation_number"
            label="Corporation Number"
            maxLength={9}
            placeholder="Corporation Number"
            registration={register("corporationNumber")}
          />
          <div>
            <button
              className="p-4 bg-black text-white text-center w-full rounded-xl"
              type="submit"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
