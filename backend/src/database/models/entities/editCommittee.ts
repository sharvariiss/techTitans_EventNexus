// Import necessary modules and classes from the TypeORM library
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Departments } from "./departments";


// Define the Entity class for the committee table
@Entity(`${process.env.COMMITTEE_TABLE}`)
export class Committee extends BaseEntity {
  // Define the primary key column with auto-incrementing value
  @PrimaryGeneratedColumn()
  id: number;

  // Define a column for storing the committee head name as a string
  @Column('varchar')
  name: string;

  // Define a column for storing the committee description as text
  @Column('text')
  description: string;

  // Define a many-to-one relationship with the Department entity
  @ManyToOne(
    () => Departments,
    department => department.committee,
    {
        onDelete: "CASCADE"
    }
  )
  @JoinColumn(
    {
        name: 'dept_id',
    }
  )
  // Create a property to access the associated Department entity
  department: Departments;

  // Define a column for storing the contact info of committee head as string
  @Column('varchar')
  contact_info: string;

  // Define a column for storing the committee goals and objectives as text
  @Column('text')
  goals_and_objectives: string;

  // Define columns for created_at and updated_at timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}