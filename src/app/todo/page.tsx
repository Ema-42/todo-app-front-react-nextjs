"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FaCheckCircle,
  FaTrash,
  FaClock,
  FaPlus,
  FaHourglassHalf,
  FaBan,
  FaUndo,
} from "react-icons/fa";
import useSWR from "swr";
import { fetcher } from "@/common/util/fetcher";
import { Todo } from "@/common/interface/Todo.interface";

interface NewTodo {
  title: string;
  dueDate: string;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default function TodosPage() {
  const { data: session, status } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<NewTodo>({
    title: "",
    dueDate: "",
  });

  const getTodos = async () => {
    try {
      // Aquí llamamos a fetcher y le pasamos la URL y el token
      const data = await fetcher(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/todo`,
        session?.user?.token || ""
      );
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todo:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getTodos();
      const interval = setInterval(() => {
        getTodos();
      }, 4000);
      // Limpiar el intervalo cuando el componente se desmonte
      return () => clearInterval(interval);
    }
  }, [status]);

  if (status === "loading") {
    return <p>Cargando tareas...</p>;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  /*   const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.title && newTodo.dueDate) {
      const currentDate = new Date().toISOString().split("T")[0];
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: newTodo.title,
          createdAt: currentDate,
          dueDate: newTodo.dueDate,
          status: "pendiente",
        },
      ]);
      setNewTodo({ title: "", dueDate: "" });
    }
  }; */

  /*   const updateTodoStatus = (id: number, newStatus: Todo["status"]) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === newStatus ? "pendiente" : newStatus,
            }
          : todo
      )
    );
  }; */

  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (todoToDelete) {
      setDeletedTodos((prev) => [...prev, todoToDelete]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const undoDelete = (id: number) => {
    const todoToRestore = deletedTodos.find((todo) => todo.id === id);
    if (todoToRestore) {
      setTodos((prev) => [...prev, todoToRestore]);
      setDeletedTodos(deletedTodos.filter((todo) => todo.id !== id));
    }
  };

  const getStatusColor = (status: Todo["state"]) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500 dark:text-green-400";
      case "IN_PROGRESS":
        return "text-blue-500 dark:text-blue-400";
      case "CANCELED":
        return "text-red-500 dark:text-red-400";
      default:
        return "text-yellow-500 dark:text-yellow-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F0FE] dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#2560E5] dark:text-white">
          Mi Lista de Tareas
        </h1>
        <form
          //onSubmit={addTodo}
          className="mb-6 bg-white dark:bg-gray-700 shadow-md rounded-lg p-4"
        >
          <div className="flex flex-col md:flex-row md:items-end space-y-2 md:space-y-0 md:space-x-2">
            <div className="flex-grow">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Título de la tarea
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTodo.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder="Ingresa el título de la tarea"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Fecha límite
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={newTodo.dueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 bg-[#2560E5] text-white rounded-md hover:bg-[#1e4fc0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2560E5] transition-colors duration-200"
            >
              <FaPlus className="inline mr-2" />
              Agregar Tarea
            </button>
          </div>
        </form>

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 transition-colors duration-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2
                  className={`text-xl font-semibold mb-2 sm:mb-0 ${
                    todo.state === "COMPLETED" ? "line-through" : ""
                  } ${
                    todo.state === "CANCELED"
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-[#2560E5] dark:text-white"
                  }`}
                >
                  {todo.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  <button
                    //onClick={() => updateTodoStatus(todo.id, "completada")}
                    className={`text-white p-2 rounded-full transition-colors duration-200 ${
                      todo.state === "COMPLETED"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    title={
                      todo.state === "COMPLETED"
                        ? "Desmarcar como completada"
                        : "Marcar como completada"
                    }
                  >
                    {todo.state === "COMPLETED" ? (
                      <FaUndo />
                    ) : (
                      <FaCheckCircle />
                    )}
                  </button>
                  <button
                    //onClick={() => updateTodoStatus(todo.id, "en progreso")}
                    className={`text-white p-2 rounded-full transition-colors duration-200 ${
                      todo.state === "IN_PROGRESS"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    title={
                      todo.state === "IN_PROGRESS"
                        ? "Desmarcar en progreso"
                        : "Marcar en progreso"
                    }
                  >
                    {todo.state === "IN_PROGRESS" ? (
                      <FaUndo />
                    ) : (
                      <FaHourglassHalf />
                    )}
                  </button>
                  <button
                    //onClick={() => updateTodoStatus(todo.id, "cancelada")}
                    className={`text-white p-2 rounded-full transition-colors duration-200 ${
                      todo.state === "CANCELED"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    title={
                      todo.state === "CANCELED"
                        ? "Desmarcar como cancelada"
                        : "Marcar como cancelada"
                    }
                  >
                    {todo.state === "CANCELED" ? <FaUndo /> : <FaBan />}
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-colors duration-200"
                    title="Eliminar tarea"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <FaClock className="inline mr-1" /> Creada:{" "}
                  {formatDate(todo.created_at.toString())}
                </p>
                <p>
                  <FaClock className="inline mr-1" /> Fecha límite:{" "}
                  {formatDate(todo.date.toString())}
                </p>
                <p className={`mt-2 ${getStatusColor(todo.state)}`}>
                  Estado: {todo.state}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {deletedTodos.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-[#2560E5] dark:text-white">
              Tareas Eliminadas
            </h2>
            <ul className="space-y-4">
              {deletedTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 transition-colors duration-200"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                      {todo.title}
                    </h3>
                    <button
                      onClick={() => undoDelete(todo.id)}
                      className="bg-[#2560E5] text-white p-2 rounded-full hover:bg-[#1e4fc0] transition-colors duration-200"
                      title="Restaurar tarea"
                    >
                      <FaUndo />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
