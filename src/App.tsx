import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppRouter />
      </DataProvider>
    </AuthProvider>
  );
}