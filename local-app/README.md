# Vortex Labs // SUPPORT_AI (local)

```bash
ollama run llama3.2      # in one terminal (keeps the model warm)
npm install
node server.js           # http://localhost:3000
```

REST endpoint:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"when is the next drop?"}'
# -> { "response": "..." }
```
