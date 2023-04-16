import { useState } from "react"
import Button from "./components/Button"
import Screen from "./components/Screen"
import ResetButton from "./components/ResetButton"

export default function App() {
  const buttons = [
    [7, 8, 9, "+"],
    [4, 5, 6, "-"],
    [1, 2, 3, "X"],
    [0, ".", "=", "/"],
  ]

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  })

  const handleButtonOperation = (btn, e) => {
    switch (btn) {
      case ".":
        commaClickHandler(e)
        break

      case "=":
        equalsClickHandler(e)
        break

      case "+":
      case "-":
      case "X":
      case "/":
        signClickHandler(e)
        break

      default:
        numClickHandler(e)
    }
  }

  function numClickHandler(e) {
    e.preventDefault()
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      num:
        calc.num === 0 && value === "0"
          ? "0"
          : calc.num % 1 === 0
          ? Number(calc.num + value)
          : calc.num + value,
      res: !calc.sign ? 0 : calc.res,
    })
  }

  function commaClickHandler(e) {
    e.preventDefault()
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    })
  }

  function signClickHandler(e) {
    e.preventDefault()
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    })
  }

  function equalsClickHandler(e) {
    e.preventDefault()

    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        switch (sign) {
          case "+":
            return a + b
            break

          case "-":
            return a - b
            break

          case "X":
            return a * b
            break

          case "/":
            return a / b
            break
        }
      }

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide by 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      })
    }
  }

  function resetHandler(e) {
    e.preventDefault()
    setCalc({
      sign: "",
      num: 0,
      res: 0,
    })
  }

  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500'>
      <div className='w-3/12 bg-sky-100 p-6 rounded-3xl'>
        <div className='flex justify-end mb-4'>
          <ResetButton resetOperation={resetHandler} label="Clear" />
        </div>

        <div className='mb-4'>
          <Screen value={calc.num ? calc.num : calc.res} />
        </div>

        <div className='mb-4'>
          {buttons.flat().map((btn, i) => (
            <Button
              key={i}
              value={btn}
              buttonOperation={handleButtonOperation}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
