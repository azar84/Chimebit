import { DesignSystem, AdminPanelColors, defaultDesignSystem, defaultAdminPanelColors } from '@/types/design-system';

export const useDesignSystem = () => {
  // In a real implementation, this would fetch from an API
  // For the template, we'll use the default values
  const designSystem: DesignSystem = defaultDesignSystem;
  
  return {
    designSystem,
    loading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const getAdminPanelColors = (): AdminPanelColors => {
  return defaultAdminPanelColors;
};

export const getThemeDefaults = (designSystem: DesignSystem | null) => {
  if (!designSystem) {
    return {
      primaryColor: '#5243E9',
      secondaryColor: '#7C3AED',
      backgroundPrimary: '#FFFFFF',
      backgroundSecondary: '#F6F8FC',
      textPrimary: '#1F2937',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF'
    };
  }

  return {
    primaryColor: designSystem.primaryColor,
    secondaryColor: designSystem.secondaryColor,
    backgroundPrimary: designSystem.backgroundPrimary,
    backgroundSecondary: designSystem.backgroundSecondary,
    textPrimary: designSystem.textPrimary,
    textSecondary: designSystem.textSecondary,
    textMuted: designSystem.textMuted
  };
};

export const generateCSSVariables = (designSystem: DesignSystem): string => {
  return `
    :root {
      /* Brand Colors */
      --color-primary: ${designSystem.primaryColor};
      --color-primary-light: ${designSystem.primaryColorLight};
      --color-primary-dark: ${designSystem.primaryColorDark};
      --color-secondary: ${designSystem.secondaryColor};
      --color-accent: ${designSystem.accentColor};
      
      /* Semantic Colors */
      --color-success: ${designSystem.successColor};
      --color-warning: ${designSystem.warningColor};
      --color-error: ${designSystem.errorColor};
      --color-info: ${designSystem.infoColor};
      
      /* Neutral Colors */
      --color-gray-light: ${designSystem.grayLight};
      --color-gray-medium: ${designSystem.grayMedium};
      --color-gray-dark: ${designSystem.grayDark};
      
      /* Background Colors */
      --color-bg-primary: ${designSystem.backgroundPrimary};
      --color-bg-secondary: ${designSystem.backgroundSecondary};
      --color-bg-dark: ${designSystem.backgroundDark};
      
      /* Text Colors */
      --color-text-primary: ${designSystem.textPrimary};
      --color-text-secondary: ${designSystem.textSecondary};
      --color-text-muted: ${designSystem.textMuted};
      
      /* Typography */
      --font-family-sans: ${designSystem.fontFamily}, ui-sans-serif, system-ui, sans-serif;
      --font-family-mono: ${designSystem.fontFamilyMono}, ui-monospace, SFMono-Regular, monospace;
      --font-size-base: ${designSystem.fontSizeBase};
      --line-height-base: ${designSystem.lineHeightBase};
      --font-weight-normal: ${designSystem.fontWeightNormal};
      --font-weight-medium: ${designSystem.fontWeightMedium};
      --font-weight-bold: ${designSystem.fontWeightBold};
      
      /* Spacing */
      --spacing-xs: ${designSystem.spacingXs};
      --spacing-sm: ${designSystem.spacingSm};
      --spacing-md: ${designSystem.spacingMd};
      --spacing-lg: ${designSystem.spacingLg};
      --spacing-xl: ${designSystem.spacingXl};
      --spacing-2xl: ${designSystem.spacing2xl};
      
      /* Border Radius */
      --radius-sm: ${designSystem.borderRadiusSm};
      --radius-md: ${designSystem.borderRadiusMd};
      --radius-lg: ${designSystem.borderRadiusLg};
      --radius-xl: ${designSystem.borderRadiusXl};
      --radius-full: ${designSystem.borderRadiusFull};
      
      /* Shadows */
      --shadow-sm: ${designSystem.shadowSm};
      --shadow-md: ${designSystem.shadowMd};
      --shadow-lg: ${designSystem.shadowLg};
      --shadow-xl: ${designSystem.shadowXl};
      
      /* Animations */
      --animation-fast: ${designSystem.animationFast};
      --animation-normal: ${designSystem.animationNormal};
      --animation-slow: ${designSystem.animationSlow};
      
      /* Breakpoints */
      --breakpoint-sm: ${designSystem.breakpointSm};
      --breakpoint-md: ${designSystem.breakpointMd};
      --breakpoint-lg: ${designSystem.breakpointLg};
      --breakpoint-xl: ${designSystem.breakpointXl};
      --breakpoint-2xl: ${designSystem.breakpoint2xl};
    }
  `;
};

export const getColorShade = (color: string, shade: number): string => {
  // Simple color manipulation - in a real app you might use a color library
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const factor = shade / 100;
  const newR = Math.round(r * factor);
  const newG = Math.round(g * factor);
  const newB = Math.round(b * factor);
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

export const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast calculation
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
}; 