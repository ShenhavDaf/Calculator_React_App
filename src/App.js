import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";

function App() {
  const [preState, setPreState] = useState("");
  const [currState, setCurrState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    const text = e.target.innerText;
    if (currState.includes(".") && text === ".") return;
    if (total) setPreState("");
    currState ? setCurrState((pre) => pre + text) : setCurrState(text);
    setTotal(false);
  };

  useEffect(() => {
    setInput(currState);
  }, [currState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const reset = () => {
    setPreState("");
    setCurrState("");
    setInput("0");
  };

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);

    if (currState === "") return;
    if (preState !== "") equals();
    else {
      setPreState(currState);
      setCurrState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") setTotal(true);

    let cal;
    switch (operator) {
      case "+":
        cal = String(parseFloat(preState) + parseFloat(currState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(currState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(currState));
        break;
      case "/":
        cal = String(parseFloat(preState) / parseFloat(currState));
        break;
      default:
        return;
    }

    setInput("");
    setPreState(cal);
    setCurrState("");
  };

  const percent = () => {
    preState
      ? setCurrState(String((parseFloat(currState) / 100) * preState))
      : setCurrState(String(parseFloat(currState) / 100));
  };

  const minusPlus = () => {
    if (currState.charAt(0) === "-") setCurrState(currState.substring(1));
    else setCurrState("-" + currState);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          <NumericFormat
            value={input === "" || input === "0" ? preState : input}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
        <div className="btn light-gray" onClick={reset}>
          AC
        </div>
        <div className="btn light-gray" onClick={percent}>
          %
        </div>
        <div disabled={total} className="btn light-gray" onClick={minusPlus}>
          +/-
        </div>
        <div className="btn orange" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn orange" onClick={operatorType}>
          X
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn zero" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
