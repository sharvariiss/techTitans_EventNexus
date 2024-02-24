import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Committee } from "./editCommittee";

@Entity(`${process.env.DEPARTMENT_TABLE}`)
export class Departments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    name: string;

    // Define a one-to-many relationship with the Committee entity for multiple departments
    @OneToMany(
        () => Committee,
        Committee => Committee.department
    )
    committee: Committee[];
}