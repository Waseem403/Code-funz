const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


router.post("/inbox", (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  console.log(email);
  var client = inbox.createConnection(false, "imap.gmail.com", {
    secureConnection: true,
    auth: {
      user: email,
      pass: pass
    }
  });

  client.connect();

  client.on("connect", function() {
    client.openMailbox("INBOX", function(error, info) {
      if (error) throw error;

      client.listMessages(-10, function(err, messages) {
        messages.forEach(function(message) {
          console.log(message.UID + ": " + message.title);
        });
      });
    });
  });
});

module.exports = router;
