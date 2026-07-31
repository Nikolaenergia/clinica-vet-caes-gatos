const http=require('http'),fs=require('fs'),path=require('path');
const port=process.env.PORT||3000;
const mt={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon','.webp':'image/webp','.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document','.json':'application/json','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
  let u=decodeURIComponent(req.url.split('?')[0]);
  if(u==='/'||u==='')u='/index.html';
  let f=path.join(__dirname,u);
  if(!f.startsWith(__dirname)){res.writeHead(403);return res.end('403');}
  fs.readFile(f,(e,data)=>{
    if(e){ // fallback: serve index.html
      fs.readFile(path.join(__dirname,'index.html'),(e2,d2)=>{
        if(e2){res.writeHead(404);return res.end('Not found');}
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(d2);
      });return;
    }
    res.writeHead(200,{'Content-Type':mt[path.extname(f).toLowerCase()]||'application/octet-stream'});
    res.end(data);
  });
}).listen(port,()=>console.log('site on '+port));
