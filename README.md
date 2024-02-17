# AUI-Project-24

Repo for the Project of the course "Advanced User Interfaces" @ PoliMi

Grade: 30L

https://github.com/AlessandroSironi/AUI-Project-24/assets/100214750/37274377-ed4b-4759-b882-74b382cba09d


## Project overview and goals

The project’s goal was to develop a user-friendly, efficient, and innovative solution for automating routine tasks in smart homes emphasizing green energy utilization. The methodology involved a user-centric approach in designing the interface and seamless integration with HomeAssistant for robust performance and the usage of GPT 3.5 as a powerful generative AI.

## Team members

-   [**Alessandro Sironi**](https://github.com/AlessandroSironi)
-   [**Samuele Scherini**](https://github.com/ScheriniSamuele)
-   [**Ismaele Villa**](https://github.com/ismaelevilla15)
-   [**Adam Martin Andersen**](https://github.com/adaan1)

## Installation guide

**Pre-requisites:**

1. Have Node.js runtime installed on the machine, to install Node.js: [node.js](https://nodejs.org/).
2. Have npm (node package manager) installed on the machine, it is installed automatically along with Node.js.
3. Have access to a terminal on the machine and preferably a text editor with an integrated terminal (e.g., Visual Studio Code).
4. Have Git installed on the machine: [git](https://git-scm.com/).
5. Have an Azure account enabled for the use of GPT-3.5.
6. Have an account on Supabase.

Below are all the necessary steps to install and test this application on a local machine:

1. Open the terminal in a suitable folder where you want to install the application.
2. Clone the project, copy and execute the following command in the terminal: `git clone https://github.com/AlessandroSironi/AUI-Project-24.git`
3. Enter the express-backend folder and install the necessary dependencies by copying and executing the following command:
   `npm i`.
4. Enter the necessary information in the `.env` file located inside express-backend.

```
PORT = <server_port>
OPENAI_KEY = <the_azure_openAI_key>
SUPABASE_KEY=<the_supabase_key>
SUPABASE_PROJECT=<the_supabase_url>
```

5. Start the server in the following way:
   `npm install -g nodemon` to install nodemon service,
   `npm run dev` to start the backend.
6. Enter the nuxt-app folder and install the necessary dependencies by copying and executing the following command: `npm i`.
7. Start the client in the following way:`npm run dev`.
8. Enter the necessary information in the `.env` file located inside nuxt-app.

```
BASE_URL=<the_api_url>
SUPABASE_URL=<the_supabase_url>
SUPABASE_KEY=<the_supabase_key>
```

At this point, the application should be active. The users, after creating an account, are invited to enter their settings on the settings page, and for any doubts, they can consult the "Update and FAQs" page within the application itself.
