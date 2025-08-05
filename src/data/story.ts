export interface Choice {
  text: string;
  nextSceneId: string;
  scoreEffect?: number; // Optional score change for this choice
}

export interface Scene {
  id: string;
  text: string;
  choices: Choice[];
}

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
    ],
  },
  findPath: {
    id: "findPath",
    text: "You search for a path and soon find a faint, overgrown trail. It seems to lead towards a clearing. Do you follow the trail or go off-trail?",
    choices: [
      { text: "Follow the trail", nextSceneId: "clearing", scoreEffect: 3 },
      { text: "Go off-trail into the bushes", nextSceneId: "bushes", scoreEffect: -5 },
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
};