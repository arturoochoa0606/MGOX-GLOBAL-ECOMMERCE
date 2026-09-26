const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'mgox-global-2024-secret';
const ADMIN_EMAIL = 'admin@mgoxglobal.com';

// Helper token - FIX 8.5.1
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Rutas
app.get('/', (req,res)=>{
  res.send(`
  <html><body style="background:#000;color:#0f0;font-family:monospace;padding:20px">
  <h1>✅ MGOX GLOBAL - SI JALA - 8.5.1 DEPLOY OK</h1>
  <p>admin@mgoxglobal.com</p>
  <p>jsonwebtoken: 8.5.1 (existe en npm)</p>
  <p>uuid: 11.0.0</p>
  <p>Node: ${process.version}</p>
  <p>Port: ${process.env.PORT || 3000}</p>
  <hr>
  <a href="/api" style="color:#0f0">/api</a> | 
  <a href="/api/productos" style="color:#0f0">/api/productos</a> | 
  <a href="/api/admin/vendedores" style="color:#0f0">/admin</a> | 
  <a href="/api/token-test" style="color:#0f0">/token-test</a> | 
  <a href="/api/health" style="color:#0f0">/health</a>
  <hr>
  <p>Margen: 20-30% | Banca: 75/25 | Factura: NO MGOX (a nombre comprador)</p>
  </body></html>`)
});

app.get('/api', (req,res)=> res.json({
  ok:true,
  status:'MGOX SI JALA - DEPLOY OK',
  jsonwebtoken:'8.5.1',
  uuid:'11.0.0',
  admin: ADMIN_EMAIL,
  margen:'20-30%',
  banca:'75/25 vendedor/MGOX',
  factura:'NO MGOX - a nombre comprador',
  timestamp: new Date().toISOString()
}));

app.get('/api/productos', (req,res)=> res.json({
  ok:true,
  seleccion: 'FULL 2000/50000 + manual checkbox',
  dsers: 'ON - AliExpress->DSers->MGOX->Amazon/ML auto',
  productos: [
    {id:'MGOX-001', nombre:'Audifonos Pro', costo:250, venta:312.5, margen:'25%', dsers:true},
    {id:'MGOX-002', nombre:'Smartwatch', costo:400, venta:520, margen:'30%', dsers:true}
  ]
}));

app.get('/api/admin/vendedores', (req,res)=> res.json({
  ok:true,
  admin: ADMIN_EMAIL,
  vendedores: [],
  banca: '75% vendedor / 25% MGOX',
  factura: 'NO MGOX'
}));

app.get('/api/token-test', (req,res)=>{
  try {
    const token = signToken({id:'admin', email: ADMIN_EMAIL});
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ok:true, jsonwebtoken:'8.5.1', token, decoded, msg:'jwt.sign() con expiresIn SI funciona en 8.5.1'});
  } catch(e){
    res.status(500).json({ok:false, error:e.message});
  }
});

app.get('/api/health', (req,res)=> res.json({
  ok:true,
  uptime: process.uptime(),
  node: process.version,
  jsonwebtoken: '8.5.1',
  status: 'healthy'
}));

app.post('/api/login', async (req,res)=>{
  const {email, password} = req.body;
  // Demo - en prod va contra MySQL
  if(email === ADMIN_EMAIL){
    const token = signToken({email, role:'admin'});
    return res.json({ok:true, token, user:{email, role:'admin'}});
  }
  res.status(401).json({ok:false, msg:'Credenciales invalidas'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', ()=> console.log(`✅ MGOX 8.5.1 SI JALA en ${PORT} - jsonwebtoken 8.5.1 deploy OK`));
