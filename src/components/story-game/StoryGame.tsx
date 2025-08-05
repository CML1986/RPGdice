import React, { useState } from "react";
import { storyData, Scene } from "@/data/story";
import SceneDisplay from "./SceneDisplay";
import { Button } from "@/components/ui/button";

const StoryGame: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState<string>("start");

  const currentScene: Scene | undefined = storyData[currentSceneId];

  const handleChoice = (nextSceneId: string) => {
    setCurrentSceneId(nextSceneId);
  };

  const restartGame = () => {
    setCurrentSceneId("start");
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