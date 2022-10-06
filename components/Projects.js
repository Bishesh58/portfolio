import Card from './Card'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

function Projects() {
  const cards = [
    {
      title: 'Amazon Like Ecommerce app',
      technologies: 'NextJs | Redux | Tailwind | Firebase | Stripe | Vercel',
      icons: [
        'teenyicons:nextjs-outline',
        'logos:redux',
        'logos:tailwindcss-icon',
        'logos:firebase',
        'logos:stripe',
        'logos:vercel',
      ],
      description: `This is a fully fleged responsive ecommerce web app. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        'amazon/a1.png',
        'amazon/a2.png',
        'amazon/a3.png',
        'amazon/a4.png',
      ],
      code: 'https://github.com/Bishesh58/amazon-clone-next',
      demo: 'https://amazon-clone-next-592oz2y8g-bishesh58.vercel.app/',
    },

    {
      title: 'LinkedIn clone',
      technologies: 'React | Redux | Material UI | Firebase ',
      icons: [
        'logos:create-react-app',
        'logos:redux',
        'logos:material-ui',
        'logos:firebase',
      ],
      description: `It is a react application with CRUD functionality that uses react for frontend and firebase for the backend. User can login with google authentication and post their story with others.
      `,
      imgs: ['linkedIn/linkedIn1.png', 'linkedIn/linkedIn2.png'],
      code: 'https://github.com/Bishesh58/linkedIn-clone-react',
      demo: 'https://linkedin-clone-47598.firebaseapp.com/',
    },
    {
      title: 'News Archive',
      technologies: 'React | Redux | Tailwind | Material UI | Framer',
      icons: [
        'logos:react',
        'logos:redux',
        'logos:tailwindcss-icon',
        'logos:material-ui',
        'logos:framer',
      ],
      description: `News archieve is an online news search application. You can read and search news based on different category such as Technology, Business, Health, Science and son on. You also have ability to search any topic you would like to search. This application is build with react & typescript as a part of assignment for microsoft student accelerator for phase 2. This application uses two news api: Free News api & theNewsAPI for fetching latest news.   
      `,
      imgs: ['/news.png'],
      code: 'https://github.com/Bishesh58/msa22-frontend-NewsArchive',
      demo: 'https://news-archive-pi.vercel.app/',
    },
    {
      title: 'Gmail clone',
      technologies: 'NextJs | Next Auth | Redux | Tailwind | Firebase | Stripe',
      icons: [
        'logos:react',
        'logos:redux',
        'logos:material-ui',
        'logos:firebase',
      ],
      description: `This is a react application that looks like gmail. I build this application for learning purpose. It uses react for frontend and firebase for the backend & database.
      `,
      imgs: ['/gmail.png'],
      code: 'https://github.com/Bishesh58/Gmail-Clone-React',
      demo: 'https://clone-9a3c7.firebaseapp.com/',
    },
    {
      title: 'Hulu like movie app',
      technologies: 'NextJs | Next Auth | Redux | Tailwind | Firebase | Stripe',
      icons: [
        'vscode-icons:file-type-next',
        'logos:redux',
        'logos:tailwindcss-icon',
        'logos:firebase',
        'logos:stripe',
      ],
      description: `This is a nextjs react application which uses tmdb api to fetch movies information and shows movies poster on different genres. This is app is fully responsive.
      `,
      imgs: ['/hulu.png'],
      code: 'https://github.com/Bishesh58/movie-app',
      demo: 'https://movie-9mar7drac-bishesh58.vercel.app/',
    },
    {
      title: 'Medium blog Application',
      technologies: 'NextJs | React | Typescript | Tailwind | Sanity CMS ',
      icons: [
        'logos:nextjs',
        'logos:react',
        'logos:tailwindcss-icon',
        'logos:typescript-icon-round',
        'logos:sanity',
      ],
      description: `Medium blog application is clone of medium application which is build using Nextjs, React & typescript with Sanity CMS. It is fully responsive, server side rendering. Visitors can read specific blogs, leave comments and like the post.
      `,
      imgs: ['/medium.png'],
      code: 'https://github.com/Bishesh58/medium-next',
      demo: 'https://medium-next-olive.vercel.app/',
    },

    {
      title: 'Dog meetup app',
      technologies: 'MongoDB | Express | React | Node | - MERN',
      icons: [
        'logos:mongodb-icon',
        'vscode-icons:file-type-reactjs',
        'logos:express',
        'logos:nodejs',
        'logos:heroku-icon',
      ],
      description: `Dog meetup is an event booking app for dog owner to meet & have fun with another dog owner. The event can be booked to closest city of their location. Once event is booked, it will show details inside the map, including how many people are going to the event. The main features include
      login & registration, mainatain user details, dogs details, event details & history. Search events based on different filter options such as city, dog breed, dog weight or keywords. Contact admin for any queries & registered user can write review about the events. 
      Mapbox api is used for the map & Mongodb database to store the data. This app is hosted on Heroku server.
      `,
      imgs: ['/dogmeetup/dogmeetup1.png', '/dogmeetup/dogmeetup2.png'],
      code: 'https://github.com/Bishesh58/Dog-meetup',
      demo: 'https://dogmeetup-app.herokuapp.com/',
    },
    {
      title: 'React todolist application',
      technologies: 'React | NodeJs | Express | Material UI |',
      icons: [
        'logos:react',
        'logos:nodejs-icon',
        'logos:express',
        'logos:material-ui',
      ],
      description: `This is a simple todo application using react and atoms. Simple CRUD application with filtering functionality. It also show the percentage of the task completed. An open quote api is used to generate automated quotes, user also has ability to change as quotes which button click.
      `,
      imgs: ['/todos.png'],
      code: 'https://github.com/Bishesh58/react-todos',
      demo: 'https://happy-murdock-374a4e.netlify.app/',
    },
    {
      title: 'SnapChat like app',
      technologies: 'NextJs | Next Auth | Redux | Tailwind | Firebase | Stripe',
      icons: [
        'logos:create-react-app',
        'logos:redux',
        'logos:material-ui',
        'logos:firebase',
      ],
      description: `This is a photo snapshot react application where user can snapshot photo and share with others. This application uses react-webcam to take photo & firebase for the backend to store images. The feature include google authentication for sign in, shows new story when someone uploads snapshot, able to view for 10 sec before it disappers. You have ablility to take multiple shapshot.
      `,
      imgs: ['/snapshot.png'],
      code: 'https://github.com/Bishesh58/snapchat-clone-react',
      demo: 'https://snapchat-clone-57d26.firebaseapp.com/',
    },
    {
      title: 'Chat application',
      technologies: 'NextJs | Next Auth | Redux | Tailwind | Firebase | Stripe',
      icons: [
        'logos:create-react-app',
        'logos:redux',
        'logos:material-ui',
        'logos:firebase',
      ],
      description: `This is a what's app like chat application. It uses firebase for the backend and google authentication for sign in. User can create room and chat with others. It uses emoji api for sending emojis. 
      `,
      imgs: ['/chat.png', '/chat1.png'],
      code: 'https://github.com/Bishesh58/whatsApp-clone',
      demo: 'https://whatsapp-clone-ef2ab.firebaseapp.com/',
    },
  ]

  return (
    <section className="mx-auto max-w-7xl p-5 text-black" id="projects">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        className="pb-20 pt-10 text-center text-5xl font-bold text-black"
      >
        Projects
      </motion.h1>
      <div
        id="projects"
        className="flex min-h-screen items-center justify-center rounded-2xl border-gray-900"
      >
        <div className="">
          {cards.map((item, i) => (
            <Card
              title={item.title}
              icons={item.icons}
              technologies={item.technologies}
              imgs={item.imgs}
              code={item.code}
              demo={item.demo}
              description={item.description}
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
