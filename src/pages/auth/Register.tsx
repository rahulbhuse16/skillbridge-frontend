import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getDashboardRoute } from "../../utils/roleRoutes";

import {
  User,
  GraduationCap,
  Building2,
  BarChart3,
  Eye,
  Layers,
} from "lucide-react";

import API from "../../api/axios";
import { useUser, SignUpButton } from "@clerk/react";
import { useState, useEffect } from "react";

export default function Register() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { user, isSignedIn, isLoaded } = useUser();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"signup" | "role">("signup");

  // ✅ Move to role step AFTER signup
  useEffect(() => {
    if (isSignedIn && user) {
      setStep("role");
    }
    console.log('called',step)
  }, [isSignedIn, user,isLoaded]);

  const handleRegister = async (role: string) => {
    try {
      if (!user) return;

      setLoading(true);

      const payload = {
        clerkId: user.id,
        role,
        name: user.fullName || "User",
        email: user.primaryEmailAddress?.emailAddress,
      };

      const res = await API.post("/auth/register", payload);

      const userData = {
        name: user.fullName,
        role,
        id:res.data?.data?.id
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      navigate(getDashboardRoute(role));

    } catch (err) {
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { label: "Student", role: "student", icon: GraduationCap, color: "bg-blue-500" },
    { label: "Trainer", role: "trainer", icon: User, color: "bg-indigo-500" },
    { label: "Institution", role: "institution", icon: Building2, color: "bg-green-500" },
    { label: "Programme Manager", role: "manager", icon: BarChart3, color: "bg-purple-500" },
    { label: "Monitoring Officer", role: "monitoring", icon: Eye, color: "bg-orange-500" },
  ];

  if (!isLoaded) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Layers size={20} />
          </div>
          <h2 className="text-2xl font-bold text-indigo-600">
            SkillBridge
          </h2>
        </div>

          {/* STEP 1: SIGNUP */}
          {step === "signup" && (
            <SignUpButton
             forceRedirectUrl={'/register'}
              mode="modal">
              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
                Sign Up with Clerk
              </button>
            </SignUpButton>
          )}

          {/* STEP 2: ROLE SELECTION */}
          {step === "role" && (
            <>
              <p className="text-center text-gray-500 mb-4">
                Select your role to continue
              </p>

              <div className="grid gap-3">
                {roles.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.role}
                      onClick={() => handleRegister(item.role)}
                      disabled={loading}
                      className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-md transition"
                    >
                      <div className={`p-2 rounded-lg text-white ${item.color}`}>
                        <Icon size={18} />
                      </div>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Footer */}
          <p
            onClick={() => navigate("/login")}
            className="text-xs text-center text-gray-400 mt-6 cursor-pointer hover:underline"
          >
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
}