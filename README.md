# repo-event-notifier-lambda
An AWS lambda that monitors repos & talks to you in Slack

This project is written in TypeScript, and is expected to be deployed on an AWS Lambda.

## Setup
Run `npm install`.

* Setup necessary environment variables from `functions.env` directly in AWS Lambda
* Add AWS environment variables for deployment, see [node-lambda](https://www.npmjs.com/package/node-lambda) package for further configuration options:
  * `AWS_ACCESS_KEY_ID`
  * `AWS_SECRET_ACCESS_KEY`
  * `AWS_REGION` (e.g. `ap-southeast-2`)
  * `AWS_DEFAULT_REGION` (e.g. `ap-southeast-2`)
  * `AWS_FUNCTION_NAME` (use function name only, not the ARN)
  * `AWS_ROLE_ARN`
  * `AWS_RUNTIME` (most likely `nodejs10.x`)
  * `EXCLUDE_GLOBS` recommended value: `{.*,*,}.{env*,eslint*,json,ts,js.*,md,iml} .idea scripts coverage test`
  * `PACKAGE_DIRECTORY` recommended value: `build`

## Testing

This project uses `jest` to test itself, with specification files living in the `test` directory.
Tests are written in TypeScript, which is run using `ts-jest`.

Tests can be run using the `test` script:

```
npm test
```

## Compiling

Since this project is written in TypeScript, and `ts-node` can't be used on AWS Lambda,
you need to compile the project before deployment.
  
This can be done using the `compile` script:

```
npm run compile
```

This will call `ttsc` compile, using the `tsconfig.json` located in the `src` folder,
and result in every `.ts` file in the `src` folder being compiled into Javascript.

The `src/tsconfig.json` extends from the root `tsconfig.json`, as so not compile
the contents of the `test` folder, which are not needed for deployment.

Note that this project uses ts transformers, which are applied using `ttypescript`.
This means that you have to use `ttsc` instead of `tsc` when compiling the project.

## Deploying

**Note**: Before deployment, make sure you setup the `deploy.env` file, based off the `deploy.env.example` file provided.

Deployment is done using `node-lambda`. Since AWS Lambda doesn't support `ts-node`, this project must be compiled
before being deployed. Refer to the [Compiling](#compiling) section of this README for more info.

Deployment is composed of three steps: 
1. Compile the project (as detailed in the previous section),
2. Package the project into a .zip file,
3. Deploy the .zip file onto AWS Lambda.

Steps 2 & 3 are handled by `node-lambda`, and make use of your `.env` file.

A script exists for each of the above steps, along with another script that executes all three in series:

```
npm run compile
npm run package
npm run depoly

# all together now:
npm run the-works
```

## Architecture

This lambda is invoked by api-gateway, via webhooks, and uses an ordered series of request handlers to handle incoming requests.

When a request is made, the lambda passes said request to each request handler, until one of them returns a valid response.
