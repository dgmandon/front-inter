import { Content } from "src/app/ui/contents/components/content";

export class Link {
  id: string;
  content: Content;
  constructor(id: string, content: Content) {
    this.id = id;
    this.content = content;
  }
}
