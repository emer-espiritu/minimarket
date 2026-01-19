import Input from "@/components/ui/Input";
import styles from "../signIn.module.css";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { createUser } from "@/actions/user-actions";

const SignUp = () => {
  return (
    <div className={`${styles.container} signin`}>
      <h2>Registrate al Dashboard</h2>
      <form className={styles.formGrid} action={createUser}>
        <Input label={"Nombre"} placeholder="Ingrese su nombre" name="name" />
        <Input
          label={"Apellidos"}
          placeholder="Ingrese su apellido"
          name="lastName"
        />
        <Input
          label={"Correo"}
          placeholder="Ingrese su correo"
          type="email"
          name="email"
        />
        <Input label={"Contrasena"} type="password" name="password" />
        <Input label={"DNI"} placeholder="Ingrese su dni" name="dni" />
        <Input
          label={"Telefono"}
          placeholder="Ingrese su telefono"
          name="phone"
        />
        <Button type="submit" label={"Registrar"} />
        <Link href={"/signin"} className={styles.account}>
          Don't have an account? <span>Click here</span>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
