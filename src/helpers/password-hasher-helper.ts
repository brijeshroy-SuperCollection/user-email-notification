import bcrypt from "bcryptjs"

export const passwordHasher = async (password:string)=>{

    const hashedPassword  = await bcrypt.hash(password,10)

    return hashedPassword

}