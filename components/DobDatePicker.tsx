"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDob(d: Date) {
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
}

function parseDob(value: string): Date | null {
  const m = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  const year = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  return d;
}

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  required?: boolean;
};

export function DobDatePicker({ id, value, onChange, invalid, required }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const parsed = parseDob(value);
  const today = useMemo(() => new Date(), []);
  const maxYear = today.getFullYear();
  const minYear = maxYear - 110;

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(parsed?.getFullYear() ?? 1990);
  const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? 0);

  useEffect(() => {
    if (!open) return;
    const d = parseDob(value);
    if (d) {
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [open, value]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = maxYear; y >= minYear; y--) list.push(y);
    return list;
  }, [maxYear, minYear]);

  const cells = useMemo(() => {
    const firstDow = new Date(viewYear, viewMonth, 1).getDay();
    const total = daysInMonth(viewYear, viewMonth);
    const items: Array<{ day: number | null; date?: Date }> = [];
    for (let i = 0; i < firstDow; i++) items.push({ day: null });
    for (let day = 1; day <= total; day++) {
      items.push({ day, date: new Date(viewYear, viewMonth, day) });
    }
    while (items.length % 7 !== 0) items.push({ day: null });
    return items;
  }, [viewYear, viewMonth]);

  function shiftMonth(delta: number) {
    const d = new Date(viewYear, viewMonth + delta, 1);
    let y = d.getFullYear();
    let m = d.getMonth();
    if (y > maxYear) {
      y = maxYear;
      m = 11;
    }
    if (y < minYear) {
      y = minYear;
      m = 0;
    }
    setViewYear(y);
    setViewMonth(m);
  }

  function selectDate(date: Date) {
    if (date > today) return;
    onChange(formatDob(date));
    setOpen(false);
  }

  function isSelected(date: Date) {
    return !!parsed && formatDob(parsed) === formatDob(date);
  }

  function isToday(date: Date) {
    return formatDob(date) === formatDob(today);
  }

  return (
    <div className="dob-picker" ref={rootRef}>
      <div className={`dob-field${invalid ? " is-invalid" : ""}${open ? " is-open" : ""}`}>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder="mm/dd/yyyy"
          className={invalid ? "is-invalid" : ""}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          autoComplete="bday"
          required={required}
        />
        <button
          type="button"
          className="dob-trigger"
          aria-label="Open date picker"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="8.5" cy="14.5" r="1.1" fill="currentColor" />
            <circle cx="12" cy="14.5" r="1.1" fill="currentColor" />
            <circle cx="15.5" cy="14.5" r="1.1" fill="currentColor" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="dob-popover" role="dialog" aria-label="Choose date of birth">
          <div className="dob-toolbar">
            <button type="button" className="dob-nav-btn" aria-label="Previous month" onClick={() => shiftMonth(-1)}>
              ‹
            </button>
            <div className="dob-selectors">
              <select
                className="dob-select"
                aria-label="Month"
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
              >
                {MONTHS.map((name, i) => (
                  <option key={name} value={i}>
                    {name}
                  </option>
                ))}
              </select>
              <select
                className="dob-select"
                aria-label="Year"
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="dob-nav-btn" aria-label="Next month" onClick={() => shiftMonth(1)}>
              ›
            </button>
          </div>

          <div className="dob-weekdays">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="dob-grid">
            {cells.map((cell, i) => {
              if (!cell.date || cell.day == null) {
                return <span key={`e-${i}`} className="dob-day is-empty" />;
              }
              const disabled = cell.date > today;
              return (
                <button
                  key={formatDob(cell.date)}
                  type="button"
                  disabled={disabled}
                  className={`dob-day${isSelected(cell.date) ? " is-selected" : ""}${isToday(cell.date) ? " is-today" : ""}`}
                  onClick={() => selectDate(cell.date!)}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          <div className="dob-footer">
            <button
              type="button"
              className="dob-clear"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              Clear
            </button>
            <span className="dob-hint">Select your birth date</span>
          </div>
        </div>
      )}
    </div>
  );
}
