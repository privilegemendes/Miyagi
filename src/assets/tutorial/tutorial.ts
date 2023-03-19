import fs from 'fs/promises';
import {marked} from 'marked';
import path from 'path';


type CMS = 'markdown';

export interface CMSData {
  tutorial: CMSTutorial;
}

export const getCMSIntegration = async (cms: CMS): Promise<CMSData> => {

  return {
    tutorial: await getTutorial(),
  };
};

export interface CMSTutorial {
  html: string;
}

const basePath = process.cwd();
const tutorialPath = path.join(basePath, 'tutorial.md');

const getTutorial = async (): Promise<CMSTutorial> => {
  const file = await fs.readFile(tutorialPath);

  const html = marked(file.toString());

  return {
    html,
  };
};
