const MOA = ({account}) =>
{
  return(
    <div className="w-[35vw] flex flex-col gap-6 bg-white p-4 rounded dark:text-black">
      <h1 className="text-2xl font-bold text-center mt-4">Memorandum of Association</h1>
      <div className="flex flex-col gap-2">
      <h1 className="text-lg font-bold bg-gray-400 p-2 rounded">Buyers</h1>
      {account.entityDetails.buyers.map((buyer) =>
      (
        <div>
          <p className="font-semibold">{buyer.name}</p>
          <p>Industry: {buyer.industry}</p>
          <p>Location: {buyer.region}</p>
        </div>
      ))}
      </div>
      <div className="flex flex-col gap-2">
      <h1 className="text-lg font-bold bg-gray-400 p-2 rounded">Sellers</h1>
      {account.entityDetails.sellers.map((seller) =>
      (
        <div>
          <p className="font-semibold">{seller.name}, {seller.region}</p>
          <p>Industry: {seller.industry}</p>
          <p>Location: {seller.region}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default MOA