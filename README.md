[FIX-JWT-README.md](https://github.com/user-attachments/files/32684481/FIX-JWT-README.md)
# FIX TypeScript - jsonwebtoken expiresIn

## Error
La versión de la biblioteca presenta una descoordinación de firma tipográfica.
El código llama con una cadena secreta y un objeto options que contiene expiresIn,
pero las definiciones de tipo instaladas no coinciden.

## Causa
jsonwebtoken ^9.0.2 + @types/jsonwebtoken vieja no soporta expiresIn: '7d' tipado.

## Solución aplicada
1. package.json:
   - jsonwebtoken: ^9.1.0
   - @types/jsonwebtoken: ^9.0.7

2. Código TS - usar SignOptions importado:

```ts
import jwt, { SignOptions } from 'jsonwebtoken';

const options: SignOptions = { expiresIn: '7d' };
const token = jwt.sign({ id: user.id }, SECRET, options);
```

3. Instalar:
```
rm -rf node_modules package-lock.json
npm install
```

4. Compilar:
```
npx tsc --noEmit
```
Debe compilar sin errores.
