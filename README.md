collective-instant
----

_Instantly_ search [Widen Media Collective]() for assets.

# No, Really. What is this?

Two things:

1) A node static file and OAuth 2.0 server.

This is what communicates with Collective to give each separate user their
own credentials so they can only see and do what they are allowed to.

2) A javascript instant search

Just type in a query and this will search for asset previews based on your
query! The REST API communication is powered by [node-collective](npmjs.com/)

# Getting Started

- First, ensure you have set up proper OAuth credentials with Collective.


- Second, set the proper environment variables based on the credentials you got from the previous step:

```
export COLLECTIVE_CLIENT_ID=foo
export COLLECTIVE_CLIENT_SECRET=bar
```

- Third, you may want to edit the default `node-collective` options in the sources (e.g., *protocol*, *port*, and *host* -- *auth* is probably ok).

```
var collective_options = {
    protocol: 'http',
    port: 8080,
    host: 'localhost',
    # I have a simple service to get
    # auth token from a cookie in
    # the code already, so don't
    # change that.

};
```


- Fourth, run the server:

```
npm run dev
```

OR

```
npm run start -- <OPTIONS>
```

Where `<OPTIONS>` is the options needed to connect to your Collective instance. (optional -- defaults to local development url)

- Fifth, open your browser:

```
http://localhost:1337
```
