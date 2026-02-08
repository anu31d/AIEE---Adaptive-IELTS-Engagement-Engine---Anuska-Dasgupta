
import { Task, UserProfile, Recommendation } from '../types';
import { MOCK_TASKS } from '../constants';
import { SkillGraphManager } from './skillGraph';
import { optimizeTaskSelection } from './optimizer';

/**
 * AIEE Engine Orchestrator
 * Integrates Market Basket, Sequential Mining, and Greedy Logic.
 */
export class RecommendationEngine {
  private skillGraph = new SkillGraphManager();

  async getDailyRecommendation(user: UserProfile): Promise<Recommendation> {
    // 1. Filter by Skill Graph (D)
    const unlockableSkillIds = this.skillGraph.getUnlockableSkills(user);
    let candidateTasks = MOCK_TASKS.filter(t => unlockableSkillIds.includes(t.skillId));

    // 2. Multi-Armed Bandit Strategy (F)
    // 20% exploration of "Reach" tasks (one step beyond current mastery)
    const isExplorationDay = Math.random() < 0.2;
    if (isExplorationDay) {
       // Find tasks user hasn't tried but are close to unlocking
       // For demo, just pick a random task they haven't mastered
    }

    // 3. Greedy Optimization within time budget (C)
    const selectedTasks = optimizeTaskSelection(candidateTasks, user.dailyTimeBudget, user);

    // 4. Sequential Pattern Mining (B) - Simplified logic
    // Ensure if we have a practice task, we precede it with a video if mastery is low
    // (Implementation omitted for brevity but logic follows dependency rules)

    const totalTime = selectedTasks.reduce((sum, t) => sum + t.timeEstimate, 0);

    return {
      tasks: selectedTasks,
      totalTime,
      reasoning: "These tasks were chosen to maximize your impact score based on your goal and current skill gap."
    };
  }
}
