import React from "react";

function TableSelection({ onSelect, ordered, setOrdered }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
      <h2 className="text-xl font-semibold mb-4">Selecciona una tabla</h2>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {[...Array(10).keys()].map((i) => (
          <button
            key={i + 1}
            className="bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition"
            onClick={() => onSelect(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <label htmlFor="toggle-order" className="text-sm font-medium">
          Modo: {ordered ? "En orden" : "Aleatorio"}
        </label>
        <button
          id="toggle-order"
          onClick={() => setOrdered((prev) => !prev)}
          className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300
            ${ordered ? "bg-green-400" : "bg-gray-300"}`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
              ${ordered ? "translate-x-6" : "translate-x-0"}`}
          />
        </button>
      </div>
    </div>
  );
}

export default TableSelection;
