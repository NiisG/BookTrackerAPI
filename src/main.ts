import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response } from "express"


async function bootstrap() { 
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable CORS for all origins to allow frontend communication
  app.enableCors({
    origin: '*',
    credentials: true, 

  })

  // Serve static files from the 'public' directory
  const publicDir = join(__dirname, '..', 'public');
  app.useStaticAssets(publicDir);

  const server = app.getHttpAdapter().getInstance();

  // Servce index.html for all non-API GET Requests (SPA fallback)
   server.get(/^(?!\/api).*/, (req: Request, res: Response) =>
    res.sendFile(join(publicDir, 'index.html')),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on http://localhost:${port}`);
}

bootstrap();