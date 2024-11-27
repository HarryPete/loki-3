import { Partner } from "@/models/partner.model";

class partnerService
{
    async createPartnership(details)
    {
        try
        {
            const newEntity = await Partner.create(details);
            await newEntity.save();
            return newEntity
        }
        catch(error)
        {
            throw error
        }
    }
}

export default partnerService