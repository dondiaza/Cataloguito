export type FormField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea';
  placeholder?: string;
  options?: string[];
  required: boolean;
};

type CartSummaryItem = {
  name: string;
  quantity: number;
  price: number;
};

export const whatsappConfig = {
  phoneNumber: '34600000000',

  formFields: [
    {
      id: 'nombre',
      label: 'Nombre completo',
      type: 'text',
      placeholder: 'Ej: Juan Pérez',
      required: true,
    },
    {
      id: 'ciudad',
      label: 'Ciudad de envío',
      type: 'text',
      placeholder: 'Ej: Sevilla',
      required: true,
    },
    {
      id: 'metodoEnvio',
      label: 'Método de entrega',
      type: 'select',
      options: ['Envío Express (24h)', 'Envío Estándar (48-72h)', 'Recogida en mano'],
      required: true,
    },
    {
      id: 'notas',
      label: 'Notas adicionales (Opcional)',
      type: 'textarea',
      placeholder: '¿Algún detalle para la personalización o envío?',
      required: false,
    }
  ] as FormField[],

  generateMessage: (
    orderId: string, 
    formData: Record<string, string>, 
    cartItems: CartSummaryItem[],
    total: number
  ) => {
    let message = `🛒 *NUEVO PEDIDO | ${orderId}*\n\n`;

    message += `👤 *Datos del cliente:*\n`;
    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        message += `- ${label}: ${value}\n`;
      }
    }
    message += `\n`;

    message += `👕 *Resumen del Pedido:*\n`;
    cartItems.forEach(item => {
      message += `▫️ ${item.quantity}x ${item.name} (${item.price}€)\n`;
    });
    message += `\n`;

    message += `💰 *TOTAL: ${total}€*\n\n`;
    message += `¡Gracias! Quedo a la espera para gestionar el pago y envío.`;

    return encodeURIComponent(message);
  }
};
