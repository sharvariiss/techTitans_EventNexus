// Import necessary modules and dependencies
import { connection } from "../database/connect";
import { Institute } from "../database/models/entities/instituteSetUp";
import { Request, Response } from "express";

// Define the function to handle the creation of a institute
export async function CreateInstitute(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.body;
        const { college_name, college_code, address, email, password, verify_at } = reqBody;

        // Check if the institute already exists
        const response = await connection.getRepository(Institute).findOne({ where: { college_name: college_name } });
        if (response)
            return res.status(400).json({ message: "Institute Already Exists" });

        // Create a new institute instance
        const institute = Institute.create({
            college_name: college_name,
            college_code: college_code,
            address: address,
            email: email,
            password: password,
            verify_at: verify_at
        });

        // Save the institute in the database
        const savedInstitute = await institute.save();

        // Return a success response with the created institute
        return res.status(200).json({ message: "Institute Created", institute: savedInstitute });

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}



export async function GetInstitute(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.query;
        const { college_name, institute_id } = reqBody;

        let institute;

        // Get the institute by ID
        if (institute_id)
            institute = await connection.getRepository(Institute)
                .createQueryBuilder(process.env.INSTITUTE_TABLE)
                .where({ id: institute_id }).getOne();
        // Get the institute by name
        else if (college_name)
            institute = await connection.getRepository(Institute)
                .createQueryBuilder(process.env.INSTITUTE_TABLE)
                .where({ college_name: college_name })
                .getOne();

        // Handle the case where the institute is not found
        if (!institute) {
            return res.status(404).json({ message: "Institute not found" });
        }

        // Return a success response with the found institute
        return res.status(200).json({ message: "Institute found", institute: institute });
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

// Define the function to handle the deletion of a institute
export async function DeleteInstitute(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.body;
        const { institute_id, college_name } = reqBody;

        let institute;

        // Check if instituteId is provided for deletion by ID
        if (institute_id)
            institute = await connection.getRepository(Institute)
                .createQueryBuilder(process.env.INSTITUTE_TABLE)
                .delete()
                .where({ id: institute_id })
                .execute();
        // Delete the institute by name
        else if (college_name)
            institute = await connection.getRepository(Institute)
                .createQueryBuilder(process.env.INSTITUTE_TABLE)
                .delete()
                .where({ college_name: college_name })
                .execute();

        // Check if the institute was not found for deletion
        if (institute.affected === 0)
            return res.status(404).json({ message: "Institute not found" });

        // Return a success response after successful deletion
        return res.status(200).json({ message: "Institute Deleted" });
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}


// Define the function to handle the update of a institute
export async function UpdateInstitute(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.body;
        const { institute_id, college_name, college_code, address, email, password, verify_at } = reqBody;

        // Connect to the institute repository in the database
        const instituteRepository = await connection.getRepository(Institute);

        // Prepare an object with non-undefined fields from the request body for updating the institute
        const updateObject: Partial<Institute> = {};
        if (college_name !== undefined) updateObject.college_name = college_name;
        if (college_code !== undefined) updateObject.college_code = college_code;
        if (email !== undefined) updateObject.email = email;
        if (password !== undefined) updateObject.password = password;
        if (verify_at !== undefined) updateObject.verify_at = verify_at;
        if (address !== undefined) updateObject.address = address;

        // Declare a variable to store the result of the update operation
        let savedInstitute;

        // Check if there are fields to update in the institute
        if (Object.keys(updateObject).length > 0) {
            // Perform the update operation in the database
            savedInstitute = await instituteRepository.update(
                { id: institute_id },
                updateObject
            );
        } else {
            // If no fields to update, return a 400 response with an appropriate message
            return res.status(400).json({ message: "Institute doesn't exist" });
        }

        // Check if the institute exists based on the update operation result
        if (savedInstitute !== undefined && savedInstitute.affected === 0) {
            // If no institute was updated, return a 400 response with an appropriate message
            return res.status(400).json({ message: "Institute doesn't exist" });
        }

        // Return a successful response if the institute was successfully updated
        return res.status(200).json({ message: "Institute updated" });
    } catch (error) {
        // Handle any errors that occur during the update process and return a 500 response with an error message
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}
