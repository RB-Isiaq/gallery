// components/RequireAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/service/firebase";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return children;
};

export default ProtectedRoute;
