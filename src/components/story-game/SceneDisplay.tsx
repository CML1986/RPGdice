import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChoiceButton from "./ChoiceButton";
import DiceRoller from "./DiceRoller";
import { Scene, Choice } from "@/data/story";
import { useTranslation } from "react-i18next"; // New import

interface SceneDisplayProps {
  scene: Scene;
  onChoice: (chosenChoice: Choice) => void;
  numDice: number; // New prop
  diceType: number; // New prop
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({ scene, onChoice, numDice, diceType }) => {
  const { t } = useTranslation();
  const isDiceRollScene = scene.choices.length === 2;

  const handleDiceRollComplete = (rollResult: number) => {
    if (isDiceRollScene) {
      // Calculate the threshold dynamically based on numDice and diceType
      const maxPossibleRoll = numDice * diceType;
      const threshold = Math.floor(maxPossibleRoll / 2);

      const chosenChoice = rollResult > threshold ? scene.choices[0] : scene.choices[1];
      onChoice(chosenChoice);
    }
  };

  // Calculate the threshold for display purposes
  const displayThreshold = Math.floor((numDice * diceType) / 2);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground p-6">
        <CardTitle className="text-3xl font-bold text-center">{t("gameTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-lg text-foreground">
        <CardDescription className="text-xl text-center mb-6 leading-relaxed">
          {scene.text}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 p-6 bg-muted/30">
        {scene.choices.length > 0 ? (
          isDiceRollScene ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-muted-foreground text-lg mb-2">
                {t("rollDicePrompt")}
              </p>
              <DiceRoller onRollComplete={handleDiceRollComplete} numDice={numDice} diceType={diceType} />
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-foreground">{t("possibleOutcomes")}</p>
                <p className="text-muted-foreground">
                  {t("rollHigh", { threshold: displayThreshold })} <span className="font-medium text-primary">{scene.choices[0].text}</span>
                </p>
                <p className="text-muted-foreground">
                  {t("rollLow", { threshold: displayThreshold })} <span className="font-medium text-primary">{scene.choices[1].text}</span>
                </p>
              </div>
            </div>
          ) : (
            scene.choices.map((choice: Choice, index: number) => (
              <ChoiceButton
                key={index}
                text={choice.text}
                onClick={() => onChoice(choice)}
              />
            ))
          )
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            {t("theEnd")}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default SceneDisplay;