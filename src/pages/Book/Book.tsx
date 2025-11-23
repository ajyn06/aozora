import "./Book.scss";
import { useEffect, useRef, useState } from "react";

const Book = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const guidelinesHeaderRef = useRef<HTMLElement | null>(null);
  const guidelineRefs = useRef<(HTMLLIElement | null)[]>([]);
  const customerInfoRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const dateTimeRef = useRef<HTMLDivElement | null>(null);
  const notesRef = useRef<HTMLDivElement | null>(null);
  const submitRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const bgEl = bgRef.current;
    if (!heroEl || !bgEl) return;
    requestAnimationFrame(() => {
      heroEl.classList.add("book-hero-visible");
    });

    let ticking = false;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const handleScroll = () => {
      if (!heroEl || !bgEl) return;
      if (prefersReduce) { bgEl.style.setProperty('--book-bg-offset','0px'); return; }
      const heroTop = heroEl.offsetTop;
      const scrollY = window.scrollY;
      const heroHeight = heroEl.offsetHeight;
      const progress = (scrollY - heroTop) / heroHeight; 
      const rawOffset = progress * 90; 
      const clamped = Math.max(-120, Math.min(120, rawOffset));
      bgEl.style.setProperty('--book-bg-offset', clamped + 'px');
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(handleScroll); }
    };
    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const guidelines = [
    {
      title: "Arrival Time",
      desc: "Please arrive 10 minutes prior to your reservation so we can begin promptly and honor the pacing of the experience.",
    },
    {
      title: "Experience Duration",
      desc: "Omakase journeys typically last 75–95 minutes depending on the menu and pace of service.",
    },
    {
      title: "Allergies & Preferences",
      desc: "Inform us of allergies or dietary restrictions at least 24 hours in advance; same‑day changes may limit accommodations.",
    },
    {
      title: "Cancellations",
      desc: "Cancellations within 12 hours may incur a fee due to ingredient preparation and limited seating.",
    },
    {
      title: "Group Bookings",
      desc: "Parties of six or more may require a card guarantee and a set menu confirmation.",
    },
  ];

  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0,0,0,0);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [receiptData, setReceiptData] = useState<Record<string,string>>({});
  const [guidelinesHeaderVisible, setGuidelinesHeaderVisible] = useState(false);
  const [guidelineVisible, setGuidelineVisible] = useState<boolean[]>(() => guidelines.map(() => false));
  const [formVis, setFormVis] = useState({
    customer: false,
    meta: false,
    dateTime: false,
    notes: false,
    submit: false
  });

  const goMonth = (delta: number) => {
    setCurrentMonth(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + delta);
      return d;
    });
  };

  const daysInMonth = (date: Date) => {
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate();
  };
  const today = new Date(); today.setHours(0,0,0,0);
  const firstWeekday = currentMonth.getDay(); 
  const totalDays = daysInMonth(currentMonth);
  const monthLabel = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const isPast = (year: number, month: number, day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0,0,0,0);
    return d < today;
  };

  const handleReturn = () => {
    setReceiptVisible(false);
    setTimeout(() => {
      setShowReceipt(false);
      setReceiptData({});
      setSelectedDate(null);
    }, 350); 
    if (formRef.current) {
      formRef.current.reset();
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const headerEl = guidelinesHeaderRef.current;
    const items = guidelineRefs.current;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
      setGuidelinesHeaderVisible(true);
      setGuidelineVisible(items.map(() => true));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target === headerEl) {
          setGuidelinesHeaderVisible(true);
        } else {
          const idx = items.indexOf(entry.target as HTMLLIElement);
          if (idx > -1) {
            setGuidelineVisible(prev => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -5% 0px' });
    if (headerEl) observer.observe(headerEl);
    items.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [guidelines]);

  useEffect(() => {
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets: [keyof typeof formVis, HTMLDivElement | null][] = [
      ['customer', customerInfoRef.current],
      ['meta', metaRef.current],
      ['dateTime', dateTimeRef.current],
      ['notes', notesRef.current],
      ['submit', submitRef.current]
    ];
    if (prefersReduce) {
      setFormVis({ customer:true, meta:true, dateTime:true, notes:true, submit:true });
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const match = targets.find(t => t[1] === entry.target);
        if (match) {
          setFormVis(prev => prev[match[0]] ? prev : { ...prev, [match[0]]: true });
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    targets.forEach(([,el]) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={heroRef} className="book-hero">
        <div ref={bgRef} className="book-hero-bg" />
        <div className="book-hero-overlay" />
        <div className="book-hero-content">
          <p className="book-hero-subtitle">Reserve Your</p>
          <h1 className="book-hero-title">Aozora Experience</h1>
          <p className="book-hero-desc">
            Immerse yourself in a moment of calm and craftsmanship. Select your
            preferred date, time, and dining experience — our team will prepare
            your table beneath the blue sky.
          </p>
        </div>
      </section>
      <section className="reservation-guidelines">
        <div className="reservation-guidelines-inner">
          <header
            ref={guidelinesHeaderRef}
            className="reservation-guidelines-header"
            style={{
              opacity: guidelinesHeaderVisible ? 1 : 0,
              transform: guidelinesHeaderVisible ? 'translateY(0)' : 'translateY(48px)',
              transition: 'opacity 0.9s cubic-bezier(.18,.62,.22,1), transform 0.9s cubic-bezier(.18,.62,.22,1)',
              willChange: 'opacity, transform'
            }}
          >
            <h2 className="rg-title">Reservation Guidelines</h2>
            <p className="rg-subtitle">A few notes to help us prepare a seamless experience.</p>
          </header>
          <ul className="rg-list">
            {guidelines.map((g,i) => (
              <li
                key={g.title}
                ref={el => { guidelineRefs.current[i] = el; }}
                className="rg-item"
                style={{
                  opacity: guidelineVisible[i] ? 1 : 0,
                  transform: guidelineVisible[i] ? 'translateY(0)' : 'translateY(42px)',
                  transition: 'opacity 0.9s cubic-bezier(.18,.62,.22,1), transform 0.9s cubic-bezier(.18,.62,.22,1)',
                  transitionDelay: guidelineVisible[i] ? `${0.05 + i * 0.06}s` : '0s',
                  willChange: 'opacity, transform'
                }}
              >
                <h3 className="rg-item-title">{g.title}</h3>
                <p className="rg-item-desc">{g.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="reservation-form-section">
        <form
          ref={formRef}
          className="reservation-form-inner"
          onSubmit={(e) => {
            e.preventDefault();
            const formEl = e.currentTarget;
            const formData = new FormData(formEl);
            const data: Record<string, string> = {};
            formData.forEach((v, k) => (data[k] = String(v)));
            setReceiptData(data);
            setShowReceipt(true);
            setTimeout(() => setReceiptVisible(true), 10); 
            formEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <div
            ref={customerInfoRef}
            className="rf-customer-info"
            style={{
              opacity: formVis.customer ? 1 : 0,
              transform: formVis.customer ? 'translateY(0)' : 'translateY(46px)',
              transition: 'opacity 0.85s cubic-bezier(.18,.62,.22,1), transform 0.85s cubic-bezier(.18,.62,.22,1)',
              willChange: 'opacity, transform'
            }}
          >
            <h2 className="rf-column-title">Customer Information</h2>
            <div className="rf-group">
              <label className="rf-label" htmlFor="firstName">First Name</label>
              <input className="rf-input" id="firstName" name="firstName" type="text" required />
            </div>
            <div className="rf-group">
              <label className="rf-label" htmlFor="lastName">Last Name</label>
              <input className="rf-input" id="lastName" name="lastName" type="text" required />
            </div>
            <div className="rf-group">
              <label className="rf-label" htmlFor="contactNumber">Contact Number</label>
              <input className="rf-input" id="contactNumber" name="contactNumber" type="tel" required />
            </div>
            <div className="rf-group">
              <label className="rf-label" htmlFor="email">Email Address</label>
              <input className="rf-input" id="email" name="email" type="email" required />
            </div>
          </div>
          <div
            ref={metaRef}
            className="rf-meta"
            style={{
              opacity: formVis.meta ? 1 : 0,
              transform: formVis.meta ? 'translateY(0)' : 'translateY(46px)',
              transition: 'opacity 0.85s cubic-bezier(.18,.62,.22,1) 0.05s, transform 0.85s cubic-bezier(.18,.62,.22,1) 0.05s',
              willChange: 'opacity, transform'
            }}
          >
            <div className="rf-group">
              <label className="rf-label" htmlFor="guestCount">Guest Count</label>
              <div className="rf-select-wrapper">
                <select className="rf-select" id="guestCount" name="guestCount" required>
                  {Array.from({ length: 9 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                  <option value="10+">10+</option>
                </select>
              </div>
            </div>
            <div className="rf-group">
              <label className="rf-label" htmlFor="experienceType">Experience Type</label>
              <div className="rf-select-wrapper">
                <select className="rf-select" id="experienceType" name="experienceType" required>
                  <option value="Omakase Experience">Omakase Experience</option>
                  <option value="Regular Meal">Regular Meal</option>
                </select>
              </div>
            </div>
          </div>
          <div
            ref={dateTimeRef}
            className="rf-date-time"
            style={{
              opacity: formVis.dateTime ? 1 : 0,
              transform: formVis.dateTime ? 'translateY(0)' : 'translateY(46px)',
              transition: 'opacity 0.85s cubic-bezier(.18,.62,.22,1) 0.1s, transform 0.85s cubic-bezier(.18,.62,.22,1) 0.1s',
              willChange: 'opacity, transform'
            }}
          >
            <div className="rf-group">
              <label className="rf-label" htmlFor="date">Select a Date</label>
              <div className="rf-date-box">
                <div className="rf-calendar" aria-label="Calendar date picker">
                  <div className="rf-cal-header redesigned">
                    <button type="button" className="rf-cal-nav prev" aria-label="Previous Month" onClick={() => goMonth(-1)} />
                    <span className="rf-cal-month" aria-live="polite">{monthLabel}</span>
                    <button type="button" className="rf-cal-nav next" aria-label="Next Month" onClick={() => goMonth(1)} />
                  </div>
                  <div className="rf-cal-weekdays redesigned">
                    {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(w => <span key={w} className="rf-cal-wd redesigned">{w}</span>)}
                  </div>
                  <div className="rf-cal-grid redesigned">
                    {Array.from({ length: firstWeekday }).map((_,i) => <span key={"pad"+i} className="rf-cal-pad" />)}
                    {Array.from({ length: totalDays }).map((_, dayIndex) => {
                      const day = dayIndex + 1;
                      const year = currentMonth.getFullYear();
                      const month = currentMonth.getMonth();
                      const disabled = isPast(year, month, day);
                      const dateObj = new Date(year, month, day);
                      const selected = selectedDate && dateObj.getTime() === selectedDate.getTime();
                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={disabled}
                          className={"rf-cal-day redesigned" + (selected ? " selected" : "") + (disabled ? " disabled" : "")}
                          onClick={() => { if(!disabled){ setSelectedDate(dateObj); } }}
                        >
                          <span>{day}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <input type="hidden" name="date" value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""} required />
              </div>
            </div>
            <div className="rf-group">
              <label className="rf-label" htmlFor="time">Select a Time</label>
              <div className="rf-select-wrapper">
                <select className="rf-select" id="time" name="time" required>
                {(() => {
                  const times: string[] = [];
                  const startHour = 17; 
                  const startMinute = 30; 
                  const endHour = 23; 
                  for (let hour = startHour; hour <= endHour; hour++) {
                    for (const minute of [0, 30]) {
                      if (hour === startHour && minute < startMinute) continue;
                      if (hour === endHour && minute > 0) break;
                      const h12 = ((hour + 11) % 12) + 1;
                      const ampm = hour < 12 ? "am" : "pm";
                      const label = `${h12}:${minute.toString().padStart(2, "0")} ${ampm}`;
                      times.push(label);
                    }
                  }
                  return times.map(t => <option key={t} value={t}>{t}</option>);
                })()}
                </select>
              </div>
            </div>
          </div>
          <div
            ref={notesRef}
            className="rf-notes rf-group"
            style={{
              opacity: formVis.notes ? 1 : 0,
              transform: formVis.notes ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.85s cubic-bezier(.18,.62,.22,1) 0.15s, transform 0.85s cubic-bezier(.18,.62,.22,1) 0.15s',
              willChange: 'opacity, transform'
            }}
          >
            <label className="rf-label" htmlFor="notes">Special Requests / Notes</label>
            <textarea className="rf-textarea" id="notes" name="notes" placeholder="" />
          </div>
          <div
            ref={submitRef}
            className="rf-submit-wrapper"
            style={{
              opacity: formVis.submit ? 1 : 0,
              transform: formVis.submit ? 'translateY(0)' : 'translateY(36px)',
              transition: 'opacity 0.85s cubic-bezier(.18,.62,.22,1) 0.2s, transform 0.85s cubic-bezier(.18,.62,.22,1) 0.2s',
              willChange: 'opacity, transform'
            }}
          >
            <button type="submit" className="rf-submit-btn">Submit</button>
          </div>
        </form>
      </section>
      {showReceipt && (
        <div className="reservation-receipt-overlay" onClick={() => setReceiptVisible(false)}>
          <div
            className={`reservation-receipt${receiptVisible ? ' receipt-open' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <header className="rr-header">
              <h2 className="rr-title">Thank You for Reserving</h2>
              <p className="rr-subtitle">with Aozora</p>
            </header>
            <div className="rr-confirm-box">
              <p className="rr-confirm-text">A confirmation email has been sent to your inbox. Please present it to our front desk upon arrival. We look forward to welcoming you beneath the blue sky.</p>
            </div>
            <hr className="rr-divider" />
            <div className="rr-section rr-section-primary">
              <div className="rr-row"><span className="rr-label">First Name:</span><span className="rr-value">{receiptData.firstName}</span></div>
              <div className="rr-row"><span className="rr-label">Last Name:</span><span className="rr-value">{receiptData.lastName}</span></div>
              <div className="rr-row"><span className="rr-label">Contact Number:</span><span className="rr-value">{receiptData.contactNumber}</span></div>
              <div className="rr-row"><span className="rr-label">Email Address:</span><span className="rr-value">{receiptData.email}</span></div>
            </div>
            <hr className="rr-divider" />
            <div className="rr-section rr-section-meta">
              <div className="rr-row"><span className="rr-label">Guest Count:</span><span className="rr-value">{receiptData.guestCount}</span></div>
              <div className="rr-row"><span className="rr-label">Experience Type:</span><span className="rr-value">{receiptData.experienceType}</span></div>
            </div>
            <hr className="rr-divider" />
            <div className="rr-section rr-section-date">
              <div className="rr-row"><span className="rr-label">Date:</span><span className="rr-value">{receiptData.date ? new Date(receiptData.date + 'T00:00:00').toLocaleDateString("default", { month: "long", day: "numeric", year: "numeric" }) : ""}</span></div>
              <div className="rr-row"><span className="rr-label">Time:</span><span className="rr-value">{receiptData.time}</span></div>
              <div className="rr-row"><span className="rr-label">Note:</span><span className="rr-value">{receiptData.notes || "—"}</span></div>
            </div>
            <hr className="rr-divider" />
            <div className="rr-actions">
              <button type="button" className="rr-home-btn" onClick={handleReturn}>Return to Home</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
