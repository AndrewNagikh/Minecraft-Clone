import { NearestFilter, TextureLoader, RepeatWrapping } from 'three';
import {
  dirtImg,
  glassImg,
  grassImg,
  logImg,
  woodImg,
} from './images';

const dirtTexture = new TextureLoader().load(dirtImg);
const galssTexture = new TextureLoader().load(glassImg);
const grassTexture = new TextureLoader().load(grassImg);
const logTexture = new TextureLoader().load(logImg);
const woodTexture = new TextureLoader().load(woodImg);
const groundTexture = new TextureLoader().load(grassImg);

dirtTexture.magFilter = NearestFilter;
galssTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;
groundTexture.magFilter = NearestFilter;
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;

export {
  dirtTexture,
  galssTexture,
  grassTexture,
  logTexture,
  woodTexture,
  groundTexture,
};
