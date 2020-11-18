# ![](https://raw.githubusercontent.com/baxuu/invoice-app/master/client/src/assets/logo.png)



InvoiceApp is a full stack RWD application for creating and managing invoices. Besides creating, you can also edit invoices, delete, filter, generate pdf files or print them directly. All this on your own profile, so no one else will have access to your data or saved invoices. You can edit your personal details such as username, email or password, but also define your company details to generate invoices faster.


## Deployment

App is deployed using Heroku for backend and Netflify for frontend. [Link](https://invoiceapplication.netlify.app/)



### Built with
- `Node.js (ECMAScript modules),`
- `Express,`
- `MongoDB,`
- `Mongoose,`
- `jsonwebtoken,`
- `bcrypt,`
- `React.js (react hooks, react router),`
- `React Bootstrap,`
- `Redux (redux-thunk),`
- `React Hook Form,`
- `html2canvas,`
- `jsPDF,`



![](https://raw.githubusercontent.com/baxuu/invoice-app/master/client/src/assets/example1.jpg)
![](https://raw.githubusercontent.com/baxuu/invoice-app/master/client/src/assets/invoiceappp.gif)

## Requirements

You need at the latest Node -v 13.2.0 to support ECMAScript modules used on backend (import and export statements). 


## Installation

Clone or download repository 

```
git clone https://github.com/baxuu/invoice-app.git
```

than

```
cd invoice-app
```

Install backend packages

```
npm install
```

and also frontend packages

```
cd client 
npm install
```

## Configuration

In invoice-app folder create config/default.json and define your jwt and monodb credentials:
```python
{
    "mongo":"mongodb+srv://<yourname>:<password>@cluster0.4xlun.mongodb.net/<dbname>?retryWrites=true&w=majority",
    "jwt": "<any>"
}
```

## Running

Server will start on port ***8080***. Client on ***3000***. On both run command:

```
npm start
```

## Author

 Artur Królczyk *baxuu*