import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import TableSelection from "./components/TableSelection";
import PracticeScreen from "./components/PracticeScreen";

function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [ordered, setOrdered] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      {step === 1 && (
        <WelcomeScreen
          onNext={(userName) => {
            setName(userName);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <TableSelection
          onSelect={(table) => {
            setSelectedTable(table);
            setStep(3);
          }}
          ordered={ordered}
          setOrdered={setOrdered}
        />
      )}

      {step === 3 && (
        <PracticeScreen
          name={name}
          table={selectedTable}
          ordered={ordered}
          onRestart={() => setStep(2)}         // Volver a elegir tabla
          onBackToStart={() => setStep(1)}     // Volver a pantalla de bienvenida
        />
      )}
    </div>
  );
}

export default App;
