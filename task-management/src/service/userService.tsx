import { jwtDecode } from "jwt-decode";
import { ILogin } from "../interfaces/login";
import { IRegister } from "../interfaces/register";

const userUrl = import.meta.env.VITE_USER_ENDPOINTS_URL;

export async function loginService({
  email,
  password,
}: ILogin): Promise<string | null> {
  const url = `${userUrl}/login`;
  console.log(url);

  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.message || "Error on login");
    }

    const result = await response.json();

    if (!result.status) {
      return result.message;
    }

    const { value } = result;
    localStorage.setItem("token", value);
    const userId = getUserIdFromToken(value);

    window.location.href = `/home/${userId}`;
    return null;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error on login";
    return errorMessage;
  }
}

export async function registerService({
  name,
  email,
  password,
  confirmPassword,
}: IRegister): Promise<string | null> {
  const url = `${userUrl}/register`;
  const data = {
    name: name,
    email: email,
    password: password,
    passwordConfirm: confirmPassword,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.message || "Error on sign up");
    }

    const result = await response.json();

    if (!result.status) {
      return result.message;
    }
    window.location.href = "/login";
    return null;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error on login";
    return errorMessage;
  }
}

function getUserIdFromToken(token: string): string | null {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub || null;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}
