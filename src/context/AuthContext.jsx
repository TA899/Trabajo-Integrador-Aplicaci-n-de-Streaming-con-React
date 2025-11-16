import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const STORAGE_KEY = "trailerflix_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      //console.log("Datos cargados desde localStorage:", raw);
      return raw ? JSON.parse(raw) : null;
    } catch {
      //console.log("Error leyendo localStorage");
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ usuario, password }) => {
    console.log(" [LOGIN] Intentando login con:", usuario, password);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/data/usuarios.json");
      const data = await res.json();
      
      const users = Array.isArray(data) ? data : data.users || [];
      console.log("[LOGIN] Datos del JSON:", data);
      const found = users.find(
        (u) => (u.usuario === usuario || u.username === usuario) && u.password === password
      );
      if (found) {
        setUser(found);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
        console.log("[LOGIN] Guardado en localStorage:", found);
        setLoading(false);
        return { ok: true };
      } else {
        console.log("[LOGIN] Usuario o contraseña incorrectos");
        setError("Usuario o contraseña incorrectos");
        setLoading(false);
        return { ok: false, error: "Usuario o contraseña incorrectos" };
      }
    } catch (e) {
      console.log("[LOGIN] Error en fetch o parsing:", e);
      setError("Error al validar usuario");
      setLoading(false);
      return { ok: false, error: "Error al validar usuario" };
    }
  };

  const logout = () => {
    //console.log("Cerrando sesión. Usuario actual era:", user);
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    //console.log("LocalStorage después de borrar:", localStorage.getItem(STORAGE_KEY));
  };

  useEffect(() => {
    // si el storage cambió en otra pestaña, sincronizamos
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        console.log("🟣 [STORAGE EVENT] Cambió localStorage:", e.newValue);
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
