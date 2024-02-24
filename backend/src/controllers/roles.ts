import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Roles } from "../database/models/entities/roles";


export async function Create_Roles(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Please provide with a name for the Role you are Trying to Create" })

    if (await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).where({ name }).getOne())
        return res.status(400).json({ message: "Role Already Exists" })

    await Roles.create({
        name
    }).save()

    return res.status(200).json({ message: "Role created" })
}

export async function Get_Roles(req: Request, res: Response) {
    const { id } = req.query;

    let roles: Roles | Roles[];

    if (id)
        roles = await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).where({ id }).getOne()
    else
        roles = await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).getMany()

    if (!roles) return res.status(404).json({ message: "No Roles Found" })

    return res.status(200).json({ message: "Roles Fetched", roles })
}

export async function Delete_Roles(req: Request, res: Response) {
    const { id } = req.query;

    const roles = await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).where({ id }).getOne();

    if (!roles) return res.status(404).json({ message: "No Roles Found" })

    await connection.getRepository(Roles).createQueryBuilder(process.env.ROLES_TABLE).delete().where({ id }).execute();

    return res.status(200).json({ message: "Roles Deleted" })
}