import type { Project } from '../types/content'

/**
 * Every fact below was checked against the project's source code, not only
 * its README. To add a project, append an object. The first entry with
 * `flagship: true` is shown as the full-width card. Order = display order.
 */
export const projects: Project[] = [
  {
    slug: 'ai-business-hub',
    name: 'AI Business Hub',
    tagline: 'Multi-tenant AI agent platform for small businesses',
    summary:
      "A FastAPI and PostgreSQL platform where each small business gets an AI assistant that answers customers from that business's own data. Every irreversible action waits for the owner's approval.",
    flagship: true,
    highlights: ['333 automated tests', '8 AI capabilities', 'Multi-tenant by design', 'Live deployment'],
    problem:
      "Small businesses such as salons, gyms, clinics and shops answer the same questions about prices, free slots, stock and payments all day, but they can't afford extra staff or paid software. A plain chatbot is risky: it can invent a price or confirm a booking that doesn't exist.",
    solution:
      "A customer opens the business's chat link and types or speaks. A supervisor model decides which capabilities the message needs. Its answer is intersected with what that business has enabled, so the model's output is a request, never a grant. One agent loop then runs with only those tools. The tools read and write PostgreSQL through a repository layer. Anything irreversible, like confirming a booking, marking an invoice paid or sending a campaign, stops and waits in the owner's dashboard.",
    architecture: [
      { title: 'Customer message', detail: 'Text, or voice transcribed with Groq Whisper' },
      { title: 'Supervisor routing', detail: 'Gemini classifies the capabilities needed; phone numbers, emails and invoice numbers are redacted first' },
      { title: 'Authority narrowing', detail: 'Requested ∩ enabled for this business ∩ known to the system' },
      { title: 'Agent loop', detail: 'LangChain tool calling on OpenRouter models, with fallbacks when rate-limited' },
      { title: 'Repository layer', detail: 'Every query is filtered by business_id; Supabase PostgreSQL is the source of truth' },
      { title: 'Owner approval', detail: 'Irreversible actions run only from the dashboard' },
    ],
    aiIntegration: [
      'LLM tool calling with LangChain structured tools: up to 15 tools when every capability is enabled, and none of them can confirm, charge, move stock or send messages on their own.',
      'Separate models for separate jobs: Gemini for routing, OpenRouter models for chat with automatic fallback, Groq Whisper for speech-to-text.',
      'A failed or malformed routing answer falls back to the business\'s enabled capabilities, so a broken router never makes the agent less safe.',
      'Document questions are answered with Postgres full-text search, a deliberate choice over a vector database for a business with tens of documents.',
    ],
    features: [
      'Public chat with text and voice input, session resume and rate limiting',
      'Owner inbox with human takeover and replies',
      'Bookings with database-enforced protection against double-booking, plus owner approval',
      'Customer records, notes and marketing consent',
      'Invoices with gapless numbering, UPI deep links and QR codes, and a public payment page',
      'Inventory with row-locked stock, an append-only ledger and idempotent adjustments',
      'Documents with full-text search, private storage and signed URLs',
      'Campaigns with an approval gate and no double-send',
      'Reports computed in SQL, with an optional plain-language summary',
    ],
    tech: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Supabase',
      'LangChain',
      'Pydantic',
      'Gemini',
      'OpenRouter',
      'Groq Whisper',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'pytest',
      'GitHub Actions',
    ],
    notes: [
      'Testing: 333 pytest tests (unit, API contract, security), 18 integration scripts with 429 assertions against the real database, and a 49-check tenant-isolation suite.',
      'Tenant isolation is enforced in the repository layer and by composite (id, business_id) foreign keys, so the database rejects cross-tenant rows.',
      'Not yet covered: automated browser tests, agent repeatability measurements, and a real UPI payment. SMS and WhatsApp are not built.',
      'The backend runs on a free tier that sleeps when idle, so the first request can take up to a minute.',
    ],
    role: 'Solo project. I designed and built the backend, database schema, AI integration, frontend and test suite.',
    links: [
      { label: 'Source code', href: 'https://github.com/YashwanthDhadi/AI-Business-Hub', kind: 'github' },
      { label: 'Live app', href: 'https://ai-business-hub-pcd5.vercel.app', kind: 'live' },
      { label: 'API docs', href: 'https://ai-business-hub-2guw.onrender.com/docs', kind: 'docs' },
    ],
  },
  {
    slug: 'talentrank-ai',
    name: 'TalentRank-AI',
    tagline: 'Semantic candidate ranking with explainable scores',
    summary:
      'Ranks 100,000 candidate profiles against a job description using sentence embeddings, FAISS vector search and a weighted multi-signal scorer, with a plain-English reason for every result.',
    highlights: ['100K candidate profiles', '7 ranking signals', 'Live demo'],
    problem:
      'Keyword-based resume screening misses strong candidates who describe their skills in different words, and it gives recruiters no reason for its ranking.',
    solution:
      'The job description is parsed into required skills and experience, then embedded with BAAI/bge-small-en-v1.5. FAISS retrieves the 1,000 most semantically similar candidates. A hybrid ranker scores each one on seven signals, and the top 100 are returned with an explanation built from their actual scores and profile.',
    architecture: [
      { title: 'Job description', detail: 'Parsed into skills, experience range and requirements' },
      { title: 'Skill normalisation', detail: 'Extracted skills mapped to a shared vocabulary' },
      { title: 'Embedding', detail: 'BAAI/bge-small-en-v1.5 via Sentence Transformers' },
      { title: 'FAISS retrieval', detail: 'Top 1,000 of 100,000 candidate vectors' },
      { title: 'Hybrid ranking', detail: 'Seven weighted signals, including a honeypot penalty' },
      { title: 'Explanations', detail: 'Top 100 with score-grounded reasoning' },
    ],
    aiIntegration: [
      'Dense sentence embeddings capture meaning, so "built REST services in FastAPI" can match a "Python backend developer" requirement without shared keywords.',
      'Weighted hybrid score: semantic similarity 35%, skills 20%, experience 15%, recruiter heuristics 12%, career progression 10%, behaviour 5%, minus a honeypot penalty for suspicious profiles.',
      'Explanations are rule-based and generated only from the candidate\'s data and scores. No LLM is involved, so they cannot hallucinate.',
    ],
    features: [
      'Semantic search across 100,000 candidate profiles',
      'Modular rankers for skills, experience, career progression and behaviour',
      'Honeypot detection for suspicious or low-quality profiles',
      'Readable, per-candidate ranking explanations',
      'Streamlit dashboard with ranked results and score breakdowns',
      'Large artefacts (FAISS index, lookups, vocabulary) downloaded from Hugging Face at startup, keeping the repository light and CPU-only deployment possible',
    ],
    tech: ['Python', 'Sentence Transformers', 'FAISS', 'PyTorch', 'Pandas', 'NumPy', 'Streamlit', 'Hugging Face Hub'],
    notes: [
      'Hosted on Streamlit Community Cloud\'s free tier. If the app has gone to sleep, click "wake up" and give it a moment to start.',
    ],
    links: [
      { label: 'Source code', href: 'https://github.com/YashwanthDhadi/TalentRank-AI', kind: 'github' },
      { label: 'Live app', href: 'https://talent-rank-ai.streamlit.app/', kind: 'live' },
      { label: 'Demo video', href: 'https://youtu.be/WK2JSu0zjaA', kind: 'demo' },
    ],
  },
  {
    slug: 'rag-document-assistant',
    name: 'RAG Document Assistant',
    tagline: 'Ask questions of any PDF with retrieval-augmented generation',
    summary:
      'Upload a PDF and chat with it. The document is chunked, embedded and indexed in FAISS, and the most relevant passages are passed to Llama 3.3 on Groq to ground each answer.',
    highlights: ['End-to-end RAG pipeline', 'Conversation memory', 'Live demo'],
    problem:
      "Large language models don't know what's inside your own documents, and pasting a long PDF into a chat is slow and loses context.",
    solution:
      'A retrieval-augmented generation pipeline: the PDF is split into overlapping chunks, embedded and stored in a FAISS index. Each question retrieves the closest passages, which are passed to the LLM together with recent conversation history.',
    architecture: [
      { title: 'PDF upload', detail: 'Loaded with PyPDF; empty or image-only PDFs are detected' },
      { title: 'Chunking', detail: '1,000-character chunks with 200-character overlap' },
      { title: 'Embedding', detail: 'all-MiniLM-L6-v2 via Hugging Face' },
      { title: 'FAISS index', detail: 'In-memory vector store per session' },
      { title: 'Retrieval', detail: 'Top-3 similarity search for each question' },
      { title: 'Generation', detail: 'LangChain prompt → Llama 3.3 70B on Groq, with the last six turns of history' },
    ],
    aiIntegration: [
      'A LangChain pipeline composed as prompt | LLM | output parser.',
      'Answers are grounded in retrieved document passages, with recent chat history for follow-up questions.',
      'Low temperature (0.2) for consistent, factual answers.',
    ],
    features: [
      'PDF upload and one-click indexing',
      'Chat interface with conversation history',
      'Semantic retrieval with Hugging Face embeddings and FAISS',
      'API key loaded from the environment, never hard-coded',
      'Clear-history control',
    ],
    tech: ['Python', 'LangChain', 'FAISS', 'Hugging Face', 'Groq', 'Llama 3.3', 'Streamlit'],
    notes: [
      'A focused, compact implementation of the core RAG pattern.',
      'Hosted on Streamlit Community Cloud\'s free tier. If the app has gone to sleep, click "wake up" and give it a moment to start.',
      'One document is indexed per session, and the index lives in memory.',
      'If the answer is not in the document, the model is allowed to answer from general knowledge.',
    ],
    links: [
      { label: 'Source code', href: 'https://github.com/YashwanthDhadi/RAG-AI', kind: 'github' },
      { label: 'Live app', href: 'https://rag-ai-g3dw5bbhivyujmf3p2qjtw.streamlit.app/', kind: 'live' },
    ],
  },
  {
    slug: 'voxmind',
    name: 'VoxMind',
    tagline: 'Real-time AI cyberbullying detection',
    summary:
      'A live chat platform that scores every message with a BERT toxicity model and alerts moderators on Telegram when harmful content appears.',
    team: 'Team project · Team VoxMind',
    highlights: ['1st place · TECH-ATHON 2026', 'BERT, 6 toxicity labels', 'Real-time'],
    problem:
      "Harmful messages in online chats are usually reported after the damage is done. Moderators can't read every message as it arrives.",
    solution:
      'Every chat message is classified the moment it is sent. The model\'s confidence becomes a 0–100 risk score with low, medium and high levels, and harmful messages trigger an instant Telegram alert while a dashboard charts the activity.',
    architecture: [
      { title: 'Chat client', detail: 'Multi-user chat rooms in the browser' },
      { title: 'Flask + Socket.IO', detail: 'Real-time message delivery' },
      { title: 'BERT classifier', detail: 'Six labels: toxic, severe toxic, obscene, threat, insult, identity hate' },
      { title: 'Risk scorer', detail: 'Model confidence → 0–100 score and risk level' },
      { title: 'Alerts & dashboard', detail: 'Telegram Bot API alerts; charts of flagged activity' },
    ],
    aiIntegration: [
      'A fine-tuned BERT sequence classifier loaded with Hugging Face Transformers and run with PyTorch for inference.',
      'Multi-label toxicity output mapped to a single interpretable risk score.',
    ],
    features: [
      'Real-time multi-user chat rooms',
      'Per-message toxicity classification across six categories',
      'Risk scoring with low, medium and high levels',
      'Telegram alerts with sender, message, category, risk level and timestamp',
      'Moderation dashboard with charts',
    ],
    tech: ['Python', 'Flask', 'Socket.IO', 'BERT', 'Hugging Face Transformers', 'PyTorch', 'Telegram Bot API', 'JavaScript', 'Chart.js'],
    links: [
      { label: 'Source code', href: 'https://github.com/YashwanthDhadi/AI_CyberBullying_Detection', kind: 'github' },
      { label: 'Team repository', href: 'https://github.com/VOXMIND1/AI_CyberBullying_Detection', kind: 'github' },
      {
        label: 'Demo video',
        href: 'https://drive.google.com/file/d/1n5-MAGPC_13_uSCxDLw63mVya7IBap82/view?usp=drivesdk',
        kind: 'demo',
      },
    ],
  },
  {
    slug: 'exam-proctoring',
    name: 'AI Exam Proctoring System',
    tagline: 'Computer-vision exam monitoring with integrity reports',
    summary:
      'A desktop exam app that watches the candidate through the webcam and their activity on the computer, scores integrity risk in real time, and produces a PDF report with evidence.',
    highlights: ['MediaPipe FaceMesh', 'Live risk score', 'PDF evidence reports'],
    problem:
      'Online exams are hard to supervise. A single invigilator cannot watch every candidate\'s camera, screen and activity at once.',
    solution:
      'A background proctoring engine combines webcam analysis with window and input tracking. It records each violation with an evidence snapshot, keeps a weighted risk score live on screen, and produces a written integrity summary and PDF report when the exam ends.',
    architecture: [
      { title: 'Camera check', detail: 'The exam cannot start until a face is detected' },
      { title: 'Proctoring thread', detail: 'Runs alongside the exam UI' },
      { title: 'Signals', detail: 'MediaPipe FaceMesh (face presence, count, gaze), active window, keyboard & mouse activity' },
      { title: 'Risk engine', detail: 'Weighted score, shown as a live badge' },
      { title: 'Reporting', detail: 'Rule-based summary, ReportLab PDF with evidence, SQLite session record' },
    ],
    aiIntegration: [
      'MediaPipe FaceMesh on OpenCV webcam frames detects face absence, multiple faces and looking away.',
      'Weighted risk scoring: multiple faces ×15, face missing ×10, window switch ×5, looking away ×3, inactivity ×2, banded into low, medium and high risk.',
    ],
    features: [
      'Live face, multiple-face and gaze detection',
      'Window-switch and prolonged-inactivity detection',
      'Automatic evidence capture on every violation',
      'Real-time risk score badge',
      'Rule-based integrity summary and PDF report with evidence images',
      'Exam sessions stored in SQLite',
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'CustomTkinter', 'SQLite', 'ReportLab', 'pynput'],
    notes: ['Desktop application built with CustomTkinter. MediaPipe requires Python 3.8–3.11.'],
    links: [
      { label: 'Source code', href: 'https://github.com/YashwanthDhadi/Online-Exam-Proctoring-system', kind: 'github' },
    ],
  },
]
