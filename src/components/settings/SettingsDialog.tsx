import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SettingsDialogProps {
  numDice: number;
  onNumDiceChange: (num: number) => void;
  diceType: number;
  onDiceTypeChange: (type: number) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  numDice,
  onNumDiceChange,
  diceType,
  onDiceTypeChange,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-4 left-4">
          <SettingsIcon className="h-6 w-6 text-foreground" />
          <span className="sr-only">{t("settings")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("settings")}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t("settingsDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-toggle" className="text-lg">{t("theme")}</Label>
            <ThemeToggle />
          </div>
          <Separator />

          {/* Language Selector */}
          <div className="flex items-center justify-between">
            <Label htmlFor="language-select" className="text-lg">{t("language")}</Label>
            <LanguageSelector />
          </div>
          <Separator />

          {/* Dice Options */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">{t("diceOptions")}</h3>
            {/* Number of Dice */}
            <div className="flex items-center justify-between">
              <Label htmlFor="num-dice" className="text-base">{t("numberOfDice")}</Label>
              <Select
                value={String(numDice)}
                onValueChange={(value) => onNumDiceChange(Number(value))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dice Type */}
            <div className="flex items-center justify-between">
              <Label htmlFor="dice-type" className="text-base">{t("diceType")}</Label>
              <Select
                value={String(diceType)}
                onValueChange={(value) => onDiceTypeChange(Number(value))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="D6" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">D4</SelectItem>
                  <SelectItem value="6">D6</SelectItem>
                  <SelectItem value="8">D8</SelectItem>
                  <SelectItem value="10">D10</SelectItem>
                  <SelectItem value="12">D12</SelectItem>
                  <SelectItem value="20">D20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;