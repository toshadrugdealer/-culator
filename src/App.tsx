import { useRef, useState } from "react";
import "./App.css";
import { store } from "./store";

function App() {
  const [a, setA] = useState<string | number>("");
  const [b, setB] = useState<string | number>("");
  const [sign, setSign] = useState("");
  const [test, setTest] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);
  const tapeNumber = (number: string) => {
    if (store.numbers.includes(number)) {
      if (b === "" && sign === "") {
        setA((prev) => prev + number);
        setTest((prev) => prev + number);
        if (ref.current) ref.current.value = a + number;
      } else {
        setB((prev) => prev + number);
        setTest((prev) => prev + number);
        if (ref.current) ref.current.value = b + number;
      }
    }
    if (store.sign.includes(number)) {
      if (b == "" && number === "=") return;
      setSign(number);
      if (number === "=") {
        setTest((prev) => prev + ``);
      } else if (number === test[test.length - 2]) {
        setTest((prev) => prev + ``);
      } else {
        setTest((prev) => prev + ` ${number} `);
      }
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
            // if (ref.current) ref.current.value = String(Number(a) + Number(b));
            break;
          }
          case "-": {
            setA(Number(a) - Number(b));
            // if (ref.current) ref.current.value = String(Number(a) - Number(b));
            break;
          }
          case "/": {
            setA(Number(a) / Number(b));
            // if (ref.current) ref.current.value = String(Number(a) / Number(b));
            break;
          }
          case "*": {
            setA(Number(a) * Number(b));
            // if (ref.current) ref.current.value = String(Number(a) * Number(b));
            break;
          }
        }
        setSign(number);
        setB("");
      }
    }
  };
  const clear = () => {
    setTest("");
    setA("");
    setB("");
    setSign("");
    if (ref.current) ref.current.value = "0";
  };
  return (
    <div className="container">
      <div className="output">
        <div>
          <span>{a !== "" ? `${test}` : "введите число"}</span>
        </div>
        <input ref={ref} type="text" defaultValue={0} readOnly />
      </div>
      <div className="buttons">
        {store.numbers.map((item) => (
          <button onClick={() => tapeNumber(item)} key={item}>
            {item}
          </button>
        ))}
        {store.sign.map((item) => (
          <button
            className={`${item === "=" ? "equalBtn" : ""}`}
            onClick={() => tapeNumber(item)}
            key={item}
          >
            {item}
          </button>
        ))}
        <button className="clearBtn" onClick={clear}>
          CE
        </button>
      </div>
    </div>
  );
}

export default App;
