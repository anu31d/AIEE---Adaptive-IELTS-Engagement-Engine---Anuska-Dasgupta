# Adaptive IELTS Engagement Engine (AIEE)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple.svg)](https://vitejs.dev/)

> **An Algorithm-Driven Solution to Improve Engagement During Long Preparation Cycles**

<p align="center">
  <img src="https://img.shields.io/badge/Status-Beta-yellow" alt="Status" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs Welcome" />
</p>

---

## 🎯 Problem Understanding

### User Demographics

Our primary users are students aged **18–26**—undergraduates, postgraduates, and early professionals preparing for IELTS while managing academics, work, and applications. They have **15–30 minutes** of fragmented daily prep time and are juggling competing priorities.

### Behavioral Traits

These users show high aspiration but low initial clarity. While motivated to study abroad, they struggle to structure long-term preparation effectively. Motivation is reactive—peaking near exam dates and declining during early preparation phases. A large content library creates **decision fatigue**, making it difficult to choose what to study next.

**Engagement inconsistency stems from:**
- Context switching between studies/work and exam prep
- Fatigue from long-term preparation with delayed rewards
- Preference for guided, short tasks over intensive sessions

### User Needs & Pain Points

- Lack of clarity on daily high-impact actions
- No visible short-term progress, reducing motivation
- Heavy, infrequent engagement drivers (mock tests, long videos)
- Difficulty building consistent preparation habits
- Low course completion due to irregular usage

### Core Problem

The current product doesn't intelligently adapt to user behaviour over long cycles, resulting in **weak habit formation**, **inconsistent engagement**, and **delayed motivation**.

---

## 💡 Proposed Solution: Adaptive IELTS Engagement Engine (AIEE)

AIEE is a **data-driven engagement layer** that personalises user activity during long preparation cycles. Instead of static plans or user-driven selection, it uses **algorithmic decision-making** to guide users toward the most effective next actions based on behaviour, time constraints, and skill dependencies.

> **Core Principle:** Maximise consistency over intensity—ensure continuous progress even during low-motivation periods.

---

## 🧠 Algorithmic Foundation

### 1. Association Rule Mining (Market Basket Analysis)
Treats learning sessions as transactions, identifying high-confidence action combinations (video + practice + speaking task) that drive continued engagement.

**Impact:** Reduces decision fatigue, increases multi-action sessions.

### 2. Sequential Pattern Mining
Analyses order-sensitive sequences that improve retention and consistency.

**Impact:** Prevents random content hopping, builds momentum through proven learning flows.

### 3. Greedy Time Optimisation
Ranks tasks by engagement gain per unit time, selecting the highest-impact actions for limited daily budgets.

**Impact:** Optimizes learning for time-poor users, increases completion rates.

### 4. Graph-Based Skill Dependency (DAG)
Models IELTS skills as a directed graph, ensuring prerequisite mastery before advancement.

**Impact:** Improves learning efficiency, reduces frustration.

### 5. Recency-Weighted Sliding Window
Tracks engagement over rolling windows to detect early disengagement signals.

**Impact:** Enables proactive re-engagement, prevents silent churn.

### 6. Multi-Armed Bandit Strategy
Balances the exploitation of effective tasks with the exploration of new types to prevent monotony.

**Impact:** Sustains long-term engagement, continuously improves recommendations.

---

## ✅ Why This Works

- ✅ Leverages existing content (minimal engineering overhead)
- ✅ Adapts automatically as behavior evolves
- ✅ Converts long-term goals into short-term wins
- ✅ Makes progress visible and motivating

---

## 🔄 User Experience Flow

### 1. Onboarding
Users input exam date, daily prep time, and target band score. AIEE initializes a skill graph and generates a **personalized 7-day plan**.

### 2. Daily Engagement Loop
Users see **2–3 micro-actions** optimized for their time budget with clear estimates and contextual rationale:

> *"Users like you see the most progress after completing these actions."*

Completed tasks update the skill graph, confidence scores, and future recommendations in real-time.

### 3. Adaptive Re-Engagement
When activity drops, the system shifts to **high-confidence, low-effort tasks**, prioritizing the shortest skill paths. Messaging emphasizes ease and momentum, not guilt.

### 4. Weekly Feedback
Users receive skill-wise progress summaries, updated score trajectories, and the next optimized learning sequence—creating a **closed-loop system** where behavior directly shapes guidance.

---

## 📊 Success Metrics

### Primary Engagement Metrics

| Metric | Description |
|--------|-------------|
| **Average Sessions per User (First 4 Weeks)** | Measures habit formation and platform stickiness during the critical early period |
| **Weekly Active Learning Days per User** | Tracks consistency and sustained momentum throughout preparation |

### Secondary Metric

| Metric | Description |
|--------|-------------|
| **Course Completion Velocity** | Units completed per active week—reflects both efficiency and sustained engagement depth |

These metrics capture consistency and depth of engagement, directly correlating with improved preparation outcomes.

---

## 🚀 Getting Started

### Prerequisites
- Node.js

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

   > 💡 You can get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the app.

### Deploying to GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

1. **Push your code to GitHub**
2. **Add your API key as a secret:**
   - Go to your repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"

4. **The site will be automatically deployed** on every push to the `main` branch at:
   `https://yourusername.github.io/AIEE/`

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI:** Google Gemini API

---

## 📁 Project Structure

```
AIEE/
├── algorithms/          # Core recommendation algorithms
│   ├── optimizer.ts     # Greedy time optimization
│   ├── recommendationEngine.ts
│   └── skillGraph.ts    # DAG-based skill dependencies
├── components/          # React UI components
│   ├── Dashboard.tsx
│   ├── Layout.tsx
│   ├── Onboarding.tsx
│   ├── ProgressView.tsx
│   ├── TaskExecution.tsx
│   └── TodaySprint.tsx
├── services/            # External service integrations
│   └── geminiService.ts
├── App.tsx              # Main application component
├── types.ts             # TypeScript type definitions
└── constants.ts         # Application constants
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🏁 Conclusion

The **Adaptive IELTS Engagement Engine** transforms IELTS preparation from passive consumption into an **intelligent, adaptive, habit-forming system**. By combining multiple algorithmic techniques, it addresses core engagement gaps and enables users to progress confidently toward their target scores.

---

<p align="center">Made with ❤️ for IELTS aspirants worldwide</p>
