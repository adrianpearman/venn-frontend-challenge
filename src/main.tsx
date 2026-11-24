import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/styles.css";
import { SignUpForm } from "@/components/SignUpForm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SignUpForm />
  </StrictMode>,
);
