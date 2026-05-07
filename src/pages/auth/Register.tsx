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
  Check,
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

  const [selectedRole, setSelectedRole] = useState("");

  // Move to role step after signup
  useEffect(() => {
    if (isSignedIn && user) {
      setStep("role");
    }
  }, [isSignedIn, user, isLoaded]);

  const handleRegister = async () => {
    try {
      if (!user || !selectedRole) return;

      setLoading(true);

      const payload = {
        clerkId: user.id,
        role: selectedRole,
        name: user.fullName || "User",
        email: user.primaryEmailAddress?.emailAddress,
      };

      const res = await API.post(
        "/auth/register",
        payload
      );

      const userData = {
        name: user.fullName,
        role: selectedRole,
        id: res.data?.data?.id,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);

      //@ts-ignore
      navigate(getDashboardRoute(selectedRole));
    } catch (err:any) {
      console.error("Register error:", err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      label: "Student",
      role: "student",
      icon: GraduationCap,
      color: "bg-blue-500",
    },
    {
      label: "Trainer",
      role: "trainer",
      icon: User,
      color: "bg-indigo-500",
    },
    {
      label: "Institution",
      role: "institution",
      icon: Building2,
      color: "bg-green-500",
    },
    {
      label: "Programme Manager",
      role: "manager",
      icon: BarChart3,
      color: "bg-purple-500",
    },
    {
      label: "Monitoring Officer",
      role: "officer",
      icon: Eye,
      color: "bg-orange-500",
    },
  ];

  if (!isLoaded) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Layers size={20} />
            </div>

            <h2 className="text-2xl font-bold text-indigo-600">
              SkillBridge
            </h2>
          </div>

          {/* Signup */}
          {step === "signup" && (
            <SignUpButton
              forceRedirectUrl={"/register"}
              mode="modal"
            >
              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
                Sign Up with Clerk
              </button>
            </SignUpButton>
          )}

          {/* Role Selection */}
          {step === "role" && (
            <>
              <p className="text-center text-gray-500 mb-5">
                Select your role
              </p>

              <div className="grid gap-3">
                {roles.map((item) => {
                  const Icon = item.icon;

                  const isSelected =
                    selectedRole === item.role;

                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() =>
                        setSelectedRole(item.role)
                      }
                      className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-50"
                          : "hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg text-white ${item.color}`}
                        >
                          <Icon size={18} />
                        </div>

                        <span>{item.label}</span>
                      </div>

                      {isSelected && (
                        <Check
                          size={18}
                          className="text-indigo-600"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Create User Button */}
              <button
                disabled={!selectedRole || loading}
                onClick={handleRegister}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Creating User..."
                  : "Create User"}
              </button>
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