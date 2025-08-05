import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChoiceButton from "./ChoiceButton";
import DiceRoller from "./DiceRoller";
import { Scene, Choice } from "@/data/story";

interface SceneDisplayProps {
  scene: Scene;
  onChoice: (chosenChoice: Choice) => void; // Now passes the full Choice object
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({ scene, onChoice }) => {
  const isDiceRollScene = scene.choices.length === 2;

  const handleDiceRollComplete = (rollResult: number) => {
    if (isDiceRollScene) {
      const chosenChoice = rollResult > 3 ? scene.choices[0] : scene.choices[1];
      onChoice(chosenChoice);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground p-6">
        <CardTitle className="text-3xl font-bold text-center">Interactive Story</CardTitle>
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
                Roll the dice to decide your fate!
              </p>
              <DiceRoller onRollComplete={handleDiceRollComplete} />
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-foreground">Possible Outcomes:</p>
                <p className="text-muted-foreground">
                  Roll 4-6: <span className="font-medium text-primary">{scene.choices[0].text}</span>
                </p>
                <p className="text-muted-foreground">
                  Roll 1-3: <span className="font-medium text-primary">{scene.choices[1].text}</span>
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
            The End.
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default SceneDisplay;