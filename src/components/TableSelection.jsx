import React from "react";

function TableSelection({ onSelect }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
      <h2 className="text-xl font-semibold mb-4">Selecciona una tabla</h2>
      <div className="grid grid-cols-5 gap-2">
        {[...Array(10).keys()].map((i) => (
          <button
            key={i + 1}
            className="bg-blue-400 text-white py-2 rounded"
            onClick={() => onSelect(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TableSelection;
