import { useState } from "react";

const phases = [
  { id: 1, label: "Phase 1", subtitle: "Foundation", weeks: [1,2,3,4,5,6], color: "#4ade80", bg: "#052e16" },
  { id: 2, label: "Phase 2", subtitle: "Build", weeks: [7,8,9,10,11,12], color: "#facc15", bg: "#1c1400" },
  { id: 3, label: "Phase 3", subtitle: "Optimize", weeks: [13,14,15,16], color: "#f97316", bg: "#1c0a00" },
];

const dayTypes = {
  strength_upper: { label: "Strength · Upper", icon: "💪", tag: "STRENGTH", tagColor: "#4ade80" },
  strength_lower: { label: "Strength · Lower + Core", icon: "🦵", tag: "STRENGTH", tagColor: "#4ade80" },
  cardio: { label: "Cardio / Fat Burn", icon: "🔥", tag: "CARDIO", tagColor: "#f97316" },
  circuit: { label: "Full Body Circuit", icon: "⚡", tag: "CIRCUIT", tagColor: "#facc15" },
  recovery: { label: "Active Recovery", icon: "🚶", tag: "RECOVERY", tagColor: "#60a5fa" },
  rest: { label: "Rest / Walk", icon: "😴", tag: "REST", tagColor: "#6b7280" },
};

const weeklyTemplate = [
  { day: "MON", type: "strength_upper" },
  { day: "TUE", type: "cardio" },
  { day: "WED", type: "recovery" },
  { day: "THU", type: "strength_lower" },
  { day: "FRI", type: "cardio" },
  { day: "SAT", type: "circuit" },
  { day: "SUN", type: "rest" },
];

