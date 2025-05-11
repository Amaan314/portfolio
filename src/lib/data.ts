
import type { LucideIcon } from "lucide-react";
import { Code, Cpu, Database, Users, Brain, Paintbrush, Palette, GitBranch, Server, Smartphone, Cloud, Component, Zap, Share2 } from "lucide-react"; // Added Zap for ML, Share2 for Scraping

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: "Frontend" | "Backend" | "DevOps" | "Design" | "Soft Skills" | "Other";
}

export const skillsData: Skill[] = [
  { name: "HTML5", icon: Code, category: "Frontend" },
  { name: "CSS3", icon: Palette, category: "Frontend" },
  { name: "JavaScript", icon: Code, category: "Frontend" },
  { name: "TypeScript", icon: Code, category: "Frontend" },
  { name: "React", icon: Component, category: "Frontend" },
  { name: "Next.js", icon: Component, category: "Frontend" },
  { name: "Tailwind CSS", icon: Paintbrush, category: "Frontend" },
  { name: "Node.js", icon: Server, category: "Backend" },
  { name: "Express.js", icon: Server, category: "Backend" },
  { name: "Python", icon: Code, category: "Backend" },
  { name: "SQL", icon: Database, category: "Backend" },
  { name: "MongoDB", icon: Database, category: "Backend" },
  { name: "Git", icon: GitBranch, category: "DevOps" },
  { name: "Docker", icon: Cloud, category: "DevOps" },
  { name: "Figma", icon: Paintbrush, category: "Design" },
  { name: "Problem Solving", icon: Brain, category: "Soft Skills" },
  { name: "Communication", icon: Users, category: "Soft Skills" },
  { name: "Teamwork", icon: Users, category: "Soft Skills" },
];

