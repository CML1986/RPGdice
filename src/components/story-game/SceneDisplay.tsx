import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChoiceButton from "./ChoiceButton";
import { Scene, Choice } from "@/data/story";

interface SceneDisplayProps {
  scene: Scene;
  onChoice: (nextSceneId: string) => void;
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({ scene, onChoice }) => {
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
          scene.choices.map((choice: Choice, index: number) => (
            <ChoiceButton
              key={index}
              text={choice.text}
              onClick={() => onChoice(choice.nextSceneId)}
            />
          ))
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