const workouts = {
  strength_upper: {
    phase1: {
      title: "Foundation Upper Body",
      sets: "3 rounds · 60s rest between rounds",
      exercises: [
        { name: "Push-Ups", sets: "3", reps: "10–15", note: "Modify on knees if needed" },
        { name: "DB Bent-Over Row", sets: "3", reps: "12 each side", note: "Keep back flat" },
        { name: "DB Shoulder Press", sets: "3", reps: "12", note: "Seated or standing" },
        { name: "DB Bicep Curl", sets: "3", reps: "12", note: "Controlled tempo" },
        { name: "Tricep Dips", sets: "3", reps: "10–12", note: "Use chair or couch" },
        { name: "Band Pull-Apart", sets: "3", reps: "15", note: "Rear delt focus" },
      ]
    },
    phase2: {
      title: "Build Upper Body",
      sets: "4 rounds · 45s rest between rounds",
      exercises: [
        { name: "DB Bench Press (Floor)", sets: "4", reps: "10", note: "Full range of motion" },
        { name: "Renegade Row", sets: "4", reps: "8 each side", note: "Core tight throughout" },
        { name: "Arnold Press", sets: "4", reps: "10", note: "Slow on the way down" },
        { name: "Hammer Curl", sets: "4", reps: "12", note: "Neutral grip" },
        { name: "Close-Grip Push-Up", sets: "4", reps: "12", note: "Elbows tight to body" },
        { name: "Band Face Pull", sets: "4", reps: "15", note: "Anchor band at eye level" },
      ]
    },
    phase3: {
      title: "Optimize Upper Body",
      sets: "4–5 rounds · 30s rest between rounds",
      exercises: [
        { name: "DB Floor Press", sets: "5", reps: "10", note: "Increase weight vs Phase 2" },
        { name: "Single-Arm DB Row", sets: "5", reps: "10 each side", note: "Drive elbow to ceiling" },
        { name: "DB Lateral Raise", sets: "4", reps: "15", note: "Light weight, slow tempo" },
        { name: "Superset: Curl + Press", sets: "4", reps: "10+10", note: "No rest between moves" },
        { name: "Band Tricep Pushdown", sets: "4", reps: "15", note: "Anchor band overhead" },
        { name: "Push-Up Burnout", sets: "1", reps: "Max reps", note: "To finish the session" },
      ]
    }
  },
  strength_lower: {
    phase1: {
      title: "Foundation Lower + Core",
      sets: "3 rounds · 60s rest between rounds",
      exercises: [
        { name: "Goblet Squat", sets: "3", reps: "12", note: "Hold DB at chest" },
        { name: "Glute Bridge", sets: "3", reps: "15", note: "Squeeze at top" },
        { name: "Forward Lunge", sets: "3", reps: "10 each leg", note: "Bodyweight or light DB" },
        { name: "Standing Calf Raise", sets: "3", reps: "20", note: "Slow and controlled" },
        { name: "Plank", sets: "3", reps: "30–45 sec", note: "Brace core hard" },
        { name: "Dead Bug", sets: "3", reps: "8 each side", note: "Low back stays flat" },
      ]
    },
    phase2: {
      title: "Build Lower + Core",
      sets: "4 rounds · 45s rest between rounds",
      exercises: [
        { name: "DB Romanian Deadlift", sets: "4", reps: "10", note: "Hinge at hips, soft knees" },
        { name: "Reverse Lunge", sets: "4", reps: "10 each leg", note: "Add DBs for challenge" },
        { name: "Sumo Squat", sets: "4", reps: "12", note: "Wide stance, toes out" },
        { name: "Single-Leg Glute Bridge", sets: "4", reps: "12 each side", note: "Drive through heel" },
        { name: "Plank to Down-Dog", sets: "4", reps: "10", note: "Smooth transition" },
        { name: "Russian Twist", sets: "4", reps: "15 each side", note: "Optional light DB" },
      ]
    },
    phase3: {
      title: "Optimize Lower + Core",
      sets: "4–5 rounds · 30s rest between rounds",
      exercises: [
        { name: "DB Goblet Squat", sets: "5", reps: "12", note: "Heavier than Phase 2" },
        { name: "DB Deadlift", sets: "5", reps: "10", note: "Two DBs, full hip extension" },
        { name: "Walking Lunge", sets: "4", reps: "12 each leg", note: "Add DBs for load" },
        { name: "Nordic Hamstring Curl", sets: "3", reps: "8", note: "Use couch to anchor feet" },
        { name: "Ab Wheel / Rollout", sets: "4", reps: "8–10", note: "Sub plank if needed" },
        { name: "Band Clamshell", sets: "4", reps: "15 each side", note: "Hip abductor activation" },
      ]
    }
  },
  cardio: {
    phase1: {
      title: "Low-Impact Fat Burn",
      sets: "30 min total",
      exercises: [
        { name: "March in Place / Brisk Walk", sets: "—", reps: "5 min", note: "Warm-up" },
        { name: "Band Squat + Row Combo", sets: "—", reps: "40s on / 20s off × 4", note: "" },
        { name: "Step Touch Side-to-Side", sets: "—", reps: "40s on / 20s off × 4", note: "Get the heart rate up" },
        { name: "Band Chest Press (Standing)", sets: "—", reps: "40s on / 20s off × 4", note: "" },
        { name: "Low Squat Hold + Pulse", sets: "—", reps: "40s on / 20s off × 2", note: "Burn it out" },
        { name: "Cool-Down Stretch", sets: "—", reps: "5 min", note: "Hip flexors, hamstrings, chest" },
      ]
    },
    phase2: {
      title: "HIIT Intervals",
      sets: "30 min total",
      exercises: [
        { name: "Light Jog / Jump Rope", sets: "—", reps: "5 min", note: "Warm-up" },
        { name: "Squat Jumps", sets: "—", reps: "30s on / 30s off × 4", note: "Land softly" },
        { name: "Mountain Climbers", sets: "—", reps: "30s on / 30s off × 4", note: "Keep hips level" },
        { name: "Burpee (No Jump)", sets: "—", reps: "30s on / 30s off × 4", note: "Step out/in if needed" },
        { name: "Jumping Jacks", sets: "—", reps: "30s on / 30s off × 2", note: "Active recovery pace" },
        { name: "Cool-Down + Breathwork", sets: "—", reps: "5 min", note: "Deep belly breaths" },
      ]
    },
    phase3: {
      title: "Advanced HIIT + Density",
      sets: "30 min total",
      exercises: [
        { name: "Dynamic Warm-Up", sets: "—", reps: "5 min", note: "Leg swings, arm circles, lunges" },
        { name: "DB Thruster", sets: "—", reps: "40s on / 20s off × 4", note: "Squat + press combo" },
        { name: "Speed Skaters", sets: "—", reps: "40s on / 20s off × 4", note: "Lateral power" },
        { name: "Push-Up + Shoulder Tap", sets: "—", reps: "40s on / 20s off × 4", note: "" },
        { name: "Jump Lunge", sets: "—", reps: "30s on / 30s off × 2", note: "Step lunge if needed" },
        { name: "Cool-Down Stretch", sets: "—", reps: "5 min", note: "Full body stretch" },
      ]
    }
  },
  circuit: {
    phase1: {
      title: "Full Body Foundation Circuit",
      sets: "3 rounds · 45s rest between rounds",
      exercises: [
        { name: "Goblet Squat", sets: "3", reps: "12", note: "" },
        { name: "Push-Up", sets: "3", reps: "12", note: "" },
        { name: "DB Row", sets: "3", reps: "10 each", note: "" },
        { name: "Glute Bridge", sets: "3", reps: "15", note: "" },
        { name: "Plank", sets: "3", reps: "30 sec", note: "" },
        { name: "Band Pull-Apart", sets: "3", reps: "15", note: "" },
      ]
    },
    phase2: {
      title: "Full Body Build Circuit",
      sets: "4 rounds · 30s rest between rounds",
      exercises: [
        { name: "DB Deadlift", sets: "4", reps: "10", note: "" },
        { name: "Renegade Row", sets: "4", reps: "8 each", note: "" },
        { name: "DB Reverse Lunge", sets: "4", reps: "10 each", note: "" },
        { name: "Push-Up Variation", sets: "4", reps: "12", note: "Wide, close, or staggered" },
        { name: "Band Squat + Press", sets: "4", reps: "12", note: "" },
        { name: "Hollow Body Hold", sets: "4", reps: "20 sec", note: "" },
      ]
    },
    phase3: {
      title: "Full Body Optimize Circuit",
      sets: "5 rounds · 20s rest between rounds",
      exercises: [
        { name: "DB Thruster", sets: "5", reps: "10", note: "Full compound movement" },
        { name: "Single-Leg Deadlift", sets: "5", reps: "8 each", note: "Balance challenge" },
        { name: "Push-Up + Row", sets: "5", reps: "8 each", note: "Renegade style" },
        { name: "Jump Squat or Squat", sets: "5", reps: "12", note: "Choose impact level" },
        { name: "Band Pallof Press", sets: "5", reps: "10 each", note: "Anti-rotation core" },
        { name: "V-Up or Tuck Crunch", sets: "5", reps: "12", note: "" },
      ]
    }
  },
  recovery: {
    phase1: { title: "Active Recovery", sets: "20–30 min", exercises: [
      { name: "Stroller Walk", sets: "—", reps: "20–30 min", note: "Bonus: gets baby outside too!" },
      { name: "Hip Flexor Stretch", sets: "—", reps: "60 sec each side", note: "" },
      { name: "Thoracic Rotation", sets: "—", reps: "10 each side", note: "Open up the chest" },
      { name: "Cat-Cow", sets: "—", reps: "10 reps", note: "Breathe through it" },
      { name: "Child's Pose", sets: "—", reps: "60 sec", note: "" },
    ]},
    phase2: { title: "Active Recovery", sets: "20–30 min", exercises: [
      { name: "Stroller Walk or Light Bike", sets: "—", reps: "20–30 min", note: "" },
      { name: "Foam Roll (if available)", sets: "—", reps: "5 min", note: "Quads, IT band, upper back" },
      { name: "World's Greatest Stretch", sets: "—", reps: "5 each side", note: "" },
      { name: "Shoulder Mobility Circles", sets: "—", reps: "10 each direction", note: "" },
      { name: "Deep Squat Hold", sets: "—", reps: "60 sec", note: "" },
    ]},
    phase3: { title: "Active Recovery", sets: "20–30 min", exercises: [
      { name: "Walk or Easy Jog", sets: "—", reps: "20–30 min", note: "" },
      { name: "Full Body Mobility Flow", sets: "—", reps: "10 min", note: "Lunge, twist, reach" },
      { name: "Pigeon Pose", sets: "—", reps: "90 sec each side", note: "Hip opener" },
      { name: "Band Dislocates", sets: "—", reps: "10 reps", note: "Shoulder health" },
      { name: "Box Breathing", sets: "—", reps: "5 min", note: "4 in / 4 hold / 4 out / 4 hold" },
    ]},
  },
  rest: {
    phase1: { title: "Rest or Gentle Walk", sets: "Optional", exercises: [
      { name: "Walk (with or without stroller)", sets: "—", reps: "15–30 min optional", note: "No pressure — rest if needed" },
    ]},
    phase2: { title: "Rest or Gentle Walk", sets: "Optional", exercises: [
      { name: "Walk (with or without stroller)", sets: "—", reps: "15–30 min optional", note: "No pressure — rest if needed" },
    ]},
    phase3: { title: "Rest or Gentle Walk", sets: "Optional", exercises: [
      { name: "Walk (with or without stroller)", sets: "—", reps: "15–30 min optional", note: "No pressure — rest if needed" },
    ]},
  }
};

