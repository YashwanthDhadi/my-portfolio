import {
  BrainCircuit,
  CodeXml,
  Database,
  Library,
  PanelsTopLeft,
  Server,
  Sparkles,
  Wrench,
} from 'lucide-react'
import type { SkillCategory } from '../types/content'

/**
 * Every skill here is used in at least one of the projects on this site.
 * To add a skill, append it to the right category's `skills` array.
 * To add a category, add a new object (icons: https://lucide.dev/icons).
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: CodeXml,
    skills: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Java (fundamentals)'],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    skills: [
      'FastAPI',
      'Pydantic',
      'Flask',
      'Socket.IO',
      'REST API design',
      'Multi-tenant data isolation',
      'Rate limiting',
    ],
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    icon: BrainCircuit,
    skills: [
      'Natural Language Processing',
      'BERT',
      'Sentence embeddings',
      'Semantic search & ranking',
      'Computer vision',
      'OpenCV',
      'MediaPipe',
    ],
  },
  {
    id: 'genai',
    title: 'Generative AI',
    icon: Sparkles,
    skills: [
      'LLM tool calling',
      'Retrieval-Augmented Generation (RAG)',
      'LangChain',
      'Prompt engineering',
      'Vector search (FAISS)',
      'Multi-model routing & fallback',
      'Speech-to-text (Whisper)',
      'Gemini · Groq · OpenRouter APIs',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: PanelsTopLeft,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML & CSS', 'Streamlit', 'CustomTkinter'],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    skills: ['PostgreSQL', 'Supabase', 'SQL migrations', 'Postgres full-text search', 'SQLite'],
  },
  {
    id: 'libraries',
    title: 'Frameworks & Libraries',
    icon: Library,
    skills: [
      'Hugging Face Transformers',
      'Sentence Transformers',
      'PyTorch',
      'FAISS',
      'Pandas',
      'NumPy',
      'ReportLab',
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: Wrench,
    skills: [
      'Git',
      'GitHub',
      'GitHub Actions',
      'pytest',
      'Vercel',
      'Render',
      'Streamlit Community Cloud',
      'Hugging Face Hub',
    ],
  },
]
