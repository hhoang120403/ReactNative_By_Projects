import { Dimensions, StyleSheet, Text, View } from "react-native";
import CalcButton from "./components/CalcButton";
import { useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { evaluateExpression } from "./utils/EvaluateExpression";

const { width } = Dimensions.get("screen");
const btnRatio = 4;
const btnGap = 5;
const paddingHorizontal = 5;
const btnWidth = (width - btnGap * btnRatio) / btnRatio - paddingHorizontal;

const buttons = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "."];
const operators = ["+", "-", "*", "/"];

export default function App() {
  const [currentNums, setCurrentNums] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState(0);

  const [loaded, error] = useFonts({
    Orbitron: require("./assets/fonts/Orbitron.ttf"),
    "Orbitron-Bold": require("./assets/fonts/Orbitron-Bold.ttf"),
    "Orbitron-ExtraBold": require("./assets/fonts/Orbitron-ExtraBold.ttf"),
    "Orbitron-Medium": require("./assets/fonts/Orbitron-Medium.ttf"),
    "Orbitron-Black": require("./assets/fonts/Orbitron-Black.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const resetCalculation = () => {
    setCurrentNums([]);
    setFinalResult(0);
  };

  function handleOnBtnPress(value: string) {
    setCurrentNums((curNums) => {
      const lastItem = curNums[curNums.length - 1];

      if (value === ".") {
        if (lastItem && lastItem.includes(".")) {
          return curNums;
        }

        // If the last item is an operator or the array is empty, start with "0."
        if (!lastItem || isNaN(Number(lastItem))) {
          return [...curNums, "0."];
        }

        // Otherwise, add the decimal to the last number
        const updatedNums = [...curNums];

        return [...updatedNums.slice(0, -1), lastItem + "."];
      }

      const updatedNums = [...curNums];

      if (!isNaN(Number(value))) {
        // Check if the last item is a number (including decimals)
        if (lastItem && !isNaN(Number(lastItem))) {
          // Combine if it's a number
          updatedNums[updatedNums.length - 1] = lastItem + value;
        } else {
          // Push new number otherwise
          updatedNums.push(value);
        }
      } else if (operators.includes(value)) {
        if (!lastItem) {
          if (value === "-") {
            return ["0", "-"];
          }
          return curNums;
        }

        // Don't allow operator when decimal number is not complete
        if (lastItem.endsWith(".")) {
          return curNums;
        }

        if (operators.includes(lastItem)) {
          // If there was an operator before, replace it with the new operator.
          updatedNums[updatedNums.length - 1] = value;
        } else {
          updatedNums.push(value);
        }
      }
      return updatedNums;
    });
  }

  function handleOnLastItemRemove() {
    setCurrentNums((curNums) => {
      const oldNums = [...curNums];
      oldNums.pop();
      return [...oldNums];
    });
  }

  return (
    <View style={styles.container}>
      {/* Result Area */}
      <View style={styles.resultsContainer}>
        <Text style={styles.calculationText}>{currentNums.join("")}</Text>
        <Text style={styles.resultText}>{finalResult}</Text>
      </View>

      {/* Buttons Area */}
      <View style={styles.buttonsContainer}>
        <CalcButton
          title="AC"
          style={[styles.calcBtn, styles.btnGray]}
          onPress={resetCalculation}
        />
        <CalcButton
          title="*"
          style={[styles.calcBtn, styles.btnGray]}
          onPress={() => handleOnBtnPress("*")}
        />
        <CalcButton
          title="/"
          style={[styles.calcBtn, styles.btnGray]}
          onPress={() => handleOnBtnPress("/")}
        />
        <CalcButton
          title="DEL"
          style={[styles.calcBtn, styles.btnBlue]}
          onPress={handleOnLastItemRemove}
        />

        {buttons.map((btn) => {
          let bgBlue: boolean = false;

          if (operators.includes(btn) || btn === ".") {
            bgBlue = true;
          }

          return (
            <CalcButton
              onPress={() => handleOnBtnPress(btn)}
              key={btn}
              title={btn}
              style={[styles.calcBtn, bgBlue && styles.btnBlue]}
            />
          );
        })}

        <CalcButton
          title="0"
          style={[styles.calcBtn, styles.zero]}
          onPress={() => handleOnBtnPress("0")}
        />
        <CalcButton
          title="="
          style={[styles.calcBtn, styles.btnBlue]}
          onPress={() => {
            const finalResult = evaluateExpression(currentNums);
            setFinalResult(finalResult);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  resultsContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
  },
  calculationText: {
    fontWeight: 500,
    fontSize: 24,
    color: "black",
    opacity: 0.5,
    fontFamily: "Orbitron",
  },
  resultText: {
    marginVertical: 10,
    fontSize: 50,
    color: "black",
    fontFamily: "Orbitron-ExtraBold",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: btnGap,
    paddingHorizontal: paddingHorizontal,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "flex-end",
    marginBottom: 60,
  },
  calcBtn: {
    width: btnWidth,
    height: 80,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 12,
  },
  zero: {
    width: btnWidth * 3 + paddingHorizontal + btnGap,
  },
  btnGray: {
    backgroundColor: "#cccccc",
  },
  btnBlue: {
    backgroundColor: "#2D68C4",
  },
});
