-- FiveM Client-Side Integration Example
-- Place this in your FiveM resource's client.lua file

local isNUIOpen = false

-- Register NUI callback handler for product catalog
RegisterNUICallback('nuiCallback', function(data, cb)
    local action = data.action
    local responseData = { success = true, message = 'OK' }
    
    if action == 'addToCart' then
        -- Handle product addition to cart
        local product = data.data.product
        local quantity = data.data.quantity
        
        print('[Product Catalog] Adding to cart: ' .. product.name .. ' (Qty: ' .. quantity .. ')')
        
        -- Example: Trigger client event for inventory management
        TriggerEvent('productCatalog:addToCart', product, quantity)
        
    elseif action == 'processCheckout' then
        -- Handle checkout process
        local items = data.data.items
        local total = data.data.total
        
        print('[Product Catalog] Processing checkout - Total: $' .. total)
        
        -- Example: Trigger server event for purchase processing
        TriggerServerEvent('productCatalog:processPurchase', items, total)
        
        -- Close NUI after checkout
        SetNuiFocus(false, false)
        isNUIOpen = false
        
    elseif action == 'updateCart' then
        -- Handle cart state updates
        local items = data.data.items
        local count = data.data.count
        local total = data.data.total
        
        print('[Product Catalog] Cart updated - Items: ' .. count .. ', Total: $' .. total)
        
        -- Example: Update HUD or other UI elements
        TriggerEvent('productCatalog:updateCartDisplay', count, total)
        
    elseif action == 'closeNUI' then
        -- Close the NUI interface
        SetNuiFocus(false, false)
        isNUIOpen = false
        print('[Product Catalog] NUI closed by user')
        
    elseif action == 'nuiReady' then
        -- NUI interface is ready
        print('[Product Catalog] NUI interface loaded successfully')
        
        -- Example: Send initial data to NUI if needed
        -- SendNUIMessage({
        --     type = 'updatePlayerData',
        --     playerMoney = GetPlayerMoney(),
        --     playerInventory = GetPlayerInventory()
        -- })
    end
    
    cb(responseData)
end)

-- Command to open the product catalog
RegisterCommand('shop', function(source, args, rawCommand)
    if not isNUIOpen then
        SetNuiFocus(true, true)
        isNUIOpen = true
        
        -- Send message to open the catalog
        SendNUIMessage({
            type = 'openCatalog',
            playerData = {
                money = 5000, -- Example: Get actual player money
                name = GetPlayerName(PlayerId())
            }
        })
        
        print('[Product Catalog] Opening shop interface')
    else
        print('[Product Catalog] Shop is already open')
    end
end, false)

-- Close NUI when ESC is pressed
RegisterCommand('closeNUI', function()
    if isNUIOpen then
        SetNuiFocus(false, false)
        isNUIOpen = false
        print('[Product Catalog] NUI closed via ESC')
    end
end, false)

RegisterKeyMapping('closeNUI', 'Close NUI', 'keyboard', 'ESCAPE')

-- Example: Handle server responses for purchases
RegisterNetEvent('productCatalog:purchaseResult')
AddEventHandler('productCatalog:purchaseResult', function(success, message, newBalance)
    if success then
        print('[Product Catalog] Purchase successful: ' .. message)
        -- Example: Show success notification
        TriggerEvent('chat:addMessage', {
            color = { 0, 255, 0 },
            multiline = true,
            args = { 'Shop', 'Purchase successful! New balance: $' .. newBalance }
        })
    else
        print('[Product Catalog] Purchase failed: ' .. message)
        -- Example: Show error notification
        TriggerEvent('chat:addMessage', {
            color = { 255, 0, 0 },
            multiline = true,
            args = { 'Shop', 'Purchase failed: ' .. message }
        })
    end
end)

-- Example: Client-side cart management
local clientCart = {}

RegisterNetEvent('productCatalog:addToCart')
AddEventHandler('productCatalog:addToCart', function(product, quantity)
    -- Add item to client-side cart tracking
    if clientCart[product.id] then
        clientCart[product.id].quantity = clientCart[product.id].quantity + quantity
    else
        clientCart[product.id] = {
            product = product,
            quantity = quantity
        }
    end
    
    -- Example: Update client-side inventory preview
    TriggerEvent('inventory:updatePreview', clientCart)
end)