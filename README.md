# 👑 Queens Evolution

Welcome to **Queens Evolution**, an interactive web application that provides a real-time visualization of a genetic algorithm solving the classic 8-Queens puzzle. This project demonstrates the principles of evolutionary computation in a dynamic and engaging way, allowing users to tweak parameters and observe the impact on the solution's convergence.

Built with Next.js, TypeScript, and Tailwind CSS, the application features an AI-powered advisor that suggests optimal algorithm parameters, making it a powerful educational tool for anyone interested in AI and genetic algorithms.

## ✨ Features

-   **Interactive Chessboard**: A visual representation of the 8x8 board where you can see the queens' positions evolve.
-   **Draggable Queens**: When the simulation is stopped, you can manually drag and drop queens to create your own starting chromosome.
-   **Real-Time Statistics**: Track the simulation's progress with live updates on:
    -   **Generation Count**: How many generations have passed.
    -   **Best Fitness**: The fitness score of the top-performing individual (a perfect score is 28).
    -   **Elapsed Time**: A timer that tracks how long it takes to find a solution.
-   **Configurable Parameters**: Adjust the **Population Size** and **Mutation Rate** to see how they affect the algorithm's performance and speed.
-   **AI Heuristic Advisor**: Get intelligent suggestions for the population size and mutation rate from a Genkit-powered AI to optimize the simulation.
-   **Dual Display Modes**: Toggle between viewing the **Best Individual** in the current generation or cycling through **Random Individuals** every second to see the population's diversity.
-   **Customizable Themes**: Personalize the application's look and feel with several built-in color themes.

## 🛠️ Technology Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   `npm` or your favorite package manager

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
| ![Screenshot 1](<img width="1777" height="1079" alt="image" src="https://github.com/user-attachments/assets/64a1c6bf-b938-456c-9e64-e9a5837ec9f6" />) | ![Screenshot 2](<img width="1775" height="1079" alt="image" src="https://github.com/user-attachments/assets/db36acad-a9ac-4d90-8987-24ae49ae329e" />) |


👤 Author

Robert Burke
Oklahoma Christian University

🧾 License

This project is open source and intended for educational and portfolio use.
Feel free to explore, fork, and learn from it!
