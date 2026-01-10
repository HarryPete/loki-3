import Image from "next/image"
import verifiedIcon from '../../assets/verified.png'

const MOA = ({account}) =>
{
  return(
    <div className="space-y-4 text-sm">
      {account.entityDetails.buyers.length>0 ? <div className="flex flex-col gap-4">
      <h1 className="font-bold text-[16px] bg-orange-500 p-4 rounded-md text-white text-center">Buyers</h1>
      {account.entityDetails.buyers.map((buyer, index) =>
      (
        <div className="space-y-1" key={index}>
          <div className="flex justify-between items-center">
            <p className="font-semibold">{buyer?.entity?.name}, {buyer?.entity?.region}</p>
            <Image className="h-5 w-fit" src={verifiedIcon} alt='verified'/>
          </div>
          <p>Industry | {buyer?.entity?.industry}</p>
          <p>Signed on {new Date(buyer?.verifiedDate).toLocaleDateString()}</p>
          
        </div>
      ))}
      </div> : <p className="text-muted-foreground text-sm text-center">No Buyers</p>}
      {account.entityDetails.sellers.length>0 ? <div className="flex flex-col gap-4">
      <h1 className="font-bold text-[16px] bg-orange-500 p-4 rounded-md text-white text-center">Sellers</h1>
      {account.entityDetails.sellers.map((seller, index) =>
      (
        <div className="space-y-1" key={index}>
          <div className="flex justify-between items-center">
            <p className="font-semibold">{seller?.entity?.name}, {seller?.entity?.region}</p>
            <Image className="h-5 w-fit" src={verifiedIcon} alt='verified'/>
          </div>
          <p>Industry | {seller?.entity?.industry}</p>
          <p>Signed on {new Date(seller?.verifiedDate).toLocaleDateString()}</p>
          
        </div>
      ))}
      </div>: <p className="text-muted-foreground text-sm text-center">No Sellers</p>}
    </div>
  )
}

export default MOA