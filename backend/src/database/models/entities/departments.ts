import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(`${process.env.DEPARTMENT_TABLE}`)
export class Departments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    name: string;
}