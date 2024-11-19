'use client'

const Search = () =>
{
    return(
        <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
            <h2 className="text-red-700 font-bold text-5xl">360 Fints</h2>
            <input placeholder="Search" className="border border-gray-400 p-3 rounded w-[70vw]"/>
            <button className="border border-gray-400 rounded p-2 cursor-pointer">Search</button>
        </div>
    )
} 

export default Search