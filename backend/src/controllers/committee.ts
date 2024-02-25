import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Committees } from "../database/models/entities/committees";



export async function CreateCommittee(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Please provide with a name for the Committee you are trying to create" })
        
        // Check if the committee already exists
        if (await connection.getRepository(Committees).createQueryBuilder(process.env.COMMITTEES_TABLE).where({ name }).getOne())
            return res.status(400).json({ message: "Committee Already Exists" })

        await Committees.create({
            name
        }).save()

        // Response
        return res.status(200).json({ message: "Committee created" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function GetCommittee(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        let committee: Committees | Committees[];

        // Fetch Committee
        if (id)
            committee = await connection.getRepository(Committees).createQueryBuilder(process.env.COMMITTEES_TABLE).where({ id }).getOne()
        else
            committee = await connection.getRepository(Committees).createQueryBuilder(process.env.COMMITTEES_TABLE).getMany()

        if (!committee) return res.status(404).json({ message: "No Committee Found" })

        // Response
        return res.status(200).json({ message: "Committee Fetched", committee: committee })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}