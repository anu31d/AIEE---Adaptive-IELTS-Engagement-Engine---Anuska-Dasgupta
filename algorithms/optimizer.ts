
import { Task, UserProfile } from '../types';

/**
 * Greedy Optimization (C)
 * Selects highest-impact tasks within time budget.
 * Rank by engagement_gain / time_cost
 */
export const optimizeTaskSelection = (
  availableTasks: Task[],
  timeLimit: number,
  user: UserProfile
): Task[] => {
  // Add a slight bias for skills the user is weak in
  const scoredTasks = availableTasks.map(task => {
    const mastery = user.skillMastery[task.skillId] || 0;
    const priorityWeight = (1 - mastery) * 2; // Higher weight for lower mastery
    const efficiency = (task.impactScore + priorityWeight) / task.timeEstimate;
    return { ...task, efficiency };
  });

  // Sort by efficiency descending
  const sorted = [...scoredTasks].sort((a, b) => b.efficiency - a.efficiency);

  const selected: Task[] = [];
  let remainingTime = timeLimit;

  for (const task of sorted) {
    if (task.timeEstimate <= remainingTime) {
      selected.push(task);
      remainingTime -= task.timeEstimate;
    }
    if (remainingTime <= 0) break;
  }

  return selected;
};
