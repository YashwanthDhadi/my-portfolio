import type { Achievement } from '../types/content'

/** Newest first. Add certifications and awards here. */
export const achievements: Achievement[] = [
  {
    title: '1st Place, TECH-ATHON 2026',
    context: 'University hackathon · Team VoxMind',
    date: '2026',
    description:
      'Won with VoxMind, a real-time cyberbullying detection platform using a BERT toxicity model, Flask and Socket.IO.',
    kind: 'award',
  },
  {
    title: 'Python Fundamentals',
    context: 'IBM SkillsBuild',
    date: 'Certification',
    kind: 'certification',
  },
]
