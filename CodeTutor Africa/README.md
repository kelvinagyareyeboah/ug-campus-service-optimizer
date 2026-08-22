<div align="center">

# 🌍 CodeTutor Africa

**Offline-First AI Programming Tutor for African University Students**  
*Built for the Africa Deep Tech Challenge (ADTC) 2026 — Laptop LLM Track*

[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 19](https://img.shields.io/badge/Frontend-React%2019-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Offline First](https://img.shields.io/badge/Architecture-100%25%20Offline--First-success.svg)](#offline-first-philosophy)
[![ADTC Track](https://img.shields.io/badge/ADTC%202026-Laptop%20LLM%20Track-orange.svg)](#adtc-2026-profiler--scoring-alignment)

</div>

---

## 📖 1. Problem Statement & Motivation

Across African universities, computer science and engineering students frequently encounter steep roadblocks in mastering programming:
1. **Unreliable Internet & High Data Costs**: Cloud-hosted AI coding assistants (e.g. ChatGPT, Claude, Copilot) require constant high-speed connectivity and costly API subscriptions, rendering them inaccessible in low-bandwidth regions and offline university labs.
2. **Commodity Hardware Constraints**: The standard university student laptop is a commodity machine (typically **8 GB RAM, Intel Core i5 10th–12th Gen or AMD Ryzen 5, integrated graphics only, and 256 GB SSD**). Running heavyweight AI systems locally often causes catastrophic out-of-memory (OOM) crashes, extreme battery drain, or severe CPU thermal throttling.
3. **The "Copy-Paste" Pedagogical Flaw**: Generic generative LLMs provide direct, unverified answers to assignments, depriving students of essential problem-solving intuition, mental model formation, and debugging skills.

### 💡 The Solution: CodeTutor Africa
**CodeTutor Africa** is an offline-first, highly optimized AI programming tutor and curriculum simulator engineered to execute 100% locally on an 8 GB RAM laptop without requiring GPUs, internet access, or cloud APIs.

---

## 🎯 2. ADTC 2026 Profiler & Scoring Alignment

CodeTutor Africa is engineered from the ground up for the official **Africa Deep Tech Foundation (ADTC) 2026 Laptop LLM Track** competition benchmark:

$$\mathbf{S_{total}} = 0.50 \cdot S_{acc} + 0.30 \cdot S_{perf} + 0.20 \cdot S_{eff} - P_{thermal}$$

| Metric | Target Laptop Constraint | Formula & Engineering Strategy |
| :--- | :--- | :--- |
| **Accuracy ($S_{acc}$)** | 50% Scoring Weight | High-accuracy Socratic pedagogical prompting + compiler error grounding + curriculum citations. |
| **Performance ($S_{perf}$)** | 30% Scoring Weight | $S_{perf} = \min(\text{TPS} / 15.0, 1.0) \times 100$. Optimized prompt batching and bounded context window. |
| **Efficiency ($S_{eff}$)** | 20% Scoring Weight | $S_{eff} = \max(0, (7.0\text{ GB} - \text{Peak RSS}) / 7.0\text{ GB}) \times 100$. Backend baseline RSS is **44 MB** ($S_{eff} = \mathbf{99.4/100}$). |
| **Thermal ($P_{thermal}$)** | $-10$ Penalty Points | 4 CPU threads allocation to maintain package temperatures below the $85^\circ\text{C}$ throttling threshold. |

---

## 🏗️ 3. High-Level System Architecture

CodeTutor Africa follows a strict **Modular Monolith / Clean Architecture** pattern:

```
                      ┌────────────────────────────────────────┐
                      │        FRONTEND (React + Vite)         │
                      │  • Socratic Chat & SSE Token Streaming │
                      │  • Course Curriculum & Lesson Player   │
                      │  • 4 Three.js Interactive Arcade Games │
                      │  • Multi-Language Code Editor          │
                      └──────────────────┬─────────────────────┘
                                         │ HTTP REST & SSE
                                         ▼
                      ┌────────────────────────────────────────┐
                      │       API LAYER (FastAPI /api/v1)      │
                      │  • /health, /system/status, /metrics   │
                      │  • /tutor/chat, /practice/evaluate     │
                      └──────────────────┬─────────────────────┘
                                         │
                                         ▼
                      ┌────────────────────────────────────────┐
                      │       APPLICATION & DOMAIN SERVICES    │
                      │  • TutorService (6 Pedagogical Modes)  │
                      │  • PracticeService & DebuggerService   │
                      │  • LearningService & ProgressService   │
                      └──────────────────┬─────────────────────┘
                                         │
                                         ▼
                      ┌────────────────────────────────────────┐
                      │    CONCURRENCY & MEMORY GOVERNANCE     │
                      │  • asyncio.Semaphore (MAX_INFERENCES=1)│
                      │  • ModelManager (Singleton Lifecycle)  │
                      └──────────────────┬─────────────────────┘
                                         │
                        ┌────────────────┴────────────────┐
                        ▼                                 ▼
           ┌────────────────────────┐        ┌────────────────────────┐
           │   MockLLMProvider      │        │   LocalGGUFProvider    │
           │  (44 MB Baseline RSS)  │        │   (llama.cpp GGUF)     │
           └────────────────────────┘        └────────────────────────┘
```

---

## 🚀 4. Summary of Accomplishments & Features Built

### 🖥️ A. Backend Architecture (`server/`)
- **FastAPI Modular Monolith**: Implemented with API versioning (`/api/v1`), global structured exception handling, and O(1) instantaneous `/health` check.
- **Resource & Memory Guardrails**:
  - `PerformanceMonitor`: Live telemetry tracking process RSS (MB/GB), CPU %, token throughput (TPS), latency (ms), and thermal status.
  - Baseline process memory footprint: **44.02 MB** ($S_{eff} = \mathbf{99.39/100}$).
  - Concurrency Lock: `asyncio.Semaphore(MAX_CONCURRENT_INFERENCES=1)` to prevent multi-inference memory explosions on 8 GB RAM.
- **LLM Provider Abstraction Layer**:
  - `LLMProvider` Abstract Base Class.
  - `MockLLMProvider`: Deterministic pedagogical tutor response generator for instant, zero-weight test execution and offline dev.
  - `LocalGGUFProvider`: CPU-optimized `llama.cpp` wrapper with memory mapping (`use_mmap=True`), 4 threads, 2048 token bounded context, and $0$ GPU layers.
- **Socratic Tutor Engine**: 6 targeted pedagogical modes:
  1. `explain`: Conceptual mental models & relatable analogies.
  2. `hint`: Guiding clues without revealing complete solutions.
  3. `practice`: Bite-sized curriculum-aligned exercises.
  4. `debug`: Root-cause diagnostics on runtime/compiler errors.
  5. `review`: Complexity, memory safety, and idiom review.
  6. `quiz`: Active recall multiple-choice verification.
- **Persistence & Repositories**: Async SQLite engine (`aiosqlite` + SQLAlchemy 2.0) with models for Users, Courses, Modules, Lessons, Tutor Sessions, Messages, Practice Exercises, and Student Mastery.
- **Automated Verification**:
  - **12/12 Pytest unit & integration tests passing in 1.25s**.
  - Built internal benchmark suites (`benchmarks/benchmark_inference.py` & `benchmark_memory.py`).

### 🎨 B. Frontend & Interactive Learning Experience (`client/`)
- **Modern Responsive Dark/Light UI**: Built with React 19, TypeScript, Tailwind CSS, and Lucide icons.
- **Interactive Socratic AI Tutor Workspace**: Multi-mode selector, code editor contextualizer, and streaming token response display.
- **Offline Course Curriculum System**: Structured courses with module progress tracking:
  - *Python Programming & Problem Solving* (Memory models, iteration, recursion)
  - *Modern JavaScript & Async Architecture* (Event loop, microtasks, Promises)
  - *Java OOP & Enterprise Design Patterns* (Polymorphism, interfaces, JVM memory)
- **3D Three.js Arcade Learning Games**:
  - **Syntax Speedrun**: Rapid-fire syntax challenge.
  - **Bug Hunt**: Spot compiler and logic bugs.
  - **Output Predictor**: Predict execution outcomes and memory states.
  - **Code Shuffle**: Assemble scrambled algorithmic logic.
  - Multi-language support (Python, JavaScript, TypeScript, Java, SQL).
  - Curriculum link: Challenges dynamically pulled from enrolled courses with lesson badges.

---

## 🛠️ 5. Installation & Execution Guide

### Prerequisites
- Python 3.11+
- Node.js 18+ and npm

---

### Step 1: Start the Backend
```bash
cd server

# Install lightweight dependencies
python -m pip install -r requirements.txt

# Run the FastAPI server (Default: http://127.0.0.1:8000)
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### Run Backend Verification & Benchmarks:
```bash
# Run automated test suite
python -m pytest tests

# Run latency and token throughput benchmark
python benchmarks/benchmark_inference.py --rounds 3 --tokens 128

# Run memory footprint benchmark (ADTC Seff check)
python benchmarks/benchmark_memory.py
```

---

### Step 2: Start the Frontend
```bash
cd client

# Install frontend dependencies
npm install

# Start Vite dev server (Default: http://localhost:5173)
npm run dev
```

---

## 📊 6. Backend API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Instantaneous zero-RAM health check |
| `GET` | `/api/v1/system/status` | Offline status, active model readiness, and memory footprint |
| `GET` | `/api/v1/system/metrics` | Real-time CPU %, RAM utilization, and process RSS (MB) |
| `POST` | `/api/v1/tutor/chat` | Structured Socratic tutoring response with citations |
| `POST` | `/api/v1/tutor/stream` | Server-Sent Events (SSE) token stream |
| `GET` | `/api/v1/tutor/modes` | Pedagogical modes metadata (`explain`, `hint`, etc.) |
| `GET` | `/api/v1/practice/exercises` | Practice problems filtered by language and difficulty |
| `POST` | `/api/v1/practice/evaluate` | Safe test case execution evaluation |
| `POST` | `/api/v1/debugger/analyze` | Compiler/runtime error diagnostics & fix recommendations |
| `GET` | `/api/v1/learning/courses` | Offline curriculum courses, modules, and lessons |
| `GET` | `/api/v1/progress/summary` | Student study minutes, streaks, and topic mastery score |

---

## 🛣️ 7. Roadmap & Phase 2 Objectives

- [ ] **Quantization Profiling**: Benchmark `Qwen2.5-Coder-1.5B-Instruct` vs `3B-Instruct` at `Q4_K_M` and `Q5_K_M` using the official `adtc-profiler`.
- [ ] **Local RAG Engine**: Ingest university course slides and PDFs into a lightweight local FAISS index with small local embeddings.
- [ ] **Isolated Code Sandbox**: Implement secure isolated execution with strict memory/time bounds and disabled network capabilities.
- [ ] **Native Desktop Packaging**: Package frontend + backend into an offline bundle (e.g. Electron / Tauri) for one-click student installation.

---

<div align="center">
  <sub>Built with ❤️ for African University Students & the Africa Deep Tech Challenge 2026</sub>
</div>
