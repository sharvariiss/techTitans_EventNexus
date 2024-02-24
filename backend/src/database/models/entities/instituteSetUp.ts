// Import necessary modules and classes from the TypeORM library
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";


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

  // Define a unique constraint for the email column
  @Column({
    unique: true
  })
  email: string;

  // Define a column for storing the password as text
  @Column('varchar')
  password: string;

  // Define a 'forgotPasswordToken' column as a nullable string or null.
  @Column({
    type: 'varchar',
    nullable: true,
  })
  forgot_password_token: string | null;

  // Define a 'forgotPasswordTokenExpiry' column as a nullable date or null.
  @Column({
    type: 'varchar',
    nullable: true,
  })
  forgot_password_token_expiry: Date | null;

  // Define a column for storing the email as text
  @Column('varchar')
  verify_at: string;

  // Define columns for created_at and updated_at timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}