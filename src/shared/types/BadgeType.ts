export const FWB_BADGE_TYPES = [
  'default',
  'dark',
  'red',
  'green',
  'yellow',
  'indigo',
  'purple',
  'pink',
] as const

export type FwbBadgeType = typeof FWB_BADGE_TYPES[number]

export type VisibilityStatus = {
  label: string
  badgeType: FwbBadgeType
}

export const VISIBILITY_META: Record<
  'visible' | 'hidden',
  VisibilityStatus
> = {
  visible: {
    label: 'Visible',
    badgeType: 'green',
  },
  hidden: {
    label: 'Oculto',
    badgeType: 'red', 
  },
}