export type ProjectCategory = "Web Development" | "Machine Learning" | "Artificial Intelligence" | "Web Scraping" | "Other";

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  imageUrl: string;
  imageHint: string;
  techStack: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: "music-player",
    title: "Music Player",
    description:
      "Developed a responsive music player web app using **Next.js**, providing users with an intuitive interface to browse and listen to audio tracks seamlessly.",
    detailedDescription: `Music Player Web App is a sleek, interactive player built with Next.js and Tailwind CSS. It lets users play music from their local device, create and manage playlists, and enjoy intuitive playback controls—all within a modern, responsive UI.
Users can easily drag and drop files, upload from their device, and control playback (play, pause, skip, rewind) through a clean interface. The app is lightweight yet feature-rich, perfect for personal music listening.

Key Features:
- Drag and Drop Upload: Easily import music files for playback.
- Custom Playlists: Create and manage your own playlists.
- Track Metadata: View song title, artist, and other details.
- Responsive Design: Works smoothly across all screen sizes.
- Playback Controls:
  - Play, pause, skip, rewind.
  - Seek through songs via a progress bar.
- Interactive Song List: Browse and switch between tracks.
- Tailwind Styling: Clean, modern look with minimal, elegant design.
`,
    imageUrl: "https://i.ibb.co/b5WLDZm7/music-player.png",
    imageHint: "Music Player",
    techStack: ["Next.js", "Tailwind CSS", "JavaScript (ES6+)", "React"],
    category: "Web Development",
    liveUrl: "https://music-player-ap.vercel.app/",
    githubUrl: "https://github.com/AmaanP314/music-player",
  },
  {
    id: "recipe-finder",
    title: "Recipe Finder",
    description:
      "Built a dynamic application using vanilla JavaScript and SCSS that allows users to search over a million recipes, view detailed instructions, and upload their own recipes. Integrated with the Forkify API.",
    detailedDescription: `Recipe Finder is a responsive web app that helps users discover recipes based on ingredients, dietary preferences, and more. Built with JavaScript, HTML, and Sass, it offers an interactive and user-friendly experience across all devices.
Key Features:
- Recipe Search: Find recipes by ingredient, cuisine, or name.
- Recipe Details: View full recipe info, including:
  - Title
  - Publisher
  - Prep Time
  - Servings
  - Ingredients (formatted as: Quantity, Unit, Description)
- Adjustable Servings: Change servings, and ingredients auto-scale accordingly.
- Bookmarks: Save favorite recipes for easy access.
- Pagination: Browse large sets of results page by page.
`,
    imageUrl: "https://i.ibb.co/PGgPRJGZ/recipe-finder.png",
    imageHint: "Recipe Finder",
    techStack: ["HTML", "CSS/SCSS", "JavaScript", "Node.js"],
    category: "Web Development",
    liveUrl: "https://forkify-ten-sooty.vercel.app/",
    githubUrl: "https://github.com/AmaanP314/recipe-finder",
  },
  {
    id: "project-5",
    title: "Sentiment Analyzer",
    description: "A machine learning model that analyzes text input and predicts its sentiment (positive, negative, neutral).",
    detailedDescription: `This Sentiment Analyzer utilizes Natural Language Processing (NLP) techniques to determine the emotional tone of a given text.
Key aspects:
- Trained on a large dataset of text reviews.
- Uses a transformer-based model for high accuracy.
- Provides sentiment scores and classification.
- Simple API endpoint for integration.

The model is built using Python with libraries like TensorFlow/Keras or PyTorch, and Scikit-learn. Flask/FastAPI is used to serve the model as an API. This project showcases skills in machine learning model development and deployment.
    `,
    imageUrl: "https://picsum.photos/seed/project5/600/400",
    imageHint: "AI algorithm",
    techStack: ["Python", "TensorFlow", "NLP", "Flask", "Machine Learning"],
    category: "Machine Learning",
    githubUrl: "#",
  },
  {
    id: "youtube-recommender",
    title: "YouTube Video Recommender",
    description:
      "This project allows users to analyze and recommend YouTube videos based on specific search queries.",
    detailedDescription: `This project allows users to analyze and recommend YouTube videos based on specific search queries. It fetches video data using the YouTube Data API v3, processes and visualizes the data, and performs sentiment analysis on video comments using a finetuned roberta LLM which was finetuned on over 1 million youtube comments to provide better recommendations.
Key features:
- Fetches video data using the YouTube Data API v3.
- Analyzes video metadata and comments.
- Implements asynchronous requests and await to handle API calls efficiently, addressing the synchronous behavior of the previous version.
- Visualizations and data processing are now performed asynchronously, reducing page load times and enhancing user experience.
- Uses AJAX for real-time retrieval and rendering of results without requiring a full page refresh.
- Provides visualizations for key metrics:
  - Total views, likes, and comments.
  - Engagement rate.
  - Composite score.
- Performs sentiment analysis on video comments and visualizes the results.
- Suggests relevant videos based on data analysis and sentiment.
`,
    imageUrl: "https://i.ibb.co/jLjsC7q/youtube-data.png",
    imageHint: "Youtube video recommender",
    techStack: ["Quart", "asyncio", "pandas", "matplotlib", "shelve", "seaborn"],
    category: "Artificial Intelligence",
    liveUrl: "https://youtube-video-recommender.onrender.com",
    githubUrl: "https://github.com/AmaanP314/youtube-video-recommender",
  },
  {
    id: "ielts-evaluator",
    title: "IELTS Essay Evaluator",
    description:
      "The IELTS Essay Evaluator is an AI-powered application designed to assess IELTS Writing Task 2 essays based on official IELTS scoring criteria",
    detailedDescription: `The IELTS Essay Evaluator is an AI-powered application designed to assess IELTS Writing Task 2 essays based on official IELTS scoring criteria. It provides detailed evaluations for each criterion including Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. After submission, users receive an overall band score and a breakdown of their essay’s strengths and weaknesses, alongside visualizations and the ability to export the results.
Key features:
- **Essay Evaluation**: Automatically evaluates essays against the four IELTS Writing Task 2 criteria:
  - **Task Response**: How well the essay addresses the prompt.
  - **Coherence and Cohesion**: Structure, clarity, and logical flow.
  - **Lexical Resource**: Vocabulary usage and range.
  - **Grammatical Range and Accuracy**: Grammar usage and complexity.
- **Band Score Calculation**: Each criterion is assigned a score between 1 and 9, and an overall band score is calculated based on the evaluations.
- **Visualization**: Displays a bar chart showing the scores for each criterion, with a line for the overall band score.
- **Results Export**: The evaluation results can be downloaded as a JSON file for future reference or analysis.
- **Example Essay**: Load a pre-filled example essay to test the application’s functionality.
- **Helpful Tips**: Provides tips on how to improve your IELTS Writing score.
`,
    imageUrl: "https://i.ibb.co/7xkTDMJr/IELTS.png",
    imageHint: "IELTS Essay Evaluator",
    techStack: [
      "Python",
      "LangChain",
      "LLM",
      "Streamlit",
      "Pandas",
      "Matplotlib",
    ],
    category: "Artificial Intelligence",
    liveUrl: "https://huggingface.co/spaces/AmaanP314/IELTS-essay-evaluator",
    githubUrl: "https://github.com/AmaanP314/ielts-essay-evaluator/",
  },
  {
    id: "project-6", 
    title: "News Aggregator Scraper",
    description: "A web scraping tool that collects news articles from various sources and aggregates them into a single feed.",
    detailedDescription: `The News Aggregator Scraper is a Python-based tool designed to automate the collection of news articles.
Features:
- Scrapes headlines, summaries, and links from multiple news websites.
- Handles different website structures and anti-scraping measures.
- Stores data in a structured format (e.g., JSON or CSV).
- Can be scheduled to run periodically for fresh data.

Built with Python, using libraries like BeautifulSoup for parsing HTML and Requests for HTTP requests. Potential use of Scrapy framework for more complex scraping tasks. Demonstrates ability to extract and process data from the web.
    `,
    imageUrl: "https://picsum.photos/seed/project6/600/400",
    imageHint: "data extraction code",
    techStack: ["Python", "BeautifulSoup", "Requests", "Web Scraping", "Data Extraction"],
    category: "Web Scraping",
    liveUrl: "#",
  },
];
