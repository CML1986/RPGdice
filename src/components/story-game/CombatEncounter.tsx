import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DiceRoller from "./DiceRoller";
import { creatures, Creature } from "@/data/story";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface CombatEncounterProps {
  creatureId: string;
  numDice: number;
  diceType: number;
  onCombatEnd: (nextSceneId: string, scoreEffect: number) => void;
}

const CombatEncounter: React.FC<CombatEncounterProps> = ({
  creatureId,
  numDice,
  diceType,
  onCombatEnd,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const creature: Creature | undefined = creatures[creatureId];

  const [currentHealth, setCurrentHealth] = useState(creature ? creature.health : 0);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [totalDamageDealt, setTotalDamageDealt] = useState(0);
  const [combatEnded, setCombatEnded] = useState(false);

  useEffect(() => {
    if (!creature) {
      toast({
        title: t("error"),
        description: t("creatureNotFound"),
        variant: "destructive",
      });
      onCombatEnd("start", 0); // Fallback to start if creature not found
    }
  }, [creature, toast, onCombatEnd, t]);

  if (!creature) {
    return null; // Or a loading/error state
  }

  const handleRollComplete = (rollResult: number) => {
    if (combatEnded) return;

    const damage = rollResult;
    setTotalDamageDealt((prev) => prev + damage);
    setAttemptsLeft((prev) => prev - 1);

    toast({
      title: t("damageDealt", { damage: damage }),
      description: t("attemptsRemaining", { attempts: attemptsLeft - 1 }),
    });
  };

  useEffect(() => {
    if (combatEnded) return;

    if (totalDamageDealt >= creature.health) {
      setCombatEnded(true);
      toast({
        title: t("combatWinTitle"),
        description: t("combatWinDescription", { creatureName: creature.name }),
        variant: "default",
      });
      setTimeout(() => onCombatEnd(creature.winSceneId, creature.winScoreEffect), 2000);
    } else if (attemptsLeft === 0) {
      setCombatEnded(true);
      toast({
        title: t("combatLoseTitle"),
        description: t("combatLoseDescription", { creatureName: creature.name }),
        variant: "destructive",
      });
      setTimeout(() => onCombatEnd(creature.loseSceneId, creature.loseScoreEffect), 2000);
    }
  }, [totalDamageDealt, attemptsLeft, combatEnded, creature, onCombatEnd, toast, t]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-destructive text-destructive-foreground p-6">
        <CardTitle className="text-3xl font-bold text-center">
          {t("combatEncounter")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-lg text-foreground flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">
          {t("creatureNameDisplay", { creatureName: creature.name })}
        </h2>
        <p className="text-xl">
          {t("creatureHealth")}: <span className="font-bold">{creature.health}</span>
        </p>
        <p className="text-xl">
          {t("damageDealtTotal")}: <span className="font-bold text-primary">{totalDamageDealt}</span>
        </p>
        <p className="text-xl">
          {t("attemptsLeft")}: <span className="font-bold text-destructive">{attemptsLeft}</span>
        </p>
        {!combatEnded && (
          <>
            <p className="text-center text-muted-foreground text-lg mt-4">
              {t("rollToAttack")}
            </p>
            <DiceRoller
              onRollComplete={handleRollComplete}
              numDice={numDice}
              diceType={diceType}
            />
          </>
        )}
        {combatEnded && (
          <Button onClick={() => onCombatEnd(totalDamageDealt >= creature.health ? creature.winSceneId : creature.loseSceneId, totalDamageDealt >= creature.health ? creature.winScoreEffect : creature.loseScoreEffect)} className="mt-4 px-8 py-4 text-xl">
            {t("continueStory")}
          </Button>
        )}
      </CardContent>
      <CardFooter className="p-6 bg-muted/30">
        <p className="text-center text-muted-foreground text-lg w-full">
          {t("combatInstructions")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default CombatEncounter;