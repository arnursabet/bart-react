# BART Trip Planner React App

A React application that helps users plan their BART (Bay Area Rapid Transit) trips by providing route information, schedules, and fare details.

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:
```sh
git clone https://github.com/arnursabet/bart-react.git
cd bart-react
```

2. Install dependencies:
```sh
npm install
```

3. Start development server:
```sh
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure
```sh
bart-react/
├── src/
│   ├── components/        # React components
│   ├── services/         # API services
│   └── styles/          # Global styles
├── public/              # Static assets
└── index.html          # Entry HTML file
```
## Fetch & Update Instructions
1. Fetch latest changes from remote:
```sh
git fetch origin
```

2. Check for any changes:
```sh
git status
```

3. Pull latest changes and merge:
```sh
git pull origin main
```

If you encounter conflicts:

```sh
# View conflicts
git diff

# After resolving conflicts
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

Note: Always fetch and pull before pushing to avoid merge conflicts.



## Commit Instructions

To push code changes directly to the main branch:

1. Stage your changes:
```sh
git add .
```

2. Commit your changes:
```sh
git commit -m "Your descriptive commit message"
```

3. Push to remote repository:
```sh
git push origin main
```

