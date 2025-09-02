-- FiveM Server-Side Integration Example
-- Place this in your FiveM resource's server.lua file

-- Example player data storage (use your existing player system)
local playerData = {}

-- Initialize player data when they join
AddEventHandler('playerJoining', function()
    local source = source
    playerData[source] = {
        money = 5000, -- Starting money
        inventory = {}
    }
end)

-- Handle purchase processing from the product catalog
RegisterServerEvent('productCatalog:processPurchase')
AddEventHandler('productCatalog:processPurchase', function(items, total)
    local source = source
    local player = playerData[source]
    
    if not player then
        print('[Product Catalog] Player data not found for source: ' .. source)
        TriggerClientEvent('productCatalog:purchaseResult', source, false, 'Player data not found', 0)
        return
    end
    
    -- Check if player has enough money
    if player.money < total then
        print('[Product Catalog] Insufficient funds for player: ' .. source)
        TriggerClientEvent('productCatalog:purchaseResult', source, false, 'Insufficient funds', player.money)
        return
    end
    
    -- Process each item in the purchase
    local purchaseLog = {}
    for _, item in ipairs(items) do
        local product = item.product or item -- Handle different item structures
        local quantity = item.quantity
        
        -- Add item to player inventory
        if player.inventory[product.id] then
            player.inventory[product.id].quantity = player.inventory[product.id].quantity + quantity
        else
            player.inventory[product.id] = {
                name = product.name,
                quantity = quantity,
                price = product.price,
                category = product.category,
                metadata = {
                    purchaseDate = os.date('%Y-%m-%d %H:%M:%S'),
                    originalPrice = product.price
                }
            }
        end
        
        table.insert(purchaseLog, {
            name = product.name,
            quantity = quantity,
            price = product.price * quantity
        })
        
        print('[Product Catalog] Added to inventory: ' .. product.name .. ' x' .. quantity)
    end
    
    -- Deduct money from player
    player.money = player.money - total
    
    -- Log the transaction
    print('[Product Catalog] Purchase completed for player ' .. source .. ':')
    print('  Total: $' .. total)
    print('  New Balance: $' .. player.money)
    print('  Items: ' .. #purchaseLog)
    
    -- Send success response to client
    TriggerClientEvent('productCatalog:purchaseResult', source, true, 'Purchase completed successfully!', player.money)
    
    -- Optional: Save to database
    -- SavePlayerData(source, player)
    
    -- Optional: Log to server console or file
    -- LogTransaction(source, purchaseLog, total)
end)

-- Get player money (example function)
RegisterServerEvent('productCatalog:getPlayerMoney')
AddEventHandler('productCatalog:getPlayerMoney', function()
    local source = source
    local player = playerData[source]
    
    if player then
        TriggerClientEvent('productCatalog:updatePlayerMoney', source, player.money)
    end
end)

-- Get player inventory (example function)
RegisterServerEvent('productCatalog:getPlayerInventory')
AddEventHandler('productCatalog:getPlayerInventory', function()
    local source = source
    local player = playerData[source]
    
    if player then
        TriggerClientEvent('productCatalog:updatePlayerInventory', source, player.inventory)
    end
end)

-- Admin command to give money (for testing)
RegisterCommand('givemoney', function(source, args, rawCommand)
    if source == 0 then -- Console only
        local targetId = tonumber(args[1])
        local amount = tonumber(args[2])
        
        if targetId and amount and playerData[targetId] then
            playerData[targetId].money = playerData[targetId].money + amount
            print('[Product Catalog] Gave $' .. amount .. ' to player ' .. targetId)
            TriggerClientEvent('productCatalog:updatePlayerMoney', targetId, playerData[targetId].money)
        end
    end
end, true)

-- Admin command to check player inventory
RegisterCommand('checkinventory', function(source, args, rawCommand)
    if source == 0 then -- Console only
        local targetId = tonumber(args[1])
        
        if targetId and playerData[targetId] then
            print('[Product Catalog] Player ' .. targetId .. ' inventory:')
            for itemId, item in pairs(playerData[targetId].inventory) do
                print('  ' .. item.name .. ' x' .. item.quantity)
            end
        end
    end
end, true)

-- Cleanup when player disconnects
AddEventHandler('playerDropped', function(reason)
    local source = source
    if playerData[source] then
        -- Optional: Save player data before cleanup
        -- SavePlayerData(source, playerData[source])
        playerData[source] = nil
        print('[Product Catalog] Cleaned up data for disconnected player: ' .. source)
    end
end)