
import ResponsiveAppBar from "../componants/navbar";

const thaiDestinations = [
  {
    name: 'Hua Hin / Cha-am',
    accommodations: '5,328 accommodations',
    image: "https://i.pinimg.com/564x/64/86/f5/6486f561389a12eb0363c17fed2a418f.jpg",
  },
  {
    name: 'Chonburi',
    accommodations: '1,144 accommodations',
    image: "https://api.tourismthailand.org/upload/live/destination/4-9055.png",
  },
  {
    name: 'Khao Yai',
    accommodations: '1,611 accommodations',
    image: "https://www.furama.com/images/adayinkhaoyaiCover-900x606.jpg",
  },
  {
    name: 'Krabi',
    accommodations: '2,053 accommodations',
    image: "https://content.r9cdn.net/rimg/dimg/d7/d3/e9304e90-city-44862-164ae46b3a9.jpg?crop=true&width=1020&height=498",
  },
  {
    name: 'Hat Yai',
    accommodations: '566 accommodations',
    image: "https://ik.imagekit.io/tvlk/blog/2023/05/shutterstock_1146758282.jpg?tr=dpr-2,w-675",
  },
];

const myanmarDestinations = [
  // Placeholder for Myanmar destinations
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ResponsiveAppBar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Recommended Destinations</h1>
        
        <section className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Thai Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {thaiDestinations.map((destination) => (
              <div key={destination.name} className="text-center p-2">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-48 h-48 object-cover rounded-lg mx-auto"
                />
                <h6 className="mt-2">{destination.name}</h6>
                <p className="text-sm text-gray-500">{destination.accommodations}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full mt-8">
          <h2 className="text-2xl font-semibold mb-4">Myanmar Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myanmarDestinations.length === 0 ? (
              <p className="text-center w-full">Coming soon...</p>
            ) : (
              myanmarDestinations.map((destination) => (
                <div key={destination.name} className="text-center p-2">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-48 h-48 object-cover rounded-lg mx-auto"
                  />
                  <h6 className="mt-2">{destination.name}</h6>
                  <p className="text-sm text-gray-500">{destination.accommodations}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}