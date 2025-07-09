export interface DesignSystem {
  id?: number;
  // Brand Colors
  primaryColor: string;
  primaryColorLight: string;
  primaryColorDark: string;
  secondaryColor: string;
  accentColor: string;
  // Semantic Colors
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;
  // Neutral Colors
  grayLight: string;
  grayMedium: string;
  grayDark: string;
  // Background Colors
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundDark: string;
  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  // Typography
  fontFamily: string;
  fontFamilyMono: string;
  fontSizeBase: string;
  lineHeightBase: string;
  fontWeightNormal: string;
  fontWeightMedium: string;
  fontWeightBold: string;
  // Spacing Scale
  spacingXs: string;
  spacingSm: string;
  spacingMd: string;
  spacingLg: string;
  spacingXl: string;
  spacing2xl: string;
  // Border Radius
  borderRadiusSm: string;
  borderRadiusMd: string;
  borderRadiusLg: string;
  borderRadiusXl: string;
  borderRadiusFull: string;
  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;
  // Animation Durations
  animationFast: string;
  animationNormal: string;
  animationSlow: string;
  // Breakpoints
  breakpointSm: string;
  breakpointMd: string;
  breakpointLg: string;
  breakpointXl: string;
  breakpoint2xl: string;
  // Custom Variables
  customVariables?: string;
}

export interface AdminPanelColors {
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  background: string;
  backgroundSecondary: string;
  border: string;
}

export const defaultDesignSystem: DesignSystem = {
  primaryColor: '#5243E9',
  primaryColorLight: '#6366F1',
  primaryColorDark: '#4338CA',
  secondaryColor: '#7C3AED',
  accentColor: '#06B6D4',
  successColor: '#10B981',
  warningColor: '#F59E0B',
  errorColor: '#EF4444',
  infoColor: '#3B82F6',
  grayLight: '#F9FAFB',
  grayMedium: '#6B7280',
  grayDark: '#374151',
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F6F8FC',
  backgroundDark: '#0F1A2A',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  fontFamily: 'Manrope',
  fontFamilyMono: 'ui-monospace',
  fontSizeBase: '16px',
  lineHeightBase: '1.5',
  fontWeightNormal: '400',
  fontWeightMedium: '500',
  fontWeightBold: '700',
  spacingXs: '4px',
  spacingSm: '8px',
  spacingMd: '16px',
  spacingLg: '24px',
  spacingXl: '32px',
  spacing2xl: '48px',
  borderRadiusSm: '4px',
  borderRadiusMd: '8px',
  borderRadiusLg: '12px',
  borderRadiusXl: '16px',
  borderRadiusFull: '9999px',
  shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  animationFast: '150ms',
  animationNormal: '300ms',
  animationSlow: '500ms',
  breakpointSm: '640px',
  breakpointMd: '768px',
  breakpointLg: '1024px',
  breakpointXl: '1280px',
  breakpoint2xl: '1536px',
};

export const defaultAdminPanelColors: AdminPanelColors = {
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  border: '#E5E7EB',
}; 