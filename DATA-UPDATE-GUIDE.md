# Portfolio Data Update Guide

## Overview
Your portfolio now uses a JSON file (`data.json`) to store all content. This makes it easy to update your portfolio without touching the HTML code.

## How to Update Content

### 1. Personal Information
Edit the `personalInfo` section in `data.json`:
```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your-email@example.com",
    "phone": "+91 1234567890",
    "birthday": "1 January, 2000",
    "location": "Your City, State, Country",
    "resumeUrl": "https://your-resume-link.com"
  }
}
```

### 2. Social Media Links
Update the `socialLinks` array:
```json
{
  "socialLinks": [
    {
      "name": "GitHub",
      "url": "https://github.com/yourusername",
      "icon": "logo-github"
    }
  ]
}
```

### 3. About Section
Update your bio and services in the `about` section:
```json
{
  "about": {
    "description": [
      "Your first paragraph...",
      "Your second paragraph...",
      "Your third paragraph..."
    ],
    "services": [
      {
        "title": "Service Title",
        "description": "Service description",
        "icon": "./assets/images/icon-dev.svg"
      }
    ]
  }
}
```

### 4. Resume Data
Update education, experience, certifications, etc.:
```json
{
  "resume": {
    "education": [
      {
        "title": "University Name",
        "period": "2020 — 2024",
        "description": "Degree description",
        "link": "https://university-website.com"
      }
    ],
    "experience": [
      {
        "title": "Job Title",
        "period": "Jan 2024 — Present",
        "description": "Company description",
        "link": "https://company-website.com"
      }
    ]
  }
}
```

### 5. Portfolio Projects
Add or update projects:
```json
{
  "portfolio": {
    "projects": [
      {
        "title": "Project Name",
        "category": "Web Development",
        "image": "./assets/images/project-1.jpg",
        "liveUrl": "https://project-demo.com",
        "githubUrl": "https://github.com/username/project"
      }
    ]
  }
}
```

### 6. Blog Posts
Update blog content:
```json
{
  "blog": {
    "posts": [
      {
        "title": "Blog Post Title",
        "category": "Technology",
        "date": "2024-01-15",
        "image": "./assets/images/blog-1.jpg",
        "description": "Blog post description"
      }
    ]
  }
}
```

## Available Icons
Use these icon names for social links and other elements:
- `logo-github`, `logo-linkedin`, `logo-twitter`, `logo-instagram`
- `logo-youtube`, `logo-whatsapp`, `logo-snapchat`
- `restaurant-outline`, `flash-outline`, `code-slash-outline`
- `paper-plane-outline`, `book-outline`, `ribbon-outline`
- `language-outline`, `trophy-outline`, `eye-outline`

## How It Works
1. The `data-loader.js` file fetches `data.json` when the page loads
2. It populates all sections of your portfolio automatically
3. No need to edit HTML files - just update the JSON data
4. Changes take effect immediately when you refresh the page

## File Structure
```
portfolio/
├── data.json                 # All your portfolio data
├── assets/js/data-loader.js  # Loads and populates data
├── assets/js/script.js       # Main functionality
└── index.html               # Portfolio structure (no content)
```

## Tips
- Always backup your `data.json` file before making changes
- Use proper JSON formatting (commas, quotes, brackets)
- Test your changes by refreshing the page
- Keep image paths relative to the project root
