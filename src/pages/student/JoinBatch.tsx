import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../api/axios";
import { getUser } from "../../utils/roleRoutes";

export default function JoinBatch() {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = getUser();

  const [message, setMessage] =
    useState("Joining batch...");

  const joinBatch = async () => {
    try {
      await API.post(
        `/batches/join`,
        {
          role: "student",
          student_id: user.id,
          id : id
        }
      );

      setMessage(
        "Batch joined successfully"
      );

      setTimeout(() => {
        navigate("/student");
      }, 1500);
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message ||
          "Failed to join batch"
      );
    }
  };

  useEffect(() => {
    if (user?.id) {
      joinBatch();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white border rounded-3xl shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Batch Invitation
        </h1>

        <p className="text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
}