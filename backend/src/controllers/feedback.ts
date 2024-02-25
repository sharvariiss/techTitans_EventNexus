import { Response, Request } from "express";
import { connection } from "../database/connect";
import { FeedBack } from "../database/models/entities/feedback";
import { User } from "../database/models/entities/user";
import { Event } from "../database/models/entities/event";

export async function CreateFeedBack(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { feedback, user_id, event_id } = req.body;

        if (!feedback) return res.status(400).json({ message: "Please provide value a for feedback" })
        if (!user_id) return res.status(400).json({ message: "Please provide value a for user_id" })
        if (!event_id) return res.status(400).json({ message: "Please provide value a for event_id" })

        // Check if the Event Category already exists
        if (await connection.getRepository(FeedBack)
            .createQueryBuilder(process.env.FEEDBACK_TABLE)
            .leftJoinAndSelect(process.env.FEEDBACK_TABLE + "user", "user")
            .where("user.id = :id", { id: user_id }).getOne())
            return res.status(400).json({ message: "Feedback Already Exists" })

        const user = await connection.getRepository(User).createQueryBuilder(process.env.USER_TABLE).where({ id: user_id }).getOne()
        const event = await connection.getRepository(Event).createQueryBuilder(process.env.EVENT_TABLE).where({ id: event_id }).getOne()

        // Create Event Category 
        await FeedBack.create({
            feedback,
            user,
            event
        }).save()

        // Response
        return res.status(200).json({ message: "Feedback Created" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}


export async function GetFeedback(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id, user_id, event_id } = req.query;

        let feedback: FeedBack | FeedBack[];

        // Fetch FeedBack 
        if (id)
            feedback = await connection.getRepository(FeedBack)
                .createQueryBuilder(process.env.FEEDBACK_TABLE)
                .leftJoinAndSelect(process.env.FEEDBACK_TABLE + "user", "user")
                .leftJoinAndSelect(process.env.FEEDBACK_TABLE + "event", "event")
                .where({ id }).getOne()
        else if (user_id)
            feedback = await connection.getRepository(FeedBack)
                .createQueryBuilder(process.env.FEEDBACK_TABLE)
                .leftJoinAndSelect(process.env.FEEDBACK_TABLE + "user", "user")
                .leftJoinAndSelect(process.env.FEEDBACK_TABLE + "event", "event")
                .where("user.id = :id", { id: user_id })
                .getOne()
        else if (event_id)
            feedback = await connection.getRepository(FeedBack)
                .createQueryBuilder(process.env.FEEDBACK_TABLE)
                .leftJoinAndSelect(process.env.FEEDBACK_TABLE + "user", "user")
                .leftJoinAndSelect(process.env.FEEDBACK_TABLE + "event", "event")
                .where("user.id = :id", { id: event_id })
                .getOne()
        else
            feedback = await connection.getRepository(FeedBack)
                .createQueryBuilder(process.env.FEEDBACK_TABLE)
                .leftJoinAndSelect(process.env.FEEDBACK_TABLE + "user", "user")
                .leftJoinAndSelect(process.env.FEEDBACK_TABLE + "event", "event")
                .getMany()

        if (!feedback) return res.status(404).json({ message: "No Feedback Found" })

        // Response
        return res.status(200).json({ message: "Feedback Fetched", feedback: feedback })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}



export async function DeleteFeedback(req: Request, res: Response) {
    try {
        // Get required data from the request body
        const { id } = req.query;

        const feedback = await connection.getRepository(FeedBack)
            .createQueryBuilder(process.env.EVENT_TABLE)
            .delete()
            .where({ id })
            .execute();

        // Check if the FeedBack was not found for deletion
        if (feedback && feedback.affected === 0)
            return res.status(404).json({ message: "Feedback  not found" });

        // Response
        return res.status(200).json({ message: "Feedback Deleted" })

    } catch (error) {
        // Log and return an error response for any unexpected errors
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}