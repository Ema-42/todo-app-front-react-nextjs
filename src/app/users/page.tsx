"use client";
import Perfil from "@/components/Perfil";
import React, { FormEvent, useState } from "react";
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const initialUsers = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan@example.com",
    fechaCreacion: "2023-01-15",
    rol: "USER",
    ocupacion: "Developer",
    password: "password123",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    ocupacion: "",
    password: "",
    fechaCreacion: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleAddUser = (e:FormEvent) => {
    e.preventDefault();
    const id = Math.max(...users.map((u) => u.id)) + 1;
    const newUserComplete = {
      ...newUser,
      id,
      fechaCreacion:
        newUser.fechaCreacion || new Date().toISOString().split("T")[0],
      rol: "USER",
    };
    setUsers([...users, newUserComplete]);
    setNewUser({
      nombre: "",
      apellido: "",
      email: "",
      ocupacion: "",
      password: "",
      fechaCreacion: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <>
      <Perfil />
      <div className="min-h-screen   bg-[#E8F0FE] dark:bg-gray-800 text-gray-800 dark:text-gray-200   ">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-[#2560E5] dark:text-white">
            Gestión de Usuarios
          </h1>

          <form
            onSubmit={handleAddUser}
            className="mb-6 bg-white dark:bg-gray-700 shadow-md rounded-lg p-4"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Agregar Nuevo Usuario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={newUser.nombre}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Ingresa el nombre"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="apellido"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={newUser.apellido}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Ingresa el apellido"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Ingresa el email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="ocupacion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ocupación
                </label>
                <input
                  type="text"
                  id="ocupacion"
                  name="ocupacion"
                  value={newUser.ocupacion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Ingresa la ocupación"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="Ingresa la contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="fechaCreacion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Fecha de Creación
                </label>
                <input
                  type="date"
                  id="fechaCreacion"
                  name="fechaCreacion"
                  value={newUser.fechaCreacion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-4 py-2 bg-[#2560E5] text-white rounded-md hover:bg-[#1e4fc0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2560E5] transition-colors duration-200"
              >
                <FaPlus className="inline mr-2" />
                Agregar Usuario
              </button>
            </div>
          </form>

          <div className="  shadow-md rounded-lg overflow-hidden ">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y   ">
                <thead className="bg-[#2560E5]   dark:bg-gray-900 ">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-white uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-white uppercase tracking-wider">
                      Ocupación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-white uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-white uppercase tracking-wider">
                      Fecha de Creación
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white  dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-500">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.nombre} {user.apellido}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.ocupacion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.rol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.fechaCreacion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
