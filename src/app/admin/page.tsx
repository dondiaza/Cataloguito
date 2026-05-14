'use client';

import { useState } from 'react';
import { products as initialProducts, Product } from '../../data/products';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin2024') {
      setIsLogged(true);
    } else {
      alert('Clave incorrecta');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('Guardando...');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: productList })
      });
      if (res.ok) {
        setMessage('✅ ¡Cambios guardados con éxito en la base de datos!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Error al guardar');
      }
    } catch {
      setMessage('❌ Error de red');
    }
    setIsSaving(false);
  };

  const handleChange = <K extends keyof Product>(index: number, field: K, value: Product[K]) => {
    const updated = [...productList];
    updated[index] = { ...updated[index], [field]: value };
    setProductList(updated);
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: 'Nuevo Producto',
      team: 'Equipo',
      price: 0,
      image: '/jerseys/placeholder.png',
      category: 'Modern',
      league: 'Liga',
      description: 'Descripción del producto',
      stockStatus: 'In Stock'
    };
    setProductList([newProduct, ...productList]);
  };

  const deleteProduct = (index: number) => {
    if(confirm('¿Seguro que quieres eliminar este producto?')) {
      const updated = [...productList];
      updated.splice(index, 1);
      setProductList(updated);
    }
  };

  if (!isLogged) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '10px 15px', borderRadius: '15px', fontFamily: 'Montserrat', fontWeight: 900, fontSize: '2rem', display: 'inline-block', marginBottom: '20px' }}>S</div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Acceso Restringido</h1>
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '20px', outlineColor: 'var(--primary)', textAlign: 'center', letterSpacing: '3px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '15px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
            ENTRAR AL PANEL
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', background: 'white', padding: '20px 30px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Panel de Administración</h1>
          <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Modifica los productos y guarda los cambios para aplicarlos a la web principal.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {message && <span style={{ fontWeight: 600, color: message.includes('✅') ? '#10b981' : '#ef4444' }}>{message}</span>}
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', cursor: isSaving ? 'wait' : 'pointer', opacity: isSaving ? 0.7 : 1 }}
          >
            {isSaving ? 'Guardando...' : '💾 Guardar Todo'}
          </button>
        </div>
      </header>

      <div style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.2rem' }}>Catálogo de Productos ({productList.length})</h2>
          <button onClick={addProduct} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
            + Añadir Producto Nuevo
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ padding: '15px', borderRadius: '10px 0 0 10px' }}>Imagen (Ruta)</th>
                <th style={{ padding: '15px' }}>Nombre</th>
                <th style={{ padding: '15px' }}>Precio (€)</th>
                <th style={{ padding: '15px' }}>Categoría</th>
                <th style={{ padding: '15px' }}>Stock</th>
                <th style={{ padding: '15px', borderRadius: '0 10px 10px 0' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>
                    <input 
                      type="text" 
                      value={product.image} 
                      onChange={(e) => handleChange(index, 'image', e.target.value)}
                      style={{ width: '150px', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                  </td>
                  <td style={{ padding: '15px' }}>
                    <input 
                      type="text" 
                      value={product.name} 
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontWeight: 'bold' }}
                    />
                  </td>
                  <td style={{ padding: '15px' }}>
                    <input 
                      type="number" 
                      value={product.price} 
                      onChange={(e) => handleChange(index, 'price', Number(e.target.value))}
                      style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                  </td>
                  <td style={{ padding: '15px' }}>
                    <select 
                      value={product.category} 
                      onChange={(e) => handleChange(index, 'category', e.target.value as Product['category'])}
                      style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                    >
                      <option value="Modern">Modern</option>
                      <option value="Retro">Retro</option>
                      <option value="Selecciones">Selecciones</option>
                      <option value="Accesorios">Accesorios</option>
                    </select>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <select 
                      value={product.stockStatus} 
                      onChange={(e) => handleChange(index, 'stockStatus', e.target.value as Product['stockStatus'])}
                      style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Pre-order">Pre-order</option>
                    </select>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <button onClick={() => deleteProduct(index)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
        ⚠️ Nota: Las imágenes nuevas deben subirse a la carpeta public/jerseys/ antes de enlazar su ruta aquí (ej: /jerseys/nueva.png).
      </div>
    </div>
  );
}
