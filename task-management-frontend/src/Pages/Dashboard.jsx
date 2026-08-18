import React, { useEffect } from "react";
import api from "../Services/api";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const DashBoard = () => {
  const { logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  const navigate = useNavigate();

  //load the user tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/tasks");

      setTasks(response.data);
    } catch (error) {
      console.error(error);

      setError("Unable to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  //filter tasks based on the status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "ALL") {
      return true;
    }

    return task.status === filter;
  });

  //updating task status
  const handleStatusChange = async (id, status) => {
    try {
      const response = await api.patch(`/api/tasks/${id}/status`, null, {
        params: {
          status: status,
        },
      });

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task)),
      );
    } catch (error) {
      console.error(error);

      setError("Failed to update status");
    }
  };

  //delete the specific task
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/api/tasks/${id}`);

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);

      setError("Failed to delete task");
    }
  };

  //open edit page
  const handleEdit = (id) => {
    navigate(`/edit-task/${id}`);
  };

  const handleLogout = () => {
    logout();

    window.location.href = "/login";
  };

  const todoCount = tasks.filter((task) => task.status === "TODO").length;

  const progressCount = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  const doneCount = tasks.filter((task) => task.status === "DONE").length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}

      <Navbar />

      {/* Main Content */}

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

            <p className="text-gray-500 mt-1">Manage and track your tasks</p>
          </div>

          <button
            onClick={() => navigate("/create-task")}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700"
          >
            + Create Task
          </button>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-gray-500">Total Tasks</p>

            <p className="text-3xl font-bold mt-2">{tasks.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-gray-500">To Do</p>

            <p className="text-3xl font-bold mt-2">{todoCount}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-gray-500">In Progress</p>

            <p className="text-3xl font-bold mt-2">{progressCount}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-gray-500">Completed</p>

            <p className="text-3xl font-bold mt-2">{doneCount}</p>
          </div>
        </div>

        {/* Tasks */}

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">My Tasks</h3>
          </div>

          <div className="p-6">
            {loading && <p className="text-gray-500">Loading tasks...</p>}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && tasks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No tasks yet.</p>

                <p className="text-gray-400 mt-1">Create your first task.</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === "ALL"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFilter("TODO")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === "TODO"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                To Do
              </button>

              <button
                onClick={() => setFilter("IN_PROGRESS")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === "IN_PROGRESS"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                In Progress
              </button>

              <button
                onClick={() => setFilter("DONE")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === "DONE"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Completed
              </button>
            </div>

            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition"
                >
                  {/* Title + Priority */}
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800 min-w-0 break-words">
                      {task.title}
                    </h4>

                    {/* Priority */}
                    <span
                      className={`shrink-0 self-start inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                        task.priority === "HIGH"
                          ? "bg-red-100 text-red-600"
                          : task.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 mt-3 leading-relaxed break-words">
                    {task.description}
                  </p>

                  {/* Bottom section */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Due Date */}
                      <div>
                        <span className="text-xs text-gray-400">Due date</span>

                        <p className="text-sm font-medium text-gray-700">
                          {task.dueDate}
                        </p>
                      </div>

                      {/* Status */}
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        className={`w-full sm:w-auto border rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          task.status === "DONE"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : task.status === "IN_PROGRESS"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        <option value="TODO">TODO</option>

                        <option value="IN_PROGRESS">IN PROGRESS</option>

                        <option value="DONE">DONE</option>
                      </select>

                      {/* Edit/Delete */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(task.id)}
                          className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(task.id)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
