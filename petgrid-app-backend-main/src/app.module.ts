import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AnimalsModule } from "./animals/animals.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],

            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get<string>("DATABASE_HOST"),
                port: +configService.get<number>("DATABASE_PORT"),
                username: configService.get<string>("DATABASE_USER"),
                password: configService.get<string>("DATABASE_PASSWORD"),
                database: configService.get<string>("DATABASE_NAME"),
                entities: [__dirname + "/**/*.entity{.ts,.js}"],
                synchronize: true,
                logging: false
            }),
            inject: [ConfigService]
        }),
        AnimalsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
