import { defineConfig } from 'astro/config';

export default defineConfig(({ command }) => {
  console.log('ASTRO CONFIG COMMAND=', command);
  const isBuild = command === 'build';

  return {
    site: isBuild ? 'https://valdezizzy.github.io/ValdezIzzy.github.io.v1/' : undefined,
    base: isBuild ? '/ValdezIzzy.github.io.v1/' : '/',
    build: {
      outDir: 'docs',
    },
  };
});
