let db = require('../models/dbconexion');

let medicamento = {
  listar( req, res ){
    let sql = "SELECT * FROM medicamento";
    db.query(sql,function(err, result){
      if( err ){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(result);
      }
    });
  },
  store( req, res ){
    val_nombre = req.body.nombre;
    val_tipo = req.body.tipo;
    val_precio = req.body.precio;
    val_stock = req.body.stock;
    var file = req.files.file;
    var tmp_path = file.path;
    var target_path = './public/images/' + file.name;
    //console.log(tmp_path);
    console.log(target_path);
    console.log(file.name);
    let val_archivo = file.name;
    let val_ruta = target_path;

    fs.copyFile(tmp_path,target_path,function(err)
    {
        if (err) throw err;        
        fs.unlink(tmp_path, function() {
          if (err) throw err;
          res.status(200).send('File uploaded to: ' + target_path);          
        });
            
    });  
    let sql = "INSERT INTO medicamento(Nombre,Tipo,Precio,Stock,NombreArchivo,RutaArchivo) VALUES(?,?,?,?,?,?)";
    db.query(sql,[val_nombre,val_tipo,val_precio,val_stock,val_archivo,val_ruta],function(err, newData){
      if(err){
        console.log(err);
        res.sendStatus(500); 
      }else{
        res.json(newData);
      }
    });
  },
  show( req, res ){
    val_id = req.params.id;
    let sql = "SELECT * FROM medicamento WHERE id=?";
    db.query(sql,[val_id],function(err, rowData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(rowData);
      }
    });
  },
  edit( req, res ){
    val_id = req.params.id;
    console.log(val_id);
    val_nombre = req.body.nombre;
    val_tipo = req.body.tipo; 
    val_precio = req.body.precio;
    val_stock = req.body.stock;
    val_archivo = req.body.archivo;
    val_ruta = req.body.ruta;
    let sql = "UPDATE medicamento SET nombre=?, tipo=?, precio=?, stock=? WHERE id=?";
    db.query(sql,[val_nombre,val_tipo,val_precio,val_stock,val_archivo,val_ruta,val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.json(newData);
      }
    });
  },
  delete( req, res ){
    val_id = req.params.id;
    let sql = "DELETE FROM medicamento WHERE id=?";
    db.query(sql,[val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  }
}

module.exports = medicamento;
