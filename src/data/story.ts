export interface Choice {
  text: string;
  nextSceneId: string;
  scoreEffect?: number; // Optional score change for this choice
}

export interface Creature {
  id: string;
  name: string;
  health: number;
  winSceneId: string;
  loseSceneId: string;
  winScoreEffect: number;
  loseScoreEffect: number;
}

export interface Scene {
  id: string;
  text: string;
  choices: Choice[];
  isEncounter?: boolean; // New: true if this scene is a creature encounter
  creatureId?: string; // New: ID of the creature for this encounter
}

export const creatures: Record<string, Creature> = {
  goblin: {
    id: "goblin",
    name: "Goblin",
    health: 15,
    winSceneId: "goblinDefeated",
    loseSceneId: "goblinLost",
    winScoreEffect: 50,
    loseScoreEffect: -20,
  },
  direWolf: {
    id: "direWolf",
    name: "Dire Wolf",
    health: 25,
    winSceneId: "wolfDefeated",
    loseSceneId: "wolfLost",
    winScoreEffect: 75,
    loseScoreEffect: -30,
  },
};

export const storyData: Record<string, Scene> = {
  start: {
    id: "start",
    text: "You wake up in a mysterious forest. The air is thick with mist, and ancient trees loom around you. Do you go deeper into the forest or try to find a path?",
    choices: [
      { text: "Go deeper into the forest", nextSceneId: "deepForest", scoreEffect: 5 },
      { text: "Look for a path", nextSceneId: "findPath", scoreEffect: 2 },
    ],
  },
  deepForest: {
    id: "deepForest",
    text: "You venture deeper, the trees growing denser. You hear a faint whisper. Do you investigate the whisper or ignore it?",
    choices: [
      { text: "Investigate the whisper", nextSceneId: "whisper", scoreEffect: 10 },
      { text: "Ignore it and keep walking", nextSceneId: "keepWalking", scoreEffect: 1 },
      { text: "A rustling in the bushes! Investigate.", nextSceneId: "encounterGoblinScene", scoreEffect: 0 } // New choice leading to encounter
    ],
  },
  findPath: {
    id: "findPath",
    text: "You search for a path and soon find a faint, overgrown trail. It seems to lead towards a clearing. Do you follow the trail or go off-trail?",
    choices: [
      { text: "Follow the trail", nextSceneId: "clearing", scoreEffect: 3 },
      { text: "Go off-trail into the bushes", nextSceneId: "bushes", scoreEffect: -5 },
      { text: "A growl echoes nearby. Investigate.", nextSceneId: "encounterWolfScene", scoreEffect: 0 } // New choice leading to encounter
    ],
  },
  whisper: {
    id: "whisper",
    text: "You follow the whisper and find a shimmering, ethereal creature. It offers you a glowing orb. Do you take the orb or refuse?",
    choices: [
      { text: "Take the orb", nextSceneId: "orbTaken", scoreEffect: 20 },
      { text: "Refuse the orb", nextSceneId: "orbRefused", scoreEffect: 0 },
    ],
  },
  keepWalking: {
    id: "keepWalking",
    text: "You ignore the whisper and continue walking. Eventually, you stumble upon a hidden cave entrance. Do you enter the cave or try to find another way out?",
    choices: [
      { text: "Enter the cave", nextSceneId: "cave", scoreEffect: -10 },
      { text: "Look for another way out", nextSceneId: "anotherWay", scoreEffect: 5 },
    ],
  },
  clearing: {
    id: "clearing",
    text: "The trail leads you to a beautiful, sunlit clearing with a small, bubbling spring. You feel a sense of peace. This seems like a good place to rest. The story ends here.",
    choices: [], // End of story path
  },
  bushes: {
    id: "bushes",
    text: "You push through thick bushes, getting scratched and tangled. You realize you're completely lost. The story ends here.",
    choices: [], // End of story path
  },
  orbTaken: {
    id: "orbTaken",
    text: "The orb pulses with warmth in your hand, filling you with a strange energy. You feel ready for anything. The story ends here.",
    choices: [], // End of story path
  },
  orbRefused: {
    id: "orbRefused",
    text: "The creature sighs and fades away. You are left alone in the deep forest, feeling a pang of regret. The story ends here.",
    choices: [], // End of story path
  },
  cave: {
    id: "cave",
    text: "You enter the dark cave. It's cold and damp, and you hear strange echoes. You decide to turn back. The story ends here.",
    choices: [], // End of story path
  },
  anotherWay: {
    id: "anotherWay",
    text: "You search for another way out and eventually find a narrow, winding path that leads you out of the forest. You are safe. The story ends here.",
    choices: [], // End of story path
  },
  // --- New Combat Encounter Scenes ---
  encounterGoblinScene: {
    id: "encounterGoblinScene",
    text: "A small, green-skinned goblin jumps out from behind a tree, snarling! Prepare for combat!",
    choices: [], // No choices, handled by CombatEncounter component
    isEncounter: true,
    creatureId: "goblin",
  },
  goblinDefeated: {
    id: "goblinDefeated",
    text: "You successfully defeated the goblin! It drops a small, shiny key. You feel more confident.",
    choices: [
      { text: "Continue deeper into the forest", nextSceneId: "deepForest", scoreEffect: 10 },
      { text: "Try to find a path out", nextSceneId: "findPath", scoreEffect: 5 }
    ],
  },
  goblinLost: {
    id: "goblinLost",
    text: "The goblin's attacks were too much. You manage to escape, but you're injured and disoriented. You lost some valuable time.",
    choices: [
      { text: "Try to find a path out", nextSceneId: "findPath", scoreEffect: 0 },
      { text: "Rest and recover (Return to Start)", nextSceneId: "start", scoreEffect: 0 }
    ],
  },
  encounterWolfScene: {
    id: "encounterWolfScene",
    text: "A massive Dire Wolf emerges from the shadows, its eyes glowing in the mist! This will be a tough fight!",
    choices: [], // No choices, handled by CombatEncounter component
    isEncounter: true,
    creatureId: "direWolf",
  },
  wolfDefeated: {
    id: "wolfDefeated",
    text: "With a final blow, the Dire Wolf falls! You feel a surge of power and find a rare herb nearby.",
    choices: [
      { text: "Continue exploring the forest", nextSceneId: "deepForest", scoreEffect: 15 },
      { text: "Head towards the clearing", nextSceneId: "clearing", scoreEffect: 10 }
    ],
  },
  wolfLost: {
    id: "wolfLost",
    text: "The Dire Wolf's ferocity was overwhelming. You barely escape with your life, badly wounded. You need to recover.",
    choices: [
      { text: "Seek immediate rest (Return to Start)", nextSceneId: "start", scoreEffect: 0 },
      { text: "Limp towards the clearing", nextSceneId: "clearing", scoreEffect: -5 }
    ],
  },
};