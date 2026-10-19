import { useEffect, useRef, useState } from "react";
import "../growth.css";

const SKILLS = [
    { name: "Wiring lullabies", level: 82, note: "Almost tall enough" },
    { name: "Giggling", level: 100, note: "Off the chart" },
    { name: "Delivering dreams", level: 70, note: "Before sunrise" },
    { name: "Not tripping on wires", level: 34, note: "Working on it" },
    { name: "Staying awake", level: 18, note: "Yaaawn" },
];

export function GrowthChart() {
    const ref = useRef<HTMLElement>(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const io = new IntersectionObserver(
            ([entry]) => {
            if (entry.isIntersecting) {
                setSeen(true);
                io.disconnect();
            }
        },
        { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
}, []);

return (
    <section className="growth-section" id="growth" ref={ref}>
        <div className="growth-inner section-wrap">
           <h2>
             Pip&apos;s <em>growth chart.</em>
           </h2>
           <p className="growth-lead">
             Measured every full moon. Please ignore the wobbling.
           </p>

           <ul className="growth-list">
             {SKILLS.map((s, i) => (
               <li key={s.name} className={seen ? "is-grown" : ""}>
                 <div className="growth-label">
                   <span>{s.name}</span>
                   <small>{s.note}</small>
                 </div>
                 <div className="growth-track" aria-hidden="true">
                   <span
                     className="growth-fill"
                     style={{ ["--lvl" as string]: `${s.level}%`, transitionDelay: `${i * 120}ms` }}
                   />
                 </div>
                 <span className="sr-only">{s.level} percent</span>
               </li>
             ))}
           </ul>
         </div>
       </section>
     );
   }