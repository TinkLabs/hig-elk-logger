let express = require('express');
let bodyParser = require('body-parser');
let cookieParser=require('cookie-parser');
let app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}));


app.use(require("./middleware/resp_builder"));
app.use(require("./middleware/permission"));

app.use(express.static('build'));

app.use("/producer", require("./router/producer"));
app.use("/health-check", require("./router/health-check"));

app.listen(80, function () {
    console.log('ELK logger listening on port 80!');
});
