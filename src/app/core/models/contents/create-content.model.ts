export class CreateContent {
  tag: string;
  logo: File;
  styles: any;
  carousel: File[];
  languages: string[];
  contents: Contents[];

  constructor(
    tag: string,
    languages: string[],
    styles: any,
    logo: File,
    carousel: File[],
    contents: Contents[]
  ) {
    this.tag = tag;
    this.languages = languages;
    this.styles = styles;
    this.logo = logo;
    this.carousel = carousel;
    this.contents = contents;
  }
}

export class Style {
  code: string;
  content: string;

  constructor(code: string, content: string) {
    this.code = code;
    this.content = content;
  }
}

export class Details {
  index: number;
  behavior: string;
  label:string;
  data:string;
 
  constructor(index: number, behavior: string, label: string, data:string) {
    this.index = index;
    this.behavior = behavior;
    this.label = label;
    this.data = data;
  }
}

export class Contents1 {
  code: string;
  label: string;
  content: string;

  constructor(code: string, label: string, content: string) {
    this.code = code;
    this.label = label;
    this.content = content;
  }
}

export class Contents {
  languageIndex: number;
  title: string;
  details: Details[];

  constructor(languageIndex: number, title: string, details: Details[]) {
    this.languageIndex = languageIndex;
    this.title = title;
    this.details = details;
  }

}
