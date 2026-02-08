
import { SkillNode, UserProfile } from '../types';
import { SKILL_GRAPH } from '../constants';

/**
 * Skill Dependency Graph (D)
 * Ensures user is not jumping into complex tasks without prerequisites.
 */
export class SkillGraphManager {
  private nodes: Map<string, SkillNode>;

  constructor() {
    this.nodes = new Map(SKILL_GRAPH.map(n => [n.id, n]));
  }

  getUnlockableSkills(user: UserProfile): string[] {
    const unlocked: string[] = [];
    
    for (const node of SKILL_GRAPH) {
      const mastery = user.skillMastery[node.id] || 0;
      if (mastery >= 0.8) continue; // Already mastered

      const prereqsMet = node.prerequisites.every(pId => (user.skillMastery[pId] || 0) >= 0.7);
      if (prereqsMet) {
        unlocked.push(node.id);
      }
    }
    
    return unlocked;
  }

  isPrerequisite(targetId: string, possiblePrereqId: string): boolean {
    const node = this.nodes.get(targetId);
    if (!node) return false;
    if (node.prerequisites.includes(possiblePrereqId)) return true;
    
    return node.prerequisites.some(p => this.isPrerequisite(p, possiblePrereqId));
  }
}
