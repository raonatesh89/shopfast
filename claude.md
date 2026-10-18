# ShopFast rules
- Stack: Node 20, ESM only, Fastify 5. No Express, no TypeScript, no new dependencies without asking me.
- Architecture: FEATURE MODULES under src/modules/<feature>/. NOT MVC. No global controllers/ models/ folders.
- Each module has: index.js (plugin + wiring), *.routes.js (HTTP + schema only), *.service.js (business logic), *.repository.js (data access).
- Modules talk only through services exposed via app.decorate(). Never import another module's repository.
- Routes contain no business logic. Services never touch req/reply.
- Every route must have a JSON schema for body/params/query.
- Throw AppError from src/shared/errors.js for expected failures.
- Never read or print .env. Never run git push, git reset --hard, or rm -rf.
- After each feature: run `npm test`, then stop and summarize changes.