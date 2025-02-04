import Image from "next/image"
import verifiedIcon from '../../assets/verified.png'

const MOA = ({account}) =>
{
  return(
    <div className="space-y-4 text-sm">
      {account.entityDetails.buyers.length>0 ? <div className="flex flex-col gap-2">
      <h1 className="font-bold bg-gray-200 p-2 rounded">Buyers</h1>
      {account.entityDetails.buyers.map((buyer, index) =>
      (
        <div className="grid grid-cols-4 gap-4" key={index}>
          <div className="col-span-2">
            <p className="font-semibold">{buyer.entity.name}</p>
            <p>Industry: {buyer.entity.industry}</p>
            <p>Location: {buyer.entity.region}</p>
          </div>
          <p>{new Date(buyer.verifiedDate).toLocaleDateString()}</p>
          <Image className="h-5 w-fit" src={verifiedIcon} alt='verified'/>
        </div>
      ))}
      </div> : <p className="text-muted-foreground text-sm text-center">No Buyers</p>}
      {account.entityDetails.sellers.length>0 ? <div className="flex flex-col gap-2">
      <h1 className="font-bold bg-gray-200 p-2 rounded">Sellers</h1>
      {account.entityDetails.sellers.map((seller, index) =>
      (
        <div className="grid grid-cols-4 gap-4" key={index}>
          <div className="col-span-2">
            <p className="font-semibold">{seller.entity.name}</p>
            <p>Industry: {seller.entity.industry}</p>
            <p>Location: {seller.entity.region}</p>
          </div>
          <p>{new Date(seller.verifiedDate).toLocaleDateString()}</p>
          <Image className="h-5 w-fit" src={verifiedIcon} alt='verified'/>
        </div>
      ))}
      </div>: <p className="text-muted-foreground text-sm text-center">No Sellers</p>}
    </div>
  )
}

export default MOA