"use client";

import { error } from "console";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaLock,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ocupation, setOcupation] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const occupations = [
    "Desarrollador Frontend",
    "Desarrollador Backend",
    "Desarrollador Full Stack",
    "Ingeniero DevOps",
    "Diseñador UX/UI",
    "Analista de Datos",
    "Ingeniero de Machine Learning",
    "Administrador de Sistemas",
    "Especialista en Ciberseguridad",
    "Otro",
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          ocupation,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      firstName,
      lastName,
      email,
      password,
      ocupation,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/todo");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#E8F0FE] dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md mx-2 sm:mx-0">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#2560E5] dark:text-white">
            Registro de Usuario
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Nombre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(event) => setfirstName(event.target.value)}
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="Emanuel"
                    required
                  />
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Apellido
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(event) => setlastName(event.target.value)}
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="Santos"
                    required
                  />
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="emanuel@gmail.com"
                  required
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="••••••••"
                  required
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Ocupación
              </label>
              <div className="relative">
                <select
                  id="occupation"
                  name="occupation"
                  value={ocupation}
                  onChange={(event) => setOcupation(event.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white appearance-none"
                  required
                >
                  <option value="">Selecciona una ocupación</option>
                  {occupations.map((occupation, index) => (
                    <option key={index} value={occupation}>
                      {occupation}
                    </option>
                  ))}
                </select>
                <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#2560E5] text-white rounded-md hover:bg-[#1e4fc0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2560E5] transition-colors duration-200 dark:hover:bg-[#3570F5] dark:focus:ring-offset-gray-800"
              >
                Registrarse
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            {(typeof errors === "string" ||
              (Array.isArray(errors) && errors.length > 0)) && (
              <div className="bg-rose-500 text-white rounded-md">
                <ul className="mb-2">
                  {typeof errors === "string" ? (
                    <li>{errors}</li>
                  ) : (
                    errors.map((error) => <li key={error}>{error}</li>)
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-[#2560E5] hover:underline dark:text-[#3570F5]"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
