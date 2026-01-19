"use client";
import Input from "@/components/ui/Input";
import styles from "../signIn.module.css";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { AuthState, authUser } from "@/actions/user-actions";
import { useActionState } from "react";

const initialState: AuthState = {
  error: null,
};
const SignIn = () => {
  const [state, action, pending] = useActionState(authUser, initialState);
  return (
    <div className={styles.container}>
      <h2>Bienvenidos al Login</h2>
      <form className={styles.form} action={action}>
        {state?.error && <p className={styles.error}>{state.error}</p>}
        <Input
          label={"Correo"}
          placeholder="Ingrese su correo"
          type="email"
          name="email"
        />
        <Input label={"Contrasena"} type="password" name="password" />
        <Link href={"#"} className={styles.link}>
          ¿Olvidaste tu contraseña?
        </Link>
        <Button type="submit" label={"Iniciar"} disabled={pending} />
        <Link href={"/signup"} className={styles.account}>
          Don't have an account? <span>Click here</span>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
