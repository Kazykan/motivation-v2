# Progress Tracker & Motivation App for Kids - Based on Margulan Sesenbaev's System

This application helps children track their progress and stay motivated, leveraging the principles of Margulan Sesenbaev's motivation system.  It's designed for use by both children and their parents.

## Technologies

* **Frontend:** React
* **Backend:** FastAPI

## Project Structure

The project is divided into two parts:

* **Frontend:**  Handles the user interface, allowing children to track their progress, view rewards, and engage with motivational elements based on Sesenbaev's system. Parents can monitor progress, adjust settings, and interact with the system to support their child's motivation. This code is located in the `frontend` directory.
* **Backend:** Provides a REST API for the frontend, managing user accounts, progress tracking, reward systems, and potentially integrating with external services.  This code is located in the `backend` directory.

## Features (Planned or Implemented)

* **Progress Tracking:**  Allows children to track their progress on various tasks and goals.  This could include daily/weekly checklists, habit trackers, or progress bars.
* **Reward System:** Integrates a reward system aligned with Sesenbaev's principles.  This might involve points, badges, or virtual rewards redeemable for real-world rewards.
* **Motivational Elements:** Incorporates motivational elements inspired by Sesenbaev's methods to encourage consistent effort and goal attainment.
* **Parental Controls:** Provides parental controls allowing parents to set goals, monitor progress, adjust reward systems, and communicate with their children within the app.
* **Gamification:** Uses game-like elements to make progress tracking engaging and fun.
* **Reporting/Analytics:** Offers reports and analytics to track progress over time.


## Getting Started

### Frontend

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```

2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm start
    ```

### Backend

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the backend:**
    ```bash
    uvicorn main:app --reload
    ```


## Usage

The frontend interacts with the backend API to manage user data, track progress, and handle rewards.


## API Endpoints (Backend)

A detailed list of available API endpoints and their usage is available in the `backend` directory's documentation (e.g., in the API documentation generated by FastAPI).


## License

This project is licensed under the [MIT License](LICENSE).
