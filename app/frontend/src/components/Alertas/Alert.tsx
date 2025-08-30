import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Alert: React.FC<{ mensaje: string; tipo: "exito" | "error"; redirectTo?: string;}> = ({ mensaje, tipo, redirectTo }) => {
  const [progreso, setProgreso] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate(); // Inicializa el hook para redirigir

  useEffect(() => {
    if (progreso < 100) {
      const timer = setTimeout(() => {
        setProgreso(progreso + 1);
      }, 15); // Velocidad de avance de la barra (ajustable)
      return () => clearTimeout(timer);
    } else {
      // Cuando termine la carga, desaparecer
      const timeout = setTimeout(() => {
        setVisible(false);
        // Solo navega si se proporcionó una ruta
        if (redirectTo) {
          navigate(redirectTo);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progreso, navigate, redirectTo]);

  if (!visible) return null; // Si no está visible, no renderiza nada

  const colores =
    tipo === "exito"
      ? "bg-cyan-200 border-black-400 text-[#1F271B]"
      : "bg-cyan-200 border-red-400 text-[#1F271B]";
  const icono = tipo === "exito" ? "😊" : "😞";

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex justify-center z-50">

      <div className={`relative px-6 py-4 rounded-lg shadow-lg flex flex-col items-center gap-4 w-[400px] ${colores}`}>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{icono}</span>
          <p className="font-semibold text-center">{mensaje}</p>
        </div>
        {/* Barra de progreso */}
        <div className="absolute bottom-0 left-0 h-1 bg-yellow-400 transition-all"
          style={{ width: `${progreso}%` }} />
      </div>
    </div>
  );
};

export default Alert;
