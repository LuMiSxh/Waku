import { buttonStory } from './button.js';
import { vstackStory, hstackStory } from './stack.js';

export const stories = {
	button: buttonStory,
	vstack: vstackStory,
	hstack: hstackStory
};

export type StoryKey = keyof typeof stories;
