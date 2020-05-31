const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

//Router
const PersonalRouter = require("./routes/PersonalRouter");
const AparelhoRouter = require("./routes/AparelhoRouter");
const UfRouter = require("./routes/UfRouter");
const ExercicioRouter = require("./routes/ExercicioRouter");
const CepRouter = require("./routes/CepRouter");
const AlunoRouter = require("./routes/AlunoRouter");
const HorarioRouter = require("./routes/HorarioRouter");
const PersonalAlunoRouter = require("./routes/PersonalAlunoRouter");
const AulaRouter = require("./routes/AulaRouter");

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Routes
app.use("/",PersonalRouter);
app.use("/",AparelhoRouter);
app.use("/",UfRouter);
app.use("/",ExercicioRouter);
app.use("/",CepRouter);
app.use("/",AlunoRouter);
app.use("/",HorarioRouter);
app.use("/",PersonalAlunoRouter);
app.use("/",AulaRouter);

// Router
app.get("/",function(req,res){
     console.log("Aplica��o rodando com sucesso");
     res.send("Hello World!");
});

app.use(function (req, resp, next) {
    resp.status(404).render("notFound");
});



app.listen(process.env.PORT || 3000,function(erro){
    if (erro) {
        console.log("aconteceu um erro !!!");
    } else {
        console.log("servidor rodando com sucesso");
    }
    console.log("servidor rodando com sucesso 2");
});