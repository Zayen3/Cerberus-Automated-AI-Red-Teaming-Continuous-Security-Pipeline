Cerberus: Automated AI Red-Teaming & Continuous Security Pipeline

Cerberus is an automated AI security lab and continuous evaluation pipeline designed to conduct adversarial red-teaming against a local Large Language Model (LLM) application. By target-testing a custom e-commerce assistant holding sensitive system instructions, Cerberus simulates real-world prompt injection, secret exfiltration, and jailbreak vectors to establish security baselines, apply server-side defenses, and continuously test for regressions via GitHub Actions.

 System Architecture

The project models a modern microservices-backed AI architecture:

* Target Chatbot ("Vortex Labs"): Full-stack web application featuring a React/Vite UI built via Express REST API proxy (port 3000).

* Local Inference Engine: Meta's llama3.2 running locally via Ollama on http://localhost:11434.

* Planted Ground-Truth Vulnerability: A sensitive system prompt token (VORTEX_SECRET_KEY=998877) embedded inside the backend context as a target for data exfiltration.

* Automated Security Tooling: Promptfoo and NVIDIA Garak configured for automated adversarial scanning.

* CI/CD Security Pipeline: GitHub Actions workflow executing continuous automated prompt evaluation on every push.

Note on Development: The front-end and base Express proxy were rapidly prototyped using AI-assisted generation (vibecoding) to quickly establish a vulnerable sandbox application, allowing primary focus on threat modeling, guardrail engineering, and automated red-teaming pipelines.

Install Dependencies:
npm install

Start the Express API Backend:
node src/server.js

Run Automated Red-Team Evaluation:
In a second terminal window, run:
npx promptfoo redteam run --config promptfoo.yaml

View Results Dashboard:
npx promptfoo view