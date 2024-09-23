import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaBriefcase, FaUserTag, FaCalendarAlt, FaEdit, FaCamera, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Perfil() {
  const [user, setUser] = useState({
    id: 1,
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    occupation: 'Desarrollador Full Stack',
    role: 'Usuario',
    created_at: new Date('2023-01-15'),
    image: '/profile.png',
    password: '********'
  });

  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    // Aquí iría la lógica para guardar los cambios en el servidor
    console.log('Usuario actualizado:', user);
  };

  return (
    <div className="min-h-screen bg-[#E8F0FE] dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Perfil de Usuario</h1>
            <button
              onClick={() => setEditing(!editing)}
              className="px-4 py-2 bg-[#2560E5] text-white rounded-md hover:bg-[#1e4fc0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2560E5] transition-colors duration-200"
            >
              {editing ? 'Cancelar' : 'Editar Perfil'}
            </button>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="relative">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-32 h-32 rounded-full object-cover"
              />
              {editing && (
                <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-white dark:bg-gray-600 rounded-full p-2 cursor-pointer">
                  <FaCamera className="text-gray-600 dark:text-gray-300" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email2"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ocupación
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={user.occupation}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rol
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="created_at" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de Creación
                </label>
                <input
                  type="date"
                  id="created_at"
                  name="created_at"
                  value={user.created_at.toISOString().split('T')[0]}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
            </div>
            {editing && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={user.password}
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