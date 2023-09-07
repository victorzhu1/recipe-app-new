export function Home () {
    return (
        <div className='home-container h-full w-screen font-oswald'>
            <div className='hero-container relative flex justify-center items-center h-screen text-white'
            style={{
                backgroundImage: `url(${'/images/recipehome.jpeg'})`,
                backgroundSize: 'cover',
                filter: 'grayscale(50%)',
            }}>
                <div
                    className="absolute w-full h-full flex flex-col justify-center items-center"
                    style={{
                    background: 'rgba(20, 20, 20, 0.7)',
                    }}
                    >
                        <div className='home-info space-y-5 text-center'>
                            <h1 className="text-9xl font-bold ">Recipe App</h1>
                            <p className="text-2xl font-bold">Share and browse recipes!</p>
                            <div className="home-info-buttons">
                                <a role="button" href="/login" className="inline-block border border-white cursor-pointer px-4 py-3 
                                text-center text-xl font-semibold text-white transition duration-200 ease-in-out 
                                hover:bg-opacity-25 hover:bg-white">
                                    Log in!
                                </a>
                                <span style={{ margin: '0 5px' }}></span>
                                <a role="button" href="/recipes" className="inline-block border border-white cursor-pointer px-4 py-3 
                                text-center text-xl font-bold text-white transition duration-200 ease-in-out 
                                hover:bg-opacity-25 hover:bg-white">
                                    Find Recipes!
                                </a>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="feature-container w-screen">
                <div className="flex flex-row align-items-center justify-center py-16">
                    <div className="feature-text w-1/3 flex flex-col justify-center mr-32 text-center">
                        <h1 className="text-slate-900 inline-block text-5xl font-bold mb-12 px-12 py-3
                         bg-white border-4 border-slate-800">Featured Recipe: Honey Garlic Salmon</h1>
                        <p className="text-2xl mb-4 ">
                            Sticky, sweet, and garlicky, this glazed salmon recipe comes together in just 20 minutes, and in one pan!
                        </p>
                        <p className="text-2xl mb-4 ">
                            Posted by: chefvictor29
                        </p>
                        <a role="button" href="/recipe/64f941c8aadcc6d3a824d3ae" className="inline-block border border-slate-800 cursor-pointer px-4 py-3 
                        text-center text-xl font-bold text-slate-800 transition duration-200 ease-in-out 
                        hover:bg-opacity-25 hover:bg-slate-400">
                            See recipe!
                        </a>
                    </div>
                    <img src="/images/salmon.jpeg" alt="pic" 
                            className="object-cover shadow w-2/5 h-2/5"
                            /> 
                </div>
            </div>
         </div>
    )
}