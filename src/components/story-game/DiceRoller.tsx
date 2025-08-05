import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next"; // New import

interface DiceRollerProps {
  onRollComplete: (result: number) => void;
  numDice: number; // New prop
  diceType: number; // New prop (e.g., 6 for D6, 20 for D20)
}

const DiceRoller: React.FC<DiceRollerProps> = ({ onRollComplete, numDice, diceType }) => {
  const { t } = useTranslation();
  const [isRolling, setIsRolling] = useState(false);
  const [diceValues, setDiceValues] = useState<number[]>(Array(numDice).fill(1)); // Array for multiple dice

  const rollDice = () => {
    setIsRolling(true);
    const rollDuration = 1500; // milliseconds for the animation

    let rollCount = 0;
    const interval = setInterval(() => {
      const newValues = Array.from({ length: numDice }, () => Math.floor(Math.random() * diceType) + 1);
      setDiceValues(newValues);
      rollCount++;
      if (rollCount > 10) {
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalValues = Array.from({ length: numDice }, () => Math.floor(Math.random() * diceType) + 1);
      setDiceValues(finalValues);
      setIsRolling(false);
      const totalRoll = finalValues.reduce((sum, val) => sum + val, 0);
      onRollComplete(totalRoll);
    }, rollDuration);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {diceValues.map((value, index) => (
          <div
            key={index}
            className={cn(
              "relative w-24 h-24 bg-primary-foreground border-4 border-primary rounded-lg flex items-center justify-center text-5xl font-bold text-primary transition-transform duration-300",
              isRolling ? "animate-spin-dice" : ""
            )}
          >
            {value}
          </div>
        ))}
      </div>
      <Button
        onClick={rollDice}
        disabled={isRolling}
        className="px-8 py-4 text-xl"
      >
        {isRolling ? t("rollingButton") : t("rollButton")}
      </Button>
    </div>
  );
};

export default DiceRoller;