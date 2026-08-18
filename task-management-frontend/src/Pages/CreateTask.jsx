import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const CreateTask = () => {
  const navigate = useNavigate();

  //store task from form values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
    status: "TODO",
    estimatedHours: 1,
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // AI task generation
  const generateWithAI = async () => {
    if (!formData.title.trim()) {
      setError("Enter a task title first");
      return;
    }

    try {
      setError("");
      setAiLoading(true);

      //generate task deatils from ai through backend
      const response = await api.post("/api/ai/generate-task", null, {
        params: {
          title: formData.title,
        },
      });

      const aiData = response.data;

      setFormData((prev) => ({
        ...prev,
        description: aiData.description,
        priority: aiData.priority,
        estimatedHours: aiData.estimatedHours,
      }));
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.error || "AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setError("");
      setLoading(true);

      await api.post("/api/tasks", formData);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.error || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Task</h1>

            <p className="text-gray-500 mt-2">
              Create a new task or let AI help you.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Task Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Prepare client presentation"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* AI Button */}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={generateWithAI}
                disabled={aiLoading}
                className="bg-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
              >
                {aiLoading ? "Generating..." : "✨ Generate with AI"}
              </button>
            </div>

            {/* Description */}

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the task..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Priority */}

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="LOW">Low</option>

                <option value="MEDIUM">Medium</option>

                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Estimated Completion Time</p>

              <p className="text-xl font-bold text-purple-700">
                {formData.estimatedHours} hours
              </p>
            </div>

            {/* Due Date */}

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            {/* Status */}

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="TODO">To Do</option>

                <option value="IN_PROGRESS">In Progress</option>

                <option value="DONE">Done</option>
              </select>
            </div>

            {/* Buttons */}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
