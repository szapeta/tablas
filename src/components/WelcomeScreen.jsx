import React, { useState } from "react";

function WelcomeScreen({ onNext }) {
  const [name, setName] = useState("");

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenido</h1>
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Ingresa tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => name && onNext(name)}
      >
        Aceptar
      </button>
    </div>
  );
}

export default WelcomeScreen;
