# Sparkpost IBM Bluemix PoC

##THIS CODE IS GIVEN AS-IS AND ONLY FOR PROOF OF CONCEPT PURPOSES. USE AT YOUR OWN RISK

This Node.js application has the following prerequisites:

1. You have an IBM Bluemix account (using Cloud Foundry)
2. You have a Sparkpost.com account
3. You have configured a [verified Sending Domain in SparkPost.com](https://support.sparkpost.com/customer/portal/articles/1933318-creating-sending-domains)
4. You have a valid SparkPost API Key with READ/WRITE permissions for Transmissions
5. You have Node.js installed locally and NPM

## Clone the repository

## EDIT THESE FILES BEFORE TRYING TO DEPLOY TO CLOUD FOUNDRY

* manifest.yml
	- Replace the values in all caps as indicated
* app.js
	- Add your SparkPost API Key
	- Add your content.from.name as indicated
	- Add your content.from.email as indicated
	- Add your content.reply_to as indicate
* package.json
	- Change the name to be what you wantd

## Test locally
```node app```
Open in browser per URL in Node standard out

## DEPLOY APP TO IBM Bluemix using Cloud Foundry, follow directions for [IBM Bluemix](https://www.ng.bluemix.net/docs)

## Node.js Starter Application

Bluemix provides a Node.js starter application as a template so that you can
add your code and push the changes back to the Bluemix environment.

### Files

The Node.js starter application has files as below:

* app.js

	This file contains the server side JavaScript code for your application
	written using the express server package.

* public/

	This directory contains public resources of the application, that will be
	served up by this server

* package.json

	This file contains metadata about your application, that is used by both
	the `npm` program to install packages, but also Bluemix when it's
	staging your application.  For more information, see:
	<https://docs.npmjs.com/files/package.json>
