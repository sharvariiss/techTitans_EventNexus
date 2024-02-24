import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(`${process.env.POSITION_TABLE}`)
export class Positions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    name: string;
}