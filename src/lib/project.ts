export const project = {
  name: 'SOVRAN',
  repository: 'https://github.com/Minells/sovran',
  websiteRepository: 'https://github.com/Minells/Sovran-Website',
  marketplace: 'https://marketplace.visualstudio.com/items?itemName=minells.sovran',
  description: 'An open-source AI coding agent for VS Code. Connect your local models, self-hosted inference, or company gateway. Read, plan, and build with control over every change.',
};

export const withBase = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const source = (path: string) => `${project.repository}/blob/main/${path}`;
