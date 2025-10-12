export function InspirationSquare() {
  const videos = [
    {
      id: 1,
      thumbnail: "/cinematic-ocean-waves-sunset.jpg",
      title: "Ocean Waves at Sunset",
    },
    {
      id: 2,
      thumbnail: "/futuristic-city-neon.png",
      title: "Futuristic City",
    },
    {
      id: 3,
      thumbnail: "/forest-morning-mist.jpg",
      title: "Misty Forest Morning",
    },
    {
      id: 4,
      thumbnail: "/abstract-colorful-particles.jpg",
      title: "Abstract Particles",
    },
    {
      id: 5,
      thumbnail: "/space-nebula-stars.png",
      title: "Space Nebula",
    },
    {
      id: 6,
      thumbnail: "/coffee-pouring-slow-motion.jpg",
      title: "Coffee Pour",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Inspiration Square</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of AI-generated videos showcasing various creative scenarios and styles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-gray-100 border border-gray-200 hover:border-purple-500 transition-all duration-300 hover:shadow-lg"
            >
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold">{video.title}</h3>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
