export default function slugify(value) {
  let slug = value.toLowerCase();
  slug = slug.replace(/[^\w\s-]/g, "");
  slug = slug.replace(/\s+/g, "-");

  return slug;
}
