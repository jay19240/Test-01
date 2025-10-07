## Getting Started

First, install all dependencies with:
```bash
npm install
```
Generate Prisma:
```bash
npx prisma generate
```

Make the seeding:
```bash
npm run seed
```

And finally, run the developement server:
```bash
npx next dev
```

## Good to known

Migrate the prisma Schema (if you change the schema, this command is needed to update the database):
```bash
npx prisma migrate dev --name init
```

## The way i do
1. All CSS in global file with the ECS convention
2. I've used NextJS for Chatbot instead Python because i never used this langage
3. The project follow an architecture 3-tiers ready. The website deal with Ajax calls for data.

## Thd end
J'ai fait au mieux avec mes connaissances en NextJS et Python qui restent limités.
PS: Le site de NextJS et de Prisma ne fonctionnait pas pendant le développement de ce mini-projet.
