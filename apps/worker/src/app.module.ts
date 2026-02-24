import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from './prisma/prisma.module';
import { EmailProcessor } from './processors/email.processor';

@Module({
    imports: [
        PrismaModule,
        BullModule.forRoot({
            connection: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
            },
        }),
        BullModule.registerQueue({
            name: 'email-send',
        }),
    ],
    controllers: [],
    providers: [EmailProcessor],
})
export class AppModule { }
