import { BookingRoomDto } from './dto/booking-room.dto';

import { Controller, Get, Body, HttpStatus, Res, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RoomAvailableDto } from './dto/room-available.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/index')
  getAllFlights(@Res() res): string {
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: "result",
    });
  }

  @Get('/room')
  flightAvialble(@Query() params: RoomAvailableDto, @Res() res){
    let item, result;
    item = Math.random() >= 0.35; //true of false
    if(item){
      result = "true";
    }
    else{
      result = "false";
    }

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: {'room available' : item},
    });
  }

  @Post('/booking')
  flightBooking(@Query() params: BookingRoomDto, @Res() res){
    let item, result;
    item = Math.random() >= 0.35; //true of false
    if(item){
      result = "true";
    }
    else{
      result = "false";
    }

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: {'booking status' : item},
    });
  }

}
