import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const CookieSession = require('cookie-session');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    CookieSession({
      keys:['kugjkhhg']
    })
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true 
    })
  );
  await app.listen(3000);
}
bootstrap();
