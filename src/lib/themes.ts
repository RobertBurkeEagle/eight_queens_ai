
export interface Theme {
    name: string;
    displayName: string;
    cssVars: {
      '--background': string;
      '--foreground': string;
      '--card': string;
      '--card-foreground': string;
      '--popover': string;
      '--popover-foreground': string;
      '--primary': string;
      '--primary-foreground': string;
      '--secondary': string;
      '--secondary-foreground': string;
      '--muted': string;
      '--muted-foreground': string;
      '--accent': string;
      '--accent-foreground': string;
      '--destructive': string;
      '--destructive-foreground': string;
      '--border': string;
      '--input': string;
      '--ring': string;
    };
  }
  
  export const themes: Theme[] = [
    {
      name: 'green',
      displayName: 'Green Chess',
      cssVars: {
        '--background': '48 38% 90%',
        '--foreground': '48 10% 20%',
        '--card': '48 38% 90%',
        '--card-foreground': '48 10% 20%',
        '--popover': '48 38% 90%',
        '--popover-foreground': '48 10% 20%',
        '--primary': '88 43% 35%',
        '--primary-foreground': '88 30% 95%',
        '--secondary': '48 20% 75%',
        '--secondary-foreground': '48 10% 20%',
        '--muted': '48 20% 75%',
        '--muted-foreground': '48 10% 45%',
        '--accent': '35 78% 55%',
        '--accent-foreground': '35 50% 98%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '48 20% 65%',
        '--input': '48 20% 70%',
        '--ring': '88 43% 35%',
      },
    },
    {
        name: 'arcade',
        displayName: 'Classic Arcade',
        cssVars: {
          '--background': '250 24% 9%',
          '--foreground': '0 0% 95%',
          '--card': '250 20% 12%',
          '--card-foreground': '0 0% 95%',
          '--popover': '250 24% 9%',
          '--popover-foreground': '0 0% 95%',
          '--primary': '312 80% 58%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '250 15% 18%',
          '--secondary-foreground': '0 0% 95%',
          '--muted': '250 15% 18%',
          '--muted-foreground': '0 0% 60%',
          '--accent': '180 100% 50%',
          '--accent-foreground': '0 0% 100%',
          '--destructive': '0 72% 51%',
          '--destructive-foreground': '0 0% 98%',
          '--border': '250 15% 25%',
          '--input': '250 15% 25%',
          '--ring': '312 80% 58%',
        },
      },
      {
        name: 'ocean',
        displayName: '8-Bit Ocean',
        cssVars: {
          '--background': '205 90% 92%',
          '--foreground': '215 40% 15%',
          '--card': '205 90% 92%',
          '--card-foreground': '215 40% 15%',
          '--popover': '205 90% 92%',
          '--popover-foreground': '215 40% 15%',
          '--primary': '210 70% 45%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '205 60% 80%',
          '--secondary-foreground': '215 40% 15%',
          '--muted': '205 60% 80%',
          '--muted-foreground': '215 30% 40%',
          '--accent': '45 90% 60%',
          '--accent-foreground': '45 50% 15%',
          '--destructive': '0 80% 65%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '205 50% 70%',
          '--input': '205 50% 75%',
          '--ring': '210 70% 45%',
        },
      },
      {
        name: 'sunset',
        displayName: 'Sunset Drive',
        cssVars: {
          '--background': '265 40% 12%',
          '--foreground': '265 20% 90%',
          '--card': '265 40% 12%',
          '--card-foreground': '265 20% 90%',
          '--popover': '265 40% 12%',
          '--popover-foreground': '265 20% 90%',
          '--primary': '330 90% 65%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '265 30% 22%',
          '--secondary-foreground': '265 20% 90%',
          '--muted': '265 30% 22%',
          '--muted-foreground': '265 20% 60%',
          '--accent': '180 90% 60%',
          '--accent-foreground': '180 50% 10%',
          '--destructive': '0 80% 65%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '265 25% 32%',
          '--input': '265 25% 32%',
          '--ring': '330 90% 65%',
        },
      },
      {
        name: 'monochrome',
        displayName: 'Monochrome',
        cssVars: {
          '--background': '0 0% 96%',
          '--foreground': '0 0% 3.9%',
          '--card': '0 0% 96%',
          '--card-foreground': '0 0% 3.9%',
          '--popover': '0 0% 96%',
          '--popover-foreground': '0 0% 3.9%',
          '--primary': '0 0% 9%',
          '--primary-foreground': '0 0% 98%',
          '--secondary': '0 0% 90%',
          '--secondary-foreground': '0 0% 9%',
          '--muted': '0 0% 90%',
          '--muted-foreground': '0 0% 45.1%',
          '--accent': '0 0% 20%',
          '--accent-foreground': '0 0% 98%',
          '--destructive': '0 84.2% 60.2%',
          '--destructive-foreground': '0 0% 98%',
          '--border': '0 0% 80%',
          '--input': '0 0% 85%',
          '--ring': '0 0% 9%',
        },
      },
  ];
