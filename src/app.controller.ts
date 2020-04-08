import { CancelBookingDto } from './dto/cancel-booking.dto';
import { HotelEntity } from './entity/hotel.entity';
import { BookingRoomDto } from './dto/booking-room.dto';
import { Controller, Get, Body, HttpStatus, Res, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment = require('moment');

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(HotelEntity)
    private readonly hotelEntity: Repository<HotelEntity>
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/all-hotels')
  async getAllFlights(@Res() res) {
    let query = await this.hotelEntity.find();

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: query,
    });
  }

  @Get('/available-hotel')
  async flightAvialble(@Query() params, @Res() res){
    // let item, result;
    // item = Math.random() >= 0.35; //true of false
    // if(item){
    //   result = "true";
    // }
    // else{
    //   result = "false";
    // }

    let query = await this.hotelEntity.find({  status: 'available' });

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: query
    });
  }

  @Post('/booking')
  async flightBooking(@Query() params: BookingRoomDto, @Res() res){
    // let item, result;
    // item = Math.random() >= 0.35; //true of false
    // if(item){
    //   result = "true";
    // }
    // else{
    //   result = "false";
    // }

    let status;
    let candidate = await this.hotelEntity.findOne({hotelName: params.hotelName, room: params.roomNumber});
    let isAvailable = candidate.status;
    if(isAvailable === 'available'){
      status = 'booking success'
      let query = await this.hotelEntity.update({ hotelName: params.hotelName, room: params.roomNumber, status: 'available' }, 
        {status: "booked", bookingUser: params.userName, bookedDate: moment().format()});
    }
    else{
      status = 'booking failed'
    }

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: status,
    });
  }

  @Post('/cancel-booking')
  async cancelBooking(@Query() params: CancelBookingDto, @Res() res){
    let query = await this.hotelEntity.update({ hotelName: params.hotelName, room: params.roomNumber }, 
        {status: "available", bookingUser: null, bookedDate: null});
    let status;
    if(query != undefined){
      status = 'cancel success'
    }
    else{
      status = 'cancel failed'
    }
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: status,
    });
  }

}
