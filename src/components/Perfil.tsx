import { fetcher } from "@/common/util/fetcher";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { User } from "@/common/interface/User.interface";

export default function Perfil() {
  const [user, setUser] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    ocupation: "",
    role: "",
    deletedAt: new Date(),
    created_at: new Date(),
  });
  const { data: session, status } = useSession();

/*   const getUser = async () => {
    try {
      // Aquí llamamos a fetcher y le pasamos la URL y el token
      const data = await fetcher(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/9`,
        session?.user?.token || ""
      );
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUser();
    }
  }, [status]); */

  const [editing, setEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  /*   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }; */

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEditing(false);
    // Aquí iría la lógica para guardar los cambios en el servidor
    console.log("Usuario actualizado:", user);
  };

  return (
    <div className="   bg-[#E8F0FE] dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#2560E5] dark:text-white">
          Perfil de Usuario
        </h1>
        <div className=" mb-6 bg-white dark:bg-gray-700 shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setEditing(!editing)}
              className="px-4 py-2 bg-[#2560E5] text-white rounded-md hover:bg-[#1e4fc0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2560E5] transition-colors duration-200"
            >
              {editing ? "Cancelar" : "Editar Perfil"}
            </button>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="relative">
              <img src="" className="w-32 h-32 rounded-full object-cover" />
              {editing && (
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-white dark:bg-gray-600 rounded-full p-2 cursor-pointer"
                >
                  <FaCamera className="text-gray-600 dark:text-gray-300" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    /* onChange={handleImageChange} */
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={user?.firstName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={user?.lastName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email2"
                  name="email"
                  value={user?.email}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Ocupación
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={user?.ocupation}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Rol
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={user?.role}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="created_at"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Fecha de Creación
                </label>
                <input
                  type="date"
                  id="created_at"
                  name="created_at"
                  value={user?.created_at.toISOString().split("T")[0]}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
            </div>
            {editing && (
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
                    value="NO VISIBLE BRO"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="Ingresa la nueva contraseña"
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
            )}
            {editing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2560E5] text-white rounded-md hover:bg-[#1e4fc0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2560E5] transition-colors duration-200"
                >
                  Guardar Cambios
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
