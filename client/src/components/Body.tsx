export const default Body = ()=>{

    return (
        <div className="flex flex-col gap-6 px-10 md:px-20 lg:px-32 xl:px-40 py-20">
                <div className="h-[200px] w-full">
                    <div className="h-full w-[150px] flex flex-col justify-center items-center bg-white shadow-2xl">
                        <div className="text-9xl font-extralight text-blue-500">+</div>
                        <p>Blank Document</p>
                    </div>
                </div>
                <p className="font-bold text-lg">Recent Documents</p>
                <div className="flex flex-wrap gap-8 ">
                    <div className="h-[200px] w-[150px] bg-white">

                    </div>
                    <div className="h-[200px] w-[150px] bg-white">

                    </div>
                    <div className="h-[200px] w-[150px] bg-white">

                    </div>
                    <div className="h-[200px] w-[150px] bg-white">

                    </div>
                    <div className="h-[200px] w-[150px] bg-white">

                    </div>
                    <div className="h-[200px] w-[150px] bg-white">

                    </div>
                </div>
            </div>
    )
}