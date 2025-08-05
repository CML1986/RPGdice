import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DiceRollerProps {
  onRollComplete: (result: number) => void;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ onRollComplete }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    setIsRolling(true);
    const rollDuration = 1500; // milliseconds for the animation

    // Simulate rolling effect by rapidly changing numbers
    let rollCount = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount > 10) { // Ensure enough "rolls" for visual effect
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval); // Clear any lingering interval
      const finalRoll = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalRoll);
      setIsRolling(false);
      onRollComplete(finalRoll);
    }, rollDuration);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn(
          "relative w-24 h-24 bg-primary-foreground border-4 border-primary rounded-lg flex items-center justify-center text-5xl font-bold text-primary transition-transform duration-300",
          isRolling ? "animate-spin-dice" : ""
        )}
      >
        {diceValue}
      </div>
      <Button
        onClick={rollDice}
        disabled={isRolling}
        className="px-8 py-4 text-xl"
      >
        {isRolling ? "Rolling..." : "Roll the Dice"}
      </Button>
    </div>
  );
};

export default DiceRoller;