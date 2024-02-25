// Import necessary modules and dependencies
import { User } from "../database/models/entities/user";
import { connection } from "../database/connect";
import { Request, Response } from "express";
import { Institute } from "../database/models/entities/instituteSetUp";
import { Roles } from "../database/models/entities/roles";
import bcrypt from 'bcrypt'
import { Departments } from "../database/models/entities/departments";

// Define the function to handle the creation of a User
export async function CreateUser(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.body;
        const { institute_id, email, password, name, role_id, department_id } = reqBody;

        if (!institute_id) return res.status(400).json({ message: "Please provide institute_id" })
        if (!email) return res.status(400).json({ message: "Please provide email" })
        if (!password) return res.status(400).json({ message: "Please provide password" })
        if (!name) return res.status(400).json({ message: "Please provide name" })
        if (!role_id) return res.status(400).json({ message: "Please provide role_id" })
        if (!department_id) return res.status(400).json({ message: "Please provide department_id" })


        // Check if the User already exists
        const response = await connection.getRepository(User).findOne({ where: { email } });
        if (response)
            return res.status(400).json({ message: "User Already Exists" });

        // Check if the Institute exists
        const institute = await connection.getRepository(Institute).findOne({ where: { id: institute_id } });
        if (!institute)
            return res.status(400).json({ message: "Institute Does Not Exists" });

        // Check if the Role exists
        const role = await connection.getRepository(Roles).findOne({ where: { id: role_id } });
        if (!role)
            return res.status(400).json({ message: "Role Does Not Exists" });

        // Check if the Department exists
        const department = await connection.getRepository(Departments).findOne({ where: { id: department_id } });
        if (!department)
            return res.status(400).json({ message: "Department Does Not Exists" });

        const bcryptSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, bcryptSalt)
        // Create a new User instance
        let created_user = User.create({
            name,
            email,
            password: hashedPassword,
            role,
            institute,
            department
        });

        // Save the User in the database
        const savedUser = await created_user.save();

        // Return a success response with the created User
        return res.status(200).json({ message: "User Created", User: savedUser });

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}



export async function GetUser(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.query;
        const { email, user_id } = reqBody;

        let user;

        // Get the User by ID
        if (user_id)
            user = await connection.getRepository(User)
                .createQueryBuilder(process.env.User_TABLE)
                .leftJoinAndSelect(process.env.User_TABLE + '.institute', 'institute')
                .leftJoinAndSelect(process.env.User_TABLE + '.department', 'department')
                .leftJoinAndSelect(process.env.User_TABLE + '.role', 'role')
                .where({ id: user_id }).getOne();
        // Get the User by name
        else if (email)
            user = await connection.getRepository(User)
                .createQueryBuilder(process.env.User_TABLE)
                .leftJoinAndSelect(process.env.User_TABLE + '.institute', 'institute')
                .leftJoinAndSelect(process.env.User_TABLE + '.department', 'department')
                .leftJoinAndSelect(process.env.User_TABLE + '.role', 'role')
                .where({ email })
                .getOne();
        else
            user = await connection.getRepository(User)
                .createQueryBuilder(process.env.User_TABLE)
                .leftJoinAndSelect(process.env.User_TABLE + '.institute', 'institute')
                .leftJoinAndSelect(process.env.User_TABLE + '.department', 'department')
                .leftJoinAndSelect(process.env.User_TABLE + '.role', 'role')
                .getMany();


        // Handle the case where the User is not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return a success response with the found User
        return res.status(200).json({ message: "User found", User: user });

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

// Define the function to handle the deletion of a User
export async function DeleteUser(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.query;
        const { user_id, email } = reqBody;

        let user;

        // Check if UserId is provided for deletion by ID
        if (user_id)
            user = await connection.getRepository(User)
                .createQueryBuilder(process.env.User_TABLE)
                .delete()
                .where({ id: user_id })
                .execute();
        // Delete the User by name
        else if (email)
            user = await connection.getRepository(User)
                .createQueryBuilder(process.env.User_TABLE)
                .delete()
                .where({ email })
                .execute();
        else
            return res.status(400).json({ message: "Please provide either user_id or their email" })


        // Check if the User was not found for deletion
        if (user && user.affected === 0)
            return res.status(404).json({ message: "User not found" });

        // Return a success response after successful deletion
        return res.status(200).json({ message: "User Deleted" });

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}


// Define the function to handle the update of a User
export async function UpdateUser(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.body;
        const { user_id, institute_id, email, password, name, role_id, department_id } = reqBody;

        // Connect to the User repository in the database
        const user_repository = await connection.getRepository(User);

        // Fetch Institute 
        const institute = await connection.getRepository(Institute).findOne({ where: { id: institute_id } });

        // Fetch Role 
        const role = await connection.getRepository(Roles).findOne({ where: { id: role_id } });

        // Fetch Departmennt 
        const department = await connection.getRepository(Departments).findOne({ where: { id: department_id } });

        const bcryptSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, bcryptSalt)

        // Prepare an object with non-undefined fields from the request body for updating the User
        const updateObject: Partial<User> = {};
        // if (email !== undefined) updateObject.email = email;
        if (hashedPassword !== undefined) updateObject.password = hashedPassword;
        if (name !== undefined) updateObject.name = name;
        if (institute !== undefined) updateObject.institute = institute;
        if (role !== undefined) updateObject.role = role;
        if (department !== undefined) updateObject.department = department;

        // Declare a variable to store the result of the update operation
        let savedUser;

        // Check if there are fields to update in the User
        if (Object.keys(updateObject).length > 0) {
            // Perform the update operation in the database
            savedUser = await user_repository.update(
                { id: user_id },
                updateObject
            );
        } else {
            // If no fields to update, return a 400 response with an appropriate message
            return res.status(400).json({ message: "User doesn't exist" });
        }

        // Check if the User exists based on the update operation result
        if (savedUser !== undefined && savedUser.affected === 0) {
            // If no User was updated, return a 400 response with an appropriate message
            return res.status(400).json({ message: "User doesn't exist" });
        }

        // Return a successful response if the User was successfully updated
        return res.status(200).json({ message: "User updated" });

    } catch (error) {
        // Handle any errors that occur during the update process and return a 500 response with an error message
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}
