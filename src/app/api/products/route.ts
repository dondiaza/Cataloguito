import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.products || !Array.isArray(data.products)) {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'products.ts');
    
    // Construimos el archivo products.ts con los nuevos datos
    const fileContent = `export interface Product {
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

export const products: Product[] = ${JSON.stringify(data.products, null, 2)};
`;

    // Escribimos en el sistema de archivos local
    fs.writeFileSync(filePath, fileContent, 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving products:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
