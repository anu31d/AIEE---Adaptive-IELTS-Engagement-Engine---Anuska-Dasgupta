
export enum SkillCategory {
  READING = 'Reading',
  LISTENING = 'Listening',
  WRITING = 'Writing',
  SPEAKING = 'Speaking',
  GRAMMAR = 'Grammar',
  VOCABULARY = 'Vocabulary'
}

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  prerequisites: string[]; // IDs of other SkillNodes
  difficulty: number; // 1-10
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  skillId: string;
  timeEstimate: number; // minutes
  impactScore: number; // weight for priority
  type: 'video' | 'practice' | 'prompt' | 'review';
}

export interface UserProfile {
  examDate: string;
  targetBand: number;
  dailyTimeBudget: 15 | 25 | 40;
  skillMastery: Record<string, number>; // skillId -> mastery percentage (0-1)
  engagementHistory: SessionRecord[];
  currentBand: number;
}

export interface SessionRecord {
  date: string;
  taskIds: string[];
  completedIds: string[];
  duration: number; // actual minutes spent
  performance: Record<string, number>; // taskId -> score (0-1)
}

export interface Recommendation {
  tasks: Task[];
  reasoning: string;
  totalTime: number;
}
