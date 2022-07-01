# Block News Media

How is this project structured?

There are two code bases in this project;

-   Cloud Code services that are deployed to the Moralis Platform (this is removed from the V2 but left in codebase incase want to revert back to built-in marketplace)
-   Next.js Codebase that is deployed to Vercel
-   Solidity Smart Contracts

### Cloud Code

To code and deploy the Cloud Code functions execute this command from the project root. (Note: `moralis-admin-cli` is required)

```bash
moralis-admin-cli watch-cloud-folder --moralisApiKey <api-key> --moralisApiSecret <secret> --moralisSubdomain <subdomain>.usemoralis.com --autoSave 1 --moralisCloudfolder ./cloudCode
```

As long as this command is running, every save will automatically update the code that is deployed to the Cloud.

In order to see Logs (which is helpful in local development), run this command:

```bash
moralis-admin-cli get-logs --moralisApiKey <api-key> --moralisApiSecret <secret>
```

### Next.js

This is a default Next.js Codebase, nothing special here, to run the dev server, execute the following command:

```bash
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

To deploy this project, just run

```bash
vercel
```
