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



## Limitations & Future Development of App

- **BART API Dependency**: The app depends primarily on the BART API to show live data.
In the case of API downtime or not working, the information in the app might be outdated or delayed.

- **Usability & Design Validation**: We did not do testing with real users. 
This means there could still be problems or painpoints from a user point of view that we may miss.
To ensure users are comfortable in anyway possible in using the app,
we will conduct extensive user testing and feedback collection.

- **Limited Accessibility Features**: The app is currently missing some important features to make it easier for people with disabilities to use,
like support for screen readers or keyboard navigation. 
Modern apps must be accessible to all so we will as efforts of future developments include some of these features.

## Learnings
Duringt this project, we gained valuable experience and insights that helped us grow as a team and improve our technical skills as well. 
Some key takeaways:

- **Collaboration & Version Control**: We learned how to work as a team using Git to keep track of our code as well as multiple people working simultaneously. 
This made it easier to combine everyone’s work without problems. Through this, we prioritized the use of Git Fetch as opposed to Git Pull to first review and 
verify changes before merging them. This allowed us to carefully update changes on our local repository,
ensuring that conflicts were minimized and that the codebase remained stable.

- **Accessibility Awareness**: From the design and implementation of this project we realized how important and relevant it is to make an app inclusive and accessible for everyone.
