# 🥢 Mmm Noodle Soup

Welcome to **Mmm Noodle Soup** — a cozy little corner of the internet where recipes come *first*, not after 14 paragraphs of childhood memories. This site is designed for people like me (hi 👋), who just want to cook, not scroll.

## Why this project?

Over the years, I’ve collected recipes from everywhere — websites, books, scribbled notes from friends — and ended up with a chaotic mess that’s hard to navigate. Sometimes I can’t even find that *one perfect recipe* I made months ago, so I just give up and find a new one. Sound familiar?

So this is my attempt to fix that. Mmm Noodle Soup is my personal recipe box, rebuilt from the ground up with:

- ✨ **Usability** on mobile as a top priority
- ✨ **Minimal fluff** — the recipe content is the focus
- ✨ **Easy search and fast access**
- ✨ Eventually: a smooth way to add new recipes

I’m also using this project to explore things I’ve been curious about: **static site generation**, **serverless architecture**, and **modern frontend tooling** (React, TypeScript, GraphQL, etc.).

---

# 🍳 Recipe Website Plan

## Tech Stack

- **Frontend:** Gatsby (React, TypeScript)
- **Data Storage:** Sanity CMS (free tier)
- **Serverless Functions:** Gatsby Functions (optional, for authenticated actions)
- **Authentication:** External authentication service (e.g., Clerk / Auth0 / Firebase Auth — free tiers available)
- **Search:** Local search using Fuse.js and prebuilt JSON index
- **Hosting:** Gatsby Cloud, Netlify, or Vercel (free tier)

---

## Features

- 📖 **Static generation** of all recipes at build time
- 📝 **Authenticated users** can add new recipes via frontend
- 🔄 **Rebuild trigger** via webhook after new content is added
- 🔍 **Local fuzzy search** with autocompletion (Fuse.js)
- 🔐 **Login system** to restrict recipe creation to logged-in users
- ⚡ **Fast browsing** because everything is static

---

## 🛠 Architecture Overview

```mermaid
flowchart TD
  A[User] -->|Accesses Site| B[Gatsby Static Site]
  B -->|Fuzzy Search| B
  A -->|Login/Sign Up| C[Auth Provider (Clerk/Auth0/Firebase)]
  A -->|Submit Recipe| D[Gatsby Function (Serverless API)]
  D -->|POST| E[Sanity CMS]
  E -->|Content Updated| F[Webhook triggers new build]
  F -->|Rebuilds| B
```

# Project Setup

This project's source code is managed in a monorepo powered by Turborepo.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- `mmm-noodle-soup`: the frontend of Mmm Noodle Soup
- `studio-mmm-noodle-soup`: the schema types for Sanity CMS
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)


# Common Commands

## Deploy GraphQL API

```sh
sanity graphql deploy <dataset>
```

## Start Local Development Mode

```sh
npm run dev -w studio-mmm-noodle-soup
```

```sh
npm run start -w mmm-noodle-soup
```

