'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: string
  className?: string
}

export function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Mins' },
        { value: timeLeft.seconds, label: 'Secs' },
      ].map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-dark border border-white/10 flex items-center justify-center">
              <span className="text-lg md:text-xl font-black text-electric">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] text-white/30 mt-0.5 block">{unit.label}</span>
          </div>
          {i < 3 && <span className="text-white/20 text-lg font-bold mb-4">:</span>}
        </div>
      ))}
    </div>
  )
}
