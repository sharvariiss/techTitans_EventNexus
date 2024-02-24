// Import necessary modules and dependencies
import { Committee } from "../database/models/entities/editCommittee";
import { connection } from "../database/connect";
import { Request, Response } from "express";

export async function CreateCommittee(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.body;
        const { name, description, contact_info, goals_and_objectives, department } = reqBody;

        // Check if the committee already exists
        const response = await connection.getRepository(Committee).findOne({ where: { name: name } });
        if (response)
            return res.status(400).json({ message: "Committee Already Exists" });

        // Create a new committee instance
        const committee = Committee.create({
            name: name,
            description: description,
            contact_info: contact_info,
            goals_and_objectives: goals_and_objectives,
            department: department
        });

        // Save the committee in the database
        const savedCommittee = await committee.save();

        // Return a success response with the created committee
        return res.status(200).json({ message: "Committee Created", committee: savedCommittee });

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}



export async function GetCommittee(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.query;
        const { name, committee_id } = reqBody;

        let committee;

        // Get the committee by ID
        if (committee_id)
        committee = await connection.getRepository(Committee)
                .createQueryBuilder(process.env.COMMITTEE_TABLE)
                .where({ id: committee_id }).getOne();
        // Get the Committee by name
        else if (name)
        committee = await connection.getRepository(Committee)
                .createQueryBuilder(process.env.COMMITTEE_TABLE)
                .where({ name: name })
                .getOne();

        // Handle the case where the Committee is not found
        if (!committee) {
            return res.status(404).json({ message: "Committee not found" });
        }

        // Return a success response with the found Committee
        return res.status(200).json({ message: "Committee found", committee: committee });
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}


// Define the function to handle the update of a committee
export async function UpdateCommittee(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.body;
        const { committee_id, name, description, contact_info, goals_and_objectives } = reqBody;

        // Connect to the committee repository in the database
        const committeeRepository = await connection.getRepository(Committee);

        // Prepare an object with non-undefined fields from the request body for updating the committee
        const updateObject: Partial<Committee> = {};
        if (name !== undefined) updateObject.name = name;
        if (description !== undefined) updateObject.description = description;
        if (contact_info !== undefined) updateObject.contact_info = contact_info;
        if (goals_and_objectives !== undefined) updateObject.goals_and_objectives = goals_and_objectives;
        

        // Declare a variable to store the result of the update operation
        let savedCommittee;

        // Check if there are fields to update in the committee
        if (Object.keys(updateObject).length > 0) {
            // Perform the update operation in the database
            savedCommittee = await committeeRepository.update(
                { id: committee_id },
                updateObject
            );
        } else {
            // If no fields to update, return a 400 response with an appropriate message
            return res.status(400).json({ message: "Committee doesn't exist" });
        }

        // Check if the committee exists based on the update operation result
        if (savedCommittee !== undefined && savedCommittee.affected === 0) {
            // If no committee was updated, return a 400 response with an appropriate message
            return res.status(400).json({ message: "Committee doesn't exist" });
        }

        // Return a successful response if the committee was successfully updated
        return res.status(200).json({ message: "Committee updated" });
    } catch (error) {
        // Handle any errors that occur during the update process and return a 500 response with an error message
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}