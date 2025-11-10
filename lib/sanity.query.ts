import { client } from "../sanity/lib/client";

export async function getFeaturedProducts(limit = 8) {
  const query = `*[_type == "product" && !(_id in path("drafts.**")) && featured == true] | order(_createdAt desc)[0...${limit}]{
    _id,
    name,
    "slug": slug.current,
    price,
    discountPrice,
    description,
    trending,
    onSale, // boolean if you have it
    "image": images[0].asset->,
  }`;
  return await client.fetch(query);
}

export async function getCategoriesWithProducts() {
  const query = `*[_type == "category"]{
    _id,
    title,
    description,
    "slug": slug.current,
    "image": image.asset->url,
    products[]->{
      _id,
      name,
      price,
      discountPrice,
      description,
      trending,
      onSale,
      "slug": slug.current,
      "image": images[0].asset->
    }
  } | order(_createdAt asc)`;
  return await client.fetch(query);
}


export async function getCategoryProducts(slug: string) {
  const query = `*[_type == "product" && defined(category->slug.current) && category->slug.current == $slug]{
    _id,
    title,
    "slug": slug.current,
    price,
    discountPrice,
    description,
    "image": images[0].asset->url,
    colors,
    sizes,
    tags,
    onSale,
    trending,
    category->{
      _id,
      title,
      "slug": slug.current
    }
  }`;
  return await client.fetch(query, { slug });
}


export async function getAllProducts() {
  return await client.fetch(`*[_type == "product"]{
    _id,
    name,
    slug,
    price,
    description,
    "image": images[0].asset->url,
    tags,
    "category": category->{
      title
    }
  }`);
}
