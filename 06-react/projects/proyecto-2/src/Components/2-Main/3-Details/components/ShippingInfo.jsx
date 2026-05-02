export const ShippingInfo = () => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200 mt-4">
            <div className="flex items-start gap-3">
                <span className="font-heading text-small font-semibold text-gray-900 min-w-fit">📦 Envío:</span>
                <p className="font-body text-small text-gray-600">Envío gratis en compras mayores a $100</p>
            </div>
            <div className="flex items-start gap-3">
                <span className="font-heading text-small font-semibold text-gray-900 min-w-fit">↩️ Retorno:</span>
                <p className="font-body text-small text-gray-600">Devolución gratuita en 30 días</p>
            </div>
            <div className="flex items-start gap-3">
                <span className="font-heading text-small font-semibold text-gray-900 min-w-fit">✓ Garantía:</span>
                <p className="font-body text-small text-gray-600">Garantía de 1 año en todos los productos</p>
            </div>
        </div>
    )
}
