const express = require('express');
const path = require('path');
const hbs=require('hbs');
const app = express();

const pathPublic = path.join(__dirname, 'public');

const path_template= path.join(__dirname, 'template/views');
const path_partials=path.join(__dirname,'template/partials');
app.use(express.static(pathPublic));
// app.get('/about', (req, res) => {
//     res.sendFile(path.join(pathPublic, 'about.html'));
// });
// app.get('/weather', (req, res) => {
//     res.sendFile(path.join(pathPublic, 'weather.html'));
// });

app.set('view engine','hbs');

app.set('views',path_template);

hbs.registerPartials(path_partials);

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/weather',(req,res)=>{
    res.render('weather');
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('*',(req,res)=>{
    res.render('404');
})




const PORT =3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
