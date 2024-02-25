import { Response, Request } from "express";
import { connection } from "../database/connect";
import { Departments } from "../database/models/entities/departments";


export async function Create_Departments(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Please provide with a name for the Departments you are Trying to Create" })

    if (await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).where({ name }).getOne())
        return res.status(400).json({ message: "Departments Already Exists" })

    await Departments.create({
        name
    }).save()

    return res.status(200).json({ message: "Departments created" })
}

export async function Get_Departments(req: Request, res: Response) {
    const { id } = req.query;

    let departments: Departments | Departments[];

    if (id)
        departments = await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).where({ id }).getOne()
    else
        departments = await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).getMany()

    if (!departments) return res.status(404).json({ message: "No Departments Found" })

    return res.status(200).json({ message: "Departments Fetched", departments })
}

export async function Delete_Departments(req: Request, res: Response) {
    const { id } = req.query;

    const departments = await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).where({ id }).getOne();

    if (!departments) return res.status(404).json({ message: "No Departments Found" })

    await connection.getRepository(Departments).createQueryBuilder(process.env.DEPARTMENT_TABLE).delete().where({ id }).execute();

    return res.status(200).json({ message: "Departments Deleted" })
}