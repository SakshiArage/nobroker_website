import { useMemo, useState } from "react";
import Brand from "../../components/Brand";

const NAVY = "#1F3040";
const GREEN = "#238365";
const GREEN_DARK = "#186550";
const GREEN_SOFT = "#D5EEE5";
const serif = { fontFamily: "'Playfair Display', serif" };

const listings = [
  { img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80", badge: "Verified", price: "₹28,000 /mo", rent: 28000, addr: "Koramangala, Bengaluru", beds: 2, baths: 2, area: "1,100 sqft", type: "Fully furnished", verified: true, petFriendly: false },
  { img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", badge: "Furnished", price: "₹35,000 /mo", rent: 35000, addr: "Kothrud, Pune", beds: 3, baths: 2, area: "1,450 sqft", type: "Fully furnished", verified: false, petFriendly: true },
  { img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80", badge: "Verified", price: "₹18,500 /mo", rent: 18500, addr: "Vaishali Nagar, Jaipur", beds: 2, baths: 2, area: "1,000 sqft", type: "Semi furnished", verified: true, petFriendly: false },
  { img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80", badge: "Ready to move", price: "₹52,000 /mo", rent: 52000, addr: "Powai, Mumbai", beds: 3, baths: 3, area: "1,700 sqft", type: "Fully furnished", verified: true, petFriendly: true },
  { img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", badge: "Semi furnished", price: "₹22,000 /mo", rent: 22000, addr: "Sector 50, Noida", beds: 2, baths: 2, area: "1,050 sqft", type: "Semi furnished", verified: false, petFriendly: false },
  { img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80", badge: "Verified", price: "₹40,000 /mo", rent: 40000, addr: "Gachibowli, Hyderabad", beds: 3, baths: 2, area: "1,500 sqft", type: "Unfurnished", verified: true, petFriendly: false },
];

const chips = ["All homes", "Fully furnished", "Semi furnished", "Unfurnished", "Verified owner", "Pet friendly"];
const furnishingOptions = ["Any furnishing", "Fully furnished", "Semi furnished", "Unfurnished"];
const budgetOptions = ["Any monthly rent", "Under ₹20,000", "₹20,000 – ₹40,000", "₹40,000+"];

function matchesBudget(rent, budget) {
  if (budget === "Under ₹20,000") return rent < 20000;
  if (budget === "₹20,000 – ₹40,000") return rent >= 20000 && rent <= 40000;
  if (budget === "₹40,000+") return rent > 40000;
  return true;
}

export default function RentHomePage({ onBack }) {
  const [activeChip, setActiveChip] = useState("All homes");
  const [location, setLocation] = useState("");
  const [furnishing, setFurnishing] = useState(furnishingOptions[0]);
  const [budget, setBudget] = useState(budgetOptions[0]);
  const [favorites, setFavorites] = useState([]);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (location && !l.addr.toLowerCase().includes(location.toLowerCase())) return false;
      if (furnishing !== furnishingOptions[0] && l.type !== furnishing) return false;
      if (!matchesBudget(l.rent, budget)) return false;
      if (activeChip === "Verified owner" && !l.verified) return false;
      if (activeChip === "Pet friendly" && !l.petFriendly) return false;
      if (["Fully furnished", "Semi furnished", "Unfurnished"].includes(activeChip) && l.type !== activeChip) return false;
      return true;
    });
  }, [location, furnishing, budget, activeChip]);

  function clearFilters() {
    setLocation("");
    setFurnishing(furnishingOptions[0]);
    setBudget(budgetOptions[0]);
    setActiveChip("All homes");
  }

  function toggleFavorite(i, event) {
    event.stopPropagation();
    setFavorites((current) => (current.includes(i) ? current.filter((x) => x !== i) : [...current, i]));
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]" style={{ color: NAVY }}>
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-gray-200/80 bg-white/95 px-6 backdrop-blur-md lg:px-10">
        <Brand />
        <button
          onClick={onBack}
          className="text-sm font-bold text-gray-500 transition-colors hover:text-[#238365]"
        >
          ← Back to home
        </button>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-10 pt-14 text-center" style={{ background: `linear-gradient(180deg, #fff 0%, ${GREEN_SOFT} 130%)` }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-170px] h-[560px] w-[560px] -translate-x-1/2 rounded-full"
          style={{ border: "1px solid rgba(35,131,101,0.16)", boxShadow: "0 0 0 46px rgba(35,131,101,0.045), 0 0 0 96px rgba(35,131,101,0.03)" }}
        />

        <div className="relative z-10">
          <p className="mb-3 text-xs font-bold tracking-[1.4px]" style={{ color: GREEN }}>
            Your property journey
          </p>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-tight sm:text-5xl" style={serif}>
            Move into a home you will <em className="not-italic" style={{ color: GREEN }}>love</em>
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-lg text-gray-500">
            Browse verified rentals and connect directly with owners. No noise, no middlemen.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap gap-2 rounded-xl border border-white bg-white/95 p-3.5 shadow-[0_18px_48px_rgba(30,47,62,0.1)]">
            <div className="flex min-w-[150px] flex-1 flex-col gap-1 border-r border-gray-200 px-4 py-1.5 last:border-r-0">
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Location</label>
              <input
                type="text"
                placeholder="City, neighborhood, or ZIP"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>
            <div className="flex min-w-[150px] flex-1 flex-col gap-1 border-r border-gray-200 px-4 py-1.5 last:border-r-0">
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Furnishing</label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                {furnishingOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex min-w-[150px] flex-1 flex-col gap-1 px-4 py-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Monthly rent</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                {budgetOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <button
              onClick={clearFilters}
              className="rounded-lg px-7 text-sm font-bold text-white shadow-[0_8px_15px_rgba(35,131,101,0.17)] transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: GREEN }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
            >
              Clear all
            </button>
          </div>

          {/* Chips */}
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {chips.map((chip) => {
              const active = activeChip === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActiveChip(chip)}
                  className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
                  style={
                    active
                      ? { borderColor: GREEN, color: GREEN, backgroundColor: GREEN_SOFT }
                      : { borderColor: "#e4e8ec", color: "#6b7883", backgroundColor: "#fff" }
                  }
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-8 flex justify-center divide-x divide-gray-300 text-sm text-gray-500">
            <span className="px-5 first:pl-0">
              <b style={{ color: NAVY }}>8,500+</b> verified rentals
            </span>
            <span className="px-5">
              <b style={{ color: NAVY }}>0</b> brokerage fee
            </span>
            <span className="px-5 last:border-0">
              <b style={{ color: NAVY }}>4.7/5</b> customer rating
            </span>
          </div>
        </div>
      </section>

      {/* Results bar */}
      <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 pb-5 pt-14">
        <h2 className="text-2xl font-bold" style={serif}>
          Homes for you
        </h2>
        <span className="text-sm text-gray-500">{filtered.length} verified listings</span>
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto max-w-6xl px-6 py-20 text-center text-gray-500">
          <p className="mb-4 text-[15px]">No rentals match those filters.</p>
          <button
            onClick={clearFilters}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold transition-colors hover:bg-[#D5EEE5]"
            style={{ color: GREEN }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-7 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l, i) => (
            <div
              key={i}
              onClick={() => alert("Wire this up to your property detail route.")}
              className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_4px_14px_rgba(31,49,65,0.04)] transition-all hover:-translate-y-1.5 hover:border-[#9FD6C0] hover:shadow-[0_20px_35px_rgba(31,49,65,0.13)]"
            >
              <div className="relative h-[190px] overflow-hidden">
                <img
                  src={l.img}
                  alt={l.addr}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute left-3 top-3 rounded-full px-3 py-1.5 text-[11px] font-bold text-white shadow-[0_4px_10px_rgba(35,131,101,0.3)]"
                  style={{ backgroundColor: GREEN }}
                >
                  {l.badge}
                </div>
                <button
                  onClick={(event) => toggleFavorite(i, event)}
                  aria-label="Save property"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-base transition-transform hover:scale-110"
                  style={
                    favorites.includes(i)
                      ? { backgroundColor: GREEN, color: "#fff" }
                      : { backgroundColor: "rgba(255,255,255,0.92)", color: GREEN }
                  }
                >
                  {favorites.includes(i) ? "♥" : "♡"}
                </button>
              </div>

              <div className="flex flex-col p-[18px] pb-5">
                <div className="text-[23px] font-bold" style={serif}>
                  {l.price}
                </div>
                <div className="mb-3 mt-1 text-sm text-gray-500">{l.addr}</div>
                <div className="mt-auto flex gap-3.5 border-t border-gray-100 pt-3 text-[13px] text-gray-500">
                  <span>{l.beds} beds</span>
                  <span>{l.baths} baths</span>
                  <span>{l.area}</span>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold transition-all group-hover:gap-2.5" style={{ color: GREEN }}>
                  View details <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="flex flex-col items-center gap-2 border-t border-gray-200 px-6 py-10 text-center">
        <Brand />
        <p className="text-sm text-gray-500">Verified homes, direct owner connections.</p>
      </footer>
    </div>
  );
}