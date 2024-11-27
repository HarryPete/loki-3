import { Account } from "@/models/account.model";
import { Personal } from "@/models/personal.model";

class personalService
{
    async createPersonal(details)
    {
        try
        {
            const newPersonal = await Personal.create(details);
            await newPersonal.save();
            return newPersonal
        }
        catch(error)
        {
            console.log(error)
            throw error
        }
    }

    async updateDocuments(personalId, passportId, rentalId)
    {
        try
        {
            await Personal.findByIdAndUpdate(personalId, { $set: { passportDetails: passportId, rentalDetails: rentalId }})
            return
        }
        catch(error)
        {
            throw error
        }
    }

    async getPersonals()
    {
        try
        {
            const personal = await Personal.find().populate({ path: 'accountDetails', model: Account});
            return personal
        }
        catch(error)
        {
            throw error
        }
    }

    async getPersonalById(id)
    {
        try
        {
            const personal = await Personal.findById(id);
            return personal
        }
        catch(error)
        {
            throw error
        }
    }

    async updatePartnership(personalId, partnershipId)
    {
        try
        {
            console.log('Service', personalId, partnershipId);
            await Personal.findByIdAndUpdate(personalId, { $push: {holdings: partnershipId}});
            return
        }
        catch(error)
        {
            console.log(error);
            throw error
        }
    }

    async deletePersonal(id)
    {
        try
        {
            await Personal.findByIdAndDelete(id);
            return
        }
        catch(error)
        {
            throw error
        }
    }
}

export default personalService