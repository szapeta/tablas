import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


function PracticeScreen({ name, table, ordered, onRestart, onBackToStart }) {
  const [question, setQuestion] = useState({ n: 1, options: [] });
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [ended, setEnded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [sequenceIndex, setSequenceIndex] = useState(1);

  useEffect(() => {
    generateQuestion(1);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setEnded(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const generateQuestion = (nextIndex = sequenceIndex) => {
    let newN;
    if (ordered) {
      newN = nextIndex > 10 ? 1 : nextIndex;
    } else {
      do {
        newN = Math.floor(Math.random() * 10) + 1;
      } while (newN === question.n);
    }

    const correct = newN * table;
    const options = [correct];
    while (options.length < 3) {
      const fake = correct + Math.floor(Math.random() * 10 - 5);
      if (!options.includes(fake) && fake > 0) options.push(fake);
    }

    setQuestion({ n: newN, options: shuffle(options) });
    if (ordered) setSequenceIndex(newN + 1);
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
          <motion.h3
            className="text-lg mb-4"
            key={question.n}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            ¿Cuánto es {table} × {question.n}?
          </motion.h3>

          <div className="flex flex-row justify-center gap-4 mb-6">
            {question.options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  selectedOption === opt
                    ? isCorrect
                      ? { scale: [1, 1.1, 1], boxShadow: "0 0 16px 6px rgba(34,197,94,0.7)" }
                      : { x: [0, -5, 5, -5, 5, 0], boxShadow: "0 0 16px 6px rgba(239,68,68,0.7)" }
                    : {}
                }
                transition={{ duration: 0.4 }}
                className="bg-yellow-400 px-6 py-4 text-xl rounded-lg hover:bg-yellow-300"
                onClick={() => checkAnswer(opt)}
                disabled={selectedOption !== null}
              >
                {opt}
              </motion.button>

            ))}
          </div>
          <p className="text-sm">Tiempo restante: {timeLeft}s</p>
          <p className="text-sm mt-2">Correctas: {correctCount}</p>
        </>
      ) : (
        <>
          <h2 className="text-sm">Tabla del {table}</h2>
          <motion.h2
            className="text-xl font-bold text-pink-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
          ¡Tiempo terminado!
          </motion.h2>

          <motion.p
            className="mt-4 font-semibold text-green-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Respuestas correctas: {correctCount}
          </motion.p>

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
