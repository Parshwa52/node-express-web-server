const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});


hbs.registerHelper('scream',(text)=>{
return text.toLowerCase();
});
app.set('views', (__dirname+'/views'));
app.set('view engine', 'hbs');



app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log+'\n',(err)=>{
        console.log('unable to log');
    })
    next();
});
/*app.use((req,res,next)=>{
    res.render('maintenance.hbs');
    next();
});*/
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
   /* res.send({
        name:'Parshwa',
        likes:['chess','programming']
    });*/
    res.render('home.hbs',{
        title:'Home',
        body:'HELLO WORLD',
        
    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        title: 'Projects'
    });
});



app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About',
        
    });
    //console.log(req);
});

app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});
