import { useState } from "react";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const initialRegisterData = {
    name: "",
    email: "",
    password: "",
  };

  const [registerData, setRegisterData] = useState(initialRegisterData);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = registerData;
    if (!name || !email || !password) {
      setError("All fields are necessary");
      return;
    }
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        e.target.reset();
        router.push("/");
      } else {
        // console.log("User registration failed");
        setError("Email already registered!");
        return;
      }
    } catch (error) {
      console.log("Error during registration", error);
    }
  };
  return { error, registerData, handleEventChange, handleSubmit };
};
