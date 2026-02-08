
import { SkillCategory, SkillNode, Task } from './types';

export const SKILL_GRAPH: SkillNode[] = [
  { id: 'g1', name: 'Basic Tenses', category: SkillCategory.GRAMMAR, prerequisites: [], difficulty: 2 },
  { id: 'v1', name: 'Academic Word List 1', category: SkillCategory.VOCABULARY, prerequisites: [], difficulty: 3 },
  { id: 'r1', name: 'Skimming & Scanning', category: SkillCategory.READING, prerequisites: ['v1'], difficulty: 4 },
  { id: 'r2', name: 'Multiple Choice Questions', category: SkillCategory.READING, prerequisites: ['r1'], difficulty: 5 },
  { id: 'w1', name: 'Essay Structure', category: SkillCategory.WRITING, prerequisites: ['g1', 'v1'], difficulty: 6 },
  { id: 'w2', name: 'Cohesion & Coherence', category: SkillCategory.WRITING, prerequisites: ['w1'], difficulty: 7 },
  { id: 's1', name: 'Fluency & Pronunciation', category: SkillCategory.SPEAKING, prerequisites: ['g1'], difficulty: 5 },
  { id: 'l1', name: 'Identifying Main Ideas', category: SkillCategory.LISTENING, prerequisites: [], difficulty: 4 },
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Tense Mastery Video', description: 'Quick recap of present perfect vs past simple.', category: SkillCategory.GRAMMAR, skillId: 'g1', timeEstimate: 5, impactScore: 8, type: 'video' },
  { id: 't2', title: 'Scanning Practice', description: 'Find 5 specific dates in this text under 2 minutes.', category: SkillCategory.READING, skillId: 'r1', timeEstimate: 8, impactScore: 7, type: 'practice' },
  { id: 't3', title: 'Academic Vocab Flashcards', description: 'Review the first 20 words of the AWL.', category: SkillCategory.VOCABULARY, skillId: 'v1', timeEstimate: 10, impactScore: 9, type: 'review' },
  { id: 't4', title: 'Task 2 Essay Planning', description: 'Outline an essay for a topic on environment.', category: SkillCategory.WRITING, skillId: 'w1', timeEstimate: 12, impactScore: 8, type: 'practice' },
  { id: 't5', title: 'Speaking Prompt: Hobbies', description: 'Record yourself speaking for 2 minutes.', category: SkillCategory.SPEAKING, skillId: 's1', timeEstimate: 7, impactScore: 6, type: 'prompt' },
  { id: 't6', title: 'Listening for Details', description: 'Short audio clip with fill-in-the-blanks.', category: SkillCategory.LISTENING, skillId: 'l1', timeEstimate: 10, impactScore: 7, type: 'practice' },
  { id: 't7', title: 'Complex Sentence Structures', description: 'How to use relative clauses in Writing.', category: SkillCategory.GRAMMAR, skillId: 'g1', timeEstimate: 8, impactScore: 9, type: 'video' },
];

export const APP_THEME = {
  primary: '#4f46e5', // Indigo 600
  secondary: '#10b981', // Emerald 500
  accent: '#f59e0b', // Amber 500
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#1e293b'
};
