import { useEffect, useState } from 'react';
import bryanImage from '../assets/images/bryan.png';
import { getHomepageOptions } from '../api/homepageAPI';
import '../styles/HomePage.css';

const fallback = [
  { option_id: 1, label: "We're planning a team night", icon: 'calendar' },
  { option_id: 2, label: 'Need team bonding ideas', icon: 'users' },
  { option_id: 3, label: 'Organising a work event', icon: 'briefcase' },
  { option_id: 4, label: 'Need venue suggestions', icon: 'building' }
];

const iconMap = {
  calendar: CalendarIcon,
  users: UsersIcon,
  briefcase: BriefcaseIcon,
  building: BuildingIcon
};

function Svg({ children, viewBox = '0 0 24 24', className = 'iconSvg' }) {
  return (
    <svg className={className} viewBox={viewBox} fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

function MenuIcon() {
  return (
    <Svg>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </Svg>
  );
}

function ChatStepIcon() {
  return (
    <Svg>
      <circle cx="12" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M9.3 18.2 8.4 21l3.2-1.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="11" r="1.1" fill="currentColor" />
      <circle cx="12" cy="11" r="1.1" fill="currentColor" />
      <circle cx="15" cy="11" r="1.1" fill="currentColor" />
    </Svg>
  );
}

function LocationStepIcon() {
  return (
    <Svg>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="2" />
    </Svg>
  );
}

function PartyStepIcon() {
  return (
    <Svg>
      <path d="m6 18 7-7 3 3-7 7-3 1 0-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m13 11 2-6M16 8l3-2M12 8 9 6M17 12l3 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function CalendarIcon() {
  return (
    <Svg>
      <rect x="3.5" y="5.5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3.7v4M16 3.7v4M3.8 10.2h16.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function UsersIcon() {
  return (
    <Svg>
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.2" cy="10.3" r="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3.8 19c1.2-2.9 3.4-4.3 6.2-4.3S15 16.1 16.2 19M14.2 19c.7-1.9 2.1-3 4-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function BriefcaseIcon() {
  return (
    <Svg>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2.6" stroke="currentColor" strokeWidth="2" />
      <path d="M9 7V5.8c0-1 .8-1.8 1.8-1.8h2.4c1 0 1.8.8 1.8 1.8V7M3.8 12.2h16.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function BuildingIcon() {
  return (
    <Svg>
      <path d="M4 20h16M6.5 20V5h11v15M10 8h1.6M12.4 8H14M10 11h1.6M12.4 11H14M10 14h1.6M12.4 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function SendIcon() {
  return (
    <Svg>
      <path d="M3 20 21 12 3 4l4 8-4 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export default function HomePage() {
  const [options, setOptions] = useState(fallback);
  const [custom, setCustom] = useState('');

  useEffect(() => {
    getHomepageOptions()
      .then((rows) => {
        if (rows.length) setOptions(rows);
      })
      .catch(() => setOptions(fallback));
  }, []);

  return (
    <main className="home">
      <section className="heroLayer">
        <div className="heroBg" aria-hidden="true" />
        <header className="stepsHeader">
          <button className="menuBtn" type="button" aria-label="Open menu"><MenuIcon /></button>

          <div className="step">
            <div className="stepIcon"><ChatStepIcon /></div>
            <div className="stepText"><span>1.</span> Tell me what type of <em>vibe</em> your team is into</div>
          </div>

          <div className="step separator">
            <div className="stepIcon"><LocationStepIcon /></div>
            <div className="stepText"><span>2.</span> Tell me your location, budget, team size...</div>
          </div>

          <div className="step separator">
            <div className="stepIcon"><PartyStepIcon /></div>
            <div className="stepText"><span>3.</span> We organise the fun!</div>
          </div>
        </header>

        <div className="collage" aria-hidden="true">
          <div className="bgPanel left" />
          <div className="bgPanel right" />
          <div className="glow leftGlow" />
          <div className="glow rightGlow" />
        </div>

        <img src={bryanImage} alt="Bryan from The Team Guy" className="bryan" />
      </section>

      <section className="bubbleWrap">
        <div className="bubble">
          <p>
            Hi there, what type of <strong>vibe</strong> is your team looking for?
          </p>
        </div>
      </section>

      <section className="grid" aria-label="vibe options">
        {options.map((item) => {
          const OptionIcon = iconMap[item.icon] || BuildingIcon;
          return (
          <button key={item.option_id} className="option" type="button">
            <span className="optionIcon" aria-hidden="true">
              <OptionIcon />
            </span>
            <span className="optionText">{item.label}</span>
          </button>
          );
        })}
      </section>

      <form className="inputRow" onSubmit={(e) => e.preventDefault()}>
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Something else"
          aria-label="Something else"
        />
        <button type="submit" aria-label="Send"><SendIcon /></button>
      </form>
    </main>
  );
}
