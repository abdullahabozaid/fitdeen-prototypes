// ponytail: single in-memory mock module shared by every design. No backend, no fetch.
export const user = { name: 'Abdullah', initials: 'AB', level: 4 }

export const week = [
  { d: 'M', state: 'done' }, { d: 'T', state: 'done' }, { d: 'W', state: 'today' },
  { d: 'T', state: 'plan' }, { d: 'F', state: 'plan' }, { d: 'S', state: 'rest' }, { d: 'S', state: 'rest' },
]
export const streak = 5

export const muscleColors: Record<string, string> = {
  chest: '#ef4444', back: '#3b82f6', shoulders: '#f59e0b', biceps: '#ec4899',
  triceps: '#8b5cf6', legs: '#10b981', core: '#06b6d4',
}

export const todaySession = {
  focus: 'Push day', title: 'Bench, press, push', exerciseCount: 6, minutes: 48,
  muscles: ['chest', 'shoulders', 'triceps'],
  exercises: [
    { name: 'Barbell Bench Press', muscle: 'chest', target: '3 × 8', prev: '60kg × 8', sets: [{ kg: 60, reps: 8 }, { kg: 60, reps: 8 }, { kg: 62.5, reps: 6 }] },
    { name: 'Overhead Press', muscle: 'shoulders', target: '3 × 8', prev: '40kg × 8', sets: [{ kg: 40, reps: 8 }, { kg: 40, reps: 7 }, { kg: 40, reps: 6 }] },
    { name: 'Incline Dumbbell Press', muscle: 'chest', target: '3 × 10', prev: '22kg × 10', sets: [{ kg: 24, reps: 10 }, { kg: 24, reps: 9 }, { kg: 24, reps: 8 }] },
    { name: 'Lateral Raise', muscle: 'shoulders', target: '3 × 15', prev: '10kg × 15', sets: [{ kg: 10, reps: 15 }, { kg: 10, reps: 13 }, { kg: 10, reps: 12 }] },
    { name: 'Triceps Pushdown', muscle: 'triceps', target: '3 × 12', prev: '25kg × 12', sets: [{ kg: 25, reps: 12 }, { kg: 25, reps: 11 }, { kg: 25, reps: 10 }] },
    { name: 'Overhead Triceps Ext', muscle: 'triceps', target: '3 × 12', prev: '—', sets: [{ kg: 20, reps: 12 }, { kg: 20, reps: 11 }, { kg: 20, reps: 10 }] },
  ],
}

export const prayers = [
  { name: 'Fajr', time: '04:38', state: 'done' }, { name: 'Dhuhr', time: '13:08', state: 'done' },
  { name: 'Asr', time: '15:42', state: 'next' }, { name: 'Maghrib', time: '19:21', state: 'upcoming' },
  { name: 'Isha', time: '21:02', state: 'upcoming' },
]

export const hadith = { ar: 'إِنَّ لِجَسَدِكَ عَلَيْكَ حَقًّا', en: 'Your body has a right over you.', cite: 'Sahih al-Bukhari' }

export const nutrition = {
  kcal: 1240, kcalGoal: 2150, protein: 96, proteinGoal: 165, carbs: 120, carbsGoal: 210, fat: 38, fatGoal: 70,
  meals: [
    { name: 'Overnight oats & dates', time: '07:40', kcal: 380, p: 24 },
    { name: 'Chicken, rice & salad', time: '13:15', kcal: 620, p: 52 },
    { name: 'Greek yogurt & honey', time: '16:30', kcal: 240, p: 20 },
  ],
  recents: ['Banana', 'Whey shake', 'Eggs (2)', 'Dates (3)', 'Almonds'],
}

export const coachSeed = [{ role: 'coach', text: 'Assalamu alaikum, Abdullah. Ready to train, or want help with food?' }]
export const coachPrompts = ['Plan my Push day', 'High-protein iftar ideas', 'Is creatine halal?']

export const profile = { sessions: 42, streak: 5, days: 96, level: 4 }
export const achievements = [
  { name: 'First Rep', unlocked: true }, { name: '7-Day Streak', unlocked: true }, { name: 'Fajr Flow', unlocked: true },
  { name: 'Century', unlocked: false }, { name: 'Ramadan', unlocked: false }, { name: 'PR Machine', unlocked: false },
]
