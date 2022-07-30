import Card from './Card'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

function Projects() {
  const cards = [
    {
      title: 'Amazon Like Ecommerce app',
      technologies: 'NextJs | Next Auth | Redux | Tailwind | Firebase | Stripe',
      icons: [
        'teenyicons:nextjs-outline',
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
      title: 'Netflix Clone',
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
      title: 'Weather App',
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
    ,
    {
      title: 'Medium like Application',
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
      title: 'Dog meetup app',
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
      title: 'Face recognition app',
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
      title: 'LinkedIn clone',
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
      title: 'React todos app',
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
      title: 'React todos app',
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
      title: 'Chatroom',
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
