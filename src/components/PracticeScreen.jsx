import React, { useEffect, useState } from "react";

function PracticeScreen({ name, table, onRestart, onBackToStart }) {
  const [question, setQuestion] = useState({ n: 1, options: [] });
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1:20 minutos 80
  const [ended, setEnded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setEnded(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const generateQuestion = () => {
    setQuestion((prevQuestion) => {
      let newN;
      do {
        newN = Math.floor(Math.random() * 10) + 1;
      } while (newN === prevQuestion.n);

      const correct = newN * table;
      const options = [correct];
      while (options.length < 3) {
        const fake = correct + Math.floor(Math.random() * 10 - 5);
        if (!options.includes(fake) && fake > 0) options.push(fake);
      }

      return { n: newN, options: shuffle(options) };
    });
  };

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const checkAnswer = (value) => {
    if (ended || selectedOption !== null) return;

    const correct = value === table * question.n;
    setSelectedOption(value);
    setIsCorrect(correct);

    if (correct) setCorrectCount((c) => c + 1);

    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      generateQuestion();
    }, 500);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
      {!ended ? (
        <>
          <h2 className="text-xl font-bold mb-2">Hola {name}</h2>
          <h3 className="text-lg mb-4">
            ¿Cuánto es {table} × {question.n}?
          </h3>
          <div className="flex flex-row justify-center gap-4 mb-6">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className={`bg-yellow-400 px-6 py-4 text-xl rounded-lg hover:bg-yellow-300 transition-all duration-300
                ${
                  selectedOption === opt
                    ? isCorrect
                      ? "shadow-[0_0_10px_3px_rgba(34,197,94,0.7)]"  // verde
                      : "shadow-[0_0_10px_3px_rgba(239,68,68,0.7)]" // rojo
                    : ""
                }`}
                onClick={() => checkAnswer(opt)}
                disabled={selectedOption !== null}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-sm">Tiempo restante: {timeLeft}s</p>
          <p className="text-sm mt-2">Correctas: {correctCount}</p>
        </>
      ) : (
        <>
          <h2 className="text-sm">tabla del {table}</h2>
          <h2 className="text-xl font-bold">¡Tiempo terminado!</h2>
          <p className="mt-4 font-semibold text-green-600 text-lg animate-pulseOnce">
            Respuestas correctas: {correctCount}
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={onRestart}
            >
              Otra vez
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onBackToStart}
            >
              Inicio
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PracticeScreen;
