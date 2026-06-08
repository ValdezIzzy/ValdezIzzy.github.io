export const projects = [
  {
    slug: 'portfolio-starter',
    title: 'Portfolio Starter',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=60&auto=format&fit=crop',
    short: 'A minimal, reusable project template built with Astro.',
    category: 'Web App',
    role: 'Design & Development',
    tools: ['Astro', 'HTML', 'CSS', 'JavaScript'],
    problem: 'Organize multiple projects with a consistent case-study layout.',
    process: 'Create reusable components and a single data source for projects.',
    solution: 'Components `ProjectCard` and `ProjectPage` read from a shared data file.',
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=60&auto=format&fit=crop'
    ],
    reflection: 'This pattern makes adding new projects quick and consistent.'
  }
];

export default projects;
