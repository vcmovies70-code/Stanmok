import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const images = {
  about: '/images/about-editor.jpg',
  edit: '/images/edit-suite.jpg',
  hero: '/images/hero-color-grade.jpg',
  finish: '/images/finish-suite.jpg',
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/works', label: 'Works' },
  { href: '/contact', label: 'Contact' },
]

const workItems = [
  { number: '01', type: 'EDIT / STORY', title: 'After the take', description: 'A rhythm-first cut built from loose footage, clean transitions, and the quiet details that make a story land.', image: images.edit, className: 'work-card--wide' },
  { number: '02', type: 'COLOR / ATMOSPHERE', title: 'Red room studies', description: 'A moody grade where skin, shadow, and practical light do the storytelling before a word is spoken.', image: images.hero, className: 'work-card--tall' },
  { number: '03', type: 'FINISH / DELIVERY', title: 'The final pass', description: 'Picture lock, sound polish, title systems, and the last 5% that turns a sequence into a film.', image: images.finish, className: 'work-card--offset' },
]

function useRouter() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const titles = { '/': 'Home', '/about': 'About', '/works': 'Works', '/contact': 'Contact' }
    document.title = `${titles[path] || 'Frame'} — Stanmok Videography`
  }, [path])

  const navigate = (href) => {
    window.history.pushState({}, '', href)
    setPath(href)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { path, navigate }
}

function AppLink({ href, children, className = '', onNavigate, ...props }) {
  const handleClick = (event) => {
    if (href.startsWith('/')) {
      event.preventDefault()
      onNavigate(href)
    }
  }
  return <a className={className} href={href} onClick={handleClick} {...props}>{children}</a>
}

function Mark() {
  return <span className="brand-mark" aria-hidden="true">ST<span>/</span></span>
}

