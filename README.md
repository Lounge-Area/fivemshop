# FiveM Product Catalog System

A modern, responsive product catalog system designed for FiveM servers with NUI integration.

## Features

- **Enhanced Categorization**: Tools, Food, and Electronics with detailed subcategories
- **Advanced Filtering**: Search, category filtering, and sorting options
- **Shopping Cart**: Full cart functionality with quantity management
- **FiveM Integration**: Complete NUI communication for server integration
- **Responsive Design**: Mobile-first approach with clean, modern aesthetics
- **Red Theme**: Professional red color scheme optimized for gaming interfaces

## FiveM Integration

### NUI Communication

The system includes comprehensive NUI communication utilities in `src/utils/nui.ts`:

- **Product Addition**: Notifies FiveM client when items are added to cart
- **Cart Updates**: Sends real-time cart state changes to the client
- **Checkout Process**: Handles complete checkout data transfer
- **Interface Control**: Manages NUI opening/closing states

### Client-Side Integration (Lua)

To integrate with your FiveM resource, add these event handlers to your client-side Lua script:

```lua
-- Register NUI callback handler
RegisterNUICallback('nuiCallback', function(data, cb)
    local action = data.action
    
    if action == 'addToCart' then
        -- Handle product addition
        local product = data.data.product
        local quantity = data.data.quantity
        
        -- Add your logic here (e.g., check player money, inventory space)
        print('Adding to cart: ' .. product.name .. ' x' .. quantity)
        
    elseif action == 'processCheckout' then
        -- Handle checkout process
        local items = data.data.items
        local total = data.data.total
        
        -- Add your logic here (e.g., deduct money, add items to inventory)
        print('Processing checkout for $' .. total)
        
        -- Example: Check if player has enough money
        -- if GetPlayerMoney() >= total then
        --     DeductPlayerMoney(total)
        --     AddItemsToInventory(items)
        --     TriggerEvent('chat:addMessage', { args = { 'Purchase successful!' } })
        -- else
        --     TriggerEvent('chat:addMessage', { args = { 'Insufficient funds!' } })
        -- end
        
    elseif action == 'closeNUI' then
        -- Close the NUI interface
        SetNuiFocus(false, false)
        
    elseif action == 'nuiReady' then
        -- NUI interface is ready
        print('Product catalog NUI is ready')
    end
    
    cb('ok')
end)

-- Command to open the product catalog
RegisterCommand('shop', function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = 'openCatalog'
    })
end)
```

### Server-Side Integration (Optional)

For server-side inventory and money management:

```lua
-- Server-side event handlers
RegisterServerEvent('productCatalog:purchase')
AddEventHandler('productCatalog:purchase', function(items, total)
    local source = source
    local player = GetPlayerFromId(source)
    
    -- Add your server-side purchase logic here
    -- Check player money, update database, etc.
end)
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## File Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Main navigation header
│   ├── CategoryFilter.tsx  # Category sidebar
│   ├── ProductCard.tsx # Individual product cards
│   ├── ProductGrid.tsx # Product grid layout
│   ├── Cart.tsx        # Shopping cart modal
│   └── FilterBar.tsx   # Filter and sort controls
├── hooks/              # Custom React hooks
│   ├── useCart.ts      # Cart state management
│   └── useProductFilter.ts # Product filtering logic
├── utils/              # Utility functions
│   ├── nui.ts          # FiveM NUI communication
│   └── fivemTypes.ts   # FiveM-specific type definitions
├── data/               # Static data
│   └── products.ts     # Product and category data
├── types/              # TypeScript type definitions
│   └── product.ts      # Product and category interfaces
└── index.css           # Global styles and Tailwind CSS
```

## Customization

### Adding New Products
Edit `src/data/products.ts` to add new products or categories.

### Styling
The system uses Tailwind CSS with a red theme. Modify `src/index.css` for custom styling.

### NUI Events
Extend `src/utils/nui.ts` to add new FiveM communication events as needed.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is designed for FiveM server integration and follows FiveM's terms of service.