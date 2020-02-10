export class Book {
  public id?: string;
  public volumeInfo: {
    authors: [string];
    averageRating: any;
    categories: [string];
    description: string;
    imageLinks: {
      smallThumbnail: string;
    };
    publishedDate: any;
    publisher: string;
    title: string;
  };

  constructor(
    id: string,
    volumeInfo: {
      authors: [string];
      averageRating: any;
      categories: [string];
      description: string;
      imageLinks: {
        smallThumbnail: string;
      };
      publishedDate: any;
      publisher: string;
      title: string;
    }
  ) {
    this.id = id;
    this.volumeInfo.imageLinks.smallThumbnail =
      volumeInfo.imageLinks.smallThumbnail;
    this.volumeInfo.title = volumeInfo.title;
    this.volumeInfo.authors = volumeInfo.authors;
    this.volumeInfo.description = volumeInfo.description;
    this.volumeInfo.categories = volumeInfo.categories;
    this.volumeInfo.publisher = volumeInfo.publisher;
    this.volumeInfo.averageRating = volumeInfo.averageRating;
  }
}
