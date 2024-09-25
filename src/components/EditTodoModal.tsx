import { PartialTodo } from "@/common/interface/PartialTodo.interface";
import { formatDate } from "@/common/util/formatDate";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: PartialTodo) => void;
  todo: PartialTodo | null;
}

const formatDateToCustomString = (isoDateString: Date) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes en formato 01-12
  const day = String(date.getDate()).padStart(2, "0"); // Día en formato 01-31
  const hours = String(date.getHours()).padStart(2, "0"); // Horas en formato 00-23
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Minutos en formato 00-59

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

export default function EditTodoModal({
  isOpen,
  onClose,
  onSave,
  todo,
}: EditTodoModalProps) {
  const [editedTodo, setEditedTodo] = useState<PartialTodo>({
    id: 0,
    state: "",
    title: "",
    date: new Date(),
  });

  useEffect(() => {
    if (todo) {
      setEditedTodo(todo);
    }
  }, [todo]);

  if (!isOpen || !todo) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedTodo((prev) => ({
      ...prev,
      [name]: name === "date" ? new Date(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedTodo);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Editar Tarea
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedTodo.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Estado
            </label>
            <select
              id="state"
              name="state"
              value={editedTodo.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="ACTIVE">Activa</option>
              <option value="IN_PROGRESS">En Curso</option>
              <option value="COMPLETED">Completada</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Fecha
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formatDateToCustomString(editedTodo.date)}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2560E5] text-white rounded-md hover:bg-[#1e4fc0] focus:outline-none focus:ring-2 focus:ring-[#2560E5] transition-colors duration-200"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
