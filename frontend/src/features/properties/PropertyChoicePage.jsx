import Brand from '../../components/Brand';
import { ArrowRight } from '../../components/PropertyIcons';
import { propertyOptions } from './propertyOptions';

const NAVY = '#172C43';

export default function PropertyChoicePage({ user, onChoice, onLogout }) {
  return (
    <div className="choice-page">
      <header className="nav choice-nav">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
          <a href="#top" aria-label="NoBroker home">
            <Brand />
          </a>
          <div className="profile-actions">
            <span>
              Welcome, <span className="font-semibold" style={{ color: NAVY }}>{user.fullName || user.email}</span>
            </span>
            <button
              onClick={onLogout}
              className="login"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="choice-main">
        <p className="kicker">
          Your property journey
        </p>
        <h1 style={{ color: NAVY }}>
          How can we help today?
        </h1>
        <p className="choice-copy">
          Choose an option to continue with verified homes and direct owner connections.
        </p>

        <div className="choice-grid">
          {propertyOptions.map((option) => (
            <button
              key={option.title}
              onClick={() => onChoice(option.action)}
              className="choice-card group text-left"
            >
              <span className="choice-image-wrap">
                <img
                  src={option.image}
                  alt=""
                  className="choice-image"
                />
              </span>

              <span className="choice-card-content">
                <span
                  className="category-icon"
                >
                  {option.icon}
                </span>
                <h2 style={{ color: NAVY }}>
                  {option.title}
                </h2>
                <p>{option.text}</p>
                <span
                  className="choice-action"
                >
                  Get started <ArrowRight />
                </span>
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
