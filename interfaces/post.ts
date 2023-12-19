// Enums
enum AdminRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

enum Continent {
  ASIA = "ASIA",
  AFRICA = "AFRICA",
  NORTH_AMERICA = "NORTH_AMERICA",
  SOUTH_AMERICA = "SOUTH_AMERICA",
  ANTARCTICA = "ANTARCTICA",
  EUROPE = "EUROPE",
  AUSTRALIA = "AUSTRALIA",
}

enum COMMENT_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

enum POST_STATUS {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  PUBLISHED = "PUBLISHED",
  REJECTED = "REJECTED",
  ARCHIVED = "ARCHIVED",
}

enum MEDIA_TYPE {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
}

// Interfaces
interface Admin {
  id: string;
  email: string;
  lastname: string;
  firstname?: string | null;
  role: AdminRole;
  createdAt: string;
  updatedAt?: string | null;
}

interface User {
  id: string;
  email: string;
  about?: string | null;
  profilePicture?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  isEditor: boolean;
  isActive: boolean;
  lastname: string;
  firstname?: string | null;
  posts: Post[];
  comments: Comment[];
}

interface PostCategory {
  id: string;
  name: string;
  description?: string | null;
  slug: string;
  posts: Post[];
}

interface Comment {
  id: string;
  content: string;
  post: Post;
  postId: string;
  createdAt: string;
  updatedAt?: string | null;
  user: User;
  userId: string;
  status: COMMENT_STATUS;
}

interface Post {
  id: string;
  title: string;
  content?: string | null;
  podcastUrl?: string | null;
  tags?: string | null;
  slug: string;
  comments: Comment[];
  createdAt: string;
  updatedAt?: string | null;
  author?: User | null;
  authorId?: string | null;
  status: POST_STATUS;
  continents: Continent[];
  media: Media[];
  categories: PostCategory[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
}

interface Media {
  id: string;
  name: string;
  url: string;
  isCover: boolean;
  type: MEDIA_TYPE;
  post: Post;
  postId: string;
  createdAt: string;
  updatedAt?: string | null;
}
