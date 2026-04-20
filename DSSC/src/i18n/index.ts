type Language = 'en' | 'es';

export const translations = {
  en: {
    // Setup
    welcome: 'Welcome',
    setupSubtitle: 'Lets configure your business app',
    companyName: 'Company Name',
    companyPlaceholder: 'e.g. My Grocery Store',
    logo: 'Business Logo',
    addLogo: 'Add Logo',
    removeLogo: 'Remove logo',
    language: 'Language',
    continue: 'Continue',

    // Dashboard
    totalBalance: 'Total Balance to Collect',
    clients: 'Clients',
    products: 'Products',
    missingItems: 'Missing Items',
    searchClient: 'Search client...',
    newClient: 'New Client',
    noClients: 'No clients found.',
    noClientsYet: 'No clients registered.',
    balance: 'Total Balance',
    inFavor: 'In favor',
    whatsappMessage: 'WhatsApp',
    addDebt: 'Add Debt',
    registerPayment: 'Register Payment',
    payInFull: 'Pay in Full',
    deleteClientConfirm: 'Are you sure you want to delete this client and all their history? This cannot be undone.',
    payInFullConfirm: 'Do you want to register a full payment of ₲{amount}?',

    // New Client Modal
    clientName: 'Client Name *',
    phoneOptional: 'Phone (Optional)',
    saveClient: 'Save Client',

    // Transaction Modal
    addDebtTitle: 'Add Debt',
    registerPaymentTitle: 'Register Payment',
    weightCalculator: 'Weight Calculator',
    weightKg: 'Weight (Kg)',
    pricePerKg: 'Price per Kg (₲)',
    cancel: 'Cancel',
    calculate: 'Calculate',
    amount: 'Amount (₲) *',
    useCalculator: 'Use Calculator',
    detailsOptional: 'Details (Optional)',
    debtPlaceholder: 'e.g. Bread and milk',
    paymentPlaceholder: 'e.g. Partial payment',

    // Missing Items
    addItemPlaceholder: 'Add missing item...',
    noMissingItems: 'No missing items registered.',

    // Catalog
    searchProduct: 'Search product...',
    newSubcategory: 'New Subcategory',
    newProduct: 'New Product',
    subcategoryName: 'Subcategory Name...',
    create: 'Create',
    startCreatingCategory: 'Start by creating a subcategory (e.g. Dairy)',
    deleteCategoryError: 'You cannot delete this subcategory because it contains products. Delete the products first.',
    deleteCategoryConfirm: 'Are you sure you want to delete this subcategory?',
    deleteProductConfirm: 'Are you sure you want to delete this product?',
    add: 'Add',
    noProductsInCategory: 'No products in this subcategory',
    productName: 'Product Name *',
    price: 'Price (₲) *',
    category: 'Subcategory *',
    selectCategory: 'Select a subcategory',
    saveProduct: 'Save Product',
    addPhoto: 'Add Photo',
    removePhoto: 'Remove photo',

    // Whatsapp messages
    noPhoneAlert: 'This client does not have a registered phone number.',
    waGreeting: 'Hello {name}, we are writing from {company}.',
    waToPay: 'Your pending balance is ₲{amount}.',
    waInFavor: 'Your balance in favor is ₲{amount}.',
    waRecent: 'Recent transactions:',
    waNoRecent: 'No recent transactions.'
  },
  es: {
    // Setup
    welcome: 'Bienvenido',
    setupSubtitle: 'Configuremos tu aplicación',
    companyName: 'Nombre de la Empresa',
    companyPlaceholder: 'Ej. Mi Despensa',
    logo: 'Logo de la Empresa',
    addLogo: 'Añadir Logo',
    removeLogo: 'Quitar logo',
    language: 'Idioma',
    continue: 'Continuar',

    // Dashboard
    totalBalance: 'Saldo total por cobrar',
    clients: 'Clientes',
    products: 'Productos',
    missingItems: 'Faltantes',
    searchClient: 'Buscar cliente...',
    newClient: 'Nuevo Cliente',
    noClients: 'No se encontraron clientes.',
    noClientsYet: 'No hay clientes registrados.',
    balance: 'Saldo Total',
    inFavor: 'A favor',
    whatsappMessage: 'WhatsApp',
    addDebt: 'Deuda',
    registerPayment: 'Registrar Pago',
    payInFull: 'Saldar Total',
    deleteClientConfirm: '¿Estás seguro de eliminar este cliente y todo su historial? Esta acción no se puede deshacer.',
    payInFullConfirm: '¿Deseas registrar un pago por el total de ₲{amount}?',

    // New Client Modal
    clientName: 'Nombre del Cliente *',
    phoneOptional: 'Teléfono (Opcional)',
    saveClient: 'Guardar Cliente',

    // Transaction Modal
    addDebtTitle: 'Sumar Deuda',
    registerPaymentTitle: 'Registrar Pago',
    weightCalculator: 'Calculadora de Pesaje',
    weightKg: 'Peso (Kg)',
    pricePerKg: 'Precio x Kg (₲)',
    cancel: 'Cancelar',
    calculate: 'Calcular',
    amount: 'Monto (₲) *',
    useCalculator: 'Usar Calculadora',
    detailsOptional: 'Detalle (Opcional)',
    debtPlaceholder: 'Ej. Fiambre y pan',
    paymentPlaceholder: 'Ej. Pago parcial',

    // Missing Items
    addItemPlaceholder: 'Agregar producto que falta...',
    noMissingItems: 'No hay faltantes registrados.',

    // Catalog
    searchProduct: 'Buscar producto...',
    newSubcategory: 'Nueva Subsección',
    newProduct: 'Nuevo Producto',
    subcategoryName: 'Nombre de subsección...',
    create: 'Crear',
    startCreatingCategory: 'Empieza creando una subsección (Ej. Lácteos)',
    deleteCategoryError: 'No puedes eliminar esta subsección porque tiene productos. Elimina los productos primero.',
    deleteCategoryConfirm: '¿Seguro que deseas eliminar esta subsección?',
    deleteProductConfirm: '¿Seguro que deseas eliminar este producto?',
    add: 'Añadir',
    noProductsInCategory: 'No hay productos en esta subsección',
    productName: 'Nombre del Producto *',
    price: 'Precio (₲) *',
    category: 'Categoría (Subsección) *',
    selectCategory: 'Seleccione una subsección',
    saveProduct: 'Guardar Producto',
    addPhoto: 'Añadir Foto',
    removePhoto: 'Quitar foto',

    // Whatsapp messages
    noPhoneAlert: 'Este cliente no tiene teléfono registrado.',
    waGreeting: 'Hola {name}, te escribimos de {company}.',
    waToPay: 'Tu saldo a pagar es de ₲{amount}.',
    waInFavor: 'Tu saldo a favor es de ₲{amount}.',
    waRecent: 'Últimos movimientos:',
    waNoRecent: 'Sin movimientos recientes.'
  }
};

export function getT(lang: Language) {
  return translations[lang] || translations.en;
}
