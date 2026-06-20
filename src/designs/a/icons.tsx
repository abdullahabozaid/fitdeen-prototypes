// ponytail: hand-rolled inline SVGs, no icon library dependency.
type P = { size?: number }
const s = (n = 23) => ({ width: n, height: n, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const })

export const IconHome = ({ size }: P) => <svg {...s(size)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
export const IconDumbbell = ({ size }: P) => <svg {...s(size)}><path d="M6.5 6.5 17.5 17.5" /><path d="M4 9 9 4l2 2-5 5z" /><path d="M20 15l-5 5-2-2 5-5z" /></svg>
export const IconApple = ({ size }: P) => <svg {...s(size)}><path d="M12 7c-1.5-3-6-3-7 0-1 3 1 9 3.5 12 1 1 2 1 3.5-1 1.5 2 2.5 2 3.5 1C21 16 22 10 20 7c-1-2.5-5-2.5-6.5 0" /><path d="M12 7V4" /></svg>
export const IconSparkle = ({ size }: P) => <svg {...s(size)}><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" /><path d="M18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z" /></svg>
export const IconUser = ({ size }: P) => <svg {...s(size)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
export const IconChevron = ({ size = 16 }: P) => <svg {...s(size)}><path d="m9 18 6-6-6-6" /></svg>
export const IconPlay = ({ size = 16 }: P) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z" /></svg>
export const IconFlame = ({ size = 13 }: P) => <svg {...s(size)} stroke="#34d399"><path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-3 .5 4-2 5-2 5 .5-2-1-3-1-5 0-3-1-5 1-6Z" /></svg>
export const IconCheck = ({ size = 14 }: P) => <svg {...s(size)}><path d="M20 6 9 17l-5-5" /></svg>
export const IconPlus = ({ size = 18 }: P) => <svg {...s(size)}><path d="M12 5v14M5 12h14" /></svg>
export const IconSend = ({ size = 18 }: P) => <svg {...s(size)}><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>
