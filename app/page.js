import Image from "next/image";
import ResponsiveAppBar from "../componants/navbar";

const thaiDestinations = [
  {
    name: 'Hua Hin / Cha-am',
    accommodations: '5,328 accommodations',
    image: "../images/hua_hin.jpg",
  },
  {
    name: 'Chonburi',
    accommodations: '1,144 accommodations',
    image: "../images/chonburi.jpg",
  },
  {
    name: 'Khao Yai',
    accommodations: '1,611 accommodations',
    image: "../images/khao_yai.jpg",
  },
  {
    name: 'Krabi',
    accommodations: '2,053 accommodations',
    image: "../images/krabi.jpg",
  },
  {
    name: 'Hat Yai',
    accommodations: '566 accommodations',
    image: "../images/hat_yai.jpg",
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
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}