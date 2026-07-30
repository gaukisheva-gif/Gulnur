import React from 'react';
import Svg, {Path, Rect, Circle} from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

function stroke(d: string) {
  return function IconComponent({size = 22, color = '#000', strokeWidth = 2}: IconProps) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d={d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  };
}

export const HomeIcon = stroke(
  'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
);
export const DocumentsIcon = stroke(
  'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
);
export const PlusIcon = stroke('M12 4v16m8-8H4');
export const BellIcon = stroke(
  'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
);
export const ChevronLeftIcon = stroke('M15 19l-7-7 7-7');
export const ChevronRightIcon = stroke('M9 5l7 7-7 7');
export const SearchIcon = stroke('M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z');
export const WarningIcon = stroke(
  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
);
export const CheckIcon = stroke('M5 13l4 4L19 7');
export const CalculatorIcon = stroke(
  'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
);
export const BuildingIcon = stroke(
  'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
);
export const CurrencyIcon = stroke(
  'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
);
export const DownloadIcon = stroke('M12 10v6m0 0l-3-3m3 3l3-3m2-9H8a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V9z');
export const UploadIcon = stroke(
  'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
);
export const ClipIcon = stroke(
  'M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13',
);
export const RefreshIcon = stroke(
  'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
);
export const SwapIcon = stroke('M12 5v14m0 0l-5-5m5 5l5-5');
export const TrashIcon = stroke(
  'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
);
export const ListIcon = stroke('M4 6h16M4 12h16M4 18h16');
export const CalendarIcon = stroke('');
export const XIcon = stroke('M6 18L18 6M6 6l12 12');
export const CheckShieldIcon = stroke(
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
);
export const ContractIcon = stroke(
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
);
export const NewspaperIcon = stroke(
  'M4 6a2 2 0 012-2h8a2 2 0 012 2v11a3 3 0 003 3H8a4 4 0 01-4-4V6zm0 0h12M8 8h4m-4 4h6m-6 4h6m5-8h1m-1 3h1',
);

export function GridIcon({size = 22, color = '#000', strokeWidth = 1.5}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth={strokeWidth} />
      <Rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth={strokeWidth} />
      <Rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth={strokeWidth} />
      <Rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function QrIcon({size = 20, color = '#000', strokeWidth = 1.8}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
      <Rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
      <Rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
      <Rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function FlashIcon({size = 20, color = '#000', strokeWidth = 1.8}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 10V3L4 14h7v7l9-11h-7z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DotIcon({size = 8, color = '#000'}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 8 8">
      <Circle cx={4} cy={4} r={4} fill={color} />
    </Svg>
  );
}
