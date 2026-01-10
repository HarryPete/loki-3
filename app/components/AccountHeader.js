import { maskAccountNumber } from "@/utility/maskAccountNumber"
import personal from '@/assets/personal.png'
import entity from '@/assets/entity.png'
import Image from "next/image"
import { Attachments } from "./Attachments"

export const AccountHeader = ({account}) =>
{
    return(
        <div className="w-full flex items-center justify-center gap-4 p-12 bg-gray-100 rounded-xl">
            <Image className="w-fit h-48 rounded-full" src={account?.userDisplay ?? (account.type === 'Entity' ? entity : personal)} width={100} height={100} alt="account"/>
            <div className="space-y-1 text-center">
                <p className="text-[24px] font-semibold text-orange-500">{account.type === "Entity" ? account.entityDetails.name : account.personalDetails.firstname +' ' +account.personalDetails.lastname}</p>
                <p>{maskAccountNumber(account._id.toUpperCase())}</p>
                <p className="">{account.email}</p>
            </div>
            {account?.entityDetails?.attachments?.length && <Attachments account={account}/>}
        </div>
    )
}

