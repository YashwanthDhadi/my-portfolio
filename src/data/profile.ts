import type { Profile } from '../types/content'

export const profile: Profile = {
  name: 'Yashwanth Dhadi',
  headline: 'Building Intelligent Applications with Python & AI',
  title: 'Python Developer | AI/ML & Backend Development',
  intro:
    "I'm a B.Tech student in AI & Machine Learning who builds backend-driven applications in Python. Using FastAPI, PostgreSQL and modern LLM tooling, I turn AI models into software that does useful work. That includes agents that call real business tools, semantic search over large datasets, and computer-vision monitoring.",
  status: 'Open to internships & graduate roles',
  location: 'Hyderabad, India',
  email: 'yashwanthdhadi77@gmail.com',
  phone: '+91 95025 42919',
  phoneE164: '+919502542919',
  github: 'https://github.com/YashwanthDhadi',
  linkedin: 'https://www.linkedin.com/in/yashwanthdhadi/',
  resume: {
    // BASE_URL keeps the path correct when the site is served from a sub-folder.
    url: `${import.meta.env.BASE_URL}documents/Yashwanth-Dhadi-Resume.pdf`,
    downloadName: 'Yashwanth-Dhadi-Resume.pdf',
  },
  about: [
    "I'm Yashwanth, a B.Tech student specialising in Artificial Intelligence and Machine Learning at Chaitanya Deemed to be University, Hyderabad.",
    "I enjoy the part of AI that happens after the model: designing the APIs, data models and guardrails that make it safe to put into a real product. My largest project, AI Business Hub, is a multi-tenant FastAPI and PostgreSQL platform. LLM agents answer customers using a business's own data, and every sensitive action waits for the owner's approval. Building it taught me to treat a model's output as a request, not a decision, and to back every design choice with tests.",
    "I've also built semantic candidate ranking with FAISS and sentence embeddings, a retrieval-augmented document assistant, and a computer-vision exam proctoring app. I work mainly in Python, with SQL for data and TypeScript when a project needs a web frontend.",
    "I'm looking for internship and graduate opportunities in Python backend development and AI-powered applications.",
  ],
  focusAreas: [
    'Python backend development',
    'REST API design',
    'LLM integration & tool calling',
    'Retrieval & semantic search',
    'Databases & data modelling',
  ],
}
