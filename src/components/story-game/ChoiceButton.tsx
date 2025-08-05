import React from "react";
import { Button } from "@/components/ui/button";

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="w-full md:w-auto px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {text}
    </Button>
  );
};

export default ChoiceButton;