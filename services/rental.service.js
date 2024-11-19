import { Rental } from "@/models/rental.model";

class rentalService
{
    async createRental(details)
    {
        try
        {
            const newRental = await Rental.create(details);
            await newRental.save();
            return newRental
        }
        catch(error)
        {
            throw error
        }
    }

    async getRentals()
    {
        try
        {
            const rentals = await Rental.find();
            return rentals
        }
        catch(error)
        {
            throw error
        }
    }

    async getRentalById(id)
    {
        try
        {
            const rental = await Rental.findById(id);
            return rental
        }
        catch(error)
        {
            throw error
        }
    }

    async deleteRental(id)
    {
        try
        {
            await Rental.findByIdAndDelete(id);
            return
        }
        catch(error)
        {
            throw error
        }
    }
}

export default rentalService