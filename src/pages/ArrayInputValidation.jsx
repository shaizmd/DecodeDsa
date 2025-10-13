import { useState } from "react";

export default function ArrayInputValidation() {
  const [maxLen, setMaxLen] = useState("");
  const [array, setArray] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("setMaxLen");

  const MIN = 1, MAX = 100;

  const setLength = () => {
    const n = Number(maxLen);
    if (!Number.isInteger(n) || n <= 0) return setError("Enter a valid positive number.");
    setError(""); setStep("addNumbers");
  };

  const addNumber = () => {
    const num = Number(input.trim());
    if (Number.isNaN(num)) return setError("Input must be a number.");
    if (num < MIN || num > MAX) return setError(`Number must be between ${MIN} and ${MAX}.`);
    if (array.includes(num)) return setError("Duplicate detected!");
    if (array.length >= maxLen) return setError("Max array length reached.");
    setArray([...array, num]); setInput(""); setError("");
  };

  const reset = () => { setMaxLen(""); setArray([]); setInput(""); setError(""); setStep("setMaxLen"); };

  return (
    <div style={{ maxWidth: 400, margin: "1rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: 5 }}>
      <h3>Array Input Validation</h3>

      {step === "setMaxLen" && (
        <>
          <input type="text" value={maxLen} onChange={e => setMaxLen(e.target.value)} placeholder="Max array size" style={{ width: "100%", padding: 5, marginBottom: 5 }} />
          <button onClick={setLength}>Set</button>
        </>
      )}

      {step === "addNumbers" && (
        <>
          <p>Enter up to <strong>{maxLen}</strong> unique numbers ({MIN}-{MAX}):</p>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={`Number ${array.length + 1}`} style={{ width: "100%", padding: 5, marginBottom: 5 }} />
          <button onClick={addNumber} style={{ marginRight: 5 }}>Add</button>
          <button onClick={reset}>Reset</button>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {array.length > 0 && <p>Current array: [{array.join(", ")}]</p>}
      {array.length === maxLen && <p style={{ color: "green" }}>🎉 Array completed!</p>}
    </div>
  );
}
