import Button from "../../components/Button";
import { Calendar, Clock, Type, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashBoardLayout";
import API from "../../api/axios";
import { getUser } from "../../utils/roleRoutes";

interface BatchType {
  id: string;
  name: string;
}

export default function CreateSession() {
  const [batches, setBatches] = useState<BatchType[]>([]);
  const [loading, setLoading] = useState(false);
  const user = getUser()

  const [form, setForm] = useState({
    title: "",
    date: "",
    start_time: "",
    end_time: "",
    batch_id: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getBatches = async () => {
    try {
      const response = await API.get(`/batches/${user.id}/`);

      setBatches(response.data.data || []);
    } catch (error) {
      console.log("Failed to fetch batches", error);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  console.log(batches)

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        role: "trainer",
        trainer_id: user.id,
      };

      const response = await API.post("/sessions", payload);

      console.log("Session Created:", response.data);

      setForm({
        title: "",
        date: "",
        start_time: "",
        end_time: "",
        batch_id: "",
      });
    } catch (error) {
      console.log("Failed to create session", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Create Session
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Add session details for your batch
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
          {/* Session Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Session Title
            </label>

            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <Type size={18} className="text-gray-400 mr-2" />

              <input
                type="text"
                placeholder="Enter session title"
                className="w-full outline-none text-sm"
                value={form.title}
                onChange={(e) =>
                  handleChange("title", e.target.value)
                }
              />
            </div>
          </div>

          {/* Batch Dropdown */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Select Batch
            </label>

            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <Layers size={18} className="text-gray-400 mr-2" />

              <select
                className="w-full outline-none text-sm bg-transparent text-gray-700"
                value={form.batch_id}
                onChange={(e) =>
                  handleChange("batch_id", e.target.value)
                }
              >
                <option value="">Select Batch</option>

                {batches.map((batch) => (
                  <option className="text-gray-700" key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Date
            </label>

            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <Calendar size={18} className="text-gray-400 mr-2" />

              <input
                type="date"
                className="w-full outline-none text-sm"
                value={form.date}
                onChange={(e) =>
                  handleChange("date", e.target.value)
                }
              />
            </div>
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Start Time
              </label>

              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                <Clock size={18} className="text-gray-400 mr-2" />

                <input
                  type="time"
                  className="w-full outline-none text-sm"
                  value={form.start_time}
                  onChange={(e) =>
                    handleChange("start_time", e.target.value)
                  }
                />
              </div>
            </div>

            {/* End Time */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                End Time
              </label>

              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                <Clock size={18} className="text-gray-400 mr-2" />

                <input
                  type="time"
                  className="w-full outline-none text-sm"
                  value={form.end_time}
                  onChange={(e) =>
                    handleChange("end_time", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="pt-2">
            <Button onClick={handleSubmit}>
              {loading ? "Creating..." : "Create Session"}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}