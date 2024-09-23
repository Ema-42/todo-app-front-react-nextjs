"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import React, { useEffect } from "react";
import {
  FaCheckCircle,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaWhatsapp,
} from "react-icons/fa";

export default function page() {
  const { data: session, status } = useSession();
  const router = useRouter();

 
  useEffect(() => {
    if (session) {
      router.push("/todo"); // Redirigir a /todo si está autenticado
    }
  }, [session, router]);


  if (status === "loading") {
    return <p>Cargando tareas...</p>;
  }

  return (
    <div className="min-h-screen bg-[#E8F0FE] dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-700 shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#2560E5] dark:text-white">
              Empiece ahora!! 🤓
            </h1>
            <div className="space-x-4">
              <Link
                href="/login"
                className="text-[#2560E5] hover:text-[#1e4fc0] dark:text-[#3570F5] dark:hover:text-[#4580FF]"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="bg-[#2560E5] text-white px-4 py-2 rounded-md hover:bg-[#1e4fc0] transition-colors duration-200"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#2560E5] dark:text-white">
            Bienvenido a TodoApp
          </h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Organiza tu vida, aumenta tu productividad y alcanza tus metas con
            esta aplicación de gestión de tareas.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#2560E5] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#1e4fc0] transition-colors duration-200"
          >
            Comienza Gratis
          </Link>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#2560E5] dark:text-white">
              Características Principales
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Crea y organiza tareas fácilmente
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Establece fechas límite y prioridades
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Gestiona tu tiempo
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Organiza tu espacion, a traves de tu cuenta personal
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <img
              src="/tasks.png"
              alt="TaskMaster App Demo"
              className="w-full h-auto rounded-md"
            />
          </div>
        </section>

        <section className="text-center mb-12 ">
          <h3 className="text-2xl font-bold mb-4 text-[#2560E5] dark:text-white">
            ¿Listo para aumentar tu productividad?
          </h3>
          <p className="mb-6">
            Únete a miles de usuarios que ya han mejorado su gestión del tiempo
            con TodoApp.
          </p>
          <div className="flex flex-col  sm:block  sm:space-x-4 space-y-4 sm:space-y-0">
            <Link
              href="/login"
              className="inline-block bg-white dark:bg-gray-600 text-[#2560E5] dark:text-white px-6 py-3 rounded-md text-lg font-semibold border border-[#2560E5] hover:bg-[#2560E5] hover:text-white dark:hover:bg-[#3570F5] transition-colors duration-200"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="inline-block bg-[#2560E5] text-white px-6 py-3 rounded-md text-lg font-semibold border border-[#2560E5] hover:bg-[#1e4fc0] transition-colors duration-200"
            >
              Registrarse
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-700 shadow-md mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © 2023 TaskMaster. Todos los derechos reservados.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:flex md:flex md:space-x-6">
              <a
                href="https://github.com/Ema-42"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#2560E5] hover:text-[#1e4fc0] dark:text-[#3570F5] dark:hover:text-[#4580FF] transition-colors duration-200"
              >
                <FaGithub size={24} className="mr-2" />
                <span className="font-medium">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/emanuel-mario-chusgo-santos-93189b161"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#2560E5] hover:text-[#1e4fc0] dark:text-[#3570F5] dark:hover:text-[#4580FF] transition-colors duration-200"
              >
                <FaLinkedin size={24} className="mr-2" />
                <span className="font-medium">LinkedIn</span>
              </a>
              <a
                href="https://emanuel-chusgo.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#2560E5] hover:text-[#1e4fc0] dark:text-[#3570F5] dark:hover:text-[#4580FF] transition-colors duration-200"
              >
                <FaGlobe size={24} className="mr-2" />
                <span className="font-medium">Portafolio</span>
              </a>
              <a
                href="https://wa.me/+59176821922"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#2560E5] hover:text-[#1e4fc0] dark:text-[#3570F5] dark:hover:text-[#4580FF] transition-colors duration-200"
              >
                <FaWhatsapp size={24} className="mr-2" />
                <span className="font-medium">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
