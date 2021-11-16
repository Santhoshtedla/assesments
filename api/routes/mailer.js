const nodeMailer = require('nodemailer')

module.exports = (userName,email) => {
    const transporter = nodeMailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'santhoshtedla@gmail.com',
            pass : '********'
        }
    });
    
    var mailOptions = {
        from : 'santhoshtedla@gmail.com',
        to : email,
        subject : 'Registration update',
        text : `Hi ${userName} , You are Successfully Registered `
    }
    
    transporter.sendMail(mailOptions , (err) => {
        if(err){
            console.log(err)
        }else{
            console.log('Email send To : ' + mailOptions.to)
        }
    })
}