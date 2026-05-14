export interface Product {
  id: string;
  name: string;
  team: string;
  price: number;
  image: string;
  category: 'Modern' | 'Retro' | 'Selecciones' | 'Accesorios';
  league: string;
  description: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Pre-order';
}

export const products: Product[] = [
  {
    "id": "sev-retro-94",
    "name": "Sevilla FC Retro 1994",
    "team": "Sevilla FC",
    "price": 25,
    "image": "/jerseys/sevilla-retro.png",
    "category": "Retro",
    "league": "La Liga",
    "description": "Un clásico de los 90. Cuello de polo y diseño icónico.",
    "stockStatus": "In Stock"
  },
  {
    "id": "bet-retro-92",
    "name": "Real Betis Retro 1992",
    "team": "Real Betis",
    "price": 25,
    "image": "/jerseys/betis-retro.png",
    "category": "Retro",
    "league": "La Liga",
    "description": "Inspirada en la época de la Expo 92. Un tesoro para los béticos.",
    "stockStatus": "In Stock"
  },
  {
    "id": "rma-retro-02",
    "name": "Real Madrid Centenario 2002",
    "team": "Real Madrid",
    "price": 25,
    "image": "/jerseys/madrid-retro.png",
    "category": "Retro",
    "league": "La Liga",
    "description": "La camiseta de la Novena. Totalmente blanca, sin patrocinador frontal. Pura historia.",
    "stockStatus": "Pre-order"
  },
  {
    "id": "spain-home-24",
    "name": "España Local Euro 2024",
    "team": "España",
    "price": 25,
    "image": "/jerseys/spain-home.png",
    "category": "Selecciones",
    "league": "Internacional",
    "description": "La Roja. Con un rojo intenso y los icónicos detalles amarillos. Lista para conquistar Europa.",
    "stockStatus": "In Stock"
  },
  {
    "id": "milan-home-24",
    "name": "AC Milan Home 24/25",
    "team": "AC Milan",
    "price": 25,
    "image": "/jerseys/milan-home.png",
    "category": "Modern",
    "league": "Serie A",
    "description": "Novedad absoluta. Las míticas franjas rossoneras en un diseño ultracontemporáneo.",
    "stockStatus": "In Stock"
  },
  {
    "id": "acc-balon-pro",
    "name": "Balón Pro Match 2024",
    "team": "Genérico",
    "price": 25,
    "image": "/jerseys/balon.png",
    "category": "Accesorios",
    "league": "Equipamiento",
    "description": "Balón oficial con calidad profesional. Superficie texturizada para un vuelo perfecto y retención de aire óptima.",
    "stockStatus": "Low Stock"
  }
];
