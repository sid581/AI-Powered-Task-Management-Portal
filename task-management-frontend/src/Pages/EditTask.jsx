import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Services/api";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
    status: "TODO",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/api/tasks/${id}`);

        const task = response.data;

        setFormData({
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          dueDate: task.dueDate || "",
          status: task.status,
        });
      } catch (error) {
        console.error(error);

        setError("Unable to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await api.put(`/api/tasks/${id}`, formData);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.error || "Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading task...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Task</h1>

          {error && (
            <div className="mb-5 bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2">Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Description</label>

              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Due Date</label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 border rounded-lg py-3 font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
