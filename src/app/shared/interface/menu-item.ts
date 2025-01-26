export interface MenuItem {
    text: string; 
    routerLink: string; 
    roles?: string[]; 
    icon?: string; 
    children?: MenuItem[]; 
    tooltip?: string; 
  }