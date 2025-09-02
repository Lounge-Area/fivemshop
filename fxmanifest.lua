fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'FiveM Product Catalog System with NUI Integration'
version '1.0.0'

-- NUI Configuration
ui_page 'dist/index.html'

-- Files to include in the resource
files {
    'dist/index.html',
    'dist/**/*'
}

-- Client scripts
client_scripts {
    'fivem-integration-example.lua'
}

-- Server scripts
server_scripts {
    'fivem-server-example.lua'
}

-- Dependencies (if any)
dependencies {
    -- Add any required dependencies here
}

-- Resource metadata
lua54 'yes'