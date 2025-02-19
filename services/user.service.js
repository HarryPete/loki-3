import bcrypt from 'bcryptjs'
import { User } from "@/models/user.model";

class userService 
{
    async googleAuth(name, email, googleId)
    {
        try
        {
            const newUser = await User.create({name, email, googleId});
            return await newUser.save();
        }
        catch(error)
        {
            throw error;
        }
    }

    async findByEmail(email)
    {
        try
        {
            const user = await User.findOne({email}); 
            return user;
        }
        catch(error)
        {
            throw error
        }
    }

    async getUserById(id)
    {
        try
        {
            const user = await User.findById(id)
            return user
        } 
        catch(error)
        {
            throw error
        }
    }

    async hashPassword(password)
    {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async checkPassword(userPassword, dbPassword)
    {
        const response = await bcrypt.compare(userPassword, dbPassword)
        return response
    }
}

export default userService