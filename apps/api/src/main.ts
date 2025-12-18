import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 允许前端跨域请求（本地开发必备）
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://你的vercel域名.vercel.app"],
    methods: ["GET", "POST"]
  });

  // 自动校验 DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port);
}
bootstrap();
