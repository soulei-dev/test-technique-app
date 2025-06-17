export const TAG_COLOR_MAP = {
  blue: {
    backgroundColor: '#E7F6FF',
    textColor: '#1093CB',
  },
  green: {
    backgroundColor: '#CFF6EA',
    textColor: '#00BB81',
  },
  purple: {
    backgroundColor: '#F6F4FF',
    textColor: '#5843BE',
  },
} as const;

export type TagColorKey = keyof typeof TAG_COLOR_MAP;
