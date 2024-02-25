import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Positions } from "../database/models/entities/positions";


export async function CreatePositions(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Please provide with a name for the Positions you are trying to create" })

        // Check if the position already exists
        if (await connection.getRepository(Positions).createQueryBuilder(process.env.POSITION_TABLE).where({ name }).getOne())
            return res.status(400).json({ message: "Position Already Exists" })

        await Positions.create({
            name
        }).save()

        // Response
        return res.status(200).json({ message: "Positions created" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function GetPositions(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        let positions: Positions | Positions[];

        // Fetch Positions
        if (id)
            positions = await connection.getRepository(Positions).createQueryBuilder(process.env.POSITION_TABLE).where({ id }).getOne()
        else
            positions = await connection.getRepository(Positions).createQueryBuilder(process.env.POSITION_TABLE).getMany()

        if (!positions) return res.status(404).json({ message: "No Positions Found" })

        // Response
        return res.status(200).json({ message: "Positions Fetched", positions })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

export async function DeletePositions(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        // Delete Postion
        const position = await connection.getRepository(Positions).createQueryBuilder(process.env.POSITION_TABLE).delete().where({ id }).execute();

        // Check if the position was not found for deletion
        if (position && position.affected === 0)
            return res.status(404).json({ message: "Position not found" });

        // Response
        return res.status(200).json({ message: "Position Deleted" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}