import connect, { connection } from "../database/connect";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../database/models/entities/user";

// connect()

export default async function Login(req, res) {
  try {
    const reqBody = req.body;
    const { email, password } = reqBody;

    // const connection = await connect();
    console.log(reqBody);
    console.log(email);

    //check if user exists
    const user:any = await connection
      .getRepository(User)
      .createQueryBuilder(process.env.USER_TABLE)
      .leftJoinAndSelect(process.env.USER_TABLE+".institute","institute")
      .leftJoinAndSelect(process.env.USER_TABLE+".role","role")
      .leftJoinAndSelect(process.env.USER_TABLE+".department","department")
      .getOne()
    //   .findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "Error: User Does not exist" });
    }
    console.log(user);

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(400).json({ message: "Error : Invalid Password" });
    }

    //create Token Data
    const tokenData = {
      id: user.id,
      user_Name: user.email,
      email: user.email,
    };
    console.log(tokenData);
    //create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    if(user){
        user['role_id'] = user.role.id;
        user['role_name'] = user.role.name;
        user['department_id'] = user.department.id;
        user['department_name'] = user.department.name;
        user['institute_id'] = user.institute.id;
        user['institute_name'] = user.institute.name;

        user.role = undefined;
        user.department = undefined;
        user.institute = undefined;
        user.password = undefined;
    }

        // return sucess response with signed cookie
    return res
      .cookie("token", token, { httpOnly: true, signed: true })
      .status(200)
      .json({
        message: "Login successful",
        success: true,
        token: token,
        user,
      });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}
