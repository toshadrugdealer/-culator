import { useRef, useState } from "react";
import "./App.css";
import { store } from "./store";

function App() {
  const [a, setA] = useState<string | number>("");
  const [b, setB] = useState<string | number>("");
  const [sign, setSign] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);
  const tapeNumber = (number: string) => {
    if (store.numbers.includes(number)) {
      if (b === "" && sign === "") {
        setA((prev) => prev + number);
        if (ref.current) ref.current.value = a + number;
      } else {
        setB((prev) => prev + number);
        if (ref.current) ref.current.value = b + number;
      }
    }
    if (store.sign.includes(number)) {
      if (b == "" && number === "=") return;
      setSign(number);
      if (a !== "" && b !== "" && number === "=") {
        switch (sign) {
          case "+": {
            setA(Number(a) + Number(b));
            if (ref.current) ref.current.value = String(Number(a) + Number(b));
            break;
          }
          case "-": {
            setA(Number(a) - Number(b));
            if (ref.current) ref.current.value = String(Number(a) - Number(b));
            break;
          }
          case "/": {
            setA(Number(a) / Number(b));
            if (ref.current) ref.current.value = String(Number(a) / Number(b));
            break;
          }
          case "*": {
            setA(Number(a) * Number(b));
            if (ref.current) ref.current.value = String(Number(a) * Number(b));
            break;
          }
        }
        setSign("");
        setB("");
      } else if (a !== "" && b !== "" && number !== "=") {
        switch (sign) {
          case "+": {
            setA(Number(a) + Number(b));
            if (ref.current) ref.current.value = String(Number(a) + Number(b));
            break;
          }
          case "-": {
            setA(Number(a) - Number(b));
            if (ref.current) ref.current.value = String(Number(a) - Number(b));
            break;
          }
          case "/": {
            setA(Number(a) / Number(b));
            if (ref.current) ref.current.value = String(Number(a) / Number(b));
            break;
          }
          case "*": {
            setA(Number(a) * Number(b));
            if (ref.current) ref.current.value = String(Number(a) * Number(b));
            break;
          }
        }
        setSign(number);
        setB("");
      }
    }
  };
  const clear = () => {
    setA("");
    setB("");
    setSign("");
    if (ref.current) ref.current.value = "0";
  };

  return (
    <div className="container">
      <div className="output">
        <input
          className="input"
          ref={ref}
          type="text"
          defaultValue={0}
          readOnly
        />
        <div style={{ color: "red" }}>
          <p>для теста</p>
          <span>{a !== "" ? `${a} ${sign} ${b}` : "введите число"}</span>
        </div>
      </div>
      <div className="buttons">
        {store.numbers.map((item) => (
          <button onClick={() => tapeNumber(item)} key={item}>
            {item}
          </button>
        ))}
        {store.sign.map((item) => (
          <button onClick={() => tapeNumber(item)} key={item}>
            {item}
          </button>
        ))}
        <button className="btn" onClick={clear}>
          AC
        </button>
      </div>
    </div>
  );
}

export default App;
