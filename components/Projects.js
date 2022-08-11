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
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon1.png',
        '/a1.png',
        '/amazon2.png',
        '/amazon3.png',
        '/amazon4.png',
        '/amazon5.png',
      ],
      code: 'https://github.com/Bishesh58/amazon-clone-next',
      demo: 'https://amazon-clone-next-omega.vercel.app/',
    },
    {
      title: 'Dog meetup app',
      technologies: 'MongoDB | Express | React | Node | - MERN',
      icons: [
        'logos:mongodb-icon',
        'vscode-icons:file-type-reactjs',
        'logos:express',
        'logos:nodejs',
      ],
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'Face recognition app',
      technologies: 'React | Node | Express | PostgreSQL | Heroku ',
      icons: [
        'vscode-icons:file-type-reactjs',
        'logos:nodejs',
        'logos:express',
        'logos:postgresql',
        'logos:heroku-icon',
      ],
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://facedetect-reactapp.herokuapp.com/',
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
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'Netflix Clone',
      technologies: 'JavaScript | NodeJs | Express | MongoDB',
      icons: [
        'logos:javascript',
        'logos:nodejs-icon',
        'logos:express',
        'logos:mongodb-icon',
      ],
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
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
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'React todos app',
      technologies: 'React | Recoil | Material UI ',
      icons: ['logos:react', 'fontisto:atom', 'logos:material-ui'],
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'Air bnb clone',
      technologies: 'NextJs | Next Auth | Redux | Tailwind | Firebase | Stripe',
      icons: [
        'vscode-icons:file-type-next',
        'logos:redux',
        'logos:tailwindcss-icon',
        'logos:firebase',
        'logos:stripe',
      ],
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'Gmail clone',
      technologies: 'NextJs | Next Auth | Redux | Tailwind | Firebase | Stripe',
      icons: [
        'vscode-icons:file-type-next',
        'logos:redux',
        'logos:tailwindcss-icon',
        'logos:firebase',
        'logos:stripe',
      ],
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
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
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'SnapChat like app',
      technologies: 'NextJs | Next Auth | Redux | Tailwind | Firebase | Stripe',
      icons: [
        'vscode-icons:file-type-next',
        'logos:redux',
        'logos:tailwindcss-icon',
        'logos:firebase',
        'logos:stripe',
      ],
      description: `This is a fully fleged responsive ecommerce web app. A glimpse of amazon website. It consists of
      google login & logout feature, view and shop product, add product to cart, checkout product through stripe payment gateway & view your order. This app is build with react & tailwind for frontend & firebase as backend. I build this application as a part of 5 day react challenge.
      `,
      imgs: [
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
        '/amazon.png',
      ],
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
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
