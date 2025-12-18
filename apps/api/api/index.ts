import "reflect-metadata";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "../src/app.module";

/**
 * 关键点：
 * - Vercel 每次请求会调用这个 handler
 * - 我们用全局缓存 server，避免每次都重新启动 Nest（减少冷启动开销）
 */
let cachedServer: express.Express | null = null;

async function bootstrapServer() {
  if (cachedServer) return cachedServer;

  const server = express();

  // Nest 绑定到 express
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // CORS：如果前后端是不同域名（两个 vercel app），这里必须开
  app.enableCors({
    origin: ["http://localhost:3000", /\.vercel\.app$/],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: false
  });

  await app.init();

  cachedServer = server;
  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const server = await bootstrapServer();
  return server(req as any, res as any);
}
