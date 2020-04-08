import { HotelEntity } from './entity/hotel.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "hotel.cil1xn4fd9qh.us-east-2.rds.amazonaws.com",
      "port": 3306,
      "username": "admin",
      "password": "313326339",
      "database": 'hotel',
      "entities": ["dist/entity/**.entity{.ts,.js}"],
      "synchronize": true,
      "logging": true,
    }),
    TypeOrmModule.forFeature([HotelEntity])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
