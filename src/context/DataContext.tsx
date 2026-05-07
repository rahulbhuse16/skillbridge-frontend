// context/DataContext.tsx
import { createContext, useContext, useState } from "react";

const DataContext = createContext<any>(null);

export const DataProvider = ({ children }: any) => {
  const [batches, setBatches] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState<any>(null);

  return (
    <DataContext.Provider
      value={{
        batches,
        setBatches,
        sessions,
        setSessions,
        attendance,
        setAttendance,
        summary,
        setSummary,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);