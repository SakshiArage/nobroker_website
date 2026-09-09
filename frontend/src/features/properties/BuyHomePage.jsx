import { useMemo, useState } from "react";
import Brand from "../../components/Brand";

const NAVY = "#1F3040";
const RED = "#DF3438";
const RED_DARK = "#BC242A";
const RED_SOFT = "#FFF0F0";
const serif = { fontFamily: "'Playfair Display', serif" };

const listings = [
  { img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", badge: "Verified", price: "₹2.4 Cr", priceLakhs: 240, addr: "Whitefield, Bengaluru", beds: 4, baths: 3, area: "3,200 sqft", type: "Villa", verified: true },
  { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", badge: "New", price: "₹85 L", priceLakhs: 85, addr: "Baner, Pune", beds: 2, baths: 2, area: "1,150 sqft", type: "Apartment", verified: false },
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", badge: "Verified", price: "₹1.6 Cr", priceLakhs: 160, addr: "Malviya Nagar, Jaipur", beds: 3, baths: 3, area: "2,100 sqft", type: "Independent house", verified: true },
  { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", badge: "Ready to move", price: "₹3.1 Cr", priceLakhs: 310, addr: "Bandra West, Mumbai", beds: 4, baths: 4, area: "2,850 sqft", type: "Villa", verified: true },
  { img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80", badge: "Verified", price: "₹62 L", priceLakhs: 62, addr: "Sector 62, Noida", beds: 2, baths: 2, area: "1,050 sqft", type: "Apartment", verified: true },
  { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", badge: "New launch", price: "₹1.95 Cr", priceLakhs: 195, addr: "Jubilee Hills, Hyderabad", beds: 3, baths: 3, area: "2,400 sqft", type: "Independent house", verified: false },
];

const chips = ["All homes", "Villas", "Apartments", "New launches", "Verified owner", "Ready to move"];
const typeOptions = ["Any type", "Villa", "Apartment", "Independent house", "Plot"];
const budgetOptions = ["Any budget", "Under ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₹2Cr", "₹2Cr+"];

function matchesBudget(priceLakhs, budget) {
  if (budget === "Under ₹50L") return priceLakhs < 50;
  if (budget === "₹50L – ₹1Cr") return priceLakhs >= 50 && priceLakhs <= 100;
  if (budget === "₹1Cr – ₹2Cr") return priceLakhs > 100 && priceLakhs <= 200;
  if (budget === "₹2Cr+") return priceLakhs > 200;
  return true;
}

function matchesChip(listing, chip) {
  if (chip === "All homes") return true;
  if (chip === "Villas") return listing.type === "Villa";
  if (chip === "Apartments") return listing.type === "Apartment";
  if (chip === "Verified owner") return listing.verified;
  if (chip === "Ready to move") return listing.badge === "Ready to move";
  if (chip === "New launches") return listing.badge === "New" || listing.badge === "New launch";
  return true;
}

export default function BuyHomePage({ onBack }) {
  const [activeChip, setActiveChip] = useState("All homes");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState(typeOptions[0]);
  const [budget, setBudget] = useState(budgetOptions[0]);
  const [favorites, setFavorites] = useState([]);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (location && !l.addr.toLowerCase().includes(location.toLowerCase())) return false;
      if (propertyType !== typeOptions[0] && l.type !== propertyType) return false;
      if (!matchesBudget(l.priceLakhs, budget)) return false;
      if (!matchesChip(l, activeChip)) return false;
      return true;
    });
  }, [location, propertyType, budget, activeChip]);

  function clearFilters() {
    setLocation("");
    setPropertyType(typeOptions[0]);
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
          className="text-sm font-bold text-gray-500 transition-colors hover:text-[#DF3438]"
        >
          ← Back to home
        </button>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-10 pt-14 text-center" style={{ background: `linear-gradient(180deg, #fff 0%, ${RED_SOFT} 130%)` }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-170px] h-[560px] w-[560px] -translate-x-1/2 rounded-full"
          style={{ border: "1px solid rgba(223,52,56,0.16)", boxShadow: "0 0 0 46px rgba(223,52,56,0.045), 0 0 0 96px rgba(223,52,56,0.03)" }}
        />

        <div className="relative z-10">
          <p className="mb-3 text-xs font-bold tracking-[1.4px]" style={{ color: RED }}>
            Your property journey
          </p>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-tight sm:text-5xl" style={serif}>
            Find a place to <em className="not-italic" style={{ color: RED }}>own</em>, at your pace
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-lg text-gray-500">
            Browse verified listings and connect directly with owners. No noise, no middlemen.
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
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Property type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                {typeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex min-w-[150px] flex-1 flex-col gap-1 px-4 py-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Budget</label>
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
              className="rounded-lg px-7 text-sm font-bold text-white shadow-[0_8px_15px_rgba(223,52,56,0.17)] transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: RED }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = RED_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = RED)}
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
                      ? { borderColor: RED, color: RED, backgroundColor: RED_SOFT }
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
              <b style={{ color: NAVY }}>10,000+</b> verified homes
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
          <p className="mb-4 text-[15px]">No homes match those filters.</p>
          <button
            onClick={clearFilters}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold transition-colors hover:bg-[#FFF0F0]"
            style={{ color: RED }}
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
              className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_4px_14px_rgba(31,49,65,0.04)] transition-all hover:-translate-y-1.5 hover:border-[#EDB8B9] hover:shadow-[0_20px_35px_rgba(31,49,65,0.13)]"
            >
              <div className="relative h-[190px] overflow-hidden">
                <img
                  src={l.img}
                  alt={l.addr}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute left-3 top-3 rounded-full px-3 py-1.5 text-[11px] font-bold text-white shadow-[0_4px_10px_rgba(223,52,56,0.3)]"
                  style={{ backgroundColor: RED }}
                >
                  {l.badge}
                </div>
                <button
                  onClick={(event) => toggleFavorite(i, event)}
                  aria-label="Save property"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-base transition-transform hover:scale-110"
                  style={
                    favorites.includes(i)
                      ? { backgroundColor: RED, color: "#fff" }
                      : { backgroundColor: "rgba(255,255,255,0.92)", color: RED }
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
                <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold transition-all group-hover:gap-2.5" style={{ color: RED }}>
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