const phaseForWeek = (w) => w <= 6 ? "phase1" : w <= 12 ? "phase2" : "phase3";
const phaseObjForWeek = (w) => phases.find(p => p.weeks.includes(w)) || phases[2];

const weekTips = {
  1: "Focus on form over intensity. Getting the habit started is the win.",
  2: "Try to hit all 4 training days this week. Consistency is everything right now.",
  3: "You should start to feel the routine clicking. Add a little more weight if exercises feel easy.",
  4: "Halfway through Phase 1. Take stock — sleep, energy, and how clothes fit matter more than the scale.",
  5: "Push your cardio intensity slightly. You've earned it.",
  6: "Final week of foundations. You've built a base — Phase 2 is going to level this up.",
  7: "Welcome to Phase 2. Increase weights by 5–10% across all strength moves.",
  8: "HIIT is harder — that's the point. Your body is adapting.",
  9: "Check your nutrition this week. Protein target: ~180g/day.",
  10: "You're 10 weeks in. Take a progress photo — the mirror is often more motivating than the scale.",
  11: "Energy permitting, add a 5th optional active day. Even a 20-min walk counts.",
  12: "Final week of Phase 2. You should feel significantly stronger than Week 1.",
  13: "Phase 3 — push density, not just weight. Shorter rest, more reps.",
  14: "Focus on progressive overload this week. Even one extra rep per set is progress.",
  15: "Almost there. This is when most people plateau — stay the course and trust the process.",
  16: "Final week. Finish strong. Then reassess and set your next 16-week goal.",
};

