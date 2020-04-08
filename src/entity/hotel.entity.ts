import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'hotel'})
export class HotelEntity {
    @PrimaryColumn({
        nullable: false
    })
    hotelName: string;

    @PrimaryColumn({
        nullable: false
    })
    room: string;

    @Column({
        nullable: false,
        default: "available"
    })
    status: string;

    @Column({
        nullable: false
    })
    detail: string;

    @Column({
        nullable: true
    })
    price: number;

    @Column({
        nullable: true
    })
    bookedDate: Date;

    @Column({
        nullable: true
    })
    bookingUser: string;
}
