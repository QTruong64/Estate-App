import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
  try{

  

//HASH THE PASSWORD
const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

// CREATE A NEW USER AND SAVE TO DB 
const newUser = await prisma.user.create({
    data : {
        username,
        email,
        password : hashedPassword,
    },
});
console.log(newUser)

res.status(201).json({message:"User create successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({message: "Failed to create user!"});
  }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // CHECK IF THE USER EXISTS
  
      const user = await prisma.user.findUnique({
        where: { username },
      });
  
      if (!user) return res.status(400).json({ message: "Invalid Credentials!" });
  
      // CHECK IF THE PASSWORD IS CORRECT
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid Credentials!" });
  
      // GENERATE COOKIE TOKEN AND SEND TO THE USER
  
      // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    
  
      // const token = jwt.sign(
      //   {
      //     id: user.id,
      //   //   isAdmin: false,
      //   },
      //   process.env.JWT_SECRET_KEY,
      //   { expiresIn: age }
      // );
      const age = 1000 * 60 * 60 * 24 * 7;
      // const { password: userPassword, ...userInfo } = user;
  
      res
        .cookie("test2", "myValue2", {
          httpOnly: true,
          // secure:true,
          maxAge: age,
        })
        .status(200)
        .json({message:"Login successfull"});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to login!" });
    }
  };
export const logout = (red , res) =>{
    
}