export default function FitnessCalendar() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [activePhaseFilter, setActivePhaseFilter] = useState(null);

  const phase = phaseForWeek(selectedWeek);
  const phaseObj = phaseObjForWeek(selectedWeek);

  const allWeeks = Array.from({ length: 16 }, (_, i) => i + 1);
  const filteredWeeks = activePhaseFilter
    ? phases.find(p => p.id === activePhaseFilter)?.weeks || allWeeks
    : allWeeks;

  const handleDayClick = (dayIdx) => {
    setSelectedDay(selectedDay === dayIdx ? null : dayIdx);
  };

  const selectedDayData = selectedDay !== null ? weeklyTemplate[selectedDay] : null;
  const workoutData = selectedDayData ? workouts[selectedDayData.type]?.[phase] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e5e5e5",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f2010 0%, #0a0a0a 60%)",
        borderBottom: "1px solid #1a2a1a",
        padding: "32px 24px 24px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "#4ade80",
            textTransform: "uppercase",
            marginBottom: 8,
            fontFamily: "'Courier New', monospace",
          }}>16-Week Program</div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 400,
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>New Dad Fitness Plan</h1>
          <p style={{ color: "#6b7280", margin: 0, fontSize: 14, fontStyle: "italic" }}>
            30 minutes · Home equipment · Fat loss &amp; general health
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* Phase legend */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {phases.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePhaseFilter(activePhaseFilter === p.id ? null : p.id)}
              style={{
                background: activePhaseFilter === p.id ? p.color : "transparent",
                border: `1px solid ${p.color}`,
                color: activePhaseFilter === p.id ? "#000" : p.color,
                borderRadius: 4,
                padding: "6px 14px",
                fontSize: 12,
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {p.label} · {p.subtitle} · Wks {p.weeks[0]}–{p.weeks[p.weeks.length-1]}
            </button>
          ))}
          {activePhaseFilter && (
            <button
              onClick={() => setActivePhaseFilter(null)}
              style={{ background: "transparent", border: "1px solid #333", color: "#6b7280", borderRadius: 4, padding: "6px 14px", fontSize: 12, fontFamily: "'Courier New', monospace", cursor: "pointer" }}
            >
              Show All
            </button>
          )}
        </div>

        {/* Week grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          gap: 8,
          marginBottom: 32,
        }}>
          {allWeeks.map(w => {
            const po = phaseObjForWeek(w);
            const isFiltered = activePhaseFilter && !filteredWeeks.includes(w);
            const isSelected = selectedWeek === w;
            return (
              <button
                key={w}
                onClick={() => { setSelectedWeek(w); setSelectedDay(null); }}
                style={{
                  background: isSelected ? po.color : isFiltered ? "#111" : "#141414",
                  border: `1px solid ${isSelected ? po.color : isFiltered ? "#1a1a1a" : "#222"}`,
                  borderRadius: 6,
                  padding: "10px 4px",
                  cursor: isFiltered ? "default" : "pointer",
                  opacity: isFiltered ? 0.25 : 1,
                  transition: "all 0.15s",
                  textAlign: "center",
                }}
              >
                <div style={{
                  fontSize: 10,
                  fontFamily: "'Courier New', monospace",
                  color: isSelected ? "#000" : "#555",
                  letterSpacing: "0.1em",
                }}>WK</div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: isSelected ? "#000" : po.color,
                  lineHeight: 1.1,
                }}>{w}</div>
              </button>
            );
          })}
        </div>

        {/* Selected week */}
        <div style={{
          background: "#111",
          border: `1px solid ${phaseObj.color}22`,
          borderRadius: 10,
          padding: "20px",
          marginBottom: 24,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <div>
              <span style={{ fontSize: 11, fontFamily: "'Courier New', monospace", color: phaseObj.color, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {phaseObj.label} · {phaseObj.subtitle}
              </span>
              <h2 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 400 }}>Week {selectedWeek}</h2>
            </div>
            <div style={{
              background: "#0a0a0a",
              border: "1px solid #222",
              borderRadius: 6,
              padding: "10px 14px",
              maxWidth: 320,
              fontSize: 13,
              color: "#aaa",
              fontStyle: "italic",
              lineHeight: 1.5,
            }}>
              💡 {weekTips[selectedWeek]}
            </div>
          </div>

          {/* Day grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
            {weeklyTemplate.map((d, idx) => {
              const dt = dayTypes[d.type];
              const isActive = selectedDay === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleDayClick(idx)}
                  style={{
                    background: isActive ? "#1a1a1a" : "#0d0d0d",
                    border: `1px solid ${isActive ? dt.tagColor : "#1e1e1e"}`,
                    borderRadius: 8,
                    padding: "10px 4px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: 9, color: "#555", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em", marginBottom: 4 }}>{d.day}</div>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{dt.icon}</div>
                  <div style={{
                    fontSize: 8,
                    background: dt.tagColor + "22",
                    color: dt.tagColor,
                    borderRadius: 3,
                    padding: "2px 4px",
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "0.05em",
                    display: "inline-block",
                  }}>{dt.tag}</div>
                </button>
              );
            })}
          </div>

          {/* Day labels below on mobile */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginTop: 6 }}>
            {weeklyTemplate.map((d, idx) => {
              const dt = dayTypes[d.type];
              return (
                <div key={idx} style={{ textAlign: "center", fontSize: 9, color: "#444", lineHeight: 1.3 }}>
                  {dt.label.split("·")[0].trim()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Workout detail panel */}
        {selectedDay !== null && workoutData && (
          <div style={{
            background: "#111",
            border: `1px solid ${dayTypes[selectedDayData.type].tagColor}33`,
            borderRadius: 10,
            padding: "20px",
            animation: "fadeIn 0.2s ease",
          }}>
            <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: "'Courier New', monospace", color: dayTypes[selectedDayData.type].tagColor, letterSpacing: "0.15em", marginBottom: 4 }}>
                  {weeklyTemplate[selectedDay].day} · WK {selectedWeek}
                </div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 400 }}>{workoutData.title}</h3>
              </div>
              <div style={{ fontSize: 12, color: "#555", fontStyle: "italic", alignSelf: "flex-end" }}>
                {workoutData.sets}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {workoutData.exercises.map((ex, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: "8px 16px",
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  borderRadius: 7,
                  padding: "12px 14px",
                  alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: 14, color: "#e5e5e5" }}>{ex.name}</div>
                    {ex.note && <div style={{ fontSize: 11, color: "#555", fontStyle: "italic", marginTop: 2 }}>{ex.note}</div>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: "#444", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em" }}>SETS</div>
                    <div style={{ fontSize: 16, color: dayTypes[selectedDayData.type].tagColor, fontWeight: 600 }}>{ex.sets}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: "#444", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em" }}>REPS</div>
                    <div style={{ fontSize: 13, color: "#ccc" }}>{ex.reps}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, padding: "10px 14px", background: "#0a0a0a", borderRadius: 6, border: "1px solid #1a1a1a" }}>
              <span style={{ fontSize: 11, color: "#444", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em" }}>NEW DAD NOTE · </span>
              <span style={{ fontSize: 12, color: "#666", fontStyle: "italic" }}>
                {selectedDayData.type === "rest" ? "Rest is training. Sleep when the baby sleeps." :
                 selectedDayData.type === "recovery" ? "Stroller walks count — fresh air is good for both of you." :
                 selectedDayData.type === "cardio" ? "If you're sleep-deprived, drop intensity by 30%. Showing up matters more than crushing it." :
                 "If the baby naps, this is your window. Keep weights nearby and be ready to pause."}
              </span>
            </div>
          </div>
        )}

        {selectedDay === null && (
          <div style={{ textAlign: "center", padding: "24px", color: "#333", fontSize: 13, fontStyle: "italic" }}>
            ↑ Tap a day to view the full workout
          </div>
        )}

        {/* Phase summary cards */}
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {phases.map(p => (
            <div key={p.id} style={{
              background: "#111",
              border: `1px solid ${p.color}22`,
              borderRadius: 8,
              padding: "16px",
            }}>
              <div style={{ fontSize: 10, fontFamily: "'Courier New', monospace", color: p.color, letterSpacing: "0.15em", marginBottom: 6 }}>
                WEEKS {p.weeks[0]}–{p.weeks[p.weeks.length-1]}
              </div>
              <div style={{ fontSize: 16, marginBottom: 4 }}>{p.label} · {p.subtitle}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>
                {p.id === 1 && "Build the habit, restore movement patterns, start burning fat. 3 rounds, 60s rest."}
                {p.id === 2 && "Increase weights, add supersets, introduce HIIT cardio. 4 rounds, 45s rest."}
                {p.id === 3 && "Max density, shorter rest, heavier loads. 4–5 rounds, 20–30s rest."}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: "14px 16px", background: "#0d0d0d", borderRadius: 8, border: "1px solid #1a1a1a", fontSize: 12, color: "#444", textAlign: "center", fontStyle: "italic" }}>
          Progressive overload principle: add 5 lbs or 1–2 reps per exercise every 1–2 weeks when the current load feels manageable.
        </div>
      </div>
    </div>
  );
}
