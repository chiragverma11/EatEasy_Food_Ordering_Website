# EatEasy

EatEasy is your go-to platform for ordering food online from your favorite restaurants, hassle-free.

## Getting Started

These are the instructions to clone and run this project in your local machine for developement and testing purpose

### Prerequisites

- Node
- Git
- MongoDB

### Installation

1. First of all, Clone this repository & navigate to the directory

```
git clone https://github.com/chiragverma11/EatEasy_Food_Ordering_Website.git
cd EatEasy_Food_Ordering_Website
```

2. Install the Dependencies

```
npm install
```

### Running Locally

- First Create `.env` file in root directory using the following content and make changes if required.

```
PORT=8080
MONGO_URI="YourMongoDBuri"
TOKEN_SECRET="JwtSecret"
```

- Starting the Server

```
npm start
```

or

```
npm run dev
```

### Adding Food Items to Database Collection (Menu)

To add food items to database run

```
npm run menu
```

Edit `items.csv` file under `assets/csv` to change food items.

## Author

[@chiragverma11](https://github.com/chiragverma11) - Designing & Developement

## Built Using

- [NodeJS](https://nodejs.org/en) - Server
- [Express](https://expressjs.com/) - Server Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - Object Modeling & Schema
- [EJS](https://ejs.co/) - Template Engine
