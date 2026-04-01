# Contributing to StellarPay Links

Thanks for your interest in contributing! This is a beginner-friendly project and all skill levels are welcome.

## Getting Started

1. Fork the repository and clone your fork
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Project Layout

| Path | Purpose |
|---|---|
| `app/` | Next.js App Router pages |
| `components/` | Shared UI components (`Field`, `Row`) |
| `lib/stellar.ts` | Stellar validation + URL helpers |

**Good entry points for new contributors:**
- `lib/stellar.ts` — pure utility functions, easy to extend and test
- `components/` — isolated UI components with no side effects

## Making Changes

- Keep PRs focused — one feature or fix per PR
- Follow the existing code style (TypeScript strict mode, Tailwind for styling)
- Add a comment explaining *why* if the logic isn't obvious
- Run `npm run build` before submitting to catch type errors

## Reporting Issues

Use the [GitHub Issues](https://github.com/StellarPayLinks/StellarPayLinks/issues) page.  
Please include steps to reproduce, expected behaviour, and actual behaviour.

## Code of Conduct

Be respectful and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).
