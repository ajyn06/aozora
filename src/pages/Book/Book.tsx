import "./Book.scss";
import { useEffect, useRef, useState } from "react";

const Book = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const bgEl = bgRef.current;
    if (!heroEl || !bgEl) return;
    requestAnimationFrame(() => {
      heroEl.classList.add("book-hero-visible");
    });

    let ticking = false;
    const handleScroll = () => {
      if (!heroEl || !bgEl) return;
      const rect = heroEl.getBoundingClientRect();
      const viewportH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewportH) return; 
      const offset = rect.top * -0.25; 
      bgEl.style.setProperty("--book-bg-offset", `${offset}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
      }
    };
    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  // Calendar 
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0,0,0,0);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Receipt 
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<Record<string,string>>({});

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
  const firstWeekday = currentMonth.getDay(); // 0-6
  const totalDays = daysInMonth(currentMonth);
  const monthLabel = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const isPast = (year: number, month: number, day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0,0,0,0);
    return d < today;
  };

  const handleReturn = () => {
    setShowReceipt(false);
    setReceiptData({});
    setSelectedDate(null);
    if (formRef.current) {
      formRef.current.reset();
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          <header className="reservation-guidelines-header">
            <h2 className="rg-title">Reservation Guidelines</h2>
            <p className="rg-subtitle">A few notes to help us prepare a seamless experience.</p>
          </header>
          <ul className="rg-list">
            {guidelines.map(g => (
              <li key={g.title} className="rg-item">
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
            formEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <div className="rf-customer-info">
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
          <div className="rf-meta">
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
          <div className="rf-date-time">
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
                      if (hour === endHour && minute > 0) break; // only 11:00 pm final
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
          <div className="rf-notes rf-group">
            <label className="rf-label" htmlFor="notes">Special Requests / Notes</label>
            <textarea className="rf-textarea" id="notes" name="notes" placeholder="" />
          </div>
          <div className="rf-submit-wrapper">
            <button type="submit" className="rf-submit-btn">Submit</button>
          </div>
        </form>
      </section>
      {showReceipt && (
        <div className="reservation-receipt-overlay" onClick={() => setShowReceipt(false)}>
          <div className="reservation-receipt" onClick={e => e.stopPropagation()}>
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
