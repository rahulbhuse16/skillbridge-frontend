import { Type, Layers, Building2 } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../layouts/DashBoardLayout";
import API from "../../api/axios";
import { getUser } from "../../utils/roleRoutes";

export default function CreateBatch() {
  const [form, setForm] = useState({
    name: "",
    institution_id: "",
  });

  const user=getUser()

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async() => {

    await API.post('/batches',{
        name:form.name, 
        institution_id:user.id, 
        trainer_id:null, 
        role : 'institution'

    })
    
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create Batch
          </h1>
          <p className="text-sm text-gray-500">
            Add a new batch under your institution
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">
          {/* Batch Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Batch Name
            </label>

            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <Type size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter batch name"
                className="w-full outline-none text-sm"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            </div>
          </div>

        

          {/* Submit */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition shadow-sm"
            >
              <Layers size={18} />
              Create Batch
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}