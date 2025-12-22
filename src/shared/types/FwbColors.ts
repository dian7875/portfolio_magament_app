export const FWB_COLORS = [
  'default',
  'alternative',
  'dark',
  'light',
  'green',
  'red',
  'yellow',
  'purple',
  'pink',
] as const

export type FwbColor = typeof FWB_COLORS[number]