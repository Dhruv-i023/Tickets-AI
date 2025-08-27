import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckAuth({ children, protectedRoute }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (protectedRoute) {
      // if (!token) {
      //   navigate("/login");
      //   return;
      // }

      // ✅ Validate token with backend
      fetch("http://localhost:3000/api/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setLoading(false);
          } else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
    } else {
      // Public route → no redirect
      setLoading(false);
    }
  }, [navigate, protectedRoute]);

  if (loading) {
    return <div>loading...</div>;
  }

  return children;
}

export default CheckAuth;
