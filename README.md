# Joplin Plugin : HomeNote
[![Node.js CI](https://github.com/adarsh-sgh/homenote/actions/workflows/runTests.js.yml/badge.svg)](https://github.com/adarsh-sgh/homenote/actions/workflows/runTests.js.yml)

Allows user to set a homenote which will be automatically opened each time joplin is launched. 

To set a note as homenote use (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>H </kbd> ) or `Tools > set as homenote`. 

Use <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>H </kbd> or click the home icon on editor toolbar to jump to Homenote; you can also find these options under `Tools` menu.


![image](https://user-images.githubusercontent.com/63918341/124692363-1b3be600-defb-11eb-9bfa-84d373b4a6cb.png)

On Android devices you can follow below steps
1. Click on the 3 dots on top right
2. Click on `Set as HomeNote` or `Open HomeNote`

![image.png](https://private-user-images.githubusercontent.com/63918341/411296746-bb3d34a7-15f3-43e2-8bc0-7921ad137817.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzkwODg2OTUsIm5iZiI6MTczOTA4ODM5NSwicGF0aCI6Ii82MzkxODM0MS80MTEyOTY3NDYtYmIzZDM0YTctMTVmMy00M2UyLThiYzAtNzkyMWFkMTM3ODE3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjA5VDA4MDYzNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI3NGI1MzRlNmQ2ZDEyMGIyY2RhMTJiODQ5NjAwYTUxZGNkYTlmMmVmMTNmYTA3NDdkOTRlYzRkZjRmYWU0NzUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.0mR5kQcn8Erfjzl-zMFtG9njI_GxlkEbbF6_01w0dEM)

# Installation
Follow steps below to install the plugin in joplin
1. Open Joplin
2. Press <kbd>Ctrl</kbd><kbd>,</kbd> 
3. Select Plugins from left pane
4. search for plugin Home Note
5. click install and the restart joplin

# Disable (Restore default behaviour)
To restore the default behaviour of opening the last note when joplin is launched
1. Open Joplin
2. Press <kbd>Ctrl</kbd><kbd>,</kbd> 
3. Select Plugins from left pane
4. disable Home Note plugin by clicking on the toggle button in front of the plugin name

# Local Setup (For developers)
After cloning the repository, run the following commands to build the plugin:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm install
npm run dist
```

if using fish shell use the following command to set NODE_OPTIONS
```bash
set -x NODE_OPTIONS --openssl-legacy-provider
```
Add the full path to homenote/dist folder in joplin as shown in [joplin docs](https://joplinapp.org/help/api/get_started/plugins/)
