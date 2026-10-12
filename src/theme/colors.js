const colors = {
  primary: '#1F3864',
  secondary: '#2E75B6',

  success: '#70AD47',
  danger: '#D64541',

  white: '#FFFFFF',
  black: '#000000',

  gray50: '#F2F2F2',
  gray100: '#E5E7EB',
  gray300: '#CBD5E1',
  gray500: '#64748B',
  gray700: '#334155',
  gray900: '#0F172A',

  light: {
    background: '#F2F2F2',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#64748B',
    border: '#CBD5E1',
    primary: '#1F3864',
    button: '#2E75B6',
  },

  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    border: '#475569',
    primary: '#1F3864',
    button: '#2E75B6',
  },
};

export const paletaClara = {
  ...colors.light,
  secondary: colors.secondary,
  success: colors.success,
  danger: colors.danger,
  text: colors.gray900,
  textSecondaryStrong: colors.gray700,
  borderSubtle: colors.gray100,
  mutedSurface: colors.gray100,
  disabledBackground: colors.gray300,
  disabledButton: colors.gray700,
  headerBackground: colors.primary,
  onHeader: colors.white,
  onButton: colors.white,
  onResult: colors.white,
  switchThumb: colors.white,
  inputBackground: '#FAFAFA',
  subtitle: '#A8D4FF',
  onSelectedSecondary: '#DCEBFA',
  selectionMark: '#BFE1FF',
  footer: '#B9CCE2',
  shadow: colors.black,
  overlay: `${colors.black}99`,
};

export const paletaOscura = {
  ...paletaClara,
  ...colors.dark,
  primary: '#A8D4FF',
  secondary: '#326EA8',
  button: '#326EA8',
  success: '#86C56B',
  danger: '#FF8A85',
  textSecondaryStrong: '#CBD5E1',
  borderSubtle: '#475569',
  mutedSurface: '#334155',
  disabledBackground: '#475569',
  disabledButton: '#475569',
  headerBackground: '#172D4F',
  onHeader: '#F8FAFC',
  inputBackground: '#0F172A',
  onResult: '#0F172A',
  overlay: '#000000B3',
};

export const paletas = { claro: paletaClara, oscuro: paletaOscura };

// Conserva los colores e imports anteriores; las vistas usan la paleta del contexto.
colors.light = paletaClara;
colors.dark = paletaOscura;

export default colors;