function Header({ path, navigate }) {
  const [open, setOpen] = useState(false)
  const go = (href) => { setOpen(false); navigate(href) }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <AppLink href="/" onNavigate={go} className="brand" aria-label="Stanmok Videography home">
          <Mark /><span className="brand-name">Stanmok <em>Videography</em></span>
        </AppLink>
        <button className={`menu-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation">
          <span className="menu-icon"><i></i><i></i><i></i></span><b>{open ? 'Close' : 'Menu'}</b>
        </button>
        <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => <AppLink key={item.href} href={item.href} onNavigate={go} className={path === item.href ? 'active' : ''}>{item.label}<span>↗</span></AppLink>)}
        </nav>
      </div>
    </header>
  )
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div><span className="eyebrow">Have footage. Need a film?</span><h2>Let’s make the cut<br /><i>count.</i></h2></div>
        <AppLink href="/contact" onNavigate={navigate} className="circle-link" aria-label="Go to contact page">↗</AppLink>
      </div>
      <div className="container footer-links">
        <div><span className="eyebrow">Explore</span><AppLink href="/" onNavigate={navigate}>Home</AppLink><AppLink href="/about" onNavigate={navigate}>About</AppLink><AppLink href="/works" onNavigate={navigate}>Collection</AppLink><AppLink href="/contact" onNavigate={navigate}>Contact</AppLink></div>
        <div><span className="eyebrow">Craft</span><span>Editing & narrative</span><span>Color & finishing</span><span>Sound & rhythm</span><span>Capture & direction</span></div>
        <div><span className="eyebrow">Lagos / Remote</span><a href="mailto:stanmokgbp@gmail.com">Email Stanmok ↗</a><span>Available for selected projects</span></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Stanmok Videography</span><span>Editing / Color / Capture</span><a href="mailto:hello@stanmokvideography.com">hello@stanmokvideography.com</a></div>
    </footer>
  )
}

function Eyebrow({ children, number }) {
  return <div className="eyebrow-row"><span className="eyebrow-number">{number}</span><span className="eyebrow">{children}</span></div>
}

function LiveClock() {
  const [startedAt] = useState(() => Date.now())
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 42)
    return () => window.clearInterval(timer)
  }, [])

  const elapsed = Math.max(0, now - startedAt)
  const hours = Math.floor(elapsed / 3600000).toString().padStart(2, '0')
  const minutes = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0')
  const seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0')
  const frames = Math.floor((elapsed % 1000) / (1000 / 24)).toString().padStart(2, '0')

  return <div className="hero-marker" aria-label={`Live timecode ${hours} hours ${minutes} minutes ${seconds} seconds`}><span className="rec-dot"></span><span className="clock-status">REC LIVE</span><span className="hero-line"></span><span className="clock-readout">{hours}:{minutes}:{seconds}:{frames}</span></div>
}

function LagosMap({ compact = false }) {
  return <div className={`lagos-map ${compact ? 'lagos-map--compact' : ''}`}>
    <iframe
  title="Map showing Abuja, Nigeria"
  src="https://www.openstreetmap.org/export/embed.html?bbox=7.22%2C8.94%2C7.58%2C9.21&layer=mapnik&marker=9.0765%2C7.3986"
  loading="lazy"
/>
    <div className="map-label"><span className="map-pulse"></span><span>ABUJA / NIGERIA</span><strong>06°31′N 03°23′E</strong></div>
  </div>
}

function Home({ navigate }) {
  return <main>
    <section className="hero">
      <div className="hero-media"><img src={images.hero} alt="Editor working in a red-lit color grading suite" /><div className="hero-shade"></div></div>
      <div className="hero-grid" aria-hidden="true"></div><div className="hero-orbit orbit-one" aria-hidden="true"></div><div className="hero-orbit orbit-two" aria-hidden="true"></div><div className="hero-flare" aria-hidden="true"></div>
      <div className="container hero-content">
        <Eyebrow number="01">STANMOK / VIDEO EDITOR + VIDEOGRAPHER</Eyebrow>
        <h1>Make it<br /><i>feel</i> like<br />a film.</h1>
        <div className="hero-bottom"><p>Editing-led visual stories with a pulse. From the first assembly to the final grade, every frame earns its place.</p><AppLink href="/works" onNavigate={navigate} className="text-link">View the collection <span>↗</span></AppLink></div>
      </div>
      <div className="hero-scroll" aria-hidden="true">SCROLL TO EXPLORE <span></span></div>
      <LiveClock />
    </section>
    <section className="intro-section container section-pad">
      <div className="intro-label"><Eyebrow number="02">THE APPROACH</Eyebrow></div>
      <div className="intro-copy"><h2>Good footage is<br /><i>only the beginning.</i></h2><p>I shape raw moments into work that holds attention. Narrative edits, tactile color, and sound that knows when to stay quiet — all built around what the story wants to say.</p><AppLink href="/about" onNavigate={navigate} className="button button--outline">More about the studio <span>↗</span></AppLink></div>
    </section>
    <section className="home-feature container section-pad-top"><div className="section-heading"><div><Eyebrow number="03">SELECTED WORK</Eyebrow></div><AppLink href="/works" onNavigate={navigate} className="text-link">All works <span>↗</span></AppLink></div><div className="feature-frame"><img src={images.edit} alt="Video editing timeline and monitors in a dark post-production suite" /><div className="feature-caption"><span>Featured study / 001</span><strong>Editing is the<br /><i>invisible craft.</i></strong><span className="caption-arrow">↗</span></div></div></section>
    <section className="home-collection container section-pad-top"><div className="section-heading"><div><Eyebrow number="04">THE COLLECTION</Eyebrow></div><AppLink href="/works" onNavigate={navigate} className="text-link">View collection <span>↗</span></AppLink></div><div className="home-collection-grid">{workItems.map((item) => <AppLink href="/works" onNavigate={navigate} className="home-project" key={item.number}><div className="home-project-image"><img src={item.image} alt={item.title} /><span>{item.number}</span><b>↗</b></div><div className="home-project-meta"><span className="eyebrow">{item.type}</span><strong>{item.title}</strong></div></AppLink>)}</div></section>
    <section className="services-strip"><div className="container services-inner"><Eyebrow number="05">THE TOOLKIT</Eyebrow><div className="service-list"><span>Edit & narrative</span><span>Color & finishing</span><span>Sound & rhythm</span><span>Capture & direction</span></div></div></section>
    <section className="home-contact container section-pad"><div className="home-contact-copy"><Eyebrow number="06">MAKE SOMETHING REAL</Eyebrow><h2>From Lagos<br /><i>to anywhere.</i></h2><p>Have a story in the rough? Bring the footage, the feeling, or just the first idea. We can find the shape together.</p><AppLink href="/contact" onNavigate={navigate} className="button button--solid">Go to contact <span>↗</span></AppLink></div><LagosMap compact /></section>
  </main>
}

function About({ navigate }) {
  return <main className="page-main"><section className="page-hero container"><Eyebrow number="01">ABOUT STANMOK</Eyebrow><h1>The edit is where<br /><i>the story wakes up.</i></h1><p className="page-lede">A small, focused video practice for work that needs a point of view — not just a timeline.</p></section><section className="about-grid container section-pad"><div className="about-image-wrap"><img src={images.about} alt="Stanmok editor working at a laptop in a studio" /><span className="image-note">STANMOK / IN THE ROOM</span></div><div className="about-copy"><Eyebrow number="02">THE PERSON BEHIND THE CUT</Eyebrow><h2>Part editor.<br />Part observer.<br /><i>Always listening.</i></h2><p>Stanmok Videography grew from a love of the in-between: the glance before a line, the room tone after a laugh, the frame that changes the whole sequence. The work is editing-heavy by design — because that is where emotion finds its rhythm.</p><p>Whether the brief is a campaign, a music-led piece, an event film, or a story still finding its shape, the process stays close: understand the intention, find the pulse, make every choice feel inevitable.</p><AppLink href="/contact" onNavigate={navigate} className="button button--solid">Start a conversation <span>↗</span></AppLink></div></section><section className="principles section-pad"><div className="container principles-grid"><div><Eyebrow number="03">WORKING PRINCIPLES</Eyebrow><h2>Less noise.<br /><i>More meaning.</i></h2></div><div className="principle-list"><div><strong>01 / Listen first</strong><p>Before touching a timeline, find what the work is really trying to say.</p></div><div><strong>02 / Cut with purpose</strong><p>Every transition, pause, and close-up should move the feeling forward.</p></div><div><strong>03 / Finish with care</strong><p>Color, sound, and delivery are not afterthoughts. They are the final sentence.</p></div></div></div></section></main>
}

function Works({ navigate }) {
  return <main className="page-main"><section className="page-hero page-hero--works container"><Eyebrow number="01">THE COLLECTION / 2022—26</Eyebrow><h1>Selected cuts,<br /><i>different moods.</i></h1><p className="page-lede">A working collection of edits, grades, and captured moments. Explore by instinct.</p></section><section className="collection container"><div className="collection-bar"><span>Filter the reel</span><div className="filter-pills"><button className="is-active">All work</button><button>Edit</button><button>Color</button><button>Capture</button></div></div><div className="work-grid">{workItems.map((item) => <article className={`work-card ${item.className}`} key={item.number}><div className="work-image"><img src={item.image} alt={item.title} /><span className="work-number">{item.number}</span><span className="work-open">↗</span></div><div className="work-meta"><div><span className="eyebrow">{item.type}</span><h2>{item.title}</h2></div><p>{item.description}</p></div></article>)}</div></section><section className="collection-note container"><span className="eyebrow">THE SHORT VERSION</span><p>Not every story needs more. It needs the right <i>less.</i></p><AppLink href="/contact" onNavigate={navigate} className="text-link">Bring a project <span>↗</span></AppLink></section></main>
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (event) => { event.preventDefault(); setSent(true) }
  return <main className="page-main"><section className="contact-hero container"><Eyebrow number="01">CONTACT / LET’S TALK</Eyebrow><h1>Have a story<br /><i>in the rough?</i></h1><p className="page-lede">Tell me what you are making, what you have so far, and where you want it to go. I’ll bring the edit.</p></section><section className="contact-grid container section-pad"><div className="contact-details"><span className="eyebrow">DIRECT LINE</span><a className="contact-email" href="mailto:stanmokgbp@gmail.com">Hello Stanmok</a><div className="contact-meta"><div><span className="eyebrow">SERVICES</span><p>Editing / Color / Sound<br />Videography / Direction</p></div><div><span className="eyebrow">BASED IN</span><p>ABUJA, Nigeria<br />Available remotely</p></div></div><LagosMap /></div><form className="contact-form" onSubmit={submit}><div className="form-row"><label>Your name<input type="text" name="name" placeholder="Jane Smith" required /></label><label>Your email<input type="email" name="email" placeholder="jane@studio.com" required /></label></div><label>What are we making?<textarea name="message" rows="5" placeholder="A short film, a campaign, a feeling..." required></textarea></label><button className="button button--solid" type="submit">{sent ? 'Message ready — thank you' : 'Send an inquiry'} <span>↗</span></button>{sent && <p className="form-success">Thanks — your note is ready. Use the email above to send it through, and Stanmok will get back to you soon.</p>}</form></section><section className="contact-image container"><img src={images.finish} alt="DaVinci Resolve finishing timeline on a large monitor" /><div><span className="eyebrow">NO GENERIC OUTPUTS</span><p>Just thoughtful work, delivered with intent.</p></div></section></main>
}

function NotFound({ navigate }) {
  return <main className="page-main"><section className="page-hero container"><Eyebrow number="404">OFF THE TIMELINE</Eyebrow><h1>This frame<br /><i>is missing.</i></h1><AppLink href="/" onNavigate={navigate} className="button button--solid">Back to the edit <span>↗</span></AppLink></section></main>
}

function App() {
  const { path, navigate } = useRouter()
  const Page = path === '/' ? Home : path === '/about' ? About : path === '/works' ? Works : path === '/contact' ? Contact : NotFound
  return <><Header path={path} navigate={navigate} /><Page navigate={navigate} /><Footer navigate={navigate} /></>
}

createRoot(document.getElementById('root')).render(<App />)
