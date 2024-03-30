import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
  

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

};

export const login = (red , res) =>{

}
export const logout = (red , res) =>{
    
}