import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const initialLoginData = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialLoginData);
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(email);
    } catch (error) {
      console.log(error);
    }
    //     try {
    //       const res = await signIn("credentials", {
    //         email,
    //         password,
    //         redirect: false,
    //       });
    //       if (res.error) {
    //         setError("Invalid Credentials");
    //         return;
    //       }
    //       router.push("/register");
    //     } catch (error) {
    //       console.log(error);
    //     }
  };
  return { error, loginData, handleEventChange, handleSubmit };
};
