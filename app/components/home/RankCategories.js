export default function RankCategories() {
  const ranks = [
    "Bronze", "Silver", "Gold", "Platinum",
    "Diamond", "Heroic", "Grandmaster"
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-center text-3xl font-bold mb-10 text-[var(--color-accent-blue)]">
        Browse By Ranks
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 text-center">
        {ranks.map((rank) => (
          <div
            key={rank}
            className="border p-4 rounded-xl bg-gray-50 hover:shadow-md hover:-translate-y-1 transition"
          >
            <p className="font-semibold">{rank}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
