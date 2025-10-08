# 👑 Queens Evolution

**Queens Evolution** (also known as *Eight Queens AI*) is an interactive web application that visualizes a **genetic algorithm** solving the classic *Eight Queens* problem.  
This project demonstrates the principles of **evolutionary computation** and **heuristic optimization** in a dynamic, visual way — allowing users to tweak parameters, observe convergence, and even receive AI-powered recommendations for better performance.

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, the application provides an engaging, hands-on exploration of artificial intelligence and algorithmic problem-solving.

---

## 💡 Project Motivation

This project was created as a **personal learning and portfolio project** to explore key AI concepts such as **genetic algorithms**, **heuristics**, and **parameter optimization**.  
The goal was to build an interactive tool that helps visualize how algorithms evolve toward optimal solutions over time.  
It also serves as an **educational showcase** for understanding population dynamics, fitness evaluation, and adaptive learning — implemented with modern web technologies.

---

## ✨ Features

- ♟️ **Interactive Chessboard** – Watch the queens evolve toward a valid configuration in real time.  
- 🖱️ **Draggable Queens** – Pause the simulation and manually reposition queens to test new configurations.  
- 📊 **Real-Time Statistics** – Track:
  - **Generation Count**
  - **Best Fitness** (perfect = 28)
  - **Elapsed Time**
- ⚙️ **Configurable Parameters** – Adjust **Population Size** and **Mutation Rate** to observe their impact.  
- 🧠 **AI Heuristic Advisor** – A Firebase Genkit-powered advisor that suggests optimal parameter values.  
- 🌀 **Dual Display Modes** – View the best individual in the population or cycle through random ones.  
- 🎨 **Customizable Themes** – Choose from multiple color themes for personalized visualization.  
- 🧾 **Educational Focus** – Built to help students and enthusiasts learn about AI evolution through visualization.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI / Generative:** [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting / Backend:** [Firebase Hosting](https://firebase.google.com/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` or any compatible package manager

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## 📂 Project Structure

-   `src/app/`: Contains the main application pages and routing logic.
-   `src/components/`: Houses all the reusable React components, organized by feature.
-   `src/lib/`: Includes core logic, utility functions, and type definitions.
    -   `genetic-algorithm.ts`: The core implementation of the genetic algorithm.
    -   `themes.ts`: Definitions for the different UI color themes.
-   `src/ai/`: Home for all AI-related code, including Genkit flows and prompts.
    -   `flows/suggest-parameters.ts`: The AI flow for the Heuristic Advisor.
-   `public/`: Static assets.
-   `package.json`: Project dependencies and scripts.

🖼️ Screenshots
| Algorithm in Action             | Solution Found                  |
| ------------------------------- | ------------------------------- |
| <img width="1774" height="1073" alt="image" src="https://github.com/user-attachments/assets/3be1d3a3-dd88-4971-b445-5f7aa0118bac" /> | <img width="1775" height="1079" alt="image" src="https://github.com/user-attachments/assets/bf2ce110-2d42-433c-9cac-24f2114cdf24" /> | 


👤 Author

Robert Burke
Oklahoma Christian University

🧾 License

This project is open source and intended for educational and portfolio use.
Feel free to explore, fork, and learn from it!
