# wsp-ive-html2pdf

> used to test request and process

## Installing

Using npm:

```
$ npm install
```

## Config

Requires these process environment variables to be set

* `DATABASE` - this is the connection string for MariaDB database used for users and doc tables.
* `TEST_EMAIL` - this is the email that can be used to access the public REST API
* `TEST_PASSWORD` - this is the password that can be used to access the public REST API
* `TEST_FILE` - this is a public URL that can be used for testing

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


### Add user

Used to create a user.

Disabled by default. To add user remove `authenticate('jwt')` requirement on `src/services/users/users.hooks.js`.

```
POST [endpoint]/users

{
	"email":"[request-email]",
	"password":"[request-password]"

}

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

### Add HTML document for processing

Used to add a HTML document to be converted to PDF and stored to FTP.

accessToken is used to authenticate requests.

```
POST [endpoint]/docs

In Auth for Bearer Token use accessToken.

{
  "brand": "[doc-brand]",
	"html":"[doc-html-url]"

}

```

## Documentation

Following is a diagram with notes following.

![](https://github.com/websiteplus/wsp-ive-html2pdf/blob/master/process-flow.png)




In this sequence diagram there are two main processes that are run independently of each other.

(A.1) is used to represent putting data on processing queue.

SFMC uses REST API `/docs` exposed on [APP](https://github.com/websiteplus/wsp-ive-html2pdf/blob/master/src/app.js) to [add a HTML document for processing](https://github.com/websiteplus/wsp-ive-html2pdf/blob/master/README.md#add-html-document-for-processing) to the queue.

(B.1) is used to represent processing.

[WORKER](https://github.com/websiteplus/wsp-ive-html2pdf/blob/master/src/worker.js) schedules a [HTML to PDF](https://github.com/websiteplus/wsp-ive-html2pdf/blob/master/jobs/html-to-pdf.js) job to process docs on queue.

Processing can be scaled using

1. [WORKER](https://github.com/websiteplus/wsp-ive-html2pdf/blob/master/src/worker.js) interval which is currently set to running [HTML to PDF](https://github.com/websiteplus/wsp-ive-html2pdf/blob/master/jobs/html-to-pdf.js) job  `every 60 seconds`
2. [HTML to PDF](https://github.com/websiteplus/wsp-ive-html2pdf/blob/master/jobs/html-to-pdf.js) job concurrency which is currently set to 64.

With these setting application could potentially convert 3,840 docs per hour.

This is a placeholder whilst in development for getting the work done.

Currently the [HTML to PDF](https://github.com/websiteplus/wsp-ive-html2pdf/blob/master/jobs/html-to-pdf.js) job waits 40 seconds whilst doing nothing.


Code used for sequence diagram.

```
title SFMC HTML to PDF on FTP requirement
  seq
    SFMC -> APP: (A.1) puts doc on processing queue
  end
  seq
    APP -> SFTP: (B.1) process HTML to PDF and put on SFTP
  end

```
