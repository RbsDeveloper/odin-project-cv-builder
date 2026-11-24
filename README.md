# CVPro - React CV Builder

CVPro is a responsive CV editor built with React. It provides a live, A4-style preview while users enter personal details, education, work experience, languages, skills, projects, and visual preferences. The application supports multiple layouts, custom colors and fonts, local browser persistence, and PDF output through the browser print flow.

**Live demo:** [odin-project-cv-builder.vercel.app](https://odin-project-cv-builder.vercel.app/)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?logo=css&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)

## Features

- Live A4 CV preview with automatic fit-to-width scaling
- Separate editor and preview views on mobile
- Side-by-side editor and preview layout on larger screens
- Add, edit, save, collapse, and delete:
  - Education entries
  - Work experience entries
  - Languages
  - Skill categories
  - Projects
- Profile photo support through an image URL or local file upload
- Modern, classic, and minimal CV layouts
- Six preset color themes and custom primary/secondary color pickers
- Font selection for Inter, Roboto, Open Sans, Lato, Montserrat, and Poppins
- Autofill with sample CV data
- Automatic saving and restoration with `localStorage`
- PDF/download action using `react-to-print`
- Zoom controls, including manual zoom and fit-to-width

## Technologies

| Technology | Role |
| --- | --- |
| React 19 | Component-based UI and state updates |
| Vite 8 | Development server and production bundling |
| JavaScript (ES modules) | Application logic and React components |
| CSS3 | Responsive layouts, form styling, and print rules |
| `react-to-print` | Browser print/PDF workflow for the CV document |
| Lucide React | Consistent interface icons |
| Browser `localStorage` | Persistent CV data without a backend |
| Vercel | Hosting for the live application |
| ESLint | JavaScript and React code quality checks |

Google Fonts are loaded from CSS for the application and CV font choices.

## Architecture

### State and data flow

`App` owns the complete CV state as a nested object containing `personalInfo`, `education`, `jobs`, `languages`, `skills`, `projects`, and `customization`.

```text
App
├── Nav
├── CvEditor
│   ├── PersonalInfoForm
│   ├── EducationForm
│   ├── WorkForm
│   ├── LanguagesForm
│   ├── SkillsForm
│   ├── ProjectsForm
│   └── CustomizationForm
├── CvPreview
└── MobileSwitcher
```

The editor components receive `cvInfo` and `changeCv`. They update immutable copies of the relevant nested state and pass it back through `setCv`. `CvPreview` is therefore derived directly from the same state, keeping the form and A4 document in sync.

The initial state is loaded by a lazy `useState` initializer:

1. Read `cvData` from `localStorage`.
2. Parse and structurally validate its top-level shape.
3. Restore the saved CV when valid.
4. Fall back to an empty CV if data is missing or invalid.

Every state change is persisted to `localStorage` through `useEffect`.

### Repeatable entries

Education, work, language, skill, and project records use generated `crypto.randomUUID()` identifiers. Each record has an `isEditing` flag that controls whether its card is editable and prevents multiple entries of the same section from being created while one is already being edited.

### CV preview

`CvPreview` renders a fixed 794 px-width A4 document for preview. A `ResizeObserver` measures the available preview area and calculates a fit-to-width scale while preserving a minimum and maximum zoom range. Print styles switch the document to A4 dimensions and remove the preview shadow and margins.

The user-facing PDF action delegates printing to `react-to-print`, which targets the CV preview with `documentTitle: "CV"`.

### Responsive behavior

Below the desktop breakpoint, the application shows either the editor or preview through `MobileSwitcher`. At 1024 px and wider, the editor and preview are displayed side by side. Additional wide-screen rules limit the editor width and give the remaining space to the preview.

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── form/
│   │   │   ├── PersonalInfoForm.jsx
│   │   │   ├── EducationForm.jsx
│   │   │   ├── WorkForm.jsx
│   │   │   ├── LanguagesForm.jsx
│   │   │   ├── SkillsForm.jsx
│   │   │   ├── ProjectsForm.jsx
│   │   │   └── CustomizationForm.jsx
│   │   ├── CvEditor.jsx
│   │   ├── CvPreview.jsx
│   │   ├── MobileSwitcher.jsx
│   │   └── Nav.jsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── forms.css
│   │   └── layout.css
│   ├── App.jsx
│   └── main.jsx
├── eslint.config.js
├── vite.config.js
├── index.html
└── package.json
```

## What This Project Demonstrates

- Managing interconnected form state in a React application without an external state library
- Updating deeply nested data through immutable state transformations
- Building repeatable CRUD-style card interfaces with stable record IDs
- Separating the editor, preview, navigation, and mobile layout responsibilities
- Restoring and validating browser-persisted application state
- Measuring a container with `ResizeObserver` to implement responsive fit-to-width behavior
- Producing print-ready CSS with A4 dimensions and print-specific overrides
- Applying conditional layout and theme classes to the same preview document
- Structuring multiple configurable form sections with reusable interaction patterns

## Testing

No automated test files or test runner are currently configured.

The available quality check is ESLint:

```bash
npm run lint
```

There is no configured `test` package script.

## Potential Improvements

- Add Vitest and React Testing Library tests for state updates, persistence, CRUD cards, and preview rendering
- Normalize and validate URLs entered in profile and project fields
- Fix profile links so email and phone values generate their actual `mailto:` and `tel:` targets
- Handle locally uploaded images more safely, since a `blob:` URL is intended for the current page session and may not remain usable after a reload
- Add a reset/clear CV action and explicit confirmation before destructive changes
- Improve date validation and prevent an end date from preceding a start date
- Move the saved CV validation and state types into a dedicated module
- Add keyboard and screen-reader behavior for the card headers and accordion controls
- Add automated tests for print and responsive preview behavior
- Add a real application preview image

## How to Run

### Prerequisites

- Node.js
- npm

No environment variables or external API credentials are required.

### Installation

```bash
git clone https://github.com/RbsDeveloper/odin-project-cv-builder.git
cd odin-project-cv-builder
npm install
```

### Development

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

### Production build

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`.

### Lint

```bash
npm run lint
```
