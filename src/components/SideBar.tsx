import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    LayoutDashboard,
    CalendarCheck,
    PlusCircle,
    Link as LinkIcon,
    Building2,
    BarChart3,
    Eye,
    GraduationCap,
    Layers,
    GroupIcon,
} from "lucide-react";

export default function Sidebar() {
    const { user } = useAuth();

    const linkClass =
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all";

    const activeClass = "bg-indigo-50 text-indigo-600";
    const inactiveClass =
        "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

    return (
        <div className="w-64 h-full bg-white  flex flex-col justify-between">
            {/* Top */}
            <div className="p-4">


                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <Layers size={20} />
                    </div>

                    <h2 className="text-2xl font-bold text-indigo-600 tracking-tight">
                        SkillBridge
                    </h2>
                </div>

                {/* Menu */}
                <div className="flex flex-col gap-2">
                    {/* STUDENT */}
                    {user?.role === "student" && (
                        <NavLink
                            to="/student"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : inactiveClass}`
                            }
                        >
                            <CalendarCheck size={18} />
                            My Sessions
                        </NavLink>
                    )}

                    {/* TRAINER */}
                    {user?.role === "trainer" && (
                        <>
                            <NavLink
                                to="/trainer"
                                className={({ isActive }) =>
                                    `${linkClass} ${isActive ? activeClass : inactiveClass
                                    }`
                                }
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/trainer/create"
                                className={({ isActive }) =>
                                    `${linkClass} ${isActive ? activeClass : inactiveClass
                                    }`
                                }
                            >
                                <PlusCircle size={18} />
                                Create Session
                            </NavLink>

                            <NavLink
                                to="/trainer/invite"
                                className={({ isActive }) =>
                                    `${linkClass} ${isActive ? activeClass : inactiveClass
                                    }`
                                }
                            >
                                <LinkIcon size={18} />
                                Invite Link
                            </NavLink>
                            <NavLink
                                to="/trainer/create-batch"
                                className={({ isActive }) =>
                                    `${linkClass} ${isActive ? activeClass : inactiveClass
                                    }`
                                }
                            >
                                <GroupIcon size={18} />
                                Create Batch
                            </NavLink>
                        </>
                        
                    )}

                    {/* INSTITUTION */}
                    {user?.role === "institution" && (
                        <>
                        <NavLink
                                to="/institution/create-batch"
                                className={({ isActive }) =>
                                    `${linkClass} ${isActive ? activeClass : inactiveClass
                                    }`
                                }
                            >
                                <GroupIcon size={18} />
                                Create Batch
                            </NavLink>
                             <NavLink
                            to="/institution"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : inactiveClass}`
                            }
                        >
                            <Building2 size={18} />
                            Batches
                        </NavLink>
                        </>
                       
                        
                    )}

                    {/* MANAGER */}
                    {user?.role === "manager" && (
                        <NavLink
                            to="/manager"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : inactiveClass}`
                            }
                        >
                            <BarChart3 size={18} />
                            Programme
                        </NavLink>
                    )}

                    {/* MONITORING */}
                    {user?.role === "monitoring" && (
                        <NavLink
                            to="/monitoring"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : inactiveClass}`
                            }
                        >
                            <Eye size={18} />
                            Overview
                        </NavLink>
                    )}
                </div>
            </div>

            {/* Bottom User Section */}
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                        <GraduationCap size={18} />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-800">
                            {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                            {user?.role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}