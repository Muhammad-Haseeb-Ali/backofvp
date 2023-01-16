var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require("nodemailer");
var CORS = require("cors");
var dotenv = require("dotenv")
var { connect } = require("./database/connect")

var indexRouter = require('./routes/index');
var proposalRouter = require('./routes/proposal');

var app = express(),
    port = process.env.PORT || "8000"

dotenv.config()
connect().catch(error => console.log(error))

app.use(CORS());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/proposal', proposalRouter);
app.get('sendmail', (req, res) => {
    // sendmail?id="786"&msg="....."
    res.setHeader('Content-Type', 'application/json');
    const { id, msg } = req.query;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'haseeb.aha786@gmail.com',
            pass: process.env.MAIL_APP_PASS

        }
    });

    var mailOptions = {
        from: 'haseeb.aha786@gmail.com',
        to: 'haseeb.aha786@outlook.com, haseeb.aha786@yahoo.com, haseeb.aha786@aol.com',
        subject: `Video Proposal Messsage from ${id}`,
        text: `${msg}`
    };

    transporter.sendMail(mailOptions)
        .then(info => {
            console.log("succed to send mail notification")
            return (
                res.status(200).json({
                    status: 'success',
                    id,
                    msg,
                    info
                })
            )

        })
        .catch(err => {
            console.log("error:", err)
            return (
                res.status(404).json({
                    status: 'fail',
                    id,
                    msg,
                    err
                })
            )

        })
})

app.listen(port)