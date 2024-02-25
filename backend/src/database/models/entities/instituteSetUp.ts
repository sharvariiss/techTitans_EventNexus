// Import necessary modules and classes from the TypeORM library
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user";
import { Roles } from "./roles";
import { Status } from "./status";


// Define the Entity class for the Institute table
@Entity(`${process.env.INSTITUTE_TABLE}`)
export class Institute extends BaseEntity {
  // Define the primary key column with auto-incrementing value
  @PrimaryGeneratedColumn()
  id: number;

  // Define a column for storing the college name as a string
  @Column('varchar')
  college_name: string;

  // Define a column for storing the college code as text
  @Column('varchar')
  college_code: string;

  // Define a column for storing the address as text
  @Column('varchar')
  address: string;

  // Define a column for storing the email as text
  @Column('varchar')
  verify_at: string;

  // Define one-to-many relationships with the User entity 
  @OneToMany(
    () => User,
    user => user.institute
  )
  users: User[];

  // Define one-to-many relationships with the Roles entity 
  @OneToMany(
    () => Roles,
    role => role.institute
  )
  role: Roles[];

  // Define one-to-many relationships with the status entity 
  @OneToMany(
    () => Status,
    status => status.institute
  )
  status: Status[];

  // Define columns for created_at and updated_at timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}