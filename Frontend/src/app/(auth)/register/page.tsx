import type { Metadata } from "next";
import { AuthShell } from "@/views/auth";
import { RegisterForm } from "@/features/auth/register-form";

export const metadata: Metadata = {
  title: "Qeydiyyat — TIK TAK",
};

export default function RegisterPage() {
  return (
    <AuthShell active="register">
      <RegisterForm />
    </AuthShell>
  );
}
