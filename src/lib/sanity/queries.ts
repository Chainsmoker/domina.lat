import { sanityFetch } from './client';
import { cachedFetch } from '../redis/client';

export interface Category {
  _id: string;
  title: string;
  slug: string;
  eyebrow?: string;
  cardTitle?: string;
  description?: string;
  image?: any;
  cardStyle?: string;
  color?: string;
  order?: number;
  featuredCourse?: Course;
}

// Aliases para compatibilidad retroactiva
export type GuideCategory = Category;
export type CourseCategory = Category;

export interface CourseModule {
  moduleTitle: string;
  moduleDesc?: string;
  lessons?: string[];
}

export interface StudentReview {
  author: string;
  role?: string;
  avatar?: any;
  rating: number;
  comment: string;
  dateText?: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  eyebrow?: string;
  resourceType?: string;
  dek?: string;
  category?: {
    _id: string;
    title: string;
    slug: string;
    eyebrow?: string;
  };
  price?: number | string;
  heroImage?: any;
  isFeatured?: boolean;
  isMenuRecommended?: boolean;
  affiliateUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  ratingScore?: number;
  ratingText?: string;
  facts?: string[];
  learnItems?: Array<{ title: string; desc?: string }>;
  forYouIf?: string[];
  notForYouIf?: string[];
  authorName?: string;
  authorRole?: string;
  authorBio?: string;
  authorAvatar?: any;
  authorBgColor?: string;
  authorTextColor?: string;
  modules?: CourseModule[];
  studentReviews?: StudentReview[];
  faqs?: Array<{ question: string; answer: string }>;
  editorialScore?: number;
  editorialTitle?: string;
  editorialPros?: string[];
  editorialCons?: string[];
  editorialReview?: any[];
  reviewSections?: any[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: any;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  eyebrow?: string;
  dek?: string;
  category?: {
    _id: string;
    title: string;
    slug: string;
  };
  readingTime?: string;
  publishedAt?: string;
  heroImage?: any;
  heroBadge?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: any;
  body?: any[];
  relatedCourse?: {
    title?: string;
    desc?: string;
    image?: any;
    link?: string;
  };
  toc?: Array<{ id: string; text: string }>;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: any;
}

/**
 * Obtiene todas las categorías unificadas desde Sanity
 */
export async function getCategories(): Promise<Category[]> {
  return cachedFetch('sanity:categories:unified:all', async () => {
    const categories = await sanityFetch<Category[]>({
      query: `*[_type == "category"] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        eyebrow,
        cardTitle,
        description,
        image,
        cardStyle,
        color,
        order,
        featuredCourse->{ title, "slug": slug.current, heroImage, ogImage, dek }
      }`
    });
    return categories || [];
  });
}

// Aliases para retrocompatibilidad
export const getGuideCategories = getCategories;
export const getCourseCategories = getCategories;

/**
 * Obtiene una categoría unificada por su slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return cachedFetch(`sanity:category:unified:${slug}`, async () => {
    const category = await sanityFetch<Category | null>({
      query: `*[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        eyebrow,
        cardTitle,
        description,
        image,
        cardStyle,
        color,
        order,
        featuredCourse->{ title, "slug": slug.current, heroImage, ogImage, dek }
      }`,
      params: { slug }
    });
    return category || null;
  });
}

export const getCourseCategoryBySlug = getCategoryBySlug;
export const getGuideCategoryBySlug = getCategoryBySlug;

/**
 * Obtiene todos los cursos desde Sanity
 */
export async function getCourses(): Promise<Course[]> {
  return cachedFetch('sanity:courses:all', async () => {
    const courses = await sanityFetch<Course[]>({
      query: `*[_type == "course"] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        eyebrow,
        resourceType,
        dek,
        category->{ _id, title, "slug": slug.current, eyebrow },
        price,
        heroImage,
        isFeatured,
        isMenuRecommended,
        affiliateUrl,
        secondaryCtaText,
        secondaryCtaUrl,
        ratingScore,
        ratingText,
        facts,
        learnItems,
        forYouIf,
        notForYouIf,
        authorName,
        authorRole,
        authorBio,
        authorAvatar,
        authorBgColor,
        authorTextColor,
        modules,
        studentReviews,
        faqs,
        editorialScore,
        editorialTitle,
        editorialPros,
        editorialCons,
        editorialReview,
        reviewSections,
        seoTitle,
        seoDescription,
        ogImage
      }`
    });
    return courses || [];
  });
}

/**
 * Obtiene los cursos pertenecientes a una categoría específica
 */
export async function getCoursesByCategory(categorySlug: string): Promise<Course[]> {
  return cachedFetch(`sanity:courses:category:${categorySlug}`, async () => {
    const courses = await sanityFetch<Course[]>({
      query: `*[_type == "course" && category->slug.current == $categorySlug] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        eyebrow,
        resourceType,
        dek,
        category->{ _id, title, "slug": slug.current, eyebrow },
        price,
        heroImage,
        isFeatured,
        affiliateUrl,
        secondaryCtaText,
        secondaryCtaUrl,
        ratingScore,
        ratingText,
        facts,
        learnItems,
        forYouIf,
        notForYouIf,
        authorName,
        authorRole,
        authorBio,
        authorAvatar,
        authorBgColor,
        authorTextColor,
        modules,
        studentReviews,
        faqs,
        editorialScore,
        editorialTitle,
        editorialPros,
        editorialCons,
        editorialReview,
        reviewSections,
        seoTitle,
        seoDescription,
        ogImage
      }`,
      params: { categorySlug }
    });
    return courses || [];
  });
}

/**
 * Obtiene un curso específico por su slug
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return cachedFetch(`sanity:course:${slug}`, async () => {
    const course = await sanityFetch<Course | null>({
      query: `*[_type == "course" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        eyebrow,
        resourceType,
        dek,
        category->{ _id, title, "slug": slug.current, eyebrow },
        price,
        heroImage,
        isFeatured,
        affiliateUrl,
        secondaryCtaText,
        secondaryCtaUrl,
        ratingScore,
        ratingText,
        facts,
        learnItems,
        forYouIf,
        notForYouIf,
        authorName,
        authorRole,
        authorBio,
        authorAvatar,
        authorBgColor,
        authorTextColor,
        modules,
        studentReviews,
        faqs,
        editorialScore,
        editorialTitle,
        editorialPros,
        editorialCons,
        editorialReview,
        reviewSections,
        seoTitle,
        seoDescription,
        ogImage
      }`,
      params: { slug }
    });
    return course || null;
  });
}

/**
 * Obtiene todos los posts desde Sanity con resolución de categoría
 */
export async function getPosts(): Promise<Post[]> {
  return cachedFetch('sanity:posts:all', async () => {
    const posts = await sanityFetch<Post[]>({
      query: `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        eyebrow,
        dek,
        category->{ _id, title, "slug": slug.current },
        readingTime,
        publishedAt,
        heroImage,
        heroBadge,
        authorName,
        authorRole,
        authorAvatar,
        relatedCourse,
        toc,
        seoTitle,
        seoDescription,
        ogImage
      }`
    });
    return posts || [];
  });
}

/**
 * Obtiene un post por su slug con su contenido completo (body)
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return cachedFetch(`sanity:post:${slug}`, async () => {
    const post = await sanityFetch<Post | null>({
      query: `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        eyebrow,
        dek,
        category->{ _id, title, "slug": slug.current },
        readingTime,
        publishedAt,
        heroImage,
        heroBadge,
        authorName,
        authorRole,
        authorAvatar,
        body,
        relatedCourse,
        toc,
        seoTitle,
        seoDescription,
        ogImage
      }`,
      params: { slug }
    });
    return post || null;
  });
}
