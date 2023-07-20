## Supaheroes

This is the repository for my project created for the Hackathon Number 2 organized by Refine in collaboration with the DEV Community. Here you will find all the code, resources, and information related to my project developed for this exciting event.

More info: https://dev.to/lvisb/supaheroes-ai-powered-heroes-3f3j

### Cover Image

![git-header](https://github.com/lvisb/versus-heroes/assets/324835/0b9f953a-c4e0-4122-b946-2e449882149b)

### Project Demo link

- [Admin](http://3.14.15.191:4173)
- [Hotsite](http://3.14.15.191:3000)

## About

Supaheroes, an AI-powered platform that generates biographies for character from games, comics, and movies. Just enter the character's name, and the AI will craft a detailed life story, complete with strengths, weaknesses, and attributes (such as intelligence and agility). Furthermore, the AI provides a prompt for another AI to create three images of the character. This powerful collaboration breathes life into our beloved characters!

### Description

My idea was much more complex than this, but as the deadline approached, desperation set in, so I made it much simpler. These last 3 days were crucial as I dedicated around 19 hours per day to finish on time. Below, I describe the technologies used.

#### Supabase

The name Supaheroes was not only inspired by Supabase but also utilized its database resources. The authentication module provided by the platform was incredibly helpful, as I didn't have to worry much about authentication, sessions, password recovery, and reset. Everything was implemented swiftly due to the platform's offered resources. I also used the storage feature for uploading character images, which was incredibly easy. It was my first time using Supabase, and it turned out to be quite straightforward; their documentation is excellent.

#### Refine

With Refine framework, I developed the frontend of the admin panel for character inclusion, editing, and deletion, along with authentication, password recovery, and reset. The process of generating the project bootstrap via the Refine website was excellent and saved me a lot of time. I customized the bootstrap with Vite, MUI, REST API, and custom authentication. At first, the amount of generated boilerplate is overwhelming, but with persistence, testing, and the help of the documentation, I gradually understood how the framework works. Overall, it's astonishing how quickly we can set up an admin panel. I believe I completed the admin panel in 2 days because I spent some time making it visually appealing in the content editions, as the automatically generated fields are useful but don't provide the best UX. It took me a while to grasp resources and data providers, but in the end, everything worked out. I integrated the login with Supabase authentication, including the "Forgot Password" and "Reset Password" features. The character CRUD communicates with an API developed in NestJS.

#### NestJS

The entire backend was developed in NestJS, so the admin and hotsite data are generated by this NestJS API. Even though I could have used Supabase's client on the frontend of the admin panel for authentication, I chose to do everything in NestJS for centralized control.

The most challenging part of the backend was generating and testing the prompts for character information. To generate character information, I used the OpenAI API in conjunction with the node package called chatgpt. ChatGpt was quite challenging to work with; many times, it couldn't find the character (actually, it still can't find some, to be honest), and sometimes it provided unnecessary descriptions instead of what I asked for. For generating images, I used the REST API of DreamStudio.ai, which was effortless to use.

#### Hotsite

The hotsite for displaying the characters was built using Remix and MUI, with data fed via the API created in NestJS.

#### MUI

What can I say about MUI? It's always a pleasure to use. The quality and variety of components are impressive. With very little effort, it's possible to create highly attractive interfaces. I used MUI for the admin panel with Refine and also for the Hotsite to display the characters. All components on the Hotsite interface are from MUI, including the image grid on the Hotsite's home page.

I used AWS, Docker, and Ansible for server deployment.

### Participants

[@asyncerror](https://twitter.com/asyncerror)

### Preview

#### Admin List

![admin-list](https://github.com/lvisb/versus-heroes/assets/324835/a55d3887-aff8-4c4f-89ae-c3587440ac1a)

#### Admin Character Creation

![admin-char-creation](https://github.com/lvisb/versus-heroes/assets/324835/22680d31-7501-4dcd-967c-73f91ac79c7b)

#### Admin Character editing

![admin-char-edit](https://github.com/lvisb/versus-heroes/assets/324835/877c0547-3dbe-4547-96fc-b728bfd7ed73)

#### Admin Character view

![admin-char-view](https://github.com/lvisb/versus-heroes/assets/324835/ef59a023-5593-45c5-b153-951635978a4d)

#### Hotsite char list

![hotsite-list](https://github.com/lvisb/versus-heroes/assets/324835/78267d4f-28a2-49f9-a54a-6a81f2ab2b2b)

#### Hotsite char details

![hotsite-details](https://github.com/lvisb/versus-heroes/assets/324835/60c0abc3-fbaf-4524-b51c-15ab7316f720)

### Set up Project

#### Setup env files for the backend:

backend/.env
```config
NODE_ENV=development

DATABASE_URL="postgresql://postgres:<password>@<supabase-db-url>:5432/postgres"

SUPABASE_URL="<supabase-api-url>"
SUPABASE_KEY="<supabase-secret-key>"
SUPABASE_JWT_SECRET="<supabase-jwt-secret>"

BACKEND_PORT=8001

OPENAI_API_KEY=<open-ai-api-key>

DREAMSTUDIO_API_KEY=<dreamstudio-api-key>

CORS_ORIGIN=http://localhost:5173

ADMIN_FRONTEND_URL=http://localhost:5173
```

#### Setup env files for the frontend admin

frontend-cms/.env
```config
VITE_API_BASE_URL=http://localhost:8001/api/v1
```

#### Setup env file for the frontend hotsite

frontend-website/.env
```config
API_BASE_URL=http://localhost:8001/api/v1
```

### Prerequisites

- Supabase Account
- OpenAI API key.
- DreamStudio API key. 

### Install Project

- Clone the repository:
```
git clone <your repo github link>
```

#### Backend

```sh
cd backend
npm install

# edit the file backend/src/db/db.config.ts
# and set syncronize to true (only use true while in development)

npm run start:dev

# should be running at: http://localhost:8001
```

#### Frontend CMS

```sh
cd frontend-cms

npm install
npm run dev

# should be running at: http://localhost:5173
```

#### Frontend Website

```sh
cd frontend-website

npm install
npm run dev

# should be running at: http://localhost:3000
```


