# AskAITools Community Edition

## Overview

AskAITools (https://askaitools.ai) is a cutting-edge search engine project tailored specifically for the AI product domain. Our mission is to revolutionize the way users discover AI products by providing the most accurate, comprehensive, lightning-fast, and intelligent search experience. With AskAITools, finding the perfect AI solution has never been easier.

**AskAITools Desktop Screenshot:**

[![AskAITools Desktop Screenshot](https://github.com/askaitools/askaitools-community-edition/raw/master/app/public/images/MainScreenshot.png)](https://askaitools.ai)

**AskAITools Mobile Screenshot:**

[![AskAITools Mobile Screenshot](https://github.com/askaitools/askaitools-community-edition/raw/master/app/public/images/MobileScreenshot.png)](https://askaitools.ai)

This project comes in two flavors: a feature-rich commercial edition and a community edition. The community edition offers a solid foundation with a basic front-end interface and search functionality, and its code is completely open-source in this repository. Developers can effortlessly integrate their own data on top of this framework, enabling them to swiftly build specialized vertical search engines or internal document search systems for their organizations.

Under the hood, AskAITools employs a hybrid search engine architecture, seamlessly combining keyword search (full-text search) and semantic search (vector search/embedding search) capabilities. By leveraging statistical data and weighted fusion techniques, it achieves a balance between relevance and popularity.

## Project Architecture and Tech Stack

- Front-end: Next.js
- Deployment: Vercel
- Styling: Tailwind CSS
- Database: Supabase
- Keyword Search: PostgreSQL / Supabase Full-Text Search Engine
- Semantic Search: Pgvector / Supabase Vector Database
- Semantic Vector Generation: OpenAI text-embedding-3 model

## Getting Started

1. Gather and structure your niche data. Refer to [our data table schema](./supabase/migrations/20240506_init.sql) for guidance on the required fields.
2. Modify the `item` table schema as needed. Create the table and import the data into Supabase.
3. Duplicate the environment variable template `.env.local.example` and rename it to `.env.local`. Fill in your Supabase and OpenAI configuration details. If needed, provide proxy information.
4. Tailor the search parameters and strategies in `./app/pages/index.tsx`, `./app/pages/api/embedding_search.ts`, and `./supabase/migrations/20240506_init.sql` to suit your requirements.
5. Refer to `20240506_init.sql` and create two search functions in Supabase.
6. In the `app` directory, run `yarn install` to install dependencies, followed by `yarn dev` to initiate the local development environment and conduct code debugging.
7. Follow the Vercel official documentation to deploy your project on Vercel.
8. Once deployed, celebrate your accomplishment 🎉

## Usage Restrictions

1. All projects that are derivatives of this project must prominently acknowledge AskAITools by displaying its name and open-source address on the user interface homepage or documentation homepage. The easiest way to comply with this requirement is to keep the "Powered by AskAITools" component intact in the footer.
2. When deploying projects derived from this open-source project, please avoid using the AskAITools brand name as your product/project name. This restriction does not apply to the ["AskAITools Commercial Edition"](https://askaitools.ai) (https://askaitools.ai).
3. If you want to develop AI product search platforms, AI product directory sites, or other projects that closely resemble the AskAITools Commercial Edition using this open-source project as a foundation, please redesign and redevelop the front-end pages. Failure to do so may result in Google identifying the later-launched website as plagiarism due to similar formatting and content, potentially hindering its ability to attract search traffic.