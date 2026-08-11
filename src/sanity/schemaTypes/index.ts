import { categoryType } from './category';
import { courseType } from './course';
import { postType } from './post';
import { reviewSectionTypes } from './reviewSection';

export const schemaTypes = [categoryType, courseType, postType, ...reviewSectionTypes];
