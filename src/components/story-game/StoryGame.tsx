import React, { useState } from "react";
import { storyData, Scene, Choice } from "@/data/story";
import SceneDisplay from "./SceneDisplay";
import { Button } from "@/components/ui/button";

const StoryGame: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState<string>("start");
  const [score, setScore] = useState<number>(0); // New score state

  const currentScene: Scene | undefined = storyData[currentSceneId];

  const handleChoice = (chosenChoice: Choice) => {
    if (chosenChoice.scoreEffect !== undefined) {
      setScore(prevScore => prevScore + chosenChoice.scoreEffect!);
    }
    setCurrentSceneId(chosenChoice.nextSceneId);
  };

  const restartGame = () => {
    setCurrentSceneId("start");
    setScore(0); // Reset score on restart
  };

  if (!currentScene) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <h1 className="text-4xl font-bold text-destructive mb-4">Error: Scene Not Found!</h1>
        <p className="text-lg text-muted-foreground mb-6">
          The story encountered an unexpected path. Please restart the game.
        </p>
        <Button onClick={restartGame} className="px-8 py-4 text-xl">
          Restart Game
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md text-lg font-semibold">
        Score: {score}
      </div>
      <SceneDisplay scene={currentScene} onChoice={handleChoice} />
      {currentScene.choices.length === 0 && (
        <Button onClick={restartGame} className="mt-8 px-8 py-4 text-xl">
          Play Again
        </Button>
      )}
    </div>
  );
};

export default StoryGame;