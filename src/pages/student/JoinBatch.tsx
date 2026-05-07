import { useNavigate, useParams } from "react-router-dom";

import API from "../../api/axios";
import { getUser } from "../../utils/roleRoutes";

export default function JoinBatch() {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = getUser();

  

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

      

      setTimeout(() => {
        navigate("/student");
      }, 1500);
    } catch (error: any) {
      
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white  rounded-3xl shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Batch Invitation
        </h1>

        <button
              onClick={joinBatch}
              className="justify-center  items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition shadow-sm"
            >
              Accept Invite
            </button>
      </div>
    </div>
  );
}