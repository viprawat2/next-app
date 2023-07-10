import { DrupalClient } from "next-drupal";

const drupal = new DrupalClient("http://localhost:8000");

export default drupal;