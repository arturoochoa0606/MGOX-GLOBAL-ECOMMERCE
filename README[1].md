# MGOX EMERGENCIA FINAL - SI JALA

## FIX deploy
- jsonwebtoken: ^8.5.1 (SI existe en npm, 9.1.0 NO existia en mirror Hostinger)
- uuid: ^11.0.0
- @types/jsonwebtoken: ^8.5.9 (para TS)

## Deploy Hostinger
1. Sube app.js + package.json a File Manager (mismo folder)
2. hPanel > Avanzado > Node.js > Crear App
   - Startup: app.js
   - Node: 20.x
3. NPM Install
4. Reiniciar
5. Debe decir: "MGOX 8.5.1 SI JALA"

## Test local
npm install
PORT=3001 node app.js
http://localhost:3001/api/token-test -> debe dar token con expiresIn funcionando
