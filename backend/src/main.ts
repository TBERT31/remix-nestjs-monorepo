import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getPublicDir, startDevServer } from '@virgile/frontend';
import { AppModule } from './app.module';
import {RedisStore} from "connect-redis";
import session from 'express-session';
import Redis from "ioredis";
import passport from 'passport';
import { urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  await startDevServer(app);

  // Initialize client.
  // redis://localhost:6379
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  let redisClient = new Redis(redisUrl, {

  }).on('error', console.error).on('connect', () => {
    console.log('Connected to Redis');
  });

  // Initialize store.
  let redisStore = new RedisStore({
    client: redisClient,
    ttl: 86400 * 30,
  })

  app.set('trust proxy', 1);

  app.use(
    session({
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: process.env.SESSION_SECRET || "supersecretkey123",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
        secure: process.env.NODE_ENV === 'production',
      }
    }),
  )

  app.useStaticAssets(getPublicDir(), {
    immutable: true,
    maxAge: '1y',
    index: false,
  });

  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/auth/login", urlencoded({ extended: true }));
  app.use("/auth/logout", urlencoded({ extended: true }));

  const selectedPort = process.env.PORT ?? 3001;

  console.log(`Running on port http://localhost:${selectedPort}`);
  await app.listen(selectedPort);
}
bootstrap();
