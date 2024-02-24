import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(`${process.env.VENUE_TABLE}`)
export class Venue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    name: string;
}