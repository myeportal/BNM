export default async function handler(req, res) {
    res.status(200).end("noop");
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
        // responseLimit: false,
    },
};

// import * as bodyParser from 'body-parser';

// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useStaticAssets(`${__dirname}/public`);
//   // the next two lines did the trick
//   app.use(bodyParser.json({limit: '50mb'}));
//   app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//   app.enableCors();
//   await app.listen(3001);
// }
// bootstrap();