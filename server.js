var express = require('express');
var app = express();

const users = [
    {id: 12, name:"John", surname:"Smith", age:33},
    {id: 13, name:"Mary", surname:"Moe", age:28},
    {id: 14, name:"Victor", surname:"Dominguez", age:33},
];

app.use(express.json());

app.get('/users', function(req, res) {
    res.json(users);
});

app.get('/users/:id(\\d+)', function(req, res) {
    const userId = parseInt(req.params.id); // Convertir el id a número
    const user = users.find(x => x.id === userId);
     if (user) res.send('User Name:'+' '+ user.name+' '+user.surname+'\n'+ 'User Age:'+' '+ user.age);
     return;   
     res.status(404).send('Usuario no encontrado');
});

app.get('/users/:name', function(req, res) {
    const userName = req.params.name;
    const userN = users.find(y => y.name === userName);
    if (userN) res.send('Complete user name:'+' '+ userN.name+' '+userN.surname+'\n'+'User age:'+' '+ userN.age+'\n'+'User ID:'+' '+ userN.id);
    return;    
    res.status(404).send('Usuario no encontrado');
});

app.post('/users', function(req, res) {
    const { name, surname, age } = req.body; // Obtener los datos del nuevo usuario
    const newId = users.length + 1; // Generar un nuevo ID
    const newUser = { id: newId, name, surname, age }; // Crear el objeto de usuario

    users.push(newUser); // Agregar el nuevo usuario a la lista
    res.status(201).send(newUser); // Enviar la respuesta con el nuevo usuario
});

app.get('*',function(req, res){
    res.send('Sorry, this is an invalid URL.');

});

app.listen(3000);


