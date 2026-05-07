import { Show, SignInButton, UserButton, useUser } from "@clerk/react";
import { useAuth } from "../../context/AuthContext";
import { getDashboardRoute } from "../../utils/roleRoutes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../../api/axios";
import { Layers } from "lucide-react";

function ClerkLogin() {
  const { setUser } = useAuth();
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const res=await API.post('/auth/login',{
          clerkId : clerkUser?.id,

        })
        const data=res.data?.data;
        setUser({ name: data?.name, role: data?.role });
        const userInfo={
        name : data?.name,
        role : data?.role,
        id:data?.id
      }

      localStorage.setItem("user",JSON.stringify(userInfo))
        navigate(getDashboardRoute(data?.role));

      } catch (err:any) {
        
        console.error("Login error:", err);
      }
    };

    if (isLoaded && isSignedIn && clerkUser) {
      handleLogin();
    }

  }, [isLoaded, isSignedIn, clerkUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center">
      
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
         <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <Layers size={20} />
                    </div>

                    <h2 className="text-2xl font-bold text-indigo-600 tracking-tight">
                        SkillBridge
                    </h2>
                </div>
       

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Sign In
            </button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <div className="flex flex-col items-center gap-4">
            <p className="text-green-600 font-medium">
              Logging you in...
            </p>
            <UserButton />
          </div>
        </Show>

        <p onClick={()=>{
          navigate('/register')
        }} className="text-xs text-gray-400 mt-8 cursor-pointer hover:underline">
           Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default ClerkLogin;