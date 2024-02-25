// Import necessary modules and dependencies
import { CommitteeHead } from "../database/models/entities/committeeHead";
import { connection } from "../database/connect";
import { Request, Response } from "express";
import { Committees } from "../database/models/entities/committees";

export async function CreateCommitteeHead(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.body;
        const { name, description, contact_info, goals_and_objectives, department, commitee_id } = reqBody;
        if (!name) return res.status(400).json({ message: "Please provide name" })
        if (!description) return res.status(400).json({ message: "Please provide description" })
        if (!goals_and_objectives) return res.status(400).json({ message: "Please provide goals_and_objectives" })
        if (!department) return res.status(400).json({ message: "Please provide department" })
        if (!commitee_id) return res.status(400).json({ message: "Please provide commitee_id" })

        // Check if the committee already exists
        const response = await connection.getRepository(CommitteeHead).findOne({ where: { name: name } });
        if (response)
            return res.status(400).json({ message: "Committee Head Already Exists" });

        // Check if the committee already exists
        const commitee = await connection.getRepository(Committees).findOne({ where: { id: commitee_id } });
        if (!commitee)
            return res.status(400).json({ message: "Committee does not Exists" });
        // Create a new committee instance
        const committee_head = CommitteeHead.create({
            name: name,
            description: description,
            contact_info: contact_info,
            goals_and_objectives: goals_and_objectives,
            department: department,
            commitee
        });

        // Save the committee in the database
        const savedCommitteeHead = await committee_head.save();

        // Return a success response with the created committee
        return res.status(200).json({ message: "Committee Head Created", committee_head: savedCommitteeHead });

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}



export async function GetCommitteeHead(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.query;
        const { committee_head_id } = reqBody;

        let committee_head;

        // Get the committee by ID
        if (committee_head_id)
            committee_head = await connection.getRepository(CommitteeHead)
                .createQueryBuilder(process.env.COMMITTEE_HEAD_TABLE)
                .leftJoinAndSelect(process.env.COMMITTEE_HEAD_TABLE+".commitee", "commitee")
                .where({ id: committee_head_id }).getOne();
        // // Get the Committee by name
        // else if (name)
        //     committee_head = await connection.getRepository(CommitteeHead)
        //         .createQueryBuilder(process.env.COMMITTEE_TABLE)
        //         .where({ name: name })
        //         .getOne();
        else
            committee_head = await connection.getRepository(CommitteeHead)
                .createQueryBuilder(process.env.COMMITTEE_HEAD_TABLE)
                .getMany();

        // Handle the case where the Committee is not found
        if (!committee_head) {
            return res.status(404).json({ message: "Committee Head not found" });
        }

        // Return a success response with the found Committee
        return res.status(200).json({ message: "Committee Head found", committee: committee_head });
    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}


// Define the function to handle the update of a committee
export async function UpdateCommitteeHead(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const reqBody = req.body;
        const { committee_head_id, name, description, contact_info, goals_and_objectives } = reqBody;

        // Connect to the committee repository in the database
        const committeeHeadRepository = await connection.getRepository(CommitteeHead);

        // Prepare an object with non-undefined fields from the request body for updating the committee
        const updateObject: Partial<CommitteeHead> = {};
        if (name !== undefined) updateObject.name = name;
        if (description !== undefined) updateObject.description = description;
        if (contact_info !== undefined) updateObject.contact_info = contact_info;
        if (goals_and_objectives !== undefined) updateObject.goals_and_objectives = goals_and_objectives;


        // Declare a variable to store the result of the update operation
        let savedCommitteeHead;

        // Check if there are fields to update in the committee
        if (Object.keys(updateObject).length > 0) {
            // Perform the update operation in the database
            savedCommitteeHead = await committeeHeadRepository.update(
                { id: committee_head_id },
                updateObject
            );
        } else {
            // If no fields to update, return a 400 response with an appropriate message
            return res.status(400).json({ message: "Committee Head doesn't exist" });
        }

        // Check if the committee exists based on the update operation result
        if (savedCommitteeHead !== undefined && savedCommitteeHead.affected === 0) {
            // If no committee was updated, return a 400 response with an appropriate message
            return res.status(400).json({ message: "Committee Head doesn't exist" });
        }

        // Return a successful response if the committee was successfully updated
        return res.status(200).json({ message: "Committee Head updated" });
    } catch (error) {
        // Handle any errors that occur during the update process and return a 500 response with an error message
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}