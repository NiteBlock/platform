const mongo = require("mongoose")
const ModelDevice = mongo.model("Device")
const sgMail = require("@sendgrid/mail")
require("dotenv").config({path:"../variables.env"})

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports.createDevice = function (req, res) {
    const name = req.body.name;
    const type = req.body.type;
    const colour = req.body.colour
    if (!name || !colour) {
        res.status(400)
        res.send("No name or colour given.")
        return
    }
    const device = new ModelDevice({
        name: name,
        type: type,
        colour: colour
    })

    device.save().then(function (d) {
        if (d) {
            res.status(200)
            res.send("Device Created.")
        } else {
            res.status(400).send("Failed to create.")
        }
    }).catch(function (e) {
        res.satus(400)
        console.error(e)
    })
}

module.exports.listDevices = function (req, res) {
    ModelDevice.find(req.query).then(function (d) {
        res.status(200).json(d)
    })
}

module.exports.findById = function (req, res) {
    ModelDevice.findById(req.query.id).then(function (d) {
        if (d) {
            res.status(200).json(d)
        } else {
            res.send("Invalid Device Id")
            res.status(400)
        }
    }).catch(function (e) {
        res.send(e)
        res.status(500)
    })
}

module.exports.updateDeviceStatus = function (req, res) {
    const deviceId = req.body.id
    const deviceStatus = req.body.status
    if (!deviceId || !deviceStatus) {
        return res.status(400).send("Bad Request")
    }
    ModelDevice.findByIdAndUpdate(deviceId, { status: deviceStatus }).then(function (d) {
        if (d) {
            res.status(200).send("Done")
        }
        else {
            res.status(500).send("Couldn't update.")
        }

    })
}

module.exports.updateDeviceColour = function (req, res) {
    const deviceId = req.body.id
    const deviceColour = req.body.colour
    if (!deviceId || !deviceColour) {
        return res.status(400).send("Bad Request")
    }
    ModelDevice.findByIdAndUpdate(deviceId, { colour: deviceColour }).then(function (d) {
        if (d) {
            res.status(200).send("Done")
        }
        else {
            res.status(500).send("Couldn't update.")
        }

    })
}


module.exports.sendEmail = function(req, res){
    const deviceId = req.body.id
    ModelDevice.findById(deviceId).then(function (d) {
        name = d.name
        status = d.status
    }).catch(function(err){
        console.log(err)
        return res.status(400).send("invalid id")
    })
    const date = new Date()
    const formattedDate = date.toISOString()
    const msg = {
        from : "alerts@deviceplatform.com",
        to : "samuel.bre@techtalents.club",
        subject : formattedDate + " || New alert from the device ",
        text: `You got an alert from the device with the id ${deviceId}`,
        html: `<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"><head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 600px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
  <![endif]-->
        <style type="text/css">
      body, p, div {
        font-family: verdana,geneva,sans-serif;
        font-size: 16px;
      }
      body {
        color: #797a7c;
      }
      body a {
        color: #993300;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
        <!--user entered Head Start-->
  
       <!--End Head user entered-->
      </head>
      <body>
        <center class="wrapper" data-link-color="#993300" data-body-style="font-size:16px; font-family:verdana,geneva,sans-serif; color:#797a7c; background-color:#ff6d00;">
          <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ff6d00">
              <tbody><tr>
                <td valign="top" bgcolor="#ff6d00" width="100%">
                  <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tbody><tr>
                      <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tbody><tr>
                            <td>
                              <!--[if mso]>
      <center>
      <table><tr><td width="600">
    <![endif]-->
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                        <tbody><tr>
                                          <td role="modules-container" style="padding:0px 0px 0px 0px; color:#797a7c; text-align:left;" bgcolor="#ffffff" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tbody><tr>
        <td role="module-content">
          <p>Ingrid &amp; Anders knows your style!</p>
        </td>
      </tr>
    </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="dcefb5e6-85f3-4570-9b87-d4cdf4579e45">
      <tbody>
        <tr>
          <td style="padding:0px 0px 60px 0px;" role="module-content" bgcolor="#ffffff">
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ebeazB8jSkmiwqzmtn47GC">
        <tbody><tr>
          <td style="background-color:#ffffff; padding:50px 0px 10px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="#ffffff"><div><div style="font-family: inherit; text-align: center"><span style="color: #516775; font-size: 28px; font-family: georgia,serif"><strong>Your device has given an error&nbsp;</strong></span></div><div></div></div></td>
        </tr>
      </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="gjFh5mmBDWQ6e8HdhPttcR">
        <tbody><tr>
          <td style="background-color:#ffffff; padding:10px 40px 50px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#ffffff"><div><div style="font-family: inherit; text-align: center">Your device with the id ${deviceId} has an error, please check what the error is on the website</div><div></div></div></td>
        </tr>
      </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="336a69f7-9bc5-417b-b649-eace8c3730b0">
      <tbody>
        <tr>
          <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="#ffffff">
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="gjFh5mmBDWQ6e8HdhPttcR.1">
      <tbody>
        <tr>
          <td style="padding:10px 40px 50px 40px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center">Details:</div>
  <div style="font-family: inherit; text-align: center">Name: ${name}</div>
  <div style="font-family: inherit; text-align: center">Status: ${status}</div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="umSiwuotTCRLj2VdqbKDHd">
        <tbody><tr>
          <td style="padding:0px 0px 200px 0px;" role="module-content" bgcolor="#ffffff">
          </td>
        </tr>
      </tbody></table></td>
                                        </tr>
                                      </tbody></table>
                                      <!--[if mso]>
                                    </td>
                                  </tr>
                                </table>
                              </center>
                              <![endif]-->
                            </td>
                          </tr>
                        </tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
            </tbody></table>
          </div>
        </center>
      
    
  </body></html>`
    }
    sgMail.send(msg).then(function(message){
        console.log(message)
        if(message){
            res.status(200).json(message)
        }
    }).catch(function(err){
        console.log(err)
        res.status(400).send(err)
    })
}