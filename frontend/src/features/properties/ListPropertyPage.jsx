import { useState } from "react";
import Brand from "../../components/Brand";
// import "./ListPropertyPage.css";

const steps = [
    {
        title: "Add your details",
        text: "Share property photos, price and specifications in a few minutes.",
    },
    {
        title: "Get verified",
        text: "Our team verifies your listing so genuine seekers trust it.",
    },
    {
        title: "Connect directly",
        text: "Talk to interested buyers or renters with zero brokerage.",
    },
];

const propertyTypes = [
    "Apartment",
    "Independent house",
    "Villa",
    "Plot",
    "Commercial space",
];

export default function ListPropertyPage({ onBack }) {
    const [form, setForm] = useState({
        listingType: "sale",
        title: "",
        type: propertyTypes[0],
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        description: "",
    });

    const [images, setImages] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    function updateField(e) {
        const { name, value } = e.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function handleImages(e) {
        const files = Array.from(e.target.files);

        Promise.all(
            files.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        resolve(reader.result);
                    };

                    reader.readAsDataURL(file);
                });
            })
        ).then((base64Images) => {
            setImages(base64Images);
        });
    }

    function submit(e) {
        e.preventDefault();

        const stored =
            JSON.parse(localStorage.getItem("properties")) || [];

        const property = {
            id: Date.now(),

            listingType: form.listingType,

            title: form.title,

            img:
                images.length > 0
                    ? images[0]
                    : "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600",

            images,

            badge: "New",

            verified: false,

            price: form.price,

            priceLakhs: Number(
                form.price.replace(/[^\d]/g, "")
            ),

            rent: Number(
                form.price.replace(/[^\d]/g, "")
            ),

            addr: form.location,

            beds: Number(form.bedrooms),

            baths: Number(form.bathrooms),

            area: form.area,

            type: form.type,

            description: form.description,
        };

        stored.push(property);

        localStorage.setItem(
            "properties",
            JSON.stringify(stored)
        );

        setSubmitted(true);
    }

    return (
        <div className="lp-page">
            <header className="lp-header">
                <Brand />

                <button
                    className="lp-back"
                    onClick={onBack}
                >
                    ← Back to Home
                </button>
            </header>

            <section className="lp-hero">
                <div
                    className="lp-hero-ring"
                    aria-hidden="true"
                ></div>

                <div className="lp-hero-inner">
                    <p className="lp-eyebrow">
                        Your Property Journey
                    </p>

                    <h1>
                        List your property in{" "}
                        <em>minutes</em>
                    </h1>

                    <p className="lp-sub">
                        Sell or rent your property with
                        zero brokerage and connect
                        directly with verified buyers and
                        tenants.
                    </p>

                    <div className="lp-stats">
                        <span>
                            <b>Free</b> Listing
                        </span>

                        <span>
                            <b>0</b> Brokerage
                        </span>

                        <span>
                            <b>48 hrs</b> Verification
                        </span>
                    </div>
                </div>
            </section>

            <div className="lp-steps">
                {steps.map((step, i) => (
                    <div
                        className="lp-step"
                        key={step.title}
                    >
                        <span className="lp-step-num">
                            {i + 1}
                        </span>

                        <h3>{step.title}</h3>

                        <p>{step.text}</p>
                    </div>
                ))}
            </div>

            <section className="lp-form-section">
                {!submitted ? (
                    <form
                        className="lp-form"
                        onSubmit={submit}
                    >
                        <h2>Property Details</h2>

                        <p className="lp-form-sub">
                            Fill the information below.
                        </p>

                        <label>
                            Listing Type

                            <select
                                name="listingType"
                                value={form.listingType}
                                onChange={updateField}
                            >
                                <option value="sale">
                                    For Sale
                                </option>

                                <option value="rent">
                                    For Rent
                                </option>
                            </select>
                        </label>

                        <label>
                            Property Title

                            <input
                                required
                                name="title"
                                value={form.title}
                                onChange={updateField}
                                placeholder="Luxury 3BHK Apartment"
                            />
                        </label>

                        <label>
                            Property Images

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImages}
                            />
                        </label>

                        {images.length > 0 && (
                            <div className="lp-image-preview">
                                {images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt=""
                                    />
                                ))}
                            </div>
                        )}

                        <div className="lp-row">
                            <label>
                                Property Type

                                <select
                                    name="type"
                                    value={form.type}
                                    onChange={updateField}
                                >
                                    {propertyTypes.map((type) => (
                                        <option key={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Location

                                <input
                                    required
                                    name="location"
                                    value={form.location}
                                    onChange={updateField}
                                    placeholder="City, Locality"
                                />
                            </label>
                        </div>

                        <div className="lp-row">
                            <label>
                                {form.listingType === "sale"
                                    ? "Selling Price"
                                    : "Monthly Rent"}

                                <input
                                    required
                                    name="price"
                                    value={form.price}
                                    onChange={updateField}
                                    placeholder={
                                        form.listingType === "sale"
                                            ? "₹1.25 Cr"
                                            : "₹25000/month"
                                    }
                                />
                            </label>

                            <label>
                                Built-up Area

                                <input
                                    required
                                    name="area"
                                    value={form.area}
                                    onChange={updateField}
                                    placeholder="1500 sqft"
                                />
                            </label>
                        </div>

                        <div className="lp-row">
                            <label>
                                Bedrooms

                                <input
                                    type="number"
                                    name="bedrooms"
                                    min="0"
                                    value={form.bedrooms}
                                    onChange={updateField}
                                    placeholder="3"
                                />
                            </label>

                            <label>
                                Bathrooms

                                <input
                                    type="number"
                                    name="bathrooms"
                                    min="0"
                                    value={form.bathrooms}
                                    onChange={updateField}
                                    placeholder="2"
                                />
                            </label>
                        </div>

                        <label>
                            Description

                            <textarea
                                rows="5"
                                name="description"
                                value={form.description}
                                onChange={updateField}
                                placeholder="Describe your property..."
                            />
                        </label>

                        <button
                            className="lp-submit"
                            type="submit"
                        >
                            Submit Property
                        </button>

                    </form>
                ) : (
                    <div className="lp-success">
                        <div className="lp-success-icon">✓</div>

                        <h2>Property Submitted Successfully</h2>

                        <p>
                            Your property has been saved successfully.
                            It is now available for buyers or tenants
                            depending on the listing type you selected.
                        </p>

                        <button
                            className="lp-success-btn"
                            onClick={() => {
                                setForm({
                                    listingType: "sale",
                                    title: "",
                                    type: propertyTypes[0],
                                    location: "",
                                    price: "",
                                    bedrooms: "",
                                    bathrooms: "",
                                    area: "",
                                    description: "",
                                });

                                setImages([]);
                                setSubmitted(false);
                            }}
                        >
                            List Another Property
                        </button>
                    </div>
                )}
            </section>

            <footer className="lp-footer">
                <Brand />

                <p>
                    Verified homes. Direct owner connections.
                </p>
            </footer>
        </div>
    );
}