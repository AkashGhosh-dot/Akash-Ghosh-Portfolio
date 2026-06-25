import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "netflix-data-analysis",
    title: "Netflix Data Analysis",
    subtitle: "Business Insights & Content Strategy",
    category: "Data Analysis",
    summary:
      "Analyzed a Netflix dataset to uncover user behavior patterns, content trends, and engagement signals — translating data into strategic content recommendations.",
    problem:
      "The streaming platform needed clarity on which content types drive the most engagement and how to optimize its content acquisition strategy across audience segments.",
    context:
      "With the streaming market increasingly competitive, content strategy decisions must be backed by data. This analysis extracted actionable business insights from a comprehensive Netflix dataset to inform strategic planning.",
    objectives: [
      "Identify top-performing content types, genres, and formats",
      "Analyze content release patterns and their relationship to engagement",
      "Understand regional preferences and audience segmentation",
      "Deliver data-driven recommendations for content strategy optimization",
    ],
    approach: [
      "Data collection and initial exploration of the Netflix dataset",
      "Data cleaning and preprocessing using Python (Pandas, NumPy)",
      "Exploratory Data Analysis (EDA) to surface patterns and anomalies",
      "Content categorization and genre-level performance analysis",
      "Visualization of key findings using Matplotlib and Seaborn",
      "Formulation of prioritized business recommendations",
    ],
    findings: [
      "Identified the dominant content categories driving viewer engagement",
      "Discovered seasonal patterns in content releases and viewership cycles",
      "Mapped regional content preferences for targeted acquisition strategy",
      "Revealed correlation between content rating and audience retention metrics",
      "Uncovered portfolio gaps representing strategic acquisition opportunities",
    ],
    recommendations: [
      "Prioritize content types with the highest engagement-to-cost ratio",
      "Align content release schedules with peak viewership periods",
      "Develop region-specific strategies based on audience preference data",
      "Balance original vs. licensed content based on ROI trend analysis",
    ],
    results: [
      "Delivered comprehensive content strategy insights for decision-makers",
      "Identified 3+ key content portfolio gaps for strategic opportunity",
      "Produced executive-ready visualization dashboard with actionable recommendations",
    ],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook", "Excel"],
    lessonsLearned: [
      "Data quality is the foundation — cleaning consumed 40% of project time but was essential for valid conclusions",
      "Business context must drive analytical choices, not just statistical significance",
    ],
    featured: true,
  },
  {
    id: "house-price-prediction",
    title: "House Price Prediction Model",
    subtitle: "Predictive Analytics & Machine Learning",
    category: "Predictive Analytics",
    summary:
      "Built an ML model to predict residential property prices using feature engineering and regression techniques, identifying the key drivers of property value.",
    problem:
      "Real estate pricing lacks transparency and consistency. A data-driven prediction model can help buyers, sellers, and agents make more informed, defensible pricing decisions.",
    context:
      "Property valuation is influenced by hundreds of variables. This project applied machine learning to systematically quantify the most impactful pricing factors and deliver a repeatable prediction framework.",
    objectives: [
      "Build a reliable regression model for residential property price prediction",
      "Identify and rank the top features driving property value",
      "Achieve competitive accuracy across training and test data",
      "Create a reusable analytical framework for real-world application",
    ],
    approach: [
      "Exploratory data analysis to understand feature distributions and correlations",
      "Feature engineering to construct informative derived variables",
      "Baseline model development using Linear Regression",
      "Advanced modeling with Random Forest and ensemble techniques",
      "Hyperparameter tuning and k-fold cross-validation",
      "Feature importance analysis to surface key pricing drivers",
    ],
    findings: [
      "Location, square footage, and build year ranked as the top 3 price predictors",
      "Non-linear relationships existed between multiple features and final price",
      "Feature engineering improved model performance significantly over raw inputs",
      "Ensemble methods measurably outperformed the linear baseline",
    ],
    recommendations: [
      "Deploy model as a pricing support tool for agents and buyers",
      "Establish a retraining pipeline on new market data to maintain accuracy",
      "Incorporate additional signals (school ratings, transit proximity) in v2",
    ],
    results: [
      "Successfully built and evaluated multiple regression models end-to-end",
      "Identified top pricing factors with statistical significance",
      "Delivered a deployable prediction framework validated on held-out test data",
    ],
    tools: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    lessonsLearned: [
      "Feature engineering outweighs model complexity — well-crafted features beat a complex model on raw data",
      "Cross-validation is non-negotiable on smaller datasets to avoid misleading accuracy metrics",
    ],
    featured: true,
  },
];
