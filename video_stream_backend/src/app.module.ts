import { Module,RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './models/user.schema';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Video, VideoSchema } from './models/video.schema';
import { isAuthenticated } from './app.middleware';
import { VideoController } from './controllers/video.controller';
import { VideoService } from './services/video.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{name:Video.name,schema:VideoSchema}]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      })
    }),

    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    })

  ],
  controllers: [AppController, UserController,VideoController],
  providers: [AppService,UserService,VideoService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude(
        { path: 'api/v1/videos/:id', method: RequestMethod.GET }
      )
      .forRoutes(VideoController);
  }
}
