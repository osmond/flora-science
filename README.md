# 🌿 Flora-Science

Flora-Science is a plant care companion built with [Next.js](https://nextjs.org/) and [React](https://react.dev). It focuses on clarity, low-friction care logging, and gentle coaching to help you keep plants thriving.

## ✨ Key Features
- Today view for tracking plants that need attention
- Room and plant detail views with stats and timelines
- Tailwind CSS styling with dark mode support
- Mock data to explore the app structure

## 🚀 Setup & Installation
1. Ensure [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) are installed.
2. Install dependencies:
   ```bash
   pnpm install
   ```

## 🔑 Environment Variables
Copy `.env.example` to `.env` and set the following:

```bash
PLANT_ID_API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

`PLANT_ID_API_KEY` fetches species name suggestions from Plant.id.
`OPENAI_API_KEY` enables AI-generated care plans. Create one at https://platform.openai.com/account/api-keys.

## 🛠 Development Commands
| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the built app |
| `pnpm lint` | Lint the codebase |

## ✅ Testing
Run unit tests with [Jest](https://jestjs.io/):
```bash
pnpm test
```

## 🤝 Contributing
Contributions are welcome! Please run `pnpm lint` and `pnpm test` before submitting a pull request. See the [project roadmap](docs/roadmap.md) for upcoming work.
