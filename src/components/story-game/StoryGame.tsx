import React, { useState, useEffect } from "react";
import { storyData, Scene, Choice } from "@/data/story";
import SceneDisplay from "./SceneDisplay";
import { Button } from "@/components/ui/button";
import SettingsDialog from "@/components/settings/SettingsDialog";
import { useTranslation } from "react-i18next";

const StoryGame: React.FC = () => {
  const { t } = useTranslation();
  const [currentSceneId, setCurrentSceneId] = useState<string>("start");
  const [score, setScore] = useState<number>(0);
  const [numDice, setNumDice] = useState<number>(1);
  const [diceType, setDiceType] = useState<number>(6);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const currentScene: Scene | undefined = storyData[currentSceneId];

  const handleChoice = (chosenChoice: Choice) => {
    if (chosenChoice.scoreEffect !== undefined) {
      setScore(prevScore => prevScore + chosenChoice.scoreEffect!);
    }
    setCurrentSceneId(chosenChoice.nextSceneId);
  };

  const handleCombatEnd = (nextSceneId: string, scoreEffect: number) => {
    setScore(prevScore => prevScore + scoreEffect);
    setCurrentSceneId(nextSceneId);
  };

  const restartGame = () => {
    setCurrentSceneId("start");
    setScore(0);
  };

  if (!currentScene) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <h1 className="text-4xl font-bold text-destructive mb-4">{t("errorSceneNotFound")}</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {t("errorRestartPrompt")}
        </p>
        <Button onClick={restartGame} className="px-8 py-4 text-xl">
          {t("restartGame")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <SettingsDialog
        numDice={numDice}
        onNumDiceChange={setNumDice}
        diceType={diceType}
        onDiceTypeChange={setDiceType}
      />
      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md text-lg font-semibold">
        {t("score")} {score}
      </div>
      <SceneDisplay
        scene={currentScene}
        onChoice={handleChoice}
        numDice={numDice}
        diceType={diceType}
        onCombatEnd={handleCombatEnd} // Pass the new handler
      />
      {currentScene.choices.length === 0 && !currentScene.isEncounter && ( // Only show play again if not an active encounter
        <Button onClick={restartGame} className="mt-8 px-8 py-4 text-xl">
          {t("playAgain")}
        </Button>
      )}
    </div>
  );
};

export default StoryGame;