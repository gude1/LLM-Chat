# LLM Chat

LLM Chat is an LLM-based chat interface that supports real-time interaction, web scraping, and rich text editing. It allows users to communicate with a Large Language Model (LLM), edit and resend messages, and perform web scraping directly within a Tiptap-based text editor.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Tech Stack](#tech-stack)

## Features

- **Send Messages to LLM:** Users can interact with the LLM by sending messages and receiving real-time responses.
- **Real-time Chat Stream Reading:** The chat interface supports streaming responses from the LLM, allowing users to view partial responses as they are generated.
- **Cancel Chat Stream:** Users can cancel an ongoing chat stream request for better control over the conversation.
- **Edit and Resend Prompts:** Chat prompts can be edited and resent, giving users flexibility to refine their inputs.
- **Copy Chat Prompts and Responses:** Both chat prompts and responses from the LLM can be copied for easy reference and reuse.

## Installation

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/gude1/LLM-wrapper
cd LLM-wrapper
# npm install
yarn install
# npm run dev
yarn dev
```

2. Use the .env.example file as a template to create your own .env file:

```bash
Copy code
cp .env.example .env
```

3. Obtain the necessary API keys and select an LLM model of your choice from [Hugging Face.](https://huggingface.co/microsoft/Phi-3.5-mini-instruct)

## Tech Stack

-**Client**: Next.js

# LLM-Chat
