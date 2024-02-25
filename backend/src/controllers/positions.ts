import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Positions } from "../database/models/entities/positions";


export async function Create_Positions(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Please provide with a name for the Positions you are Trying to Create" })

    if (await connection.getRepository(Positions).createQueryBuilder(process.env.POSITION_TABLE).where({ name }).getOne())
        return res.status(400).json({ message: "Departments Already Exists" })

    await Positions.create({
        name
    }).save()

    return res.status(200).json({ message: "Positions created" })
}

export async function Get_Positions(req: Request, res: Response) {
    const { id } = req.query;

    let positions: Positions | Positions[];

    if (id)
        positions = await connection.getRepository(Positions).createQueryBuilder(process.env.POSITION_TABLE).where({ id }).getOne()
    else
        positions = await connection.getRepository(Positions).createQueryBuilder(process.env.POSITION_TABLE).getMany()

    if (!positions) return res.status(404).json({ message: "No Positions Found" })

    return res.status(200).json({ message: "Positions Fetched", positions })
}

export async function Delete_Positions(req: Request, res: Response) {
    const { id } = req.query;

    const positions = await connection.getRepository(Positions).createQueryBuilder(process.env.POSITION_TABLE).where({ id }).getOne();

    if (!positions) return res.status(404).json({ message: "No Positions Found" })

    await connection.getRepository(Positions).createQueryBuilder(process.env.POSITION_TABLE).delete().where({ id }).execute();

    return res.status(200).json({ message: "Positions Deleted" })
}