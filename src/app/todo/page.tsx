"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FaCheckCircle,
  FaTrash,
  FaClock,
  FaPlus,
  FaHourglassHalf,
  FaUndo,
} from "react-icons/fa";

import { fetcher } from "@/common/util/fetcher";
import { Todo } from "@/common/interface/Todo.interface";
import { ImBoxRemove } from "react-icons/im";
import { RiEdit2Fill } from "react-icons/ri";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { formatDate } from "@/common/util/formatDate";
import EditTodoModal from "@/components/EditTodoModal";
import { PartialTodo } from "@/common/interface/PartialTodo.interface";

interface NewTodo {
  title: string;
  date: string;
}
export default function TodosPage() {
  const { data: session, status } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<PartialTodo | null>(null);

  const getDefaultDate = (): string => {
    const now = new Date();
    now.setHours(4, 0, 0, 0); // Establecer la hora a las 8:00:00 AM
    return now.toISOString().slice(0, 19);
  };

  const [newTodo, setNewTodo] = useState<NewTodo>({
    title: "",
    date: getDefaultDate(),
  });

  const getTodos = async () => {
    try {
      const data = await fetcher(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/todo`,
        session?.user?.token || "",
        { method: "GET" }
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

  const addTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.title && newTodo.date) {
      try {
        await fetcher(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/todo`,
          session?.user?.token || "",
          {
            method: "POST",
            body: newTodo,
          }
        );
      } catch (error) {
        console.error("Failed to fetch todo:", error);
      }
    }
    setNewTodo({ title: "", date: "" });
  };

  const getStatusColor = (status: Todo["state"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500  text-white  dark:text-white";
      case "IN_PROGRESS":
        return "bg-yellow-500 text-white  dark:text-white";
      case "CANCELED":
        return "bg-rose-300  text-white dark:text-white";
      default:
        return "bg-[#2560E5] text-white  dark:text-white";
    }
  };

  const changeTodoState = async (
    actualStateTodo: string,
    todoId: number,
    optionSelected: string
  ) => {
    const newState =
      optionSelected === actualStateTodo ? "ACTIVE" : optionSelected;

    try {
      await fetcher(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/${todoId}`,
        session?.user?.token || "",
        {
          method: "PATCH",
          body: { state: newState },
        }
      );
    } catch (error) {
      console.error("Failed to fetch todo:", error);
    }
  };

  const openDeleteModal = (todo: Todo) => {
    setTodoToDelete(todo);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setTodoToDelete(null);
  };

  const confirmDelete = async () => {
    if (todoToDelete) {
      try {
        await fetcher(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/${todoToDelete.id}`,
          session?.user?.token || "",
          {
            method: "DELETE",
          }
        );
      } catch (error) {
        console.error("Failed to fetch todo:", error);
      }
    }
    closeDeleteModal();
  };

  const openEditModal = (todo: PartialTodo) => {
    setTodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTodoToEdit(null);
  };

  const saveTodo = async (editedTodo: PartialTodo) => {
    if (editedTodo) {
      try {
        await fetcher(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/${editedTodo.id}`,
          session?.user?.token || "",
          {
            method: "PATCH",
            body: {
              title: editedTodo.title,
              state: editedTodo.state,
              date: editedTodo.date,
            },
          }
        );
      } catch (error) {
        console.error("Failed to fetch todo:", error);
      }
    }
    closeEditModal();
  };

  return (
    <div className="min-h-screen bg-[#E8F0FE]  dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#2560E5] dark:text-white">
          Mi Lista de Tareas
        </h1>
        <form
          onSubmit={addTodo}
          className="mb-6 bg-white dark:bg-gray-700 shadow-md rounded-lg p-4"
        >
          <div className="flex flex-col md:flex-row md:items-end space-y-2 md:space-y-0 md:space-x-2">
            <div className="flex-grow">
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
                value={newTodo.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2560E5] focus:border-[#2560E5] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder="Ingresa el título de la tarea"
                required
              />
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
                value={newTodo.date.replace(" ", "T")}
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
              "Agregar Tarea"
            </button>
          </div>
        </form>

        <ul className="space-y-4">
          {todos
            .filter((todo) => todo.state !== "CANCELED") // Filtrar tareas canceladas
            .sort((a, b) => {
              if (a.state === "IN_PROGRESS") return -1;
              if (b.state === "IN_PROGRESS") return 1;
              if (a.state === "ACTIVE") return -1;
              if (b.state === "ACTIVE") return 1;
              return 0; // Mantener el orden original para otros estados
            })
            .map((todo) => (
              <li
                key={todo.id}
                className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 transition-colors duration-200 pb-0 px-0 "
              >
                <div className="px-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h2 className={`text-xl font-semibold mb-2 sm:mb-0 `}>
                      {todo.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                      <button
                        onClick={() =>
                          changeTodoState(todo.state, todo.id, "COMPLETED")
                        }
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
                        onClick={() =>
                          changeTodoState(todo.state, todo.id, "IN_PROGRESS")
                        }
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
                        onClick={() =>
                          changeTodoState(todo.state, todo.id, "CANCELED")
                        }
                        className={`text-white p-2 rounded-full transition-colors duration-200 ${
                          todo.state === "CANCELED"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                        title={
                          todo.state === "CANCELED"
                            ? "Desmarcar como archivada"
                            : "Marcar como archivada"
                        }
                      >
                        {todo.state === "CANCELED" ? (
                          <FaUndo />
                        ) : (
                          <ImBoxRemove />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          openEditModal({
                            id: todo.id,
                            title: todo.title,
                            state: todo.state,
                            date: todo.date,
                          })
                        }
                        className="text-white bg-teal-600 p-2 rounded-full transition-colors duration-200"
                      >
                        <RiEdit2Fill />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      <FaClock className="inline mr-1" /> Creada:{" "}
                      {formatDate(todo.created_at.toString(), true)}
                    </p>
                    <p>
                      <FaClock className="inline mr-1" /> Fecha límite:{" "}
                      {formatDate(todo.date.toString(), false)}
                    </p>
                  </div>
                </div>
                <div
                  className={` ${getStatusColor(
                    todo.state
                  )}  rounded-b-lg px-4 `}
                >
                  <p className="mt-2">
                    {todo.state === "ACTIVE"
                      ? "Activa"
                      : todo.state === "IN_PROGRESS"
                      ? "En curso"
                      : "Completada"}
                  </p>
                </div>
              </li>
            ))}
        </ul>

        {todos.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-[#2560E5] dark:text-white">
              Tareas Archivadas
            </h2>
            <ul className="space-y-4">
              {todos.map(
                (todo) =>
                  todo.state === "CANCELED" && (
                    <li
                      key={todo.id}
                      className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center ">
                        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                          {todo.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                          <button
                            onClick={() =>
                              changeTodoState(todo.state, todo.id, "CANCELED")
                            }
                            className="bg-[#2560E5] text-white p-2 rounded-full hover:bg-[#1e4fc0] transition-colors duration-200"
                            title="Restaurar tarea"
                          >
                            <FaUndo />
                          </button>
                          <button
                            onClick={() => openDeleteModal(todo)}
                            className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-colors duration-200"
                            title="Eliminar tarea"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        todoTitle={todoToDelete?.title || ""}
      />
      <EditTodoModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={saveTodo}
        todo={todoToEdit}
      />
    </div>
  );
}
