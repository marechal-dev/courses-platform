<center>
  <h1>FullStack Courses Platform Web Application 🚀🤘</h1>
</center>

A FullStack "Udemy-like" Web Application! It consists of 2 Microservices that communicate with each other via Apache Kafka and a Web Front-End built with Next.js.

**⚙ Build with**:
- Node.js
- TypeScript
- NestJS
- Prisma ORM
- GraphQL
- Apollo Federation
- Next.js
- TailwindCSS
- Auth0
- PostgreSQL
- Apache Kafka

**❓ How to run**:

1. `git clone` the repository
2. Make sure to `npm install` inside every application folder (_classroom_, _purchases_ and _web_)
3. Make sure to fill all the `env` files following the `.example` files with **YOUR** credentials for Auth0 (the Databases URLs are just for dev env, so you can use the same as the example files)
4. Make sure to `npx prisma migrate dev` inside of _classroom_ and _purchases_
5. `docker compose up` all our external services inside the root folder

**🛑 What can go wrong**:

- You may need to run `docker compose up` then stop all containers, then start them again, because sometimes the Zookeeper (dependency service for Apache Kafka) may not start on time
