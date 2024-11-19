import { Passport } from "@/models/passport.model";

class passportService
{
    async createPassport(details)
    {
        try
        {
            const newPassport = await Passport.create(details);
            await newPassport.save();
            return newPassport
        }
        catch(error)
        {
            throw error
        }
    }

    async getPassportById(id)
    {
        try
        {
            const passport = await Passport.findById(id);
            return passport
        }
        catch(error)
        {
            throw error
        }
    }

    async deletePassport(id)
    {
        try
        {
            await Passport.findByIdAndDelete(id);
            return
        }
        catch(error)
        {
            throw error
        }
    }
}

export default passportService