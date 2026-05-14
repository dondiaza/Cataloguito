'use client';

import { useState } from 'react';
import Image from 'next/image';
import { products, Product } from '../data/products';
import { whatsappConfig } from '../config/whatsapp';

type CartItem = {
  product: Product;
  quantity: number;
  personalization?: { name: string; number: string };
};

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  
  // Nuevo: Estado de búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product, personalization?: { name: string; number: string }) => {
    setCart(prev => {
      if (personalization && (personalization.name || personalization.number)) {
        return [...prev, { product, quantity: 1, personalization }];
      }
      const existing = prev.find(item => item.product.id === product.id && !item.personalization);
      if (existing) {
        return prev.map(item => item.product.id === product.id && !item.personalization ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setSelectedProduct(null);
    setCustomName('');
    setCustomNumber('');
  };

  const totalCart = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `#PEDIDO-${Math.floor(1000 + Math.random() * 9000)}`;
    const simplifiedCart = cart.map(item => ({
      name: item.personalization && (item.personalization.name || item.personalization.number) 
        ? `${item.product.name} [Personalizada: ${item.personalization.name || '-'} - ${item.personalization.number || '-'}]`
        : item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }));
    const message = whatsappConfig.generateMessage(orderId, formData, simplifiedCart, totalCart);
    const url = `https://wa.me/${whatsappConfig.phoneNumber}?text=${message}`;
    window.open(url, '_blank');
    setIsCheckoutOpen(false);
    setCart([]);
  };

  // Filtrado general (por nombre o equipo)
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modernProducts = filteredProducts.filter(p => p.category === 'Modern' && p.id !== 'rma-retro-02');
  const retroProducts = filteredProducts.filter(p => p.category === 'Retro');
  const nationalProducts = filteredProducts.filter(p => p.category === 'Selecciones');
  const accesoriesProducts = filteredProducts.filter(p => p.category === 'Accesorios');
  
  const featuredProduct = products.find(p => p.id === 'rma-retro-02');

  const renderProductGrid = (productList: Product[], title: string, subtitle: string, id: string) => {
    if (productList.length === 0) return null;
    return (
      <section id={id} style={{ marginTop: '40px', padding: '0 20px', maxWidth: '1400px', margin: '40px auto 0' }}>
        <h2 className="font-heading" style={{ fontSize: '2rem', marginBottom: '10px' }}>{title}</h2>
        <p style={{ opacity: 0.6, marginBottom: '20px' }}>{subtitle}</p>
        <div className="bento-grid" style={{ padding: 0 }}>
          {productList.map(product => (
            <div key={product.id} className="bento-card" onClick={() => setSelectedProduct(product)} style={{ gridColumn: 'span 1', cursor: 'pointer' }}>
              <div style={{ width: '100%', height: '250px', background: '#f8fafc', borderRadius: '20px', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
                <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{product.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>{product.league}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 900 }}>{product.price}€</span>
                <span style={{ background: 'var(--primary)', color: 'white', padding: '8px 15px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>Comprar</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* BARRA DE ANUNCIOS SUPERIOR */}
      <div style={{ background: '#000', color: '#fff', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 15s linear infinite', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px' }}>
          🔥 ENVÍO GRATIS A PARTIR DE 60€ EN TODA LA PENÍNSULA &nbsp; | &nbsp; ⚡ USA EL CÓDIGO NEXUS10 PARA UN 10% DE DESCUENTO EN TU PRIMERA COMPRA &nbsp; | &nbsp; ⚽ STOCK RENOVADO CADA SEMANA
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        `}} />
      </div>

      <header className="header" style={{ top: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '5px 10px', borderRadius: '10px', fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.2rem' }}>S</div>
          <span className="font-heading" style={{ fontSize: '1.1rem' }}>NexusSVQ</span>
        </div>
        
        {/* BARRA DE BÚSQUEDA */}
        <div style={{ flex: 1, maxWidth: '400px', margin: '0 20px', display: 'flex' }}>
          <input 
            type="text" 
            placeholder="Buscar equipo, país o producto..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 20px', borderRadius: '30px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={() => setIsCheckoutOpen(true)}
            style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)' }}
          >
            🛒 CARRITO ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </button>
        </nav>
      </header>

      {/* Hero Dinámico (se oculta si hay búsqueda) */}
      {!searchQuery && (
        <section style={{ paddingTop: '150px' }}>
          <div className="bento-grid">
            <div className="bento-card" style={{ gridColumn: 'span 3', gridRow: 'span 2', background: 'var(--primary)', color: 'white', justifyContent: 'center', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h1 style={{ fontSize: '4.5rem', lineHeight: '0.9', marginBottom: '20px', letterSpacing: '-2px' }}>VISTE<br/>COMO<br/>LEYENDA</h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '400px', marginBottom: '30px' }}>Calidad premium, envíos express y el catálogo más exclusivo de toda la ciudad.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href="#modernas" style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '15px 35px', borderRadius: '30px', fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>MODERNAS</a>
                  <a href="#retro" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '15px 35px', borderRadius: '30px', fontWeight: 800, textDecoration: 'none', display: 'inline-block', backdropFilter: 'blur(5px)' }}>RETRO</a>
                </div>
              </div>
              <div style={{ position: 'absolute', right: '-10%', bottom: '-20%', fontSize: '25rem', opacity: 0.1, transform: 'rotate(-15deg)' }}>⚽</div>
            </div>

            {featuredProduct && (
              <div 
                className="bento-card" 
                onClick={() => setSelectedProduct(featuredProduct)}
                style={{ gridColumn: 'span 1', gridRow: 'span 2', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
              >
                <span style={{ background: '#fee2e2', color: '#ef4444', padding: '5px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, width: 'fit-content', zIndex: 10 }}>EDICIÓN LIMITADA</span>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
                  <div style={{ width: '100%', height: '220px', background: '#f5f5f5', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
                    <Image src={featuredProduct.image} alt={featuredProduct.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
                <div>
                  <h2 style={{ fontSize: '1.3rem', marginBottom: '5px' }}>{featuredProduct.name}</h2>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>Joya Histórica</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>{featuredProduct.price}€</span>
                    <div style={{ background: 'var(--primary)', color: '#fff', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>+</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECCIONES DINÁMICAS */}
      {renderProductGrid(modernProducts, "Clubes 24/25", "La actualidad del fútbol mundial al alcance de tu mano.", "modernas")}
      {renderProductGrid(retroProducts, "Colección Retro", "Camisetas míticas. Historias tejidas.", "retro")}
      {renderProductGrid(nationalProducts, "Selecciones Nacionales", "Defiende tus colores en el próximo gran torneo.", "selecciones")}
      {renderProductGrid(accesoriesProducts, "Accesorios", "Completa tu equipación con la máxima calidad.", "accesorios")}

      {/* RESULTADOS DE BÚSQUEDA VACÍOS */}
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <span style={{ fontSize: '4rem', marginBottom: '20px', display: 'block' }}>🔍</span>
          <h2>No hemos encontrado productos</h2>
          <p style={{ opacity: 0.6 }}>Prueba a buscar otro equipo o jugador.</p>
        </div>
      )}

      {/* SECCIÓN RESEÑAS */}
      {!searchQuery && (
        <section style={{ marginTop: '80px', padding: '0 20px', maxWidth: '1400px', margin: '80px auto 0' }}>
           <h2 className="font-heading" style={{ fontSize: '2rem', marginBottom: '10px', textAlign: 'center' }}>Lo que dicen nuestros clientes</h2>
           <p style={{ opacity: 0.6, marginBottom: '40px', textAlign: 'center' }}>Más de 500 pedidos entregados este mes.</p>
           
           <div className="bento-grid">
              <div className="bento-card" style={{ gridColumn: 'span 1', background: '#fff' }}>
                <div style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '10px' }}>★★★★★</div>
                <p style={{ fontStyle: 'italic', marginBottom: '15px', lineHeight: '1.6' }}>"La calidad de la retro del Betis es espectacular. Tardo 2 días en llegar. Recomendadísimo."</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Álvaro R.</span>
                </div>
              </div>
              <div className="bento-card" style={{ gridColumn: 'span 1', background: '#fff' }}>
                <div style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '10px' }}>★★★★★</div>
                <p style={{ fontStyle: 'italic', marginBottom: '15px', lineHeight: '1.6' }}>"Pedí la de España personalizada y el serigrafiado está perfecto. Totalmente oficial, volveré a comprar."</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>M</div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>María G.</span>
                </div>
              </div>
              <div className="bento-card" style={{ gridColumn: 'span 2', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)' }}>4.9/5</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.6 }}>Nota media basada en TrustPilot</span>
              </div>
           </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ marginTop: '100px', background: '#111827', color: 'white', padding: '60px 20px', borderTopLeftRadius: '40px', borderTopRightRadius: '40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: 'white', color: 'var(--primary)', padding: '5px 10px', borderRadius: '10px', fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.5rem' }}>S</div>
              <span className="font-heading" style={{ fontSize: '1.5rem' }}>NexusSVQ</span>
            </div>
            <p style={{ opacity: 0.7, lineHeight: '1.6', fontSize: '0.9rem' }}>Tu tienda de confianza para equipaciones deportivas retro y modernas. Calidad garantizada, pasión innegable.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700 }}>Enlaces Rápidos</h4>
            <ul style={{ listStyle: 'none', padding: 0, opacity: 0.7, fontSize: '0.9rem', lineHeight: '2' }}>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Novedades 24/25</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Colección Retro</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Guía de Tallas</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Preguntas Frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700 }}>Contacto Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, opacity: 0.7, fontSize: '0.9rem', lineHeight: '2' }}>
              <li>Aviso Legal</li>
              <li>Política de Privacidad</li>
              <li>Términos y Condiciones</li>
              <li>Soporte WhatsApp: +34 600 000 000</li>
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: '1400px', margin: '40px auto 0', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
          © 2026 NexusSVQ. Todos los derechos reservados.
        </div>
      </footer>

      {/* MODAL DETALLE DE PRODUCTO */}
      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '900px', background: 'white', borderRadius: '32px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 30px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <h2 className="font-heading" style={{ fontSize: '1.5rem' }}>{selectedProduct.name}</h2>
              <button onClick={() => { setSelectedProduct(null); setCustomName(''); setCustomNumber(''); }} style={{ background: '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto' }}>
              <div style={{ flex: '1 1 400px', background: '#f8fafc', position: 'relative', minHeight: '400px' }}>
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill style={{ objectFit: 'cover' }} />
              </div>

              <div style={{ flex: '1 1 350px', padding: '30px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.9rem' }}>{selectedProduct.league}</span>
                  <span style={{ background: '#ecfdf5', color: '#10b981', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                    {selectedProduct.stockStatus.toUpperCase()}
                  </span>
                </div>
                
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', opacity: 0.8, marginBottom: '25px' }}>{selectedProduct.description}</p>
                
                {/* Ocultar personalización en Accesorios */}
                {selectedProduct.category !== 'Accesorios' && (
                  <div style={{ background: '#f9f9fb', padding: '20px', borderRadius: '20px', marginBottom: '30px', border: '1px solid #eee' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>✨</span> Personaliza tu camiseta
                    </h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ flex: 2 }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px', color: '#666', textTransform: 'uppercase' }}>Nombre</label>
                        <input 
                          type="text" placeholder="Ej: RONALDO" value={customName}
                          onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                          style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', fontFamily: 'inherit', fontWeight: 600, outlineColor: 'var(--primary)' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px', color: '#666', textTransform: 'uppercase' }}>Dorsal</label>
                        <input 
                          type="number" placeholder="Ej: 9" min="1" max="99" value={customNumber}
                          onChange={(e) => setCustomNumber(e.target.value)}
                          style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', fontFamily: 'inherit', fontWeight: 600, outlineColor: 'var(--primary)' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-1px' }}>{selectedProduct.price}€</span>
                  <button 
                    onClick={() => addToCart(selectedProduct, { name: customName, number: customNumber })}
                    style={{ flex: 1, background: 'var(--primary)', color: 'white', border: 'none', padding: '18px', borderRadius: '30px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}
                  >
                    🛒 Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CARRITO */}
      {isCheckoutOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)', zIndex: 4000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', maxWidth: '450px', background: 'white', height: '100%', padding: '30px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
              <h2 className="font-heading">Tu Pedido</h2>
              <button onClick={() => setIsCheckoutOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 0', opacity: 0.5 }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '10px' }}>🛒</span>
                <p>Tu carrito está totalmente vacío.</p>
              </div>
            ) : (
              <form onSubmit={handleCheckout}>
                <div style={{ marginBottom: '30px' }}>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ flex: 1, paddingRight: '15px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.quantity}x {item.product.name}</span>
                        {(item.personalization?.name || item.personalization?.number) && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '8px', fontWeight: 600, background: '#f5f3ff', padding: '5px 10px', borderRadius: '8px', display: 'inline-block' }}>
                            ✏️ {item.personalization.name || '-'} | Dorsal {item.personalization.number || '-'}
                          </div>
                        )}
                      </div>
                      <span style={{ fontWeight: 900, fontSize: '1.1rem' }}>{item.product.price * item.quantity}€</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', fontSize: '1.4rem', fontWeight: 900, padding: '15px', background: '#f8fafc', borderRadius: '15px' }}>
                    <span>TOTAL:</span>
                    <span style={{ color: 'var(--primary)' }}>{totalCart}€</span>
                  </div>
                </div>

                <div style={{ background: '#f9f9fb', padding: '25px', borderRadius: '25px', marginBottom: '25px', border: '1px solid #eee' }}>
                  <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: 800 }}>📍 Datos de Envío</h3>
                  {whatsappConfig.formFields.map(field => (
                    <div key={field.id} style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#444' }}>{field.label} {field.required && <span style={{color: 'red'}}>*</span>}</label>
                      {field.type === 'select' ? (
                        <select required={field.required} onChange={(e) => handleInputChange(field.id, e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', outlineColor: 'var(--primary)', fontWeight: 500 }}>
                          <option value="">Selecciona una opción</option>
                          {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea placeholder={field.placeholder} required={field.required} onChange={(e) => handleInputChange(field.id, e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', outlineColor: 'var(--primary)', minHeight: '80px', fontFamily: 'inherit' }} />
                      ) : (
                        <input type={field.type} placeholder={field.placeholder} required={field.required} onChange={(e) => handleInputChange(field.id, e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', outlineColor: 'var(--primary)' }} />
                      )}
                    </div>
                  ))}
                </div>

                <button type="submit" style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '18px', borderRadius: '30px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(37, 211, 102, 0.3)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/></svg>
                  Completar Compra
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '15px', opacity: 0.6 }}>Serás redirigido a WhatsApp para confirmar el stock.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
