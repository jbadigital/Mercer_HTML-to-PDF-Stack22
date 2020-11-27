# Mercer-HTML2PDF

> used to process HTML to PDF requests

## Installing

Using npm:

```
$ npm install
```

## Config

Requires these process environment variables to be set

* `EMAIL` - this is the email that can be used to access the public REST API
* `PASSWORD` - this is the password that can be used to access the public REST API
* `SLOWDOWN` - this is set the delay in milliseconds that the app applies between requests

The following environment variables are placeholders required when job: html-to-df is configured with the connection to docrapter and ftp. Note that FTP details will need be passed as JSON (not shown here) to allow for routing brand to appropriate location.

* `FTP_HOST` - this is SFTP host, without the `SFTP://` prefix
* `FTP_USERNAME` - this is SFTP username
* `FTP_PASSWORD` - this is SFTP password
* `FTP_PROTOCOL` - this is SFTP protocol most likely this will have value `sftp`
* `FTP_PORT` - this is SFTP port, most likely will have value `22`
* `DOCRAPTER_KEY` - this is the key for using docrapter, for testing use `YOUR_API_KEY_HERE`
* `DOCRAPTER_TEST` - this is set to `true` when testing to keep usage of billed service to a minimum

## Server

Refer to Procfile

## Usage

Notes:

* `[endpoint]` - refer to Heroku app for end endpoint
* `[request-email]` - application user email
* `[request-password]` - application user password

The following environment variables are placeholders required when job: html-to-df is configured with the connection to docrapter and ftp.

* `[doc-brand]` - used to route PDF to FTP location
* `[doc-html-url]` - URL of source HTML


### User management

To change credentials for user, refer to following code that references process environment variables in the `src/app.js`.

```
app.service('users').create({
  email: process.env.USERNAME,
  password: process.env.PASSWORD
});
```

### Authenticate user

Used to authenticate a user and get an accessToken.

accessToken is used to authenticate requests.

```
POST [endpoint]/authenticate

{
	"strategy": "local",
	"email":"[request-email]",
	"password":"[request-password]"

}

```

On success body of request returns `accessToken`.

Note that

* `[request-email]` contains the contents of `process.env.USERNAME`
* `[request-password]` contains the contents of `process.env.PASSWORD`

### Add PDF document for processing

Used to add a HTML document to be converted to PDF and stored to FTP.

accessToken is used to authenticate requests.

```
POST [endpoint]/pdf

In Auth for Bearer Token use accessToken.

{
	"brand": "[doc-brand]",
	"html":"[doc-html-url]"

}